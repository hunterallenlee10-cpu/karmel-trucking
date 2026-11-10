"use client";

import { ArrowUpRight, CircleCheck, Mail, Phone } from "lucide-react";
import { useId, useState } from "react";
import { business } from "@/lib/site";
import { submitQuestion } from "@/lib/submit";
import { FacebookIcon } from "@/components/ui/FacebookIcon";
import { StakeLabel } from "@/components/ui/StakeLabel";

export function ContactBlock() {
  const uid = useId();
  const [form, setForm] = useState({ name: "", phone: "", question: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [state, setState] = useState<"idle" | "sending" | "done">("idle");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = "Add your name.";
    if (form.phone.replace(/\D/g, "").length < 10) errs.phone = "Add a 10-digit phone number.";
    if (!form.question.trim()) errs.question = "What would you like to ask?";
    setErrors(errs);
    if (Object.keys(errs).length) {
      document.getElementById(`${uid}-${Object.keys(errs)[0]}`)?.focus();
      return;
    }
    setState("sending");
    await submitQuestion(form);
    setState("done");
  }

  const field =
    "w-full rounded-[var(--radius)] border bg-white/60 px-4 py-3 text-base text-asphalt placeholder:text-muted-light focus:border-green-ink focus:outline-none";

  const rows = [
    { icon: Phone, label: "Call or text", value: business.phoneDisplay, href: business.phoneHref, tnum: true },
    { icon: Mail, label: "Email", value: business.email, href: `mailto:${business.email}` },
    { icon: FacebookIcon, label: "Facebook", value: "Karmel Trucking & Excavating", href: business.facebook, external: true },
  ];

  return (
    <section id="contact" aria-labelledby="contact-title" className="bg-limestone py-20 text-asphalt sm:py-28">
      <div className="wrap grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <StakeLabel num="09" tone="light">
            Contact
          </StakeLabel>
          <h2 id="contact-title" className="font-display mt-5 text-[clamp(2.2rem,5vw,3.75rem)]">
            Still have questions?
          </h2>
          <ul className="mt-10 border-t border-line-light">
            {rows.map((r) => (
              <li key={r.label} className="border-b border-line-light">
                <a
                  href={r.href}
                  {...(r.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="group flex items-center gap-4 py-5"
                >
                  <span className="grid size-11 shrink-0 place-items-center rounded-full bg-asphalt text-green">
                    <r.icon className="size-5" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="stake block text-[0.68rem] text-muted-light">{r.label}</span>
                    <span className={`mt-1 block truncate text-lg font-semibold ${r.tnum ? "tnum" : ""}`}>{r.value}</span>
                  </span>
                  <ArrowUpRight className="size-5 text-muted-light transition group-hover:text-asphalt" aria-hidden="true" />
                  {r.external ? <span className="sr-only">(opens in a new tab)</span> : null}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-7">
          <div className="rounded-[var(--radius)] bg-card-light p-6 sm:p-8">
            {state === "done" ? (
              <div className="py-8 text-center" role="status">
                <CircleCheck className="mx-auto size-12 text-green-ink" aria-hidden="true" />
                <p className="font-display mt-4 text-3xl">Got it.</p>
                <p className="mt-2 text-muted-light">{business.ownerFirst} will reach out shortly.</p>
                <a
                  href={business.phoneHref}
                  className="mt-6 inline-flex h-12 items-center gap-2 rounded-[var(--radius)] bg-asphalt px-6 font-semibold text-limestone"
                >
                  <Phone className="size-4" aria-hidden="true" /> Call now
                </a>
              </div>
            ) : (
              <form onSubmit={submit} noValidate className="grid gap-5">
                <p className="text-lg font-semibold">Ask a quick question. {business.ownerFirst} will get back to you.</p>
                <div className="grid gap-5 sm:grid-cols-2">
                  {(["name", "phone"] as const).map((k) => (
                    <label key={k} className="block">
                      <span className="mb-2 block text-sm font-medium">{k === "name" ? "Name" : "Phone"}</span>
                      <input
                        id={`${uid}-${k}`}
                        type={k === "phone" ? "tel" : "text"}
                        autoComplete={k === "phone" ? "tel" : "name"}
                        className={`${field} ${errors[k] ? "border-[#b4533c]" : "border-line-light"}`}
                        value={form[k]}
                        onChange={(e) => setForm((f) => ({ ...f, [k]: e.target.value }))}
                        aria-invalid={!!errors[k]}
                        aria-describedby={errors[k] ? `${uid}-${k}-err` : undefined}
                      />
                      {errors[k] ? (
                        <span id={`${uid}-${k}-err`} className="mt-2 block text-sm text-[#9a3a24]">
                          {errors[k]}
                        </span>
                      ) : null}
                    </label>
                  ))}
                </div>
                <label className="block">
                  <span className="mb-2 block text-sm font-medium">Your question</span>
                  <textarea
                    id={`${uid}-question`}
                    rows={4}
                    className={`${field} resize-y ${errors.question ? "border-[#b4533c]" : "border-line-light"}`}
                    value={form.question}
                    onChange={(e) => setForm((f) => ({ ...f, question: e.target.value }))}
                    aria-invalid={!!errors.question}
                    aria-describedby={errors.question ? `${uid}-question-err` : undefined}
                  />
                  {errors.question ? (
                    <span id={`${uid}-question-err`} className="mt-2 block text-sm text-[#9a3a24]">
                      {errors.question}
                    </span>
                  ) : null}
                </label>
                <button
                  type="submit"
                  disabled={state === "sending"}
                  className="h-12 justify-self-start rounded-[var(--radius)] bg-asphalt px-6 font-semibold text-limestone transition hover:bg-black disabled:opacity-60"
                >
                  {state === "sending" ? "Sending…" : "Send question"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
