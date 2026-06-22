"use client";

import { useEffect, useMemo, useState } from "react";
import { Download, Eye, Search } from "lucide-react";

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
import { LOCAL_LEADS_KEY, mockLeads, type LeadStatus, type SourcingLead } from "@/lib/leads";
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

function readLocalLeads() {
  try {
    return JSON.parse(window.localStorage.getItem(LOCAL_LEADS_KEY) || "[]") as SourcingLead[];
  } catch {
    return [];
  }
}

export function AdminLeadTable() {
  const [leads, setLeads] = useState<SourcingLead[]>(mockLeads);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<"All" | LeadStatus>("All");
  const [selected, setSelected] = useState<SourcingLead | null>(null);
  const { labelCategory, labelPlatform, labelStatus, t } = useI18n();

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setLeads([...readLocalLeads(), ...mockLeads]);
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

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

  function updateLead(id: string, patch: Partial<SourcingLead>) {
    setLeads((current) => {
      const next = current.map((lead) => (lead.id === id ? { ...lead, ...patch } : lead));
      const localIds = new Set(readLocalLeads().map((lead) => lead.id));
      const local = next.filter((lead) => localIds.has(lead.id) || lead.id.startsWith("SP-17"));
      window.localStorage.setItem(LOCAL_LEADS_KEY, JSON.stringify(local));
      return next;
    });
    setSelected((current) => (current?.id === id ? { ...current, ...patch } : current));
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
      t.admin.targetQuantity,
      t.admin.targetPrice,
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
      lead.targetQuantity,
      lead.targetPrice,
      labelStatus(lead.status),
      lead.notes,
    ]);
    const csv = [headers, ...rows]
      .map((row) => row.map((cell) => `"${String(cell).replaceAll('"', '""')}"`).join(","))
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "sodapost-leads.csv";
    anchor.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="space-y-6">
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
                      onChange={(event) => updateLead(lead.id, { status: event.target.value as LeadStatus })}
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
                      onChange={(event) => updateLead(lead.id, { notes: event.target.value })}
                      rows={2}
                      className="text-xs"
                      placeholder={t.admin.addNotes}
                    />
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm" onClick={() => setSelected(lead)}>
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
      <Dialog open={Boolean(selected)} onOpenChange={(open) => !open && setSelected(null)}>
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
                <Flag
                  label={t.admin.customPackaging}
                  value={selected.needCustomPackaging}
                  yes={t.admin.yes}
                  no={t.admin.no}
                />
                <Flag label={t.admin.samples} value={selected.needSamples} yes={t.admin.yes} no={t.admin.no} />
              </div>
              <Detail label={t.admin.referenceImage} value={selected.referenceImageName || t.admin.notUploaded} wide />
              <Detail label={t.admin.message} value={selected.message || t.admin.noMessage} wide />
              <div className="grid gap-2">
                <p className="text-xs font-semibold uppercase text-slate-500">{t.admin.internalNotes}</p>
                <Textarea
                  value={selected.notes}
                  onChange={(event) => updateLead(selected.id, { notes: event.target.value })}
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
      <p className="mt-1 text-slate-800">{value}</p>
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
