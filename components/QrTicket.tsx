"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { DotType } from "qr-code-styling";
import { PLATFORMS, getPlatform } from "@/lib/platforms";
import { platformIconSvg, platformIconDataUri } from "@/lib/icon-svg";

type ThemeId = "ink" | "signal" | "mint";

const THEMES: Record<ThemeId, { label: string; swatch: string; corner: string }> = {
  ink: { label: "Classic Ink", swatch: "#14171C", corner: "#14171C" },
  signal: { label: "Signal Orange", swatch: "#FF6B35", corner: "#FF6B35" },
  mint: { label: "Mint Stamp", swatch: "#0F9D74", corner: "#0F9D74" },
};

const DOT_STYLES: { id: DotType; label: string }[] = [
  { id: "extra-rounded", label: "Premium" },
  { id: "classy-rounded", label: "Classy" },
  { id: "dots", label: "Dotted" },
  { id: "square", label: "Classic" },
];

const QR_PIXEL_SIZE = 640;

export default function QrTicket() {
  const [platformId, setPlatformId] = useState("instagram");
  const [inputValue, setInputValue] = useState("");
  const [dotType, setDotType] = useState<DotType>("extra-rounded");
  const [themeId, setThemeId] = useState<ThemeId>("ink");
  const [embedLogo, setEmbedLogo] = useState(true);
  const [copied, setCopied] = useState(false);
  const [ready, setReady] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const qrRef = useRef<any>(null);

  const platform = useMemo(() => getPlatform(platformId), [platformId]);

  const isPreview = inputValue.trim().length === 0;
  const qrData = useMemo(() => {
    const source = isPreview ? platform.placeholder : inputValue;
    const value = platform.buildValue(source);
    return value || "https://freeqr.example/your-link";
  }, [platform, inputValue, isPreview]);

  // Create the QRCodeStyling instance once, on the client only.
  useEffect(() => {
    let cancelled = false;
    (async () => {
      const { default: QRCodeStyling } = await import("qr-code-styling");
      if (cancelled || !containerRef.current) return;
      qrRef.current = new QRCodeStyling({
        width: QR_PIXEL_SIZE,
        height: QR_PIXEL_SIZE,
        type: "canvas",
        margin: 18,
        qrOptions: { errorCorrectionLevel: "H" },
        dotsOptions: { type: "extra-rounded", color: "#14171C" },
        cornersSquareOptions: { type: "extra-rounded", color: "#14171C" },
        cornersDotOptions: { type: "dot", color: "#14171C" },
        backgroundOptions: { color: "#FBF8F1" },
      });
      containerRef.current.innerHTML = "";
      qrRef.current.append(containerRef.current);
      setReady(true);
    })();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Update the QR whenever content or styling changes.
  useEffect(() => {
    if (!qrRef.current || !ready) return;
    const theme = THEMES[themeId];
    const timer = setTimeout(() => {
      qrRef.current.update({
        data: qrData,
        qrOptions: { errorCorrectionLevel: embedLogo ? "H" : "M" },
        dotsOptions: { type: dotType, color: "#14171C" },
        cornersSquareOptions: { type: "extra-rounded", color: theme.corner },
        cornersDotOptions: { type: "dot", color: theme.corner },
        image: embedLogo ? platformIconDataUri(platform, 128) : undefined,
        imageOptions: {
          crossOrigin: "anonymous",
          margin: 10,
          imageSize: 0.36,
          hideBackgroundDots: true,
        },
      });
    }, 120);
    return () => clearTimeout(timer);
  }, [qrData, dotType, themeId, embedLogo, platform, ready]);

  const download = (extension: "png" | "svg") => {
    if (!qrRef.current) return;
    qrRef.current.download({ name: `${platform.id}-qr-code`, extension });
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(qrData);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard not available — silently ignore */
    }
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
      {/* Left: controls */}
      <div className="space-y-6">
        <div>
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-muted">
            01 — Choose a destination
          </p>
          <div className="grid grid-cols-5 gap-2 sm:grid-cols-6 md:grid-cols-8">
            {PLATFORMS.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => setPlatformId(p.id)}
                title={p.name}
                aria-pressed={p.id === platformId}
                className={`group flex flex-col items-center gap-1 rounded-xl border p-2 transition ${
                  p.id === platformId
                    ? "border-accent bg-accent/10"
                    : "border-line bg-surface hover:border-muted"
                }`}
              >
                <span
                  className="h-7 w-7 [&>svg]:h-7 [&>svg]:w-7"
                  dangerouslySetInnerHTML={{ __html: platformIconSvg(p, 28) }}
                />
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-muted">
            02 — {platform.name}
          </p>
          <label className="block">
            <span className="mb-1.5 block text-sm text-muted">{platform.helpText}</span>
            <div className="flex items-stretch overflow-hidden rounded-xl border border-line bg-surface focus-within:border-accent">
              <span className="hidden shrink-0 items-center border-r border-line bg-ink px-3 font-mono text-xs text-muted sm:flex">
                {platform.prefixLabel}
              </span>
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={platform.placeholder}
                className="w-full bg-transparent px-4 py-3 text-base text-paper outline-none placeholder:text-muted/60"
                autoComplete="off"
                spellCheck={false}
              />
            </div>
          </label>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-muted">
              03 — Dot style
            </p>
            <div className="flex flex-wrap gap-2">
              {DOT_STYLES.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setDotType(s.id)}
                  className={`rounded-full border px-3 py-1.5 text-sm transition ${
                    dotType === s.id
                      ? "border-accent bg-accent text-ink"
                      : "border-line text-paper hover:border-muted"
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-muted">
              04 — Accent color
            </p>
            <div className="flex flex-wrap gap-2">
              {(Object.keys(THEMES) as ThemeId[]).map((id) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setThemeId(id)}
                  title={THEMES[id].label}
                  aria-pressed={themeId === id}
                  className={`flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm transition ${
                    themeId === id ? "border-accent" : "border-line hover:border-muted"
                  }`}
                >
                  <span
                    className="h-3.5 w-3.5 rounded-full"
                    style={{ backgroundColor: THEMES[id].swatch }}
                  />
                  <span className="text-paper">{THEMES[id].label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <label className="flex items-center gap-3 text-sm text-paper">
          <input
            type="checkbox"
            checked={embedLogo}
            onChange={(e) => setEmbedLogo(e.target.checked)}
            className="h-4 w-4 accent-accent"
          />
          Embed the {platform.name} icon in the center
        </label>
      </div>

      {/* Right: the ticket */}
      <div className="lg:sticky lg:top-8">
        <div className="relative mx-auto max-w-sm rounded-[28px] bg-stub p-6 text-stub-ink shadow-[0_30px_60px_-25px_rgba(0,0,0,0.55)]">
          <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.18em] text-stub-ink/60">
            <span>Boarding: Scan</span>
            <span>{isPreview ? "Preview" : "Ready"}</span>
          </div>

          <div className="my-4 flex items-center gap-3">
            <span
              className="h-8 w-8 shrink-0 [&>svg]:h-8 [&>svg]:w-8"
              dangerouslySetInnerHTML={{ __html: platformIconSvg(platform, 32) }}
            />
            <div className="min-w-0">
              <p className="truncate font-display text-lg font-semibold leading-tight">
                {platform.name}
              </p>
              <p className="truncate font-mono text-[11px] text-stub-ink/60">
                {isPreview ? `${platform.prefixLabel}${platform.placeholder}` : qrData}
              </p>
            </div>
          </div>

          <div className="relative rounded-2xl bg-white p-3">
            <div ref={containerRef} className="mx-auto [&>canvas]:h-full [&>canvas]:w-full" />
          </div>

          <div
            className="my-4 h-px w-full"
            style={{
              backgroundImage:
                "repeating-linear-gradient(90deg, rgba(20,23,28,0.3) 0 6px, transparent 6px 12px)",
            }}
          />

          <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.18em] text-stub-ink/60">
            <span>No sign-up</span>
            <span>No tracking</span>
            <span>Free</span>
          </div>
        </div>

        <div className="mx-auto mt-6 flex max-w-sm flex-wrap justify-center gap-3">
          <button
            onClick={() => download("png")}
            className="rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-ink transition hover:brightness-110"
          >
            Download PNG
          </button>
          <button
            onClick={() => download("svg")}
            className="rounded-full border border-line px-5 py-2.5 text-sm font-semibold text-paper transition hover:border-muted"
          >
            Download SVG
          </button>
          <button
            onClick={copyLink}
            className="rounded-full border border-line px-5 py-2.5 text-sm font-semibold text-paper transition hover:border-muted"
          >
            {copied ? "Copied!" : "Copy link"}
          </button>
        </div>
      </div>
    </div>
  );
}
