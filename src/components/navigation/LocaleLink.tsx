'use client';

import Link from 'next/link';
import { ComponentProps } from 'react';
import { usePathname } from 'next/navigation';

type LocaleLinkProps = Omit<ComponentProps<typeof Link>, 'href'> & {
  href: string;
  locale?: string;
};

/**
 * Locale-aware Link component that automatically prefixes href with current locale
 * Usage: <LocaleLink href="/education">Education</LocaleLink>
 * Result: /zh/education or /en/education based on current URL locale
 */
export default function LocaleLink({ href, locale, ...props }: LocaleLinkProps) {
  const pathname = usePathname();

  // Get current locale from URL pathname
  const currentLocale = pathname.split('/')[1] || 'zh';
  const effectiveLocale = locale || (currentLocale === 'en' ? 'en' : 'zh');

  // Don't prefix if href is external or already has locale
  const isExternal = href.startsWith('http') || href.startsWith('//');
  const hasLocale = href.startsWith('/zh/') || href.startsWith('/en/');

  let localizedHref = href;

  if (!isExternal && !hasLocale) {
    // Add locale prefix
    localizedHref = `/${effectiveLocale}${href.startsWith('/') ? href : `/${href}`}`;
  }

  return <Link href={localizedHref} {...props} />;
}
