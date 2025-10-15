import { Metadata } from 'next'

interface SEOProps {
  title?: string
  description?: string
  image?: string
  url?: string
  type?: 'website' | 'article'
  publishedTime?: string
  modifiedTime?: string
  authors?: string[]
  tags?: string[]
}

export function generateMetadata({
  title = 'Your Personal Site',
  description = 'Personal site and technical blog built with Next.js, TypeScript, and Tailwind CSS',
  image = '/images/og-default.jpg',
  url = 'https://mydomain.tld',
  type = 'website',
  publishedTime,
  modifiedTime,
  authors = ['Your Name'],
  tags = [],
}: SEOProps): Metadata {
  const fullTitle = title === 'Your Personal Site' ? title : `${title} | Your Personal Site`
  const fullUrl = `${url}${url.startsWith('http') ? '' : ''}`

  return {
    title: fullTitle,
    description,
    keywords: [
      'web development',
      'Next.js',
      'TypeScript',
      'React',
      'Tailwind CSS',
      'blog',
      'technology',
      ...tags,
    ],
    authors: authors.map((author) => ({ name: author })),
    creator: 'Your Name',
    publisher: 'Your Name',
    metadataBase: new URL(fullUrl),
    alternates: {
      canonical: fullUrl,
    },
    openGraph: {
      type,
      locale: 'en_US',
      url: fullUrl,
      title: fullTitle,
      description,
      siteName: 'Your Personal Site',
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
      ...(authors.length > 0 && { authors }),
      ...(tags.length > 0 && { tags }),
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      creator: '@yourhandle',
      images: [image],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      google: 'your-google-verification-code',
    },
  }
}

export function generateStructuredData({
  title,
  description,
  url,
  publishedTime,
  modifiedTime,
  author = 'Your Name',
  type = 'BlogPosting',
}: {
  title: string
  description: string
  url: string
  publishedTime?: string
  modifiedTime?: string
  author?: string
  type?: 'BlogPosting' | 'WebPage' | 'Person'
}) {
  const baseData = {
    '@context': 'https://schema.org',
    '@type': type,
    headline: title,
    description,
    url,
    author: {
      '@type': 'Person',
      name: author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Your Personal Site',
      logo: {
        '@type': 'ImageObject',
        url: 'https://mydomain.tld/images/logo.png',
      },
    },
  }

  if (publishedTime) {
    return {
      ...baseData,
      datePublished: publishedTime,
      ...(modifiedTime && { dateModified: modifiedTime }),
    }
  }

  return baseData
}
