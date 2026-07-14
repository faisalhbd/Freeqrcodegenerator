const FAQS: { q: string; a: string }[] = [
  {
    q: "Is this QR code generator really free, with no sign-up?",
    a: "Yes. There's no account, no email capture, no free-trial limit, and no watermark. The QR code is built in your browser and stays yours — download it as many times as you like, forever, at no cost.",
  },
  {
    q: "Does this tool track scans or collect my data?",
    a: "No. The QR code is generated entirely on your device using JavaScript in your browser — nothing is sent to a server, nothing is logged, and there's no scan-tracking pixel hidden in the link. If you type a direct URL (like your Instagram profile), the code simply points straight to that address.",
  },
  {
    q: "Do these QR codes expire?",
    a: "No. Because each code is a static QR code that encodes your link directly (rather than a redirect through someone else's server), it will keep working for as long as the destination page exists — there's no subscription to lapse and no dynamic-link service that can shut it off.",
  },
  {
    q: "Will scanning still work if I add my logo or change the dot style?",
    a: "Yes, as long as you keep the logo toggle on while customizing. Turning it on automatically raises the QR code's error correction to the strongest level (H), which reserves enough redundancy for scanners to read the code correctly even with an icon covering the center.",
  },
  {
    q: "What image formats can I download?",
    a: "You can export as PNG (ideal for websites, social posts, and screens) or SVG (a vector format that stays sharp at any size — best for printing on posters, packaging, or business cards).",
  },
  {
    q: "Which platforms are supported?",
    a: "Instagram, Facebook, X (Twitter), TikTok, YouTube, LinkedIn, WhatsApp, Telegram, Pinterest, Snapchat, Discord, Reddit, GitHub, Spotify, Twitch, Threads, Messenger, LINE, Behance, Dribbble, Medium, WeChat, plus generic website links, email addresses, and phone numbers — 25 destinations in total.",
  },
  {
    q: "Can I use these QR codes commercially, on packaging or in ads?",
    a: "Yes. There's no license fee and no attribution requirement. The code you generate is just a standard QR code containing your link — you're free to print it on flyers, packaging, storefronts, or ad creative.",
  },
];

export default function FaqSection() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <section id="faq" className="mx-auto max-w-3xl px-6 py-20">
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <p className="mb-2 font-mono text-xs uppercase tracking-[0.2em] text-muted">FAQ</p>
      <h2 className="mb-8 font-display text-3xl font-semibold text-paper">
        Questions people actually ask
      </h2>
      <div className="divide-y divide-line border-y border-line">
        {FAQS.map((f) => (
          <details key={f.q} className="group py-5">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-lg text-paper">
              {f.q}
              <span className="shrink-0 font-mono text-accent transition group-open:rotate-45">
                +
              </span>
            </summary>
            <p className="mt-3 text-sm leading-relaxed text-muted">{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
