"use client";

import { AnimatePresence, m } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Axe,
  CircleCheck,
  FlaskConical,
  Hammer,
  ImagePlus,
  Layers,
  LayoutGrid,
  Droplets,
  Phone,
  Route,
  Shovel,
  Spline,
  Trees,
  Truck,
  Waves,
  X,
} from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import { business, estimateServices, type EstimateService } from "@/lib/site";
import { submitEstimate } from "@/lib/submit";
import { StakeLabel } from "@/components/ui/StakeLabel";
import type { EstimatePrefill } from "./EstimateContext";

const ICONS: Record<EstimateService, typeof Trees> = {
  "Land Clearing": Trees,
  Grading: Layers,
  Drainage: Droplets,
  "Driveway / Millings": Route,
  "Excavation / Footings": Shovel,
  Demolition: Hammer,
  "Pool Removal": Waves,
  "Pad for Shed / Pool": LayoutGrid,
  Trenching: Spline,
  "Stump Grinding": Axe,
  "Perc Test": FlaskConical,
  "Material Delivery": Truck,
};

const SIZES = ["Small yard", "Large yard", "~1 acre", "Multiple acres"];
const ACCESS = ["Yes", "Tight access", "Not sure"];
const TIMING = ["ASAP", "Within a month", "1 to 3 months", "Just planning"];
const CONTACT = ["Call", "Text", "Email"];

const STEPS = ["What do you need?", "About the property", "Timing", "Your info"];

type Photo = { name: string; url: string };

type Props = {
  prefill?: EstimatePrefill;
  titleId: string;
  onDone?: () => void;
  /** "modal" sits in the dialog; "inline" sits on the /contact page. */
  variant?: "modal" | "inline";
};

type Errors = Partial<Record<string, string>>;

const fieldBase =
  "w-full rounded-[var(--radius)] border bg-asphalt px-4 py-3 text-base text-limestone placeholder:text-limestone/40 transition-colors focus:border-green focus:outline-none";

export function EstimateForm({ prefill, titleId, onDone, variant = "modal" }: Props) {
  const uid = useId();
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [photos, setPhotos] = useState<Photo[]>([]);
  const photosRef = useRef<Photo[]>([]);
  const bodyRef = useRef<HTMLDivElement>(null);

  const [data, setData] = useState({
    services: (prefill?.services ?? []) as string[],
    street: "",
    town: "",
    size: "",
    access: "",
    timing: "",
    notes: prefill?.notes ?? "",
    name: "",
    phone: "",
    email: "",
    contact: "Call",
  });

  useEffect(() => {
    photosRef.current = photos;
  }, [photos]);
  useEffect(() => () => photosRef.current.forEach((p) => URL.revokeObjectURL(p.url)), []);

  const set = (k: keyof typeof data, v: string | string[]) => {
    setData((d) => ({ ...d, [k]: v }));
    setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const toggleService = (s: string) =>
    set("services", data.services.includes(s) ? data.services.filter((x) => x !== s) : [...data.services, s]);

  function validate(i: number): Errors {
    const e: Errors = {};
    if (i === 0 && data.services.length === 0) e.services = "Pick at least one so James knows what to look at.";
    if (i === 1) {
      if (!data.town.trim()) e.town = "Which town is the job in?";
      if (!data.size) e.size = "A rough size is fine.";
      if (!data.access) e.access = "Let us know, even if you're not sure.";
    }
    if (i === 2 && !data.timing) e.timing = "When are you hoping to start?";
    if (i === 3) {
      if (!data.name.trim()) e.name = "What should James call you?";
      if (data.phone.replace(/\D/g, "").length < 10) e.phone = "Please enter a 10-digit phone number.";
      if (data.email && !/^\S+@\S+\.\S+$/.test(data.email)) e.email = "That email doesn't look right.";
      if (data.contact === "Email" && !data.email) e.email = "Add an email, or pick Call or Text.";
    }
    return e;
  }

  function focusFirstError() {
    window.setTimeout(() => {
      bodyRef.current?.querySelector<HTMLElement>("[aria-invalid='true']")?.focus();
    }, 20);
  }

  function next() {
    const e = validate(step);
    setErrors(e);
    if (Object.keys(e).length) return focusFirstError();
    setDir(1);
    setStep((s) => s + 1);
  }

  function back() {
    setDir(-1);
    setErrors({});
    setStep((s) => Math.max(0, s - 1));
  }

  async function submit(ev: React.FormEvent) {
    ev.preventDefault();
    if (step < 3) return next();
    const e = validate(3);
    setErrors(e);
    if (Object.keys(e).length) return focusFirstError();
    setSending(true);
    await submitEstimate({ ...data, photoNames: photos.map((p) => p.name) });
    setSending(false);
    setDone(true);
  }

  function addPhotos(files: FileList | null) {
    if (!files) return;
    const next = Array.from(files)
      .filter((f) => f.type.startsWith("image/"))
      .slice(0, 6 - photos.length)
      .map((f) => ({ name: f.name, url: URL.createObjectURL(f) }));
    setPhotos((p) => [...p, ...next]);
  }

  function removePhoto(i: number) {
    setPhotos((p) => {
      URL.revokeObjectURL(p[i].url);
      return p.filter((_, j) => j !== i);
    });
  }

  const pad = variant === "modal" ? "px-5 pt-6 pb-5 sm:px-8 sm:pt-8" : "p-5 sm:p-8";

  if (done) {
    return (
      <div className={`${pad} pb-8 text-center`} role="status" aria-live="polite">
        <CircleCheck className="mx-auto size-14 text-green" aria-hidden="true" />
        <h2 id={titleId} className="font-display mt-5 text-3xl sm:text-4xl">
          Got it.
        </h2>
        <p className="mx-auto mt-3 max-w-sm text-lg text-limestone/80">{business.ownerFirst} will reach out shortly.</p>
        <a
          href={business.phoneHref}
          className="mt-8 inline-flex h-14 w-full max-w-xs items-center justify-center gap-3 rounded-[var(--radius)] bg-green text-lg font-semibold text-asphalt transition hover:bg-[#4fb233]"
        >
          <Phone className="size-5" aria-hidden="true" />
          Call now: {business.phoneDisplay}
        </a>
        {onDone ? (
          <button type="button" onClick={onDone} className="mt-4 block w-full text-sm text-limestone/70 underline-offset-4 hover:underline">
            Close
          </button>
        ) : null}
      </div>
    );
  }

  const err = (k: string) =>
    errors[k] ? (
      <p id={`${uid}-${k}-err`} className="mt-2 text-sm text-[#f0b8a8]">
        {errors[k]}
      </p>
    ) : null;
  const aria = (k: string) =>
    errors[k] ? { "aria-invalid": true as const, "aria-describedby": `${uid}-${k}-err` } : { "aria-invalid": false as const };
  const border = (k: string) => (errors[k] ? "border-[#c96b55]" : "border-line-dark");

  return (
    <form onSubmit={submit} noValidate className="flex flex-col">
      <div className={pad}>
        <StakeLabel num={`0${step + 1}`}>Free estimate · Step {step + 1} of 4</StakeLabel>
        <h2 id={titleId} className="font-display mt-4 pr-10 text-2xl sm:text-3xl">
          {STEPS[step]}
        </h2>
        <div
          className="mt-5 h-1 w-full overflow-hidden rounded-full bg-white/10"
          role="progressbar"
          aria-label="Form progress"
          aria-valuemin={1}
          aria-valuemax={4}
          aria-valuenow={step + 1}
        >
          <div className="h-full bg-green transition-[width] duration-500 ease-out" style={{ width: `${((step + 1) / 4) * 100}%` }} />
        </div>
      </div>

      <div ref={bodyRef} className="relative overflow-hidden">
        <AnimatePresence mode="wait" custom={dir} initial={false}>
          <m.div
            key={step}
            custom={dir}
            initial={{ x: dir * 40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: dir * -40, opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className={`${variant === "modal" ? "px-5 sm:px-8" : "px-5 sm:px-8"} pb-2`}
          >
            {step === 0 ? (
              <fieldset>
                <legend className="text-sm text-limestone/70">Tap all that apply.</legend>
                <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3" {...(errors.services ? { "aria-describedby": `${uid}-services-err` } : {})}>
                  {estimateServices.map((s, i) => {
                    const Icon = ICONS[s];
                    const on = data.services.includes(s);
                    return (
                      <button
                        key={s}
                        type="button"
                        aria-pressed={on}
                        data-autofocus={i === 0 ? true : undefined}
                        {...(errors.services && i === 0 ? { "aria-invalid": true } : {})}
                        onClick={() => toggleService(s)}
                        className={`flex min-h-[72px] flex-col items-start justify-between gap-2 rounded-[var(--radius)] border p-3 text-left text-sm font-medium transition-colors ${
                          on ? "border-green bg-green/10 text-limestone" : "border-line-dark bg-asphalt text-limestone/85 hover:border-limestone/30"
                        }`}
                      >
                        <Icon className={`size-5 ${on ? "text-green" : "text-limestone/60"}`} aria-hidden="true" />
                        <span>{s}</span>
                      </button>
                    );
                  })}
                </div>
                {err("services")}
              </fieldset>
            ) : null}

            {step === 1 ? (
              <div className="grid gap-5">
                <div className="grid gap-4 sm:grid-cols-[1.4fr_1fr]">
                  <label className="block">
                    <span className="mb-2 block text-sm font-medium">Street address</span>
                    <input
                      data-autofocus
                      className={`${fieldBase} border-line-dark`}
                      autoComplete="street-address"
                      value={data.street}
                      onChange={(e) => set("street", e.target.value)}
                      placeholder="Optional"
                    />
                  </label>
                  <label className="block">
                    <span className="mb-2 block text-sm font-medium">Town</span>
                    <input
                      className={`${fieldBase} ${border("town")}`}
                      autoComplete="address-level2"
                      value={data.town}
                      onChange={(e) => set("town", e.target.value)}
                      placeholder="Mechanicsville"
                      {...aria("town")}
                    />
                    {err("town")}
                  </label>
                </div>
                <ChoiceGroup label="Rough size" options={SIZES} value={data.size} onChange={(v) => set("size", v)} error={err("size")} invalid={!!errors.size} />
                <ChoiceGroup
                  label="Is the site easy to get a truck to?"
                  options={ACCESS}
                  value={data.access}
                  onChange={(v) => set("access", v)}
                  error={err("access")}
                  invalid={!!errors.access}
                />
              </div>
            ) : null}

            {step === 2 ? (
              <div className="grid gap-5">
                <ChoiceGroup
                  label="When do you want it done?"
                  options={TIMING}
                  value={data.timing}
                  onChange={(v) => set("timing", v)}
                  error={err("timing")}
                  invalid={!!errors.timing}
                  autofocus
                />
                <div>
                  <span className="mb-2 block text-sm font-medium">Photos of the site (optional)</span>
                  <div className="flex flex-wrap gap-2">
                    {photos.map((ph, i) => (
                      <div key={ph.url} className="relative size-20 overflow-hidden rounded-[var(--radius)] border border-line-dark">
                        {/* eslint-disable-next-line @next/next/no-img-element -- local blob preview */}
                        <img src={ph.url} alt={`Preview of ${ph.name}`} className="size-full object-cover" />
                        <button
                          type="button"
                          onClick={() => removePhoto(i)}
                          className="absolute top-1 right-1 grid size-6 place-items-center rounded-full bg-asphalt/85 text-limestone"
                          aria-label={`Remove ${ph.name}`}
                        >
                          <X className="size-3.5" aria-hidden="true" />
                        </button>
                      </div>
                    ))}
                    {photos.length < 6 ? (
                      <label className="grid size-20 cursor-pointer place-items-center rounded-[var(--radius)] border border-dashed border-limestone/30 text-limestone/70 transition-colors focus-within:border-green hover:border-green hover:text-limestone">
                        <ImagePlus className="size-6" aria-hidden="true" />
                        <span className="sr-only">Add photos</span>
                        <input
                          type="file"
                          accept="image/*"
                          multiple
                          className="sr-only"
                          onChange={(e) => {
                            addPhotos(e.target.files);
                            e.target.value = "";
                          }}
                        />
                      </label>
                    ) : null}
                  </div>
                </div>
                <label className="block">
                  <span className="mb-2 block text-sm font-medium">Anything James should know?</span>
                  <textarea
                    rows={3}
                    className={`${fieldBase} border-line-dark resize-y`}
                    value={data.notes}
                    onChange={(e) => set("notes", e.target.value)}
                    placeholder="Water sits by the garage. Old stumps in the back."
                  />
                </label>
              </div>
            ) : null}

            {step === 3 ? (
              <div className="grid gap-5">
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block">
                    <span className="mb-2 block text-sm font-medium">Name</span>
                    <input
                      data-autofocus
                      className={`${fieldBase} ${border("name")}`}
                      autoComplete="name"
                      value={data.name}
                      onChange={(e) => set("name", e.target.value)}
                      {...aria("name")}
                    />
                    {err("name")}
                  </label>
                  <label className="block">
                    <span className="mb-2 block text-sm font-medium">Phone</span>
                    <input
                      type="tel"
                      inputMode="tel"
                      className={`${fieldBase} ${border("phone")}`}
                      autoComplete="tel"
                      value={data.phone}
                      onChange={(e) => set("phone", e.target.value)}
                      placeholder="(240) 555-0123"
                      {...aria("phone")}
                    />
                    {err("phone")}
                  </label>
                </div>
                <label className="block">
                  <span className="mb-2 block text-sm font-medium">
                    Email <span className="font-normal text-limestone/60">(optional)</span>
                  </span>
                  <input
                    type="email"
                    className={`${fieldBase} ${border("email")}`}
                    autoComplete="email"
                    value={data.email}
                    onChange={(e) => set("email", e.target.value)}
                    {...aria("email")}
                  />
                  {err("email")}
                </label>
                <ChoiceGroup label="Best way to reach you" options={CONTACT} value={data.contact} onChange={(v) => set("contact", v)} />
              </div>
            ) : null}
          </m.div>
        </AnimatePresence>
      </div>

      <div className={`mt-4 flex items-center gap-3 border-t border-line-dark ${variant === "modal" ? "px-5 py-4 sm:px-8" : "px-5 py-5 sm:px-8"}`}>
        {step > 0 ? (
          <button
            type="button"
            onClick={back}
            className="inline-flex h-12 items-center gap-2 rounded-[var(--radius)] px-4 text-limestone/80 transition hover:bg-white/5 hover:text-limestone"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            Back
          </button>
        ) : (
          <a href={business.phoneHref} className="text-sm text-limestone/70 underline-offset-4 hover:text-limestone hover:underline">
            Rather call? {business.phoneDisplay}
          </a>
        )}
        <button
          type="submit"
          disabled={sending}
          className="ml-auto inline-flex h-12 items-center gap-2 rounded-[var(--radius)] bg-green px-6 font-semibold text-asphalt transition hover:bg-[#4fb233] disabled:opacity-60"
        >
          {step < 3 ? (
            <>
              Next <ArrowRight className="size-4" aria-hidden="true" />
            </>
          ) : sending ? (
            "Sending…"
          ) : (
            "Send my request"
          )}
        </button>
      </div>
    </form>
  );
}

function ChoiceGroup({
  label,
  options,
  value,
  onChange,
  error,
  invalid,
  autofocus,
}: {
  label: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
  error?: React.ReactNode;
  invalid?: boolean;
  autofocus?: boolean;
}) {
  const name = useId();
  return (
    <fieldset>
      <legend className="mb-2 text-sm font-medium">{label}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((o, i) => {
          const on = value === o;
          return (
            <label
              key={o}
              className={`relative inline-flex h-11 cursor-pointer items-center rounded-[var(--radius)] border px-4 text-sm font-medium transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-green ${
                on ? "border-green bg-green/10 text-limestone" : invalid ? "border-[#c96b55] text-limestone/85" : "border-line-dark text-limestone/85 hover:border-limestone/30"
              }`}
            >
              <input
                type="radio"
                name={name}
                value={o}
                checked={on}
                onChange={() => onChange(o)}
                className="sr-only"
                data-autofocus={autofocus && i === 0 ? true : undefined}
                aria-invalid={invalid && i === 0 ? true : undefined}
              />
              {o}
            </label>
          );
        })}
      </div>
      {error}
    </fieldset>
  );
}
