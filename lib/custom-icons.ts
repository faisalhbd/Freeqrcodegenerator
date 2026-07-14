// Hand-built generic icons for entries that aren't sourced from simple-icons.
// These are simple geometric glyphs (not reproductions of any brand's official mark).
export type CustomIcon = { title: string; hex: string; raw: string };

export const CUSTOM_ICONS: Record<string, CustomIcon> = {
  website: {
    title: "Website / Custom URL",
    hex: "#4B5563",
    raw:
      '<circle cx="12" cy="12" r="9" fill="none" stroke="white" stroke-width="1.4"/>' +
      '<path d="M3 12h18M12 3c2.4 2.5 3.7 5.7 3.7 9s-1.3 6.5-3.7 9c-2.4-2.5-3.7-5.7-3.7-9s1.3-6.5 3.7-9z" fill="none" stroke="white" stroke-width="1.2"/>',
  },
  phone: {
    title: "Phone Number",
    hex: "#059669",
    raw:
      '<circle cx="7.2" cy="7.2" r="2.4" fill="white"/>' +
      '<circle cx="16.8" cy="16.8" r="2.4" fill="white"/>' +
      '<rect x="9.3" y="9.3" width="5.4" height="5.4" rx="2.4" fill="white" transform="rotate(45 12 12)"/>',
  },
  email: {
    title: "Email Address",
    hex: "#DC2626",
    raw:
      '<rect x="3" y="5" width="18" height="14" rx="2.2" fill="white"/>' +
      '<path d="M3.5 6.5l8.5 6 8.5-6" fill="none" stroke="#DC2626" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>',
  },
  linkedin: {
    title: "LinkedIn",
    hex: "#0A66C2",
    raw:
      '<circle cx="7.6" cy="7.2" r="1.5" fill="white"/>' +
      '<rect x="6.3" y="9.8" width="2.6" height="8.4" rx="1" fill="white"/>' +
      '<rect x="11.2" y="9.8" width="2.6" height="8.4" rx="1" fill="white"/>' +
      '<rect x="11.2" y="9.8" width="8.4" height="2.7" rx="1.35" fill="white"/>' +
      '<rect x="17" y="12" width="2.6" height="6.2" rx="1" fill="white"/>',
  },
};
