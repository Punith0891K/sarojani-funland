export default function manifest() {
  return {
    name: 'Sarojani Funland',
    short_name: 'Funland',
    description: "Mysuru's premium indoor kids play area",
    start_url: '/',
    display: 'standalone',
    background_color: '#fff8f1',
    theme_color: '#7c3aed',
    icons: [{ src: '/images/logo.png', sizes: '512x512', type: 'image/png' }],
  }
}
