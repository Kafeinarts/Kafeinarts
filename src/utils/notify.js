import Swal from "sweetalert2"
import "sweetalert2/dist/sweetalert2.min.css"

/**
 * notify — pembungkus SweetAlert2 bertema Kafeinarts.
 *
 * Menggantikan alert()/confirm() bawaan browser agar pesan & konfirmasi
 * tampil konsisten dengan brand (navy #00205d) dan lebih nyaman di HP.
 *
 * Pakai:
 *   import { notifyWarning, notifySuccess, notifyConfirm } from "@/utils/notify"
 *
 *   await notifyWarning("Mohon isi nama Anda.")
 *   const ok = await notifyConfirm("Hapus data ini?")
 *   if (ok) { ... }
 */

/** Tema dasar — satu sumber gaya untuk semua dialog. */
const baseTheme = {
  confirmButtonColor: "#00205d", // navy brand (lihat gradasi modal produk)
  cancelButtonColor: "#6c757d",
  buttonsStyling: true,
  reverseButtons: true,
  // Biarkan animasi halus bawaan; cukup cepat untuk validasi form.
  showClass: { popup: "animate__animated animate__fadeInDown" },
  hideClass: { popup: "animate__animated animate__fadeOutUp" },
}

/** Pesan peringatan/validation (pengganti alert). */
export function notifyWarning(message, title = "Perhatian") {
  return Swal.fire({
    ...baseTheme,
    icon: "warning",
    title,
    text: message,
    confirmButtonText: "Mengerti",
  })
}

/** Pesan sukses. */
export function notifySuccess(message, title = "Berhasil") {
  return Swal.fire({
    ...baseTheme,
    icon: "success",
    title,
    text: message,
    confirmButtonText: "OK",
  })
}

/** Pesan error. */
export function notifyError(message, title = "Terjadi Kesalahan") {
  return Swal.fire({
    ...baseTheme,
    icon: "error",
    title,
    text: message,
    confirmButtonText: "Tutup",
  })
}

/**
 * Dialog konfirmasi (pengganti confirm).
 * @returns {Promise<boolean>} true bila pengguna memilih konfirmasi.
 */
export function notifyConfirm(message, title = "Konfirmasi") {
  return Swal.fire({
    ...baseTheme,
    icon: "question",
    title,
    text: message,
    showCancelButton: true,
    confirmButtonText: "Ya, lanjutkan",
    cancelButtonText: "Batal",
  }).then((result) => Boolean(result.isConfirmed))
}

export default Swal
