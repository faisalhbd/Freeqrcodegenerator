import { BRAND_ICONS } from "./brand-icons";
import { CUSTOM_ICONS } from "./custom-icons";
import type { Platform } from "./platforms";

/**
 * Builds a self-contained SVG string: a solid circle in the platform's
 * brand color with the icon glyph centered in white on top.
 */
export function platformIconSvg(platform: Platform, size = 64): string {
  let hex = "#111827";
  let inner = "";

  if (platform.iconSource === "brand") {
    const icon = BRAND_ICONS[platform.iconKey];
    if (icon) {
      hex = icon.hex;
      inner = `<g transform="translate(4.6 4.6) scale(0.617)"><path d="${icon.path}" fill="#ffffff"/></g>`;
    }
  } else {
    const icon = CUSTOM_ICONS[platform.iconKey];
    if (icon) {
      hex = icon.hex;
      inner = icon.raw;
    }
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="${size}" height="${size}"><circle cx="12" cy="12" r="12" fill="${hex}"/>${inner}</svg>`;
}

export function platformIconDataUri(platform: Platform, size = 64): string {
  const svg = platformIconSvg(platform, size);
  const encoded = typeof window === "undefined"
    ? Buffer.from(svg, "utf-8").toString("base64")
    : window.btoa(unescape(encodeURIComponent(svg)));
  return `data:image/svg+xml;base64,${encoded}`;
}
