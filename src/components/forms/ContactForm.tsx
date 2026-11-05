"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocale, useTranslations } from "next-intl";
import {
  contactSchema,
  contactServiceOptions,
  preferredContactOptions,
  type ContactPayload,
} from "@/lib/validation/contactSchema";
import type { Locale } from "@/i18n/routing";

type FormState =
  | { status: "idle" }
  | { status: "sending" }
  | { status: "success"; mode: "live" | "demo" }
  | { status: "error"; message: string };

export function ContactForm() {
  const t = useTranslations("contact");
  const locale = useLocale() as Locale;
  const [state, setState] = useState<FormState>({ status: "idle" });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactPayload>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      company: "",
      email: "",
      phone: "",
      country: "",
      sector: "",
      service: "intelligent-websites",
      message: "",
      preferredContact: "email",
      website: "",
      locale,
      consent: false as unknown as true,
    },
  });

  async function onSubmit(values: ContactPayload) {
    setState({ status: "sending" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, locale }),
      });
      if (!res.ok) throw new Error("http_" + res.status);
      const data = (await res.json()) as { ok: true; mode: "live" | "demo" };
      setState({ status: "success", mode: data.mode });
      reset();
    } catch {
      setState({ status: "error", message: t("errorGeneric") });
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
            {t("demoWarning")}
          </p>
        )}
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="fx-card space-y-4"
      noValidate
    >
      <input type="hidden" {...register("locale")} value={locale} />
      <div
        aria-hidden
        className="absolute left-[-9999px] top-[-9999px] h-0 w-0 overflow-hidden"
      >
        <label htmlFor="website">{t("fields.website")}</label>
        <input
          id="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register("website")}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label={t("fields.name")} required error={errors.name?.message}>
          <input
            type="text"
            autoComplete="name"
            className={inputClass}
            {...register("name")}
          />
        </Field>
        <Field label={t("fields.company")} error={errors.company?.message}>
          <input
            type="text"
            autoComplete="organization"
            className={inputClass}
            {...register("company")}
          />
        </Field>
        <Field label={t("fields.email")} required error={errors.email?.message}>
          <input
            type="email"
            autoComplete="email"
            className={inputClass}
            {...register("email")}
          />
        </Field>
        <Field label={t("fields.phone")} error={errors.phone?.message}>
          <input
            type="tel"
            autoComplete="tel"
            className={inputClass}
            {...register("phone")}
          />
        </Field>
        <Field label={t("fields.country")} error={errors.country?.message}>
          <input
            type="text"
            autoComplete="country-name"
            className={inputClass}
            {...register("country")}
          />
        </Field>
        <Field label={t("fields.sector")} error={errors.sector?.message}>
          <input type="text" className={inputClass} {...register("sector")} />
        </Field>
        <Field
          label={t("fields.service")}
          required
          error={errors.service?.message}
        >
          <select className={inputClass} {...register("service")}>
            {contactServiceOptions.map((s) => (
              <option key={s} value={s}>
                {t(`services.${s}`)}
              </option>
            ))}
          </select>
        </Field>
        <Field
          label={t("fields.preferredContact")}
          error={errors.preferredContact?.message}
        >
          <select className={inputClass} {...register("preferredContact")}>
            {preferredContactOptions.map((s) => (
              <option key={s} value={s}>
                {t(`preferredContactOptions.${s}`)}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field label={t("fields.message")} required error={errors.message?.message}>
        <textarea rows={5} className={inputClass} {...register("message")} />
      </Field>

      <label className="flex items-start gap-3 text-sm text-ink">
        <input type="checkbox" className="mt-1" {...register("consent")} />
        <span>
          {t("fields.consent")}{" "}
          {errors.consent?.message && (
            <span className="text-red-600">*</span>
          )}
        </span>
      </label>

      <button
        type="submit"
        disabled={isSubmitting || state.status === "sending"}
        className="fx-btn-primary w-full sm:w-auto"
      >
        {isSubmitting || state.status === "sending" ? t("submit") + "…" : t("submit")}
      </button>

      {state.status === "error" && (
        <p role="alert" className="text-sm text-red-700">
          {state.message}
        </p>
      )}
    </form>
  );
}

const inputClass =
  "w-full rounded-lg border border-line bg-white px-3 py-2 text-ink shadow-sm focus:border-petrol";

function Field({
  label,
  required,
  error,
  children,
}: {
  label: string;
  required?: boolean | undefined;
  error?: string | undefined;
  children: React.ReactNode;
}) {
  return (
    <label className="block text-sm">
      <span className="mb-1 inline-block font-medium text-night">
        {label}
        {required && <span className="ml-0.5 text-red-600">*</span>}
      </span>
      {children}
      {error && <span className="mt-1 block text-xs text-red-700">{error}</span>}
    </label>
  );
}
