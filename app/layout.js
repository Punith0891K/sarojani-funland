import './globals.css'
import { Providers } from './providers'
import { Toaster } from 'sonner'

export const metadata = {
  metadataBase: new URL('https://www.sarojanifunland.in'),
  title: {
    default: 'Sarojani Funland | Kids Play Area, Trampoline & VR in Mysuru',
    template: '%s | Sarojani Funland Mysuru',
  },
  description:
    "Mysuru's premium indoor kids play area at Hotel Continental, Nazarbad. Trampoline, electric car rides, scooter rides and VR games. Book online in seconds.",
  keywords: [
    'Sarojani Funland','Kids Play Area Mysuru','Kids Play Area Mysore','Indoor Play Zone Mysuru',
    'Trampoline Park Mysuru','VR Games Mysuru','Electric Car Ride Mysuru','Family Entertainment Mysuru',
    'Kids Activities Mysuru','Play Area Near Me','Birthday Party Mysuru'
  ],
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Sarojani Funland | Kids Play Area in Mysuru',
    description: 'Trampolines, electric cars, VR games and more. Book your visit at Hotel Continental, Nazarbad.',
    url: 'https://www.sarojanifunland.in',
    siteName: 'Sarojani Funland',
    images: [{ url: '/images/new/hero-wide.jpg', width: 1200, height: 630, alt: 'Sarojani Funland Mysuru' }],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sarojani Funland | Kids Play Area in Mysuru',
    description: 'Trampolines, electric cars, VR games and more. Book your visit online.',
    images: ['/images/new/hero-wide.jpg'],
  },
  robots: { index: true, follow: true },
  icons: { icon: '/images/favicon-256.png', apple: '/images/favicon-256.png', shortcut: '/images/favicon-256.png' },
}

export const viewport = {
  themeColor: '#7c3aed',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'AmusementPark',
  name: 'Sarojani Funland',
  image: 'https://www.sarojanifunland.in/images/new/hero-wide.jpg',
  url: 'https://www.sarojanifunland.in',
  telephone: '+91 63609 21458',
  email: 'sarojanifunland@gmail.com',
  priceRange: '₹₹',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Hotel Continental, Ground Floor, Residency Road, Opposite Taluk Office, Nazarbad',
    addressLocality: 'Mysuru',
    addressRegion: 'Karnataka',
    postalCode: '570010',
    addressCountry: 'IN',
  },
  geo: { '@type': 'GeoCoordinates', latitude: 12.3050, longitude: 76.6553 },
  openingHours: 'Mo-Su 09:00-21:00',
  sameAs: ['https://instagram.com/sarojani_funland'],
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <script dangerouslySetInnerHTML={{__html:'window.addEventListener("error",function(e){if(e.error instanceof DOMException&&e.error.name==="DataCloneError"&&e.message&&e.message.includes("PerformanceServerTiming")){e.stopImmediatePropagation();e.preventDefault()}},true);'}} />
      </head>
      <body className="min-h-full flex flex-col">
        <Providers>{children}</Providers>
        <Toaster position="top-center" richColors />
      </body>
    </html>
  )
}
