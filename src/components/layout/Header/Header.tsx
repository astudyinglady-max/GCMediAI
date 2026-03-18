'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Header.module.scss';

type SubItem = { label: string; href: string };
type GnbItem = { label: string; href: string; sub: SubItem[] };

const GNB: GnbItem[] = [
  {
    label: '회사소개',
    href: '/about',
    sub: [
      { label: 'GC메디아이', href: '/about' },
      { label: '연혁', href: '/about#history' },
      { label: '가족사/관계사', href: '/about#family' },
      { label: '오시는 길', href: '/about#location' },
    ],
  },
  {
    label: '사업분야',
    href: '/business',
    sub: [
      { label: '메디컬 인프라', href: '/business#medical-infra' },
      { label: '데이터·마케팅', href: '/business#data-marketing' },
      { label: '플랫폼', href: '/business#platform' },
      { label: '유통·의료기기', href: '/business#distribution' },
    ],
  },
  {
    label: 'IR',
    href: '/ir',
    sub: [
      { label: '주가정보', href: '/ir#stock' },
      { label: '재무정보', href: '/ir#financial' },
      { label: '공시자료', href: '/ir#disclosure' },
      { label: '주주공고', href: '/ir#shareholder' },
      { label: 'NEWS', href: '/ir/news' },
    ],
  },
];

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  // 모바일 드로어에서 열린 서브메뉴
  const [drawerSub, setDrawerSub] = useState<string | null>(null);
  const isHome = pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // 라우트 변경 시 드로어·드롭다운 닫기
  useEffect(() => {
    setDrawerOpen(false);
    setActiveMenu(null);
    setDrawerSub(null);
  }, [pathname]);

  const headerClass = [
    styles.header,
    scrolled ? styles.headerScrolled : '',
    !scrolled && isHome ? styles.headerTransparent : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <header className={headerClass}>
        <div className={styles.inner}>
          {/* 로고 */}
          <Link href="/" className={styles.logo}>
            GC <span className={styles.logoAccent}>MediAI</span>
          </Link>

          {/* 데스크톱 GNB */}
          <nav className={styles.gnb} aria-label="주요 메뉴">
            {GNB.map((item) => (
              <div
                key={item.href}
                className={styles.gnbItem}
                onMouseEnter={() => setActiveMenu(item.href)}
                onMouseLeave={() => setActiveMenu(null)}
              >
                <Link
                  href={item.href}
                  className={[
                    styles.gnbLink,
                    pathname.startsWith(item.href) ? styles.gnbLinkActive : '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                >
                  {item.label}
                </Link>

                {/* 드롭다운 패널 */}
                <div
                  className={[
                    styles.dropdown,
                    activeMenu === item.href ? styles.dropdownVisible : '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                >
                  {item.sub.map((sub) => (
                    <Link
                      key={sub.href}
                      href={sub.href}
                      className={styles.dropdownLink}
                    >
                      {sub.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}

            <Link href="/contact" className={styles.ctaBtn}>
              문의하기
            </Link>
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
          {GNB.map((item) => (
            <div key={item.href} className={styles.drawerSection}>
              {/* 1depth */}
              <button
                type="button"
                className={[
                  styles.drawerParent,
                  pathname.startsWith(item.href) ? styles.gnbLinkActive : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
                onClick={() =>
                  setDrawerSub((prev) =>
                    prev === item.href ? null : item.href,
                  )
                }
              >
                {item.label}
                <span
                  className={[
                    styles.drawerArrow,
                    drawerSub === item.href ? styles.drawerArrowOpen : '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                >
                  ›
                </span>
              </button>

              {/* 2depth */}
              {drawerSub === item.href && (
                <div className={styles.drawerSub}>
                  {item.sub.map((sub) => (
                    <Link
                      key={sub.href}
                      href={sub.href}
                      className={styles.drawerSubLink}
                    >
                      {sub.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}

          <Link
            href="/contact"
            className={styles.drawerCta}
            onClick={() => setDrawerOpen(false)}
          >
            문의하기
          </Link>
        </div>
    </header>
  );
}
