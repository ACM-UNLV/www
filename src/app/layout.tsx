import '@/styles/global.css'

import type { Metadata } from 'next'
import { siteMetadata, seoKeywords } from '@/data/seo-meta'
import { ScrollToTop } from '@/components/common/scroll-to-top'
import { Header } from '@/components/layout/header'
import { PostHogProvider } from '@/components/providers/posthog'
import { WelcomePopup } from '@/components/common/welcome-popup'
import { AuthProvider } from '@/contexts/auth'

export const metadata: Metadata = {
  keywords: seoKeywords,
  title: {
    default: siteMetadata.title,
    template: `%s | ${siteMetadata.title}`,
  },
  icons: { icon: siteMetadata.icon },
  description: siteMetadata.description,
  metadataBase: new URL('https://acm.cs.unlv.edu/'),
  openGraph: {
    url: './',
    type: 'website',
    locale: 'en_US',
    siteName: 'unlv-acm',
    title: siteMetadata.title,
    description: siteMetadata.description,
    images: [
      {
        url: '/img/logo/logo-bordered.png',
        width: 1125,
        height: 1125,
        alt: 'ACM UNLV Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteMetadata.title,
    description: siteMetadata.description,
    images: [
      {
        url: '/img/logo/logo-bordered.png',
        width: 1125,
        height: 1125,
        alt: 'ACM UNLV Logo',
      },
    ],
  },
  alternates: {
    canonical: './',
    languages: {
      'en-US': '/en-US',
    },
  },
  category: 'technology',
}

// export const dynamic = 'force-dynamic'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning lang="en">
      {/*
        Thien: <head /> will contain the components returned by the nearest parent
        head.js. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body suppressHydrationWarning className="antialiased">
        <PostHogProvider>
          <AuthProvider>
            <Header />
            {children}
            <ScrollToTop />
            {/* <WelcomePopup /> */}
          </AuthProvider>
        </PostHogProvider>
      </body>
    </html>
  )
}
