"use client";

import { upload } from "@vercel/blob/client";
import { FormEvent, useState } from "react";
import {
  AlertCircle,
  CheckCircle2,
  CircleDollarSign,
  LoaderCircle,
  Store,
  Upload,
  type LucideIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useI18n } from "@/lib/i18n";
import { createSourcingRequestId } from "@/lib/leads";
import { categories, platformOptions, pricingPlans, type PricingPlanValue } from "@/lib/site-data";
import { getReferenceImagePath, MAX_REFERENCE_IMAGE_SIZE } from "@/lib/sourcing-upload";

export function SourcingRequestForm({ initialServicePlan = "" }: { initialServicePlan?: PricingPlanValue | "" }) {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sellingPlatform, setSellingPlatform] = useState("");
  const [servicePlan, setServicePlan] = useState<string>(initialServicePlan);
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
      setSellingPlatform("");
      setServicePlan("");
      setSuccess(true);
    } catch (submitError) {
      console.error("Unable to submit sourcing request:", submitError);
      setError(t.form.submitError);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <Dialog open={success} onOpenChange={setSuccess}>
        <DialogContent className="bg-white p-6 text-center sm:max-w-md sm:p-8">
          <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
            <CheckCircle2 className="size-7" />
          </div>
          <DialogHeader className="items-center text-center">
            <DialogTitle className="text-xl font-semibold text-slate-950">{t.form.successTitle}</DialogTitle>
            <DialogDescription className="text-base leading-7 text-slate-600">{t.form.success}</DialogDescription>
          </DialogHeader>
          <Button type="button" onClick={() => setSuccess(false)} className="mt-2 w-full bg-[#f26f21] text-white hover:bg-[#d95e17]">
            OK
          </Button>
        </DialogContent>
      </Dialog>
      <form
        id="sourcing-request-form"
        onSubmit={handleSubmit}
        className="scroll-mt-24 rounded-lg border border-white/80 bg-white/78 p-5 shadow-xl shadow-slate-950/8 backdrop-blur-xl sm:p-8"
      >
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
        <EnhancedSelectField
          id="sellingPlatform"
          label={t.form.sellingPlatform}
          options={platformOptions.map((value) => ({ value, label: labelPlatform(value) }))}
          placeholder={t.form.selectOption}
          icon={Store}
          value={sellingPlatform}
          onValueChange={setSellingPlatform}
          required
        />
        <NativeSelectField
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
        <EnhancedSelectField
          id="servicePlan"
          label={t.form.servicePlan}
          options={pricingPlans.map((plan, index) => {
            const translatedPlan = t.pricingPlans[index] ?? plan;
            return {
              value: plan.value,
              label: translatedPlan.name,
              meta: translatedPlan.price,
            };
          })}
          placeholder={t.form.selectOption}
          icon={CircleDollarSign}
          value={servicePlan}
          onValueChange={setServicePlan}
          required
        />
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
    </>
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

function NativeSelectField({
  id,
  label,
  options,
  placeholder,
  value,
  onValueChange,
  required = false,
}: {
  id: string;
  label: string;
  options: { value: string; label: string }[];
  placeholder: string;
  value?: string;
  onValueChange?: (value: string) => void;
  required?: boolean;
}) {
  return (
    <div className="grid gap-2">
      <Label htmlFor={id}>{label}</Label>
      <select
        id={id}
        name={id}
        required={required}
        {...(value === undefined ? { defaultValue: "" } : { value })}
        onChange={onValueChange ? (event) => onValueChange(event.target.value) : undefined}
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

type EnhancedSelectOption = {
  value: string;
  label: string;
  meta?: string;
};

function EnhancedSelectField({
  id,
  label,
  options,
  placeholder,
  icon: Icon,
  value,
  onValueChange,
  required = false,
}: {
  id: string;
  label: string;
  options: EnhancedSelectOption[];
  placeholder: string;
  icon: LucideIcon;
  value: string;
  onValueChange: (value: string) => void;
  required?: boolean;
}) {
  const selectedOption = options.find((option) => option.value === value);

  return (
    <div className="grid gap-2">
      <Label htmlFor={id}>{label}</Label>
      <Select
        name={id}
        value={value || null}
        onValueChange={(nextValue) => onValueChange(nextValue ?? "")}
        required={required}
      >
        <SelectTrigger
          id={id}
          aria-required={required}
          className="h-10 w-full border-slate-200 bg-white px-3 text-slate-800 shadow-sm transition-[border-color,box-shadow,background-color] duration-200 hover:border-orange-200 hover:bg-orange-50/20 focus-visible:border-orange-300 focus-visible:ring-orange-200/60 data-popup-open:border-orange-300 data-popup-open:ring-3 data-popup-open:ring-orange-200/50"
        >
          <span className="flex min-w-0 flex-1 items-center gap-2.5">
            <span className="flex size-7 shrink-0 items-center justify-center rounded-md bg-orange-50 text-[#e7651b] ring-1 ring-orange-100">
              <Icon className="size-3.5" />
            </span>
            <span className={selectedOption ? "truncate font-medium" : "truncate text-slate-500"}>
              {selectedOption?.label ?? placeholder}
            </span>
            {selectedOption?.meta ? (
              <span className="ml-auto shrink-0 rounded-md bg-orange-50 px-2 py-0.5 text-xs font-semibold text-[#d95e17] ring-1 ring-orange-100">
                {selectedOption.meta}
              </span>
            ) : null}
          </span>
        </SelectTrigger>
        <SelectContent
          align="start"
          alignItemWithTrigger={false}
          sideOffset={7}
          className="max-h-80 rounded-xl border border-slate-200/80 bg-white/98 p-1.5 shadow-2xl shadow-slate-950/12 ring-1 ring-slate-950/5 backdrop-blur-xl"
        >
          {options.map((option) => (
            <SelectItem
              key={option.value}
              value={option.value}
              className="min-h-10 rounded-lg px-2.5 py-2 pr-9 text-slate-700 transition-colors duration-150 focus:bg-orange-50 focus:text-orange-950 data-selected:bg-orange-50/80 data-selected:text-orange-950"
            >
              <span className="flex min-w-0 flex-1 items-center justify-between gap-3">
                <span className="truncate font-medium">{option.label}</span>
                {option.meta ? (
                  <span className="shrink-0 rounded-md bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-600">
                    {option.meta}
                  </span>
                ) : null}
              </span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
