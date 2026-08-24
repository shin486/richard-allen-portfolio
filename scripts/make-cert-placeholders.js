/**
 * Generates clean certificate placeholder SVGs (real title + issuer text).
 * Replace files in public/certificates with real certificate scans anytime.
 * Run: node scripts/make-cert-placeholders.js
 */
const fs = require("fs");
const path = require("path");

const dir = path.join(__dirname, "..", "public", "certificates");
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

const certs = [
  { file: "python-essentials-1.svg", title: "Python Essentials 1", issuer: "Cisco Networking Academy" },
  { file: "python-essentials-2.svg", title: "Python Essentials 2", issuer: "Cisco Networking Academy" },
  { file: "ethical-hacking-data-analytics.svg", title: "Bridging Ethical Hacking and Data Analytics: Building Smarter and Safer Systems", issuer: "De La Salle Lipa" },
  { file: "devroutes.svg", title: "DevRoutes: Learning How to Learn with Roadmaps", issuer: "De La Salle Lipa / Swinburne University of Technology" },
  { file: "ai-ethics-governance.svg", title: "AI Ethics and Governance", issuer: "USAID / Asia Open RAN Academy" },
];

function wrap(text, maxChars) {
  const words = text.split(" ");
  const lines = [];
  let line = "";
  words.forEach((w) => {
    if ((line + " " + w).trim().length > maxChars) {
      lines.push(line.trim());
      line = w;
    } else {
      line += " " + w;
    }
  });
  if (line.trim()) lines.push(line.trim());
  return lines;
}

function esc(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

certs.forEach(({ file, title, issuer }) => {
  const titleLines = wrap(title, 38);
  const startY = 250 - ((titleLines.length - 1) * 30) / 2;
  const tspans = titleLines
    .map(
      (l, i) =>
        `<tspan x="600" y="${startY + i * 30}">${esc(l)}</tspan>`
    )
    .join("\n    ");

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="850" viewBox="0 0 1200 850">
  <defs>
    <linearGradient id="accent" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#F58529"/>
      <stop offset="50%" stop-color="#DD2A7B"/>
      <stop offset="100%" stop-color="#8134AF"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="850" fill="#fafafa"/>
  <rect x="28" y="28" width="1144" height="794" fill="#ffffff" stroke="#e5e5e5" stroke-width="2" rx="12"/>
  <rect x="28" y="28" width="1144" height="10" rx="5" fill="url(#accent)"/>
  <circle cx="600" cy="170" r="46" fill="none" stroke="url(#accent)" stroke-width="4"/>
  <path d="M 585 170 L 597 182 L 618 158" fill="none" stroke="#DD2A7B" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
  <text x="600" y="200" text-anchor="middle" font-family="Inter, Segoe UI, Arial, sans-serif" font-size="15" letter-spacing="6" fill="#9ca3af">CERTIFICATION</text>
  <text text-anchor="middle" font-family="Inter, Segoe UI, Arial, sans-serif" font-size="27" font-weight="700" fill="#111111">
    ${tspans}
  </text>
  <text x="600" y="${startY + titleLines.length * 30}" text-anchor="middle" font-family="Inter, Segoe UI, Arial, sans-serif" font-size="18" fill="#6b7280">Issued by ${esc(issuer)}</text>
  <text x="600" y="760" text-anchor="middle" font-family="Inter, Segoe UI, Arial, sans-serif" font-size="13" fill="#d1d5db">Placeholder — replace with actual certificate image</text>
</svg>\n`;

  fs.writeFileSync(path.join(dir, file), svg);
  console.log("wrote", file);
});
