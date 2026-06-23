"use client";

import { useMemo, useRef, useState, useTransition } from "react";
import { AlertCircle, Download, ExternalLink, LoaderCircle, Eye, Search, Trash2 } from "lucide-react";

import { deleteLeads, updateLeadNotes, updateLeadStatus } from "@/app/admin/actions";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { useI18n } from "@/lib/i18n";
import type { LeadStatus, SourcingLead } from "@/lib/leads";
import { pricingPlans, statusOptions } from "@/lib/site-data";

const statusTone: Record<LeadStatus, string> = {
  New: "bg-orange-100 text-orange-800",
  Contacted: "bg-sky-100 text-sky-800",
  Quoting: "bg-indigo-100 text-indigo-800",
  "Sample Stage": "bg-amber-100 text-amber-800",
  "In Production": "bg-teal-100 text-teal-800",
  Completed: "bg-emerald-100 text-emerald-800",
  Lost: "bg-slate-100 text-slate-700",
};

type ExportFormat = "csv" | "xlsx" | "docx" | "pdf";

export function AdminLeadTable({ initialLeads }: { initialLeads: SourcingLead[] }) {
  const [leads, setLeads] = useState(initialLeads);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<"All" | LeadStatus>("All");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(() => new Set());
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [exportFormat, setExportFormat] = useState<ExportFormat>("xlsx");
  const [isExporting, setIsExporting] = useState(false);
  const [saveError, setSaveError] = useState(false);
  const [deleteError, setDeleteError] = useState(false);
  const [exportError, setExportError] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [isDeleting, startDeleteTransition] = useTransition();
  const savedNotes = useRef(new Map(initialLeads.map((lead) => [lead.id, lead.notes])));
  const { labelCategory, labelPlatform, labelStatus, locale, t } = useI18n();

  function labelServicePlan(value: string) {
    const index = pricingPlans.findIndex((plan) => plan.value === value);
    const plan = index >= 0 ? t.pricingPlans[index] : undefined;
    return plan ? `${plan.name} · ${plan.price}` : value || t.admin.notSelected;
  }

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return leads.filter((lead) => {
      const matchesStatus = status === "All" || lead.status === status;
      const matchesQuery =
        !normalized ||
        [
          lead.name,
          lead.companyName,
          lead.email,
          lead.countryMarket,
          lead.sellingPlatform,
          lead.productCategory,
          lead.productDescription,
          lead.servicePlan,
        ]
          .join(" ")
          .toLowerCase()
          .includes(normalized);
      return matchesStatus && matchesQuery;
    });
  }, [leads, query, status]);

  const selected = selectedId ? leads.find((lead) => lead.id === selectedId) ?? null : null;
  const allVisibleSelected = filtered.length > 0 && filtered.every((lead) => selectedIds.has(lead.id));
  const someVisibleSelected = filtered.some((lead) => selectedIds.has(lead.id));

  function toggleLeadSelection(id: string) {
    setSelectedIds((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function toggleAllVisible() {
    setSelectedIds((current) => {
      const next = new Set(current);
      if (allVisibleSelected) {
        filtered.forEach((lead) => next.delete(lead.id));
      } else {
        filtered.forEach((lead) => next.add(lead.id));
      }
      return next;
    });
  }

  function confirmDelete() {
    const ids = [...selectedIds];
    if (ids.length === 0 || isDeleting) return;

    setDeleteError(false);
    startDeleteTransition(async () => {
      const result = await deleteLeads(ids);
      if (!result.ok) {
        setDeleteError(true);
        return;
      }

      const deletedIds = new Set(ids);
      setLeads((current) => current.filter((lead) => !deletedIds.has(lead.id)));
      ids.forEach((id) => savedNotes.current.delete(id));
      if (selectedId && deletedIds.has(selectedId)) setSelectedId(null);
      setSelectedIds(new Set());
      setDeleteDialogOpen(false);
    });
  }

  function applyLocalPatch(id: string, patch: Partial<SourcingLead>) {
    setLeads((current) => current.map((lead) => (lead.id === id ? { ...lead, ...patch } : lead)));
  }

  function changeStatus(lead: SourcingLead, nextStatus: LeadStatus) {
    if (lead.status === nextStatus) return;

    const previousStatus = lead.status;
    setSaveError(false);
    applyLocalPatch(lead.id, { status: nextStatus });
    startTransition(async () => {
      const result = await updateLeadStatus(lead.id, nextStatus);
      if (!result.ok) {
        applyLocalPatch(lead.id, { status: previousStatus });
        setSaveError(true);
      }
    });
  }

  function saveNotes(id: string, notes: string) {
    const previousNotes = savedNotes.current.get(id) ?? "";
    if (notes === previousNotes) return;

    setSaveError(false);
    startTransition(async () => {
      const result = await updateLeadNotes(id, notes);
      if (result.ok) {
        savedNotes.current.set(id, notes);
      } else {
        applyLocalPatch(id, { notes: previousNotes });
        setSaveError(true);
      }
    });
  }

  function getExportData() {
    const headers = [
      "ID",
      t.admin.created,
      t.form.name,
      t.form.companyName,
      t.form.email,
      t.form.whatsapp,
      t.admin.market,
      t.admin.sellingPlatform,
      t.admin.category,
      t.admin.productDescription,
      t.admin.targetQuantity,
      t.admin.targetPrice,
      t.admin.servicePlan,
      t.admin.customLogo,
      t.admin.customPackaging,
      t.admin.samples,
      t.admin.referenceImage,
      t.admin.message,
      t.admin.status,
      t.admin.notes,
    ];
    const rows = filtered.map((lead) => [
      lead.id,
      new Date(lead.createdAt).toLocaleString(),
      lead.name,
      lead.companyName,
      lead.email,
      lead.whatsapp,
      lead.countryMarket,
      labelPlatform(lead.sellingPlatform),
      labelCategory(lead.productCategory),
      lead.productDescription,
      lead.targetQuantity,
      lead.targetPrice,
      labelServicePlan(lead.servicePlan),
      lead.needCustomLogo ? t.admin.yes : t.admin.no,
      lead.needCustomPackaging ? t.admin.yes : t.admin.no,
      lead.needSamples ? t.admin.yes : t.admin.no,
      lead.referenceImageUrl ?? "",
      lead.message,
      labelStatus(lead.status),
      lead.notes,
    ]);

    return { headers, rows };
  }

  async function exportRequests() {
    if (filtered.length === 0 || isExporting) return;

    setExportError(false);
    setIsExporting(true);
    try {
      const { headers, rows } = getExportData();
      const response = await fetch("/api/admin/exports", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          format: exportFormat,
          title: t.pages.adminTitle,
          generatedAt: new Date().toLocaleString(locale),
          columns: headers,
          rows,
        }),
      });
      if (!response.ok) throw new Error("Export failed");

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      const disposition = response.headers.get("Content-Disposition") ?? "";
      const filename = disposition.match(/filename="([^"]+)"/)?.[1] ?? `sodapost-leads.${exportFormat}`;
      anchor.href = url;
      anchor.download = filename;
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();
      URL.revokeObjectURL(url);
    } catch {
      setExportError(true);
    } finally {
      setIsExporting(false);
    }
  }

  return (
    <div className="space-y-6">
      {saveError ? (
        <div className="flex gap-3 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-900" role="alert">
          <AlertCircle className="mt-0.5 size-5 shrink-0" />
          <p>{t.admin.saveError}</p>
        </div>
      ) : null}
      {deleteError ? (
        <div className="flex gap-3 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-900" role="alert">
          <AlertCircle className="mt-0.5 size-5 shrink-0" />
          <p>{t.admin.deleteError}</p>
        </div>
      ) : null}
      {exportError ? (
        <div className="flex gap-3 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-900" role="alert">
          <AlertCircle className="mt-0.5 size-5 shrink-0" />
          <p>{t.admin.exportError}</p>
        </div>
      ) : null}
      <div className="grid gap-4 rounded-lg border border-slate-200 bg-white p-4 shadow-sm md:grid-cols-[1fr_220px_auto]">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={t.admin.searchPlaceholder}
            className="pl-9"
          />
        </div>
        <select
          value={status}
          onChange={(event) => setStatus(event.target.value as "All" | LeadStatus)}
          className="h-10 rounded-lg border border-input bg-white px-3 text-sm outline-none focus:border-ring focus:ring-3 focus:ring-ring/30"
        >
          <option value="All">{t.admin.allStatuses}</option>
          {statusOptions.map((option) => (
            <option key={option} value={option}>
              {labelStatus(option)}
            </option>
          ))}
        </select>
        <div className="flex flex-wrap items-center justify-end gap-2">
          {selectedIds.size > 0 ? (
            <span className="mr-1 text-xs font-medium text-slate-500">
              {t.admin.selectedCount.replace("{count}", String(selectedIds.size))}
            </span>
          ) : null}
          <Select
            value={exportFormat}
            onValueChange={(value) => value && setExportFormat(value as ExportFormat)}
          >
            <SelectTrigger
              aria-label={t.admin.exportFormat}
              className="h-10 min-w-32 border-slate-200 bg-white px-3"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent align="end" className="min-w-44 p-1">
              <SelectItem value="xlsx" className="py-2">{t.admin.exportExcel}</SelectItem>
              <SelectItem value="docx" className="py-2">{t.admin.exportWord}</SelectItem>
              <SelectItem value="pdf" className="py-2">{t.admin.exportPdf}</SelectItem>
              <SelectItem value="csv" className="py-2">{t.admin.exportCsv}</SelectItem>
            </SelectContent>
          </Select>
          <Button
            onClick={exportRequests}
            disabled={filtered.length === 0 || isExporting}
            className="bg-slate-950 text-white hover:bg-slate-800"
          >
            {isExporting ? <LoaderCircle className="animate-spin" /> : <Download />}
            {isExporting ? t.admin.exporting : t.admin.exportFile}
          </Button>
          <Button
            variant="destructive"
            onClick={() => setDeleteDialogOpen(true)}
            disabled={selectedIds.size === 0 || isDeleting}
          >
            <Trash2 />
            {t.admin.deleteSelected}
          </Button>
        </div>
      </div>
      {isPending ? (
        <div className="flex items-center gap-2 text-xs text-slate-500" aria-live="polite">
          <LoaderCircle className="size-3.5 animate-spin" />
          {t.admin.saving}
        </div>
      ) : null}
      <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12 pl-4">
                  <input
                    ref={(element) => {
                      if (element) element.indeterminate = someVisibleSelected && !allVisibleSelected;
                    }}
                    type="checkbox"
                    checked={allVisibleSelected}
                    onChange={toggleAllVisible}
                    aria-label={t.admin.selectAllVisible}
                    className="size-4 rounded border-slate-300 accent-[#f26f21]"
                  />
                </TableHead>
                <TableHead>{t.admin.lead}</TableHead>
                <TableHead>{t.admin.market}</TableHead>
                <TableHead>{t.admin.category}</TableHead>
                <TableHead>{t.admin.status}</TableHead>
                <TableHead>{t.admin.notes}</TableHead>
                <TableHead className="text-right">{t.admin.details}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((lead) => (
                <TableRow key={lead.id}>
                  <TableCell className="pl-4">
                    <input
                      type="checkbox"
                      checked={selectedIds.has(lead.id)}
                      onChange={() => toggleLeadSelection(lead.id)}
                      aria-label={t.admin.selectLead.replace("{id}", lead.id)}
                      className="size-4 rounded border-slate-300 accent-[#f26f21]"
                    />
                  </TableCell>
                  <TableCell>
                    <div className="font-medium text-slate-950">{lead.companyName}</div>
                    <div className="text-xs text-slate-500">
                      {lead.name} · {lead.email}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm text-slate-700">{lead.countryMarket}</div>
                    <div className="text-xs text-slate-500">{labelPlatform(lead.sellingPlatform)}</div>
                  </TableCell>
                  <TableCell className="text-sm text-slate-700">{labelCategory(lead.productCategory)}</TableCell>
                  <TableCell>
                    <select
                      value={lead.status}
                      onChange={(event) => changeStatus(lead, event.target.value as LeadStatus)}
                      className="h-9 rounded-lg border border-slate-200 bg-white px-2 text-xs font-medium text-slate-700"
                    >
                      {statusOptions.map((option) => (
                        <option key={option} value={option}>
                          {labelStatus(option)}
                        </option>
                      ))}
                    </select>
                  </TableCell>
                  <TableCell className="min-w-56">
                    <Textarea
                      value={lead.notes}
                      onChange={(event) => applyLocalPatch(lead.id, { notes: event.target.value })}
                      onBlur={(event) => saveNotes(lead.id, event.currentTarget.value)}
                      maxLength={10_000}
                      rows={2}
                      className="text-xs"
                      placeholder={t.admin.addNotes}
                    />
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm" onClick={() => setSelectedId(lead.id)}>
                      <Eye />
                      {t.admin.view}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        {filtered.length === 0 ? (
          <div className="px-6 py-12 text-center text-sm text-slate-500">{t.admin.noLeads}</div>
        ) : null}
      </div>
      <Dialog open={Boolean(selected)} onOpenChange={(open) => !open && setSelectedId(null)}>
        <DialogContent className="max-h-[90vh] overflow-y-auto bg-white sm:max-w-2xl">
          {selected ? (
            <>
              <DialogHeader>
                <DialogTitle>{selected.companyName}</DialogTitle>
                <DialogDescription>
                  {selected.name} · {selected.email} · {selected.whatsapp}
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 text-sm sm:grid-cols-2">
                <Detail label={t.admin.leadId} value={selected.id} />
                <Detail label={t.admin.created} value={new Date(selected.createdAt).toLocaleString()} />
                <Detail label={t.admin.countryMarket} value={selected.countryMarket} />
                <Detail label={t.admin.sellingPlatform} value={labelPlatform(selected.sellingPlatform)} />
                <Detail label={t.admin.productCategory} value={labelCategory(selected.productCategory)} />
                <Detail label={t.admin.targetQuantity} value={selected.targetQuantity} />
                <Detail label={t.admin.targetPrice} value={selected.targetPrice} />
                <Detail label={t.admin.servicePlan} value={labelServicePlan(selected.servicePlan)} />
                <div>
                  <p className="text-xs font-semibold uppercase text-slate-500">{t.admin.status}</p>
                  <Badge className={statusTone[selected.status]}>{labelStatus(selected.status)}</Badge>
                </div>
              </div>
              <Detail label={t.admin.productDescription} value={selected.productDescription} wide />
              <div className="grid gap-3 sm:grid-cols-3">
                <Flag label={t.admin.customLogo} value={selected.needCustomLogo} yes={t.admin.yes} no={t.admin.no} />
                <Flag label={t.admin.customPackaging} value={selected.needCustomPackaging} yes={t.admin.yes} no={t.admin.no} />
                <Flag label={t.admin.samples} value={selected.needSamples} yes={t.admin.yes} no={t.admin.no} />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase text-slate-500">{t.admin.referenceImage}</p>
                {selected.referenceImageUrl ? (
                  <a
                    href={selected.referenceImageUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-1 inline-flex items-center gap-1 text-sm font-medium text-[#d95e17] hover:underline"
                  >
                    {selected.referenceImageName || t.admin.viewImage}
                    <ExternalLink className="size-3.5" />
                  </a>
                ) : (
                  <p className="mt-1 text-sm text-slate-800">{t.admin.notUploaded}</p>
                )}
              </div>
              <Detail label={t.admin.message} value={selected.message || t.admin.noMessage} wide />
              <div className="grid gap-2">
                <p className="text-xs font-semibold uppercase text-slate-500">{t.admin.internalNotes}</p>
                <Textarea
                  value={selected.notes}
                  onChange={(event) => applyLocalPatch(selected.id, { notes: event.target.value })}
                  onBlur={(event) => saveNotes(selected.id, event.currentTarget.value)}
                  maxLength={10_000}
                  rows={4}
                />
              </div>
            </>
          ) : null}
        </DialogContent>
      </Dialog>
      <AlertDialog
        open={deleteDialogOpen}
        onOpenChange={(open) => {
          if (!isDeleting) setDeleteDialogOpen(open);
        }}
      >
        <AlertDialogContent className="bg-white">
          <AlertDialogHeader>
            <AlertDialogTitle>{t.admin.deleteConfirmTitle}</AlertDialogTitle>
            <AlertDialogDescription>
              {t.admin.deleteConfirmDescription.replace("{count}", String(selectedIds.size))}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>
              {t.admin.cancelDelete}
            </AlertDialogCancel>
            <Button
              onClick={confirmDelete}
              disabled={isDeleting || selectedIds.size === 0}
              className="bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-200"
            >
              {isDeleting ? <LoaderCircle className="animate-spin" /> : <Trash2 />}
              {isDeleting ? t.admin.deleting : t.admin.confirmDelete}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

function Detail({ label, value, wide = false }: { label: string; value: string; wide?: boolean }) {
  return (
    <div className={wide ? "sm:col-span-2" : ""}>
      <p className="text-xs font-semibold uppercase text-slate-500">{label}</p>
      <p className="mt-1 whitespace-pre-wrap text-slate-800">{value}</p>
    </div>
  );
}

function Flag({ label, value, yes, no }: { label: string; value: boolean; yes: string; no: string }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
      <p className="text-xs font-semibold uppercase text-slate-500">{label}</p>
      <p className="mt-1 text-sm font-medium text-slate-900">{value ? yes : no}</p>
    </div>
  );
}
