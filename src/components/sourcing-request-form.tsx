"use client";

import { FormEvent, useState } from "react";
import { CheckCircle2, Upload } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useI18n } from "@/lib/i18n";
import { LOCAL_LEADS_KEY, type SourcingLead } from "@/lib/leads";
import { categories, platformOptions } from "@/lib/site-data";

function readLeads(): SourcingLead[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(window.localStorage.getItem(LOCAL_LEADS_KEY) || "[]") as SourcingLead[];
  } catch {
    return [];
  }
}

export function SourcingRequestForm() {
  const [success, setSuccess] = useState(false);
  const { labelCategory, labelPlatform, t } = useI18n();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const file = data.get("referenceImage");

    const lead: SourcingLead = {
      id: `SP-${Date.now()}`,
      createdAt: new Date().toISOString(),
      name: String(data.get("name") || ""),
      companyName: String(data.get("companyName") || ""),
      email: String(data.get("email") || ""),
      whatsapp: String(data.get("whatsapp") || ""),
      countryMarket: String(data.get("countryMarket") || ""),
      sellingPlatform: String(data.get("sellingPlatform") || ""),
      productCategory: String(data.get("productCategory") || ""),
      productDescription: String(data.get("productDescription") || ""),
      targetQuantity: String(data.get("targetQuantity") || ""),
      targetPrice: String(data.get("targetPrice") || ""),
      needCustomLogo: data.get("needCustomLogo") === "on",
      needCustomPackaging: data.get("needCustomPackaging") === "on",
      needSamples: data.get("needSamples") === "on",
      referenceImageName: file instanceof File && file.name ? file.name : "",
      message: String(data.get("message") || ""),
      status: "New",
      notes: "",
    };

    window.localStorage.setItem(LOCAL_LEADS_KEY, JSON.stringify([lead, ...readLeads()]));
    form.reset();
    setSuccess(true);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-lg border border-white/80 bg-white/78 p-5 shadow-xl shadow-slate-950/8 backdrop-blur-xl sm:p-8"
    >
      {success ? (
        <div className="mb-6 flex gap-3 rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-900">
          <CheckCircle2 className="mt-0.5 size-5 shrink-0" />
          <p>{t.form.success}</p>
        </div>
      ) : null}
      <div className="grid gap-5 md:grid-cols-2">
        <Field id="name" label={t.form.name} required />
        <Field id="companyName" label={t.form.companyName} required />
        <Field id="email" label={t.form.email} type="email" required />
        <Field id="whatsapp" label={t.form.whatsapp} required />
        <Field id="countryMarket" label={t.form.countryMarket} required />
        <SelectField
          id="sellingPlatform"
          label={t.form.sellingPlatform}
          options={platformOptions.map((value) => ({ value, label: labelPlatform(value) }))}
          placeholder={t.form.selectOption}
          required
        />
        <SelectField
          id="productCategory"
          label={t.form.productCategory}
          options={categories.map((category) => ({ value: category.title, label: labelCategory(category.title) }))}
          placeholder={t.form.selectOption}
          required
        />
        <Field id="targetQuantity" label={t.form.targetQuantity} required />
        <Field id="targetPrice" label={t.form.targetPrice} required />
        <label className="flex min-h-12 items-center gap-3 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-700">
          <input name="needCustomLogo" type="checkbox" className="size-4 accent-[#f26f21]" />
          {t.form.needCustomLogo}
        </label>
        <label className="flex min-h-12 items-center gap-3 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-700">
          <input name="needCustomPackaging" type="checkbox" className="size-4 accent-[#f26f21]" />
          {t.form.needCustomPackaging}
        </label>
        <label className="flex min-h-12 items-center gap-3 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-700">
          <input name="needSamples" type="checkbox" className="size-4 accent-[#f26f21]" />
          {t.form.needSamples}
        </label>
      </div>
      <div className="mt-5 grid gap-5">
        <div className="grid gap-2">
          <Label htmlFor="productDescription">{t.form.productDescription}</Label>
          <Textarea
            id="productDescription"
            name="productDescription"
            required
            rows={5}
            placeholder={t.form.productDescriptionPlaceholder}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="referenceImage">{t.form.uploadReferenceImage}</Label>
          <div className="flex items-center gap-3 rounded-lg border border-dashed border-slate-300 bg-white p-4">
            <Upload className="size-5 text-[#f26f21]" />
            <Input id="referenceImage" name="referenceImage" type="file" accept="image/*" className="border-0 p-0" />
          </div>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="message">{t.form.message}</Label>
          <Textarea
            id="message"
            name="message"
            rows={4}
            placeholder={t.form.messagePlaceholder}
          />
        </div>
      </div>
      <button
        type="submit"
        className="mt-7 h-12 w-full rounded-lg bg-[#f26f21] px-5 text-sm font-semibold text-white transition hover:bg-[#d95e17]"
      >
        {t.common.submitSourcingRequest}
      </button>
    </form>
  );
}

function Field({
  id,
  label,
  type = "text",
  required = false,
}: {
  id: string;
  label: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div className="grid gap-2">
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} name={id} type={type} required={required} />
    </div>
  );
}

function SelectField({
  id,
  label,
  options,
  placeholder,
  required = false,
}: {
  id: string;
  label: string;
  options: { value: string; label: string }[];
  placeholder: string;
  required?: boolean;
}) {
  return (
    <div className="grid gap-2">
      <Label htmlFor={id}>{label}</Label>
      <select
        id={id}
        name={id}
        required={required}
        defaultValue=""
        className="h-10 rounded-lg border border-input bg-white px-3 text-sm text-slate-800 outline-none transition focus:border-ring focus:ring-3 focus:ring-ring/30"
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
