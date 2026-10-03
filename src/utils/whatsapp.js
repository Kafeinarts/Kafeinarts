/**
 * Kafeinarts WhatsApp utils
 * ------------------------------------------------------------------
 * Nomor utama perusahaan: 0858-1704-8266 (6285817048266) — dipakai
 * wizard konsultasi & tombol order. Form kontak dapat memilih tujuan
 * lain (Staff IT / Staff CS) dari src/data/contact.json.
 */
import { siteData } from "@/data/siteData"

/** Nomor WhatsApp utama perusahaan (dari contact.json). */
export function getPrimaryWhatsApp() {
  const targets = siteData.contact.whatsapp.targets
  const primary = targets.find((t) => t.key === siteData.contact.whatsapp.defaultTarget)
  return primary || targets[0]
}

/** Daftar semua tujuan WhatsApp (untuk dropdown form kontak). */
export function getWhatsAppTargets() {
  return siteData.contact.whatsapp.targets
}

/** URL wa.me dengan pesan yang sudah di-encode. */
export function buildWaUrl(waNumber, text) {
  return `https://wa.me/${waNumber}?text=${encodeURIComponent(text)}`
}

/**
 * Pesan konsultasi dari wizard (order sekarang / konsultasi harga).
 * @param {Object} p data wizard: { intent, product, serviceType, name, org, email,
 *   phone, budget, timeline, meetingMode, meetingTime, notes }
 */
export function buildConsultationMessage(p) {
  const intentLabel = p.intent === "order" ? "ORDER SEKARANG" : "KONSULTASI HARGA"
  const lines = [
    `Halo Kafeinarts !`,
    ``,
    `Saya ingin *${intentLabel}* melalui website kafeinarts.`,
    ``,
    `*Detail Kebutuhan*`,
    `- Produk/Layanan: ${p.product || p.serviceType || "-"}`,
    ``,
    `*Profil*`,
    `- Nama: ${p.name}`,
    `- Instansi/Perusahaan: ${p.org || "-"}`,
    `- Email: ${p.email || "-"}`,
    `- No. WhatsApp: ${p.phone}`,
    ``,
    `*Skala Proyek*`,
    `- Estimasi Budget: ${p.budget || "-"}`,
    `- Target Waktu: ${p.timeline || "-"}`,
    ``,
    `*Jadwal Meeting Persiapan*`,
    `- Mode: ${p.meetingMode || "-"}`,
    `- Waktu diinginkan: ${p.meetingTime || "Fleksibel"}`,
    ``,
    `*Catatan Tambahan*`,
    p.notes || `-`,
    ``,
    `Mohon konfirmasi jadwalnya ya. Terima kasih!`,
    ``,
    `— dikirim via kafeinarts.id`,
  ]
  return lines.join("\n")
}

/** Pesan CTA ringkas dari tombol di halaman produk. */
export function buildProductCtaMessage({ productName, intent, note }) {
  const intentLabel = intent === "order" ? "ORDER SEKARANG" : "KONSULTASI HARGA"
  const lines = [
    `Halo Kafeinarts 👋`,
    ``,
    `Saya ingin *${intentLabel}* untuk produk *${productName}*.`,
  ]
  if (note) {
    lines.push(``, `*Catatan:* ${note}`)
  }
  lines.push(``, `Mohon info jadwal meeting persiapan (online/offline). Terima kasih!`, ``, `— dikirim via kafeinarts.id`)
  return lines.join("\n")
}

/**
 * Susun pesan + URL wa.me untuk form kontak umum (kompatibel pemakaian lama).
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
    url: buildWaUrl(target.wa, text),
    target,
  }
}

export default {
  getPrimaryWhatsApp,
  getWhatsAppTargets,
  buildWaUrl,
  buildConsultationMessage,
  buildProductCtaMessage,
  buildWhatsAppUrl,
}
