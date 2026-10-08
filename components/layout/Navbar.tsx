'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { CrescentMark } from '@/components/brand/CrescentMark';

const navLinks = [
  { href: '/', label: 'Portada' },
  { href: '/presentation', label: 'Presentación' },
  { href: '/login', label: 'Panel' },
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const isPublicPage = pathname === '/' || pathname === '/presentation';

  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 border-b no-print ${
        isPublicPage ? 'mk-nav-public' : 'mk-nav-night'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-2 sm:px-8">
        <Link href="/" className="group flex items-center gap-2.5">
          <CrescentMark className="h-6 w-6" />
          <span className="mk-nav-wordmark text-[0.7rem] font-semibold uppercase tracking-[0.2em] sm:text-xs sm:tracking-[0.24em]" style={{ fontFamily: 'var(--mk-font-display)' }}>
            Moonlit Kingdom
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={pathname === link.href ? 'page' : undefined}
              className="mk-nav-link group relative pb-0.5 text-[0.7rem] font-semibold uppercase tracking-[0.18em] transition-colors duration-300"
              style={{ fontFamily: 'var(--mk-font-display)' }}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <button
          className="mk-nav-toggle p-1 md:hidden"
          onClick={() => setOpen(!open)}
          aria-controls="public-navigation"
          aria-expanded={open}
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
        >
          {open ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
        </button>
      </div>

      {open && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          id="public-navigation"
          className="mk-nav-menu border-t md:hidden"
        >
          <div className="px-6 py-4 flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                aria-current={pathname === link.href ? 'page' : undefined}
                className="mk-nav-link py-2 text-xs uppercase tracking-[0.2em]"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}
