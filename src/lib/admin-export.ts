import "server-only";

import path from "node:path";

import {
  AlignmentType,
  BorderStyle,
  Document,
  ExternalHyperlink,
  Footer,
  HeadingLevel,
  PageNumber,
  Packer,
  Paragraph,
  ShadingType,
  Table,
  TableCell,
  TableRow,
  TextRun,
  WidthType,
} from "docx";
import ExcelJS from "exceljs";
import PDFDocument from "pdfkit";

export const adminExportFormats = ["csv", "xlsx", "docx", "pdf"] as const;
export type AdminExportFormat = (typeof adminExportFormats)[number];

export type AdminExportPayload = {
  title: string;
  generatedAt: string;
  columns: string[];
  rows: string[][];
};

const BRAND_ORANGE = "F26F21";
const SLATE_950 = "020617";
const SLATE_600 = "475569";
const SLATE_200 = "E2E8F0";
const ORANGE_50 = "FFF7ED";
const fontFile = (packageName: string, filename: string) =>
  path.join(process.cwd(), "node_modules", "@fontsource", packageName, "files", filename);

const pdfFontPaths = {
  latin: fontFile("noto-sans", "noto-sans-latin-400-normal.woff"),
  latinBold: fontFile("noto-sans", "noto-sans-latin-700-normal.woff"),
  latinExt: fontFile("noto-sans", "noto-sans-latin-ext-400-normal.woff"),
  latinExtBold: fontFile("noto-sans", "noto-sans-latin-ext-700-normal.woff"),
  chinese: fontFile("noto-sans-sc", "noto-sans-sc-chinese-simplified-400-normal.woff"),
  chineseBold: fontFile("noto-sans-sc", "noto-sans-sc-chinese-simplified-700-normal.woff"),
  japanese: fontFile("noto-sans-jp", "noto-sans-jp-japanese-400-normal.woff"),
  japaneseBold: fontFile("noto-sans-jp", "noto-sans-jp-japanese-700-normal.woff"),
  korean: fontFile("noto-sans-kr", "noto-sans-kr-korean-400-normal.woff"),
  koreanBold: fontFile("noto-sans-kr", "noto-sans-kr-korean-700-normal.woff"),
  thai: fontFile("noto-sans-thai", "noto-sans-thai-thai-400-normal.woff"),
  thaiBold: fontFile("noto-sans-thai", "noto-sans-thai-thai-700-normal.woff"),
};

export function createAdminExport(
  format: AdminExportFormat,
  payload: AdminExportPayload,
): Promise<Buffer> {
  switch (format) {
    case "csv":
      return Promise.resolve(createCsv(payload));
    case "xlsx":
      return createExcel(payload);
    case "docx":
      return createWord(payload);
    case "pdf":
      return createPdf(payload);
  }
}

function createCsv({ columns, rows }: AdminExportPayload) {
  const protectFormula = (value: string) => (/^[=+\-@]/.test(value) ? `'${value}` : value);
  const escapeCell = (value: string) => `"${protectFormula(value).replaceAll('"', '""')}"`;
  const csv = [columns, ...rows].map((row) => row.map(escapeCell).join(",")).join("\r\n");
  return Buffer.from(`\uFEFF${csv}`, "utf8");
}

async function createExcel({ title, generatedAt, columns, rows }: AdminExportPayload) {
  const workbook = new ExcelJS.Workbook();
  workbook.creator = "SodaPost";
  workbook.created = new Date();
  workbook.modified = new Date();

  const worksheet = workbook.addWorksheet("Sourcing Requests", {
    views: [{ state: "frozen", xSplit: 2, ySplit: 4, showGridLines: false }],
  });
  const columnCount = columns.length;

  worksheet.mergeCells(1, 1, 1, columnCount);
  const titleCell = worksheet.getCell(1, 1);
  titleCell.value = title;
  titleCell.font = { name: "Arial", size: 18, bold: true, color: { argb: "FFFFFFFF" } };
  titleCell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: `FF${BRAND_ORANGE}` } };
  titleCell.alignment = { vertical: "middle", horizontal: "left" };
  worksheet.getRow(1).height = 32;

  worksheet.mergeCells(2, 1, 2, columnCount);
  const metadataCell = worksheet.getCell(2, 1);
  metadataCell.value = `${generatedAt}  |  ${rows.length} record(s)`;
  metadataCell.font = { name: "Arial", size: 10, color: { argb: `FF${SLATE_600}` } };
  metadataCell.alignment = { vertical: "middle", horizontal: "left" };
  worksheet.getRow(2).height = 22;
  worksheet.getRow(3).height = 8;

  const headerRow = worksheet.getRow(4);
  headerRow.values = columns;
  headerRow.height = 28;
  headerRow.eachCell((cell) => {
    cell.font = { name: "Arial", size: 10, bold: true, color: { argb: "FFFFFFFF" } };
    cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: `FF${SLATE_950}` } };
    cell.alignment = { vertical: "middle", horizontal: "left", wrapText: true };
    cell.border = { bottom: { style: "medium", color: { argb: `FF${BRAND_ORANGE}` } } };
  });

  rows.forEach((values, rowIndex) => {
    const row = worksheet.addRow(values.map((value) => (value === "" ? null : value)));
    row.alignment = { vertical: "top", wrapText: true };
    row.eachCell((cell, columnIndex) => {
      const value = String(values[columnIndex - 1] ?? "");
      cell.font = { name: "Arial", size: 9, color: { argb: `FF${SLATE_950}` } };
      if (rowIndex % 2 === 1) {
        cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FFF8FAFC" } };
      }
      cell.border = { bottom: { style: "hair", color: { argb: `FF${SLATE_200}` } } };
      if (/^https:\/\//i.test(value)) {
        cell.value = { text: value, hyperlink: value };
        cell.font = { name: "Arial", size: 9, color: { argb: "FF2563EB" }, underline: true };
      }
    });
  });

  worksheet.autoFilter = {
    from: { row: 4, column: 1 },
    to: { row: 4, column: columnCount },
  };

  columns.forEach((column, index) => {
    const values = rows.slice(0, 200).map((row) => String(row[index] ?? ""));
    const longest = Math.max(column.length, ...values.map((value) => Math.min(value.length, 48)));
    worksheet.getColumn(index + 1).width = Math.max(12, Math.min(48, longest + 2));
  });

  worksheet.pageSetup = {
    orientation: "landscape",
    fitToPage: true,
    fitToWidth: 1,
    fitToHeight: 0,
    paperSize: 9,
    margins: { left: 0.25, right: 0.25, top: 0.5, bottom: 0.5, header: 0.2, footer: 0.2 },
  };

  const output = await workbook.xlsx.writeBuffer();
  return Buffer.from(output);
}

async function createWord({ title, generatedAt, columns, rows }: AdminExportPayload) {
  const children: Array<Paragraph | Table> = [
    new Paragraph({
      children: [new TextRun({ text: "SODAPOST", bold: true, color: BRAND_ORANGE, size: 22, font: "Arial" })],
      spacing: { after: 120 },
    }),
    new Paragraph({
      children: [new TextRun({ text: title, bold: true, color: SLATE_950, size: 36, font: "Arial" })],
      spacing: { after: 100 },
    }),
    new Paragraph({
      children: [
        new TextRun({
          text: `${generatedAt}  |  ${rows.length} record(s)`,
          color: SLATE_600,
          size: 20,
          font: "Arial",
        }),
      ],
      spacing: { after: 360 },
    }),
  ];

  rows.forEach((row, rowIndex) => {
    const heading = [row[3], row[0]].filter(Boolean).join(" - ") || `Request ${rowIndex + 1}`;
    children.push(
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        pageBreakBefore: rowIndex > 0,
        keepNext: true,
        children: [new TextRun({ text: heading, bold: true, color: BRAND_ORANGE, size: 28, font: "Arial" })],
        spacing: { before: 120, after: 180 },
      }),
      new Table({
        width: { size: 9360, type: WidthType.DXA },
        columnWidths: [2700, 6660],
        rows: columns.map((column, columnIndex) =>
          new TableRow({
            cantSplit: true,
            children: [
              new TableCell({
                width: { size: 2700, type: WidthType.DXA },
                margins: { top: 100, bottom: 100, left: 120, right: 120 },
                shading: { type: ShadingType.CLEAR, fill: ORANGE_50 },
                borders: wordCellBorders(),
                children: [
                  new Paragraph({
                    children: [
                      new TextRun({ text: column, bold: true, color: SLATE_950, size: 18, font: "Arial" }),
                    ],
                  }),
                ],
              }),
              new TableCell({
                width: { size: 6660, type: WidthType.DXA },
                margins: { top: 100, bottom: 100, left: 120, right: 120 },
                borders: wordCellBorders(),
                children: [wordValueParagraph(String(row[columnIndex] ?? ""))],
              }),
            ],
          }),
        ),
      }),
    );
  });

  const document = new Document({
    creator: "SodaPost",
    title,
    description: "SodaPost sourcing request export",
    styles: {
      default: {
        document: { run: { font: "Arial", size: 20, color: SLATE_950 } },
        heading1: {
          run: { font: "Arial", size: 28, bold: true, color: BRAND_ORANGE },
          paragraph: { spacing: { before: 240, after: 160 }, keepNext: true },
        },
      },
    },
    sections: [
      {
        properties: {
          page: {
            size: { width: 12240, height: 15840 },
            margin: { top: 1440, right: 1440, bottom: 1440, left: 1440, header: 708, footer: 708 },
          },
        },
        footers: {
          default: new Footer({
            children: [
              new Paragraph({
                alignment: AlignmentType.RIGHT,
                children: [
                  new TextRun({ text: "SodaPost  |  ", color: SLATE_600, size: 16, font: "Arial" }),
                  new TextRun({ children: [PageNumber.CURRENT], color: SLATE_600, size: 16, font: "Arial" }),
                ],
              }),
            ],
          }),
        },
        children,
      },
    ],
  });

  return Packer.toBuffer(document);
}

function wordCellBorders() {
  const border = { style: BorderStyle.SINGLE, size: 4, color: SLATE_200 };
  return { top: border, bottom: border, left: border, right: border };
}

function wordValueParagraph(value: string) {
  if (/^https:\/\//i.test(value)) {
    return new Paragraph({
      children: [
        new ExternalHyperlink({
          link: value,
          children: [new TextRun({ text: value, style: "Hyperlink", size: 18, font: "Arial" })],
        }),
      ],
    });
  }

  return new Paragraph({
    children: [new TextRun({ text: value || "-", color: SLATE_950, size: 18, font: "Arial" })],
  });
}

async function createPdf({ title, generatedAt, columns, rows }: AdminExportPayload) {
  const document = new PDFDocument({
    size: "A4",
    margins: { top: 44, right: 44, bottom: 48, left: 44 },
    bufferPages: true,
    info: { Title: title, Author: "SodaPost", Subject: "Sourcing request export" },
  });
  registerPdfFonts(document);

  const chunks: Buffer[] = [];
  document.on("data", (chunk: Buffer) => chunks.push(chunk));
  const completed = new Promise<Buffer>((resolve, reject) => {
    document.on("end", () => resolve(Buffer.concat(chunks)));
    document.on("error", reject);
  });

  const contentX = document.page.margins.left;
  const contentWidth = document.page.width - document.page.margins.left - document.page.margins.right;
  let currentY = document.page.margins.top;
  currentY += drawPdfText(document, "SODAPOST", contentX, currentY, contentWidth, 10, true, `#${BRAND_ORANGE}`);
  currentY += 10;
  currentY += drawPdfText(document, title, contentX, currentY, contentWidth, 21, true, `#${SLATE_950}`);
  currentY += 8;
  const metadata = `${generatedAt}  |  ${rows.length} record(s)`;
  currentY += drawPdfText(document, metadata, contentX, currentY, contentWidth, 9, false, `#${SLATE_600}`);
  document.y = currentY + 22;

  rows.forEach((row, rowIndex) => {
    if (rowIndex > 0) document.addPage();
    const heading = [row[3], row[0]].filter(Boolean).join(" - ") || `Request ${rowIndex + 1}`;
    const headingY = document.y;
    const headingHeight = drawPdfText(
      document,
      heading,
      document.page.margins.left,
      headingY,
      document.page.width - document.page.margins.left - document.page.margins.right,
      14,
      true,
      `#${BRAND_ORANGE}`,
    );
    document.y = headingY + headingHeight + 12;

    columns.forEach((column, columnIndex) => {
      drawPdfField(document, column, String(row[columnIndex] ?? ""), columnIndex % 2 === 1);
    });
  });

  const pageRange = document.bufferedPageRange();
  for (let pageIndex = pageRange.start; pageIndex < pageRange.start + pageRange.count; pageIndex += 1) {
    document.switchToPage(pageIndex);
    const footer = `SodaPost  |  ${pageIndex + 1} / ${pageRange.count}`;
    const footerWidth = pdfTextWidth(document, footer, 8, false);
    drawPdfText(
      document,
      footer,
      document.page.width - 44 - footerWidth,
      document.page.height - 32,
      footerWidth,
      8,
      false,
      `#${SLATE_600}`,
    );
  }

  document.end();
  return completed;
}

function registerPdfFonts(document: PDFKit.PDFDocument) {
  Object.entries(pdfFontPaths).forEach(([name, path]) => document.registerFont(name, path));
}

function selectPdfFont(value: string, bold = false) {
  const suffix = bold ? "Bold" : "";
  if (/[\u0E00-\u0E7F]/u.test(value)) return `thai${suffix}`;
  if (/[\u1100-\u11FF\u3130-\u318F\uAC00-\uD7AF]/u.test(value)) return `korean${suffix}`;
  if (/[\u3040-\u30FF\u31F0-\u31FF]/u.test(value)) return `japanese${suffix}`;
  if (/[\u3000-\u303F\u3400-\u9FFF\uF900-\uFAFF\uFF00-\uFFEF]/u.test(value)) return `chinese${suffix}`;
  if (/[\u00C0-\u024F]/u.test(value)) return `latinExt${suffix}`;
  return `latin${suffix}`;
}

function drawPdfField(document: PDFKit.PDFDocument, label: string, rawValue: string, alternate: boolean) {
  const value = rawValue || "-";
  const labelWidth = 124;
  const valueWidth = document.page.width - document.page.margins.left - document.page.margins.right - labelWidth;
  const padding = 7;

  const labelLayout = layoutPdfText(document, label, labelWidth - padding * 2, 8.5, true);
  const valueLayout = layoutPdfText(document, value, valueWidth - padding * 2, 8.5, false);
  const labelHeight = labelLayout.height;
  const valueHeight = valueLayout.height;
  const rowHeight = Math.max(28, labelHeight + padding * 2, valueHeight + padding * 2);

  if (document.y + rowHeight > document.page.height - document.page.margins.bottom - 16) {
    document.addPage();
  }

  const x = document.page.margins.left;
  const y = document.y;
  const fill = alternate ? "#F8FAFC" : "#FFFFFF";

  document.save();
  document.rect(x, y, labelWidth, rowHeight).fillAndStroke(`#${ORANGE_50}`, `#${SLATE_200}`);
  document.rect(x + labelWidth, y, valueWidth, rowHeight).fillAndStroke(fill, `#${SLATE_200}`);
  document.restore();

  drawPdfLayout(document, labelLayout, x + padding, y + padding, 8.5, `#${SLATE_950}`);
  drawPdfLayout(
    document,
    valueLayout,
    x + labelWidth + padding,
    y + padding,
    8.5,
    /^https:\/\//i.test(value) ? "#2563EB" : `#${SLATE_950}`,
    /^https:\/\//i.test(value) ? value : undefined,
  );

  document.y = y + rowHeight;
}

type PdfTextRun = { font: string; text: string; width: number };
type PdfTextLayout = { height: number; lineHeight: number; lines: PdfTextRun[][] };

function layoutPdfText(
  document: PDFKit.PDFDocument,
  value: string,
  maxWidth: number,
  fontSize: number,
  bold: boolean,
): PdfTextLayout {
  const segmenter = new Intl.Segmenter(undefined, { granularity: "grapheme" });
  const graphemes = [...segmenter.segment(value)].map((segment) => segment.segment);
  const lines: PdfTextRun[][] = [[]];
  let currentWidth = 0;

  graphemes.forEach((grapheme) => {
    if (grapheme === "\n") {
      lines.push([]);
      currentWidth = 0;
      return;
    }

    const font = selectPdfFont(grapheme, bold);
    document.font(font).fontSize(fontSize);
    const width = document.widthOfString(grapheme);
    if (currentWidth > 0 && currentWidth + width > maxWidth) {
      lines.push([]);
      currentWidth = 0;
    }

    const line = lines[lines.length - 1];
    const previousRun = line[line.length - 1];
    if (previousRun?.font === font) {
      previousRun.text += grapheme;
      previousRun.width += width;
    } else {
      line.push({ font, text: grapheme, width });
    }
    currentWidth += width;
  });

  const lineHeight = fontSize * 1.45;
  return { lines, lineHeight, height: Math.max(1, lines.length) * lineHeight };
}

function drawPdfLayout(
  document: PDFKit.PDFDocument,
  layout: PdfTextLayout,
  x: number,
  y: number,
  fontSize: number,
  color: string,
  link?: string,
) {
  layout.lines.forEach((line, lineIndex) => {
    let cursorX = x;
    const lineY = y + lineIndex * layout.lineHeight;
    line.forEach((run) => {
      document
        .font(run.font)
        .fontSize(fontSize)
        .fillColor(color)
        .text(run.text, cursorX, lineY, { lineBreak: false });
      cursorX += run.width;
    });
    if (link && cursorX > x) document.link(x, lineY, cursorX - x, layout.lineHeight, link);
  });
}

function drawPdfText(
  document: PDFKit.PDFDocument,
  value: string,
  x: number,
  y: number,
  maxWidth: number,
  fontSize: number,
  bold: boolean,
  color: string,
) {
  const layout = layoutPdfText(document, value, maxWidth, fontSize, bold);
  drawPdfLayout(document, layout, x, y, fontSize, color);
  return layout.height;
}

function pdfTextWidth(document: PDFKit.PDFDocument, value: string, fontSize: number, bold: boolean) {
  return [...new Intl.Segmenter(undefined, { granularity: "grapheme" }).segment(value)].reduce(
    (total, segment) => {
      document.font(selectPdfFont(segment.segment, bold)).fontSize(fontSize);
      return total + document.widthOfString(segment.segment);
    },
    0,
  );
}
