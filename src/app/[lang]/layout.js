import { Inter, IBM_Plex_Sans_Arabic } from 'next/font/google'
import { notFound } from 'next/navigation'
import { getDictionary, hasLocale, locales } from '@/lib/dictionaries'
import { DictionaryProvider } from '@/context/DictionaryContext'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ScrollProgress from '@/components/ScrollProgress'
import Providers from '@/components/Providers'
import '../globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' })
const ibmArabic = IBM_Plex_Sans_Arabic({
  subsets: ['arabic'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-arabic',
  display: 'swap',
})

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }))
}

export async function generateMetadata({ params }) {
  const { lang } = await params
  const isAr = lang === 'ar'
  const baseUrl = 'https://mustafamahmoud.dev'

  return {
    metadataBase: new URL(baseUrl),
    title: isAr
      ? 'مصطفى محمود | مطور Full Stack ومدرّس JavaScript'
      : 'Mustafa Mahmoud | Full Stack Developer & JavaScript Instructor',
    description: isAr
      ? 'مطور Full Stack متخصص في MERN Stack ومدرّس JavaScript. أبني تطبيقات ويب قابلة للتوسع وأُمكّن المطورين من خلال التعليم.'
      : 'Full Stack Developer specializing in MERN Stack, JavaScript Instructor, and Technical Trainer. Building scalable web applications and empowering developers.',
    keywords: isAr
      ? ['مصطفى محمود', 'مطور Full Stack', 'MERN Stack', 'مدرس جافاسكريبت', 'المملكة العربية السعودية']
      : ['Mustafa Mahmoud', 'Full Stack Developer', 'MERN Stack', 'JavaScript Instructor', 'Saudi Arabia'],
    alternates: {
      canonical: `${baseUrl}/${lang}`,
      languages: { en: `${baseUrl}/en`, ar: `${baseUrl}/ar` },
    },
    openGraph: {
      type: 'website',
      locale: isAr ? 'ar_SA' : 'en_US',
      alternateLocale: isAr ? 'en_US' : 'ar_SA',
      url: `${baseUrl}/${lang}`,
      title: isAr
        ? 'مصطفى محمود | مطور Full Stack'
        : 'Mustafa Mahmoud | Full Stack Developer',
      description: isAr
        ? 'مطور Full Stack متخصص في MERN Stack ومدرّس JavaScript'
        : 'Full Stack Developer specializing in MERN Stack & JavaScript Instructor',
      siteName: 'Mustafa Mahmoud Portfolio',
      images: [{ url: '/og-image.png', width: 1200, height: 630 }],
    },
    robots: { index: true, follow: true },
  }
}

export default async function LocaleLayout({ children, params }) {
  const { lang } = await params

  if (!hasLocale(lang)) notFound()

  const dict = await getDictionary(lang)
  const dir = lang === 'ar' ? 'rtl' : 'ltr'

  const fontClass = lang === 'ar'
    ? `${ibmArabic.variable} font-arabic`
    : `${inter.variable} font-sans`

  return (
    <html lang={lang} dir={dir} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'Mustafa Mahmoud',
              jobTitle: lang === 'ar'
                ? 'مطور Full Stack ومدرّس JavaScript'
                : 'Full Stack Developer & JavaScript Instructor',
              url: `https://mustafamahmoud.dev/${lang}`,
              sameAs: ['https://linkedin.com/in/mustafa-mahmoud', 'https://github.com/Mostafa7i'],
            }),
          }}
        />
      </head>
      <body className={fontClass} style={{ background: '#0F172A', color: '#E2E8F0' }}>
        <DictionaryProvider dict={dict} lang={lang}>
          <Providers>
            <ScrollProgress />
            <Navbar lang={lang} dict={dict} />
            <main>{children}</main>
            <Footer lang={lang} dict={dict} />
          </Providers>
        </DictionaryProvider>
      </body>
    </html>
  )
}
