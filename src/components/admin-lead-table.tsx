"use client";

import { useMemo, useRef, useState, useTransition } from "react";
import { AlertCircle, Download, ExternalLink, LoaderCircle, Eye, Search } from "lucide-react";

import { updateLeadNotes, updateLeadStatus } from "@/app/admin/actions";
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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { useI18n } from "@/lib/i18n";
import type { LeadStatus, SourcingLead } from "@/lib/leads";
import { statusOptions } from "@/lib/site-data";

const statusTone: Record<LeadStatus, string> = {
  New: "bg-orange-100 text-orange-800",
  Contacted: "bg-sky-100 text-sky-800",
  Quoting: "bg-indigo-100 text-indigo-800",
  "Sample Stage": "bg-amber-100 text-amber-800",
  "In Production": "bg-teal-100 text-teal-800",
  Completed: "bg-emerald-100 text-emerald-800",
  Lost: "bg-slate-100 text-slate-700",
};

export function AdminLeadTable({ initialLeads }: { initialLeads: SourcingLead[] }) {
  const [leads, setLeads] = useState(initialLeads);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<"All" | LeadStatus>("All");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [saveError, setSaveError] = useState(false);
  const [isPending, startTransition] = useTransition();
  const savedNotes = useRef(new Map(initialLeads.map((lead) => [lead.id, lead.notes])));
  const { labelCategory, labelPlatform, labelStatus, t } = useI18n();

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
        ]
          .join(" ")
          .toLowerCase()
          .includes(normalized);
      return matchesStatus && matchesQuery;
    });
  }, [leads, query, status]);

  const selected = selectedId ? leads.find((lead) => lead.id === selectedId) ?? null : null;

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

  function exportCsv() {
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
      lead.needCustomLogo ? t.admin.yes : t.admin.no,
      lead.needCustomPackaging ? t.admin.yes : t.admin.no,
      lead.needSamples ? t.admin.yes : t.admin.no,
      lead.referenceImageUrl ?? "",
      lead.message,
      labelStatus(lead.status),
      lead.notes,
    ]);
    const csv = [headers, ...rows]
      .map((row) => row.map((cell) => `"${String(cell).replaceAll('"', '""')}"`).join(","))
      .join("\n");
    const blob = new Blob(["\uFEFF", csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "sodapost-leads.csv";
    anchor.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="space-y-6">
      {saveError ? (
        <div className="flex gap-3 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-900" role="alert">
          <AlertCircle className="mt-0.5 size-5 shrink-0" />
          <p>{t.admin.saveError}</p>
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
        <Button onClick={exportCsv} className="bg-slate-950 text-white hover:bg-slate-800">
          <Download />
          {t.admin.exportCsv}
        </Button>
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
