"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { AlertCircle, LockKeyhole } from "lucide-react";

import { loginAdmin, type LoginState } from "@/app/admin/login/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PageHeader } from "@/components/section";
import { useI18n } from "@/lib/i18n";

const initialState: LoginState = { error: false };

export function AdminLoginHeader() {
  const { t } = useI18n();
  return <PageHeader eyebrow="SodaPost Admin" title={t.admin.loginTitle} description={t.admin.loginDescription} />;
}

export function AdminLoginForm() {
  const [state, action] = useActionState(loginAdmin, initialState);
  const { t } = useI18n();

  return (
    <form action={action} className="mx-auto max-w-md rounded-lg border border-slate-200 bg-white p-6 shadow-xl shadow-slate-950/8 sm:p-8">
      <div className="mb-6 flex size-11 items-center justify-center rounded-lg bg-orange-50 text-[#f26f21]">
        <LockKeyhole className="size-5" />
      </div>
      {state.error ? (
        <div className="mb-5 flex gap-3 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-900" role="alert">
          <AlertCircle className="mt-0.5 size-5 shrink-0" />
          <p>{t.admin.invalidLogin}</p>
        </div>
      ) : null}
      <div className="grid gap-2">
        <Label htmlFor="password">{t.admin.password}</Label>
        <Input id="password" name="password" type="password" autoComplete="current-password" required autoFocus />
      </div>
      <SubmitButton />
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  const { t } = useI18n();

  return (
    <Button type="submit" disabled={pending} className="mt-6 w-full bg-slate-950 text-white hover:bg-slate-800">
      {pending ? t.admin.signingIn : t.admin.signIn}
    </Button>
  );
}
