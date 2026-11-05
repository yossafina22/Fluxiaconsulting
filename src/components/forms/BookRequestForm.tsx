"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocale, useTranslations } from "next-intl";
import { bookSchema, type BookPayload } from "@/lib/validation/bookSchema";
import type { Locale } from "@/i18n/routing";

type S =
  | { status: "idle" }
  | { status: "sending" }
  | { status: "success"; mode: "live" | "demo" }
  | { status: "error" };

export function BookRequestForm() {
  const t = useTranslations("book");
  const contact = useTranslations("contact");
  const locale = useLocale() as Locale;
  const [state, setState] = useState<S>({ status: "idle" });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<BookPayload>({
    resolver: zodResolver(bookSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      preferredDate: "",
      topic: "",
      website: "",
      locale,
      consent: false as unknown as true,
    },
  });

  async function onSubmit(values: BookPayload) {
    setState({ status: "sending" });
    try {
      const res = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, locale }),
      });
      if (!res.ok) throw new Error();
      const data = (await res.json()) as { ok: true; mode: "live" | "demo" };
      setState({ status: "success", mode: data.mode });
      reset();
    } catch {
      setState({ status: "error" });
    }
  }

  if (state.status === "success") {
    return (
      <div
        role="status"
        className="rounded-card border border-petrol/30 bg-pale p-6 text-ink"
      >
        <p className="font-semibold text-night">{t("success")}</p>
        {state.mode === "demo" && (
          <p className="mt-2 rounded-md border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900">
            {contact("demoWarning")}
          </p>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="fx-card space-y-4" noValidate>
      <input type="hidden" {...register("locale")} value={locale} />
      <div
        aria-hidden
        className="absolute left-[-9999px] top-[-9999px] h-0 w-0 overflow-hidden"
      >
        <input tabIndex={-1} autoComplete="off" {...register("website")} />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <L label={t("fields.name")} err={errors.name?.message}>
          <input className={cls} autoComplete="name" {...register("name")} />
        </L>
        <L label={t("fields.email")} err={errors.email?.message}>
          <input className={cls} type="email" autoComplete="email" {...register("email")} />
        </L>
        <L label={t("fields.phone")} err={errors.phone?.message}>
          <input className={cls} type="tel" autoComplete="tel" {...register("phone")} />
        </L>
        <L label={t("fields.preferredDate")} err={errors.preferredDate?.message}>
          <input className={cls} {...register("preferredDate")} />
        </L>
      </div>
      <L label={t("fields.topic")} err={errors.topic?.message}>
        <textarea rows={4} className={cls} {...register("topic")} />
      </L>
      <label className="flex items-start gap-3 text-sm text-ink">
        <input type="checkbox" className="mt-1" {...register("consent")} />
        <span>{t("fields.consent")}</span>
      </label>
      <button
        type="submit"
        disabled={isSubmitting || state.status === "sending"}
        className="fx-btn-primary w-full sm:w-auto"
      >
        {state.status === "sending" ? t("submit") + "…" : t("submit")}
      </button>
      {state.status === "error" && (
        <p role="alert" className="text-sm text-red-700">
          {contact("errorGeneric")}
        </p>
      )}
    </form>
  );
}

const cls =
  "w-full rounded-lg border border-line bg-white px-3 py-2 text-ink shadow-sm focus:border-petrol";

function L({
  label,
  err,
  children,
}: {
  label: string;
  err?: string | undefined;
  children: React.ReactNode;
}) {
  return (
    <label className="block text-sm">
      <span className="mb-1 inline-block font-medium text-night">{label}</span>
      {children}
      {err && <span className="mt-1 block text-xs text-red-700">{err}</span>}
    </label>
  );
}
