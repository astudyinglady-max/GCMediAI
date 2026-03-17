import Link from 'next/link';
import { COMPANY_INFO } from '@/lib/data/company';
import styles from './Footer.module.scss';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.top}>
          <div className={styles.brand}>
            <span className={styles.logo}>
              GC <span className={styles.logoAccent}>MediAI</span>
            </span>
            <p className={styles.tagline}>Beyond EMR, Toward Medical OS</p>
          </div>

          <div className={styles.familySite}>
            <span className={styles.familyLabel}>패밀리사이트</span>
            <a
              href="https://www.greencross.com"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.familyLink}
            >
              GC녹십자
            </a>
            <a
              href="https://www.gcgenome.com"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.familyLink}
            >
              GC지놈
            </a>
          </div>
        </div>

        <div className={styles.divider} />

        <div className={styles.bottom}>
          <address className={styles.info}>
            <span>{COMPANY_INFO.fullName} 주식회사</span>
            <span className={styles.sep}>|</span>
            <span>대표이사 {COMPANY_INFO.ceo}</span>
            <span className={styles.sep}>|</span>
            <span>사업자등록번호 {COMPANY_INFO.businessNumber}</span>
            <br className={styles.mobileBreak} />
            <span>{COMPANY_INFO.address}</span>
            <span className={styles.sep}>|</span>
            <span>대표번호 {COMPANY_INFO.phone}</span>
          </address>

          <div className={styles.legal}>
            <Link href="/privacy" className={styles.privacyLink}>
              개인정보처리방침
            </Link>
            <span className={styles.copyright}>
              © 2025 GC MediAI. All rights reserved.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
