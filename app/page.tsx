import QrTicket from "@/components/QrTicket";
import FaqSection from "@/components/FaqSection";

export default function Home() {
  return (
    <main>
      {/* Nav */}
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <span className="font-display text-lg font-semibold tracking-tight text-paper">
          Free<span className="text-accent">QR</span>
        </span>
        <nav className="flex items-center gap-6 font-mono text-xs uppercase tracking-[0.15em] text-muted">
          <a href="#tool" className="transition hover:text-paper">
            Generator
          </a>
          <a href="#how" className="transition hover:text-paper">
            How it works
          </a>
          <a href="#faq" className="transition hover:text-paper">
            FAQ
          </a>
        </nav>
      </header>

      {/* Hero + tool */}
      <section id="tool" className="mx-auto max-w-6xl px-6 pb-10 pt-6">
        <div className="max-w-2xl">
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-accent">
            Free · No sign-up · No tracking · 2026 edition
          </p>
          <h1 className="font-display text-4xl font-semibold leading-[1.1] text-paper sm:text-5xl">
            A premium QR code for your social profile, ready in one scroll.
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">
            Pick a platform, drop in your username or link, and get a styled QR
            code with your platform&apos;s icon embedded in the middle — generated
            entirely in your browser. No account, no watermark, no expiring
            links, no analytics riding along.
          </p>
        </div>

        <div className="mt-12">
          <QrTicket />
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="mx-auto max-w-6xl px-6 py-20">
        <p className="mb-2 font-mono text-xs uppercase tracking-[0.2em] text-muted">
          How it works
        </p>
        <h2 className="mb-10 font-display text-3xl font-semibold text-paper">
          Three steps, zero forms
        </h2>
        <div className="grid gap-8 sm:grid-cols-3">
          {[
            {
              t: "Pick a destination",
              d: "Choose from 25 platforms — Instagram, WhatsApp, TikTok, LinkedIn, a plain website link, an email, or a phone number.",
            },
            {
              t: "Paste your handle or link",
              d: "Type just the username (we build the correct URL for you) or paste a full link directly.",
            },
            {
              t: "Download and print",
              d: "Export as PNG for screens or SVG for large-format printing. The code works immediately — no activation step.",
            },
          ].map((s, i) => (
            <div key={s.t} className="rounded-2xl border border-line bg-surface p-6">
              <span className="font-mono text-sm text-accent">0{i + 1}</span>
              <h3 className="mt-3 font-display text-xl font-semibold text-paper">{s.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why / comparison */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <p className="mb-2 font-mono text-xs uppercase tracking-[0.2em] text-muted">
          Why it&apos;s different
        </p>
        <h2 className="mb-10 font-display text-3xl font-semibold text-paper">
          Most &quot;free&quot; QR generators aren&apos;t
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-line bg-surface p-6">
            <h3 className="font-display text-lg font-semibold text-muted">The usual pattern</h3>
            <ul className="mt-4 space-y-3 text-sm leading-relaxed text-muted">
              <li>— Dynamic codes that quietly expire after 14 days</li>
              <li>— Scan analytics and location tracking baked into the link</li>
              <li>— Downloads locked behind a required account</li>
              <li>— A watermark or logo added to your exported file</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-accent/40 bg-accent/5 p-6">
            <h3 className="font-display text-lg font-semibold text-paper">This tool</h3>
            <ul className="mt-4 space-y-3 text-sm leading-relaxed text-paper">
              <li>— Static codes that never expire, ever</li>
              <li>— Nothing generated leaves your browser</li>
              <li>— Unlimited downloads, no account, no email</li>
              <li>— Clean export, your icon in the center — no branding added</li>
            </ul>
          </div>
        </div>
      </section>

      <FaqSection />

      <footer className="border-t border-line px-6 py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-xs text-muted sm:flex-row">
          <span>© {new Date().getFullYear()} FreeQR. Built for the open web.</span>
          <span className="font-mono uppercase tracking-[0.15em]">
            No sign-up · No tracking · No expiry
          </span>
        </div>
      </footer>
    </main>
  );
}
