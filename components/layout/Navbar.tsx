'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { href: '/', label: 'Portada' },
  { href: '/presentation', label: 'Presentación' },
  { href: '/login', label: 'Panel' },
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 no-print"
      style={{
        background: 'linear-gradient(to bottom, rgba(16,38,29,0.95) 0%, rgba(16,38,29,0) 100%)',
        backdropFilter: 'blur(12px)',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="group flex items-center gap-3">
          <span
            className="text-base animate-gentle-pulse"
            style={{ color: '#B08D57' }}
          >
            ☽
          </span>
          <span
            className="text-sm uppercase tracking-[0.25em] font-light"
            style={{ color: '#D8C3A5', fontFamily: "'Georgia', serif" }}
          >
            Moonlit Kingdom
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-xs uppercase tracking-[0.2em] transition-all duration-300 relative group"
              style={{
                color: pathname === link.href ? '#B08D57' : '#8E8A86',
              }}
            >
              {link.label}
              <span
                className="absolute -bottom-1 left-0 w-0 h-px transition-all duration-300 group-hover:w-full"
                style={{ background: 'rgba(176,141,87,0.5)' }}
              />
            </Link>
          ))}
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-1"
          style={{ color: '#B08D57' }}
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden border-t"
          style={{
            background: 'rgba(16,38,29,0.98)',
            borderColor: 'rgba(176,141,87,0.2)',
          }}
        >
          <div className="px-6 py-4 flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-xs uppercase tracking-[0.2em] py-2"
                style={{
                  color: pathname === link.href ? '#B08D57' : '#8E8A86',
                }}
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
