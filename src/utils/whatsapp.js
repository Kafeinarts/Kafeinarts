/**
 * Kafeinarts WhatsApp - 2 Tujuan (port dari js/script.js)
 * Staff IT:            085817048200  -> 6285817048200
 * Staff Customer Service: 0895331847715 -> 62895331847715
 * Data sumber: src/data/siteData.js -> siteData.contact.form.whatsapp
 */
import { siteData } from "@/data/siteData"

const FALLBACK_NUMBERS = {
  staffIT: "6285817048200",
  staffCS: "62895331847715",
}

/** Daftar tujuan WhatsApp untuk dropdown form kontak. */
export function getWhatsAppTargets() {
  const wa = siteData.contact.form.whatsapp
  const staffIT = wa.staffIT || wa.spvIT
  const staffCS = wa.staffCS || wa.marketing
  return [
    { key: "staffIT", label: staffIT.label, display: staffIT.display, wa: staffIT.wa },
    { key: "staffCS", label: staffCS.label, display: staffCS.display, wa: staffCS.wa },
  ]
}

/** Pilih nomor WhatsApp berdasarkan key tujuan. */
export function resolveWhatsAppNumber(targetKey) {
  const targets = getWhatsAppTargets()
  const found = targets.find((t) => t.key === targetKey)
  if (found) return found.wa
  if (targetKey === "staffCS" || targetKey === "marketing") return FALLBACK_NUMBERS.staffCS
  return FALLBACK_NUMBERS.staffIT
}

/**
 * Susun pesan + URL wa.me untuk form kontak.
 * @returns {{ url: string, target: object }}
 */
export function buildWhatsAppUrl({ name, email, subject, message, targetKey }) {
  const targets = getWhatsAppTargets()
  const target = targets.find((t) => t.key === targetKey) || targets[0]

  const text =
    `Halo Kafeinarts *${target.label} — ${target.display}* 👋\n\n` +
    `Perkenalkan saya *${name}*\n` +
    `Email: ${email}\n\n` +
    `*Subjek:* ${subject}\n` +
    `*Pesan:*\n${message}\n\n` +
    `— dikirim via kafeinarts.id`

  return {
    url: `https://wa.me/${target.wa}?text=${encodeURIComponent(text)}`,
    target,
  }
}
