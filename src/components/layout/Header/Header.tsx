'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ContactModal from './ContactModal';
import styles from './Header.module.scss';
import Button from '@/components/ui/Button/Button';

const GNB_LINKS = [
  { label: '회사소개', href: '/about' },
  { label: '사업분야', href: '/business' },
  { label: 'IR', href: '/ir' },
];

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const isHome = pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // 라우트 변경 시 드로어 닫기
  useEffect(() => {
    setDrawerOpen(false);
  }, [pathname]);

  const headerClass = [
    styles.header,
    scrolled ? styles.headerScrolled : '',
    !scrolled && isHome ? styles.headerTransparent : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <>
      <header className={headerClass}>
        <div className={styles.inner}>
          {/* 로고 */}
          <Link href="/" className={styles.logo}>
            GC <span className={styles.logoAccent}>MediAI</span>
          </Link>

          {/* 데스크톱 GNB */}
          <nav className={styles.gnb} aria-label="주요 메뉴">
            {GNB_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={[
                  styles.gnbLink,
                  pathname.startsWith(link.href) ? styles.gnbLinkActive : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
              >
                {link.label}
              </Link>
            ))}
            <Button
              variant="solid"
              size="md"
              onClick={() => setContactOpen(true)}
            >
              문의하기
            </Button>
          </nav>

          {/* 햄버거 버튼 (모바일) */}
          <button
            type="button"
            className={styles.hamburger}
            aria-label="메뉴 열기"
            aria-expanded={drawerOpen}
            onClick={() => setDrawerOpen((prev) => !prev)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>

        {/* 모바일 드로어 */}
        <div
          className={[styles.drawer, drawerOpen ? styles.drawerOpen : '']
            .filter(Boolean)
            .join(' ')}
          aria-hidden={!drawerOpen}
        >
          {GNB_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={[
                styles.gnbLink,
                pathname.startsWith(link.href) ? styles.gnbLinkActive : '',
              ]
                .filter(Boolean)
                .join(' ')}
            >
              {link.label}
            </Link>
          ))}
          <button
            type="button"
            className={styles.drawerCta}
            onClick={() => {
              setDrawerOpen(false);
              setContactOpen(true);
            }}
          >
            문의하기
          </button>
        </div>
      </header>

      {/* 문의 모달 */}
      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />
    </>
  );
}
