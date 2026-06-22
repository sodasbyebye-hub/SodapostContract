"use client";

import { upload } from "@vercel/blob/client";
import { FormEvent, useState } from "react";
import { AlertCircle, CheckCircle2, LoaderCircle, Upload } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useI18n } from "@/lib/i18n";
import { createSourcingRequestId } from "@/lib/leads";
import { categories, platformOptions } from "@/lib/site-data";
import { getReferenceImagePath, MAX_REFERENCE_IMAGE_SIZE } from "@/lib/sourcing-upload";

export function SourcingRequestForm() {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { labelCategory, labelPlatform, t } = useI18n();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isSubmitting) return;

    const form = event.currentTarget;
    const formData = new FormData(form);
    const fileValue = formData.get("referenceImage");
    const file = fileValue instanceof File && fileValue.size > 0 ? fileValue : null;

    setSuccess(false);
    setError("");

    if (file && !file.type.startsWith("image/")) {
      setError(t.form.invalidImageType);
      return;
    }

    if (file && file.size > MAX_REFERENCE_IMAGE_SIZE) {
      setError(t.form.imageTooLarge);
      return;
    }

    setIsSubmitting(true);

    try {
      const requestId = createSourcingRequestId();
      formData.delete("referenceImage");
      formData.set("id", requestId);

      if (file) {
        const blob = await upload(getReferenceImagePath(requestId, file.name), file, {
          access: "public",
          handleUploadUrl: "/api/sourcing-requests/upload",
        });
        formData.set("referenceImageName", file.name);
        formData.set("referenceImageUrl", blob.url);
      }

      const response = await fetch("/api/sourcing-requests", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Request submission failed.");
      }

      form.reset();
      setSuccess(true);
    } catch (submitError) {
      console.error("Unable to submit sourcing request:", submitError);
      setError(t.form.submitError);
    } finally {
      setIsSubmitting(false);
    }
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
      {error ? (
        <div className="mb-6 flex gap-3 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-900" role="alert">
          <AlertCircle className="mt-0.5 size-5 shrink-0" />
          <p>{error}</p>
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
        disabled={isSubmitting}
        className="mt-7 flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-[#f26f21] px-5 text-sm font-semibold text-white transition hover:bg-[#d95e17] disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isSubmitting ? <LoaderCircle className="size-4 animate-spin" /> : null}
        {isSubmitting ? t.form.submitting : t.common.submitSourcingRequest}
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
