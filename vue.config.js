const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,

  /**
   * Konfigurasi PWA (@vue/cli-plugin-pwa)
   * Selain untuk installability, konfigurasi ini juga menentukan
   * <meta name="theme-color">, <link rel="manifest"> dan nama aplikasi
   * yang dibaca oleh mesin pencari / browser.
   *
   * Catatan: favicon.svg sengaja dimatikan karena file tersebut tidak
   * ada di public/img/icons (agar tidak memicu request 404).
   */
  pwa: {
    name: 'Kafeinarts',
    themeColor: '#00205D',
    msTileColor: '#00205D',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',
    manifestOptions: {
      name: 'Kafeinarts — Jasa SaaS, Website & Sistem Manajemen',
      short_name: 'Kafeinarts',
      description:
        'Mitra teknis SaaS full-stack, pembuatan website & aplikasi, cloud dan keamanan sistem di Depok, Jawa Barat.',
      lang: 'id-ID',
      start_url: '/',
      display: 'standalone',
      background_color: '#ffffff',
      theme_color: '#00205D',
    },
    iconPaths: {
      faviconSVG: null,
      favicon32: 'img/icons/favicon-32x32.png',
      favicon16: 'img/icons/favicon-16x16.png',
      appleTouchIcon: 'img/icons/apple-touch-icon-152x152.png',
      maskIcon: 'img/icons/safari-pinned-tab.svg',
      msTileImage: 'img/icons/msapplication-icon-144x144.png',
    },
  },
})
