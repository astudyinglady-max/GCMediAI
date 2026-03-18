import type { Metadata } from 'next';
import PageHero from '@/components/layout/PageHero/PageHero';
import ContactForm from './ContactForm';
import styles from './page.module.scss';

export const metadata: Metadata = {
  title: '문의하기 — GC MediAI',
  description: '도입 문의, 파트너십 제안 등 GC MediAI에 문의하세요.',
};

// 서비스 관련 문의 데이터
const SERVICE_INQUIRY_GROUPS = [
  {
    category: '메디컬인프라',
    services: [
      { name: '의사랑', url: 'https://www.ysarang.com' },
      { name: '유팜', url: 'https://upharm.ubcare.co.kr' },
    ],
  },
  {
    category: '데이터마케팅',
    services: [
      { name: 'UBIST', url: 'https://www.ubist.co.kr' },
      { name: 'LiveInfo', url: '#' },
      { name: 'UB Sales', url: '#' },
    ],
  },
  {
    category: '플랫폼',
    services: [
      { name: '똑닥', url: 'https://www.ddocdoc.com' },
      { name: '닥터바이스', url: 'https://www.doctoradvice.co.kr' },
    ],
  },
  {
    category: '유통의료기기',
    services: [
      { name: '미소몰닷컴', url: 'https://www.misomall.com' },
      { name: '유팜몰', url: '#' },
      { name: 'UB PACS-Z', url: '#' },
      { name: '오토팩', url: '#' },
    ],
  },
];

export default function ContactPage() {
  return (
    <main className={styles.main}>
      <PageHero
        eyebrow="Contact"
        title="Contact"
        description={
          <>
            도입 문의, 파트너십 제안 등 무엇이든 편하게 연락해주세요.
            <br />
            영업일 기준 2일 내로 답변드립니다.
          </>
        }
      />

      <div className={styles.container}>
        {/* 온라인 문의 폼 */}
        <div className={styles.formSection}>
          <ContactForm />
        </div>

        {/* 서비스 관련 문의 */}
        <div className={styles.serviceInquiry}>
          <h2 className={styles.serviceInquiryTitle}>서비스 관련 문의</h2>
          <p className={styles.serviceInquiryDesc}>
            특정 서비스에 대한 문의는 아래 바로가기를 이용해주세요.
          </p>
          <div className={styles.serviceGroupList}>
            {SERVICE_INQUIRY_GROUPS.map((group) => (
              <div key={group.category} className={styles.serviceGroup}>
                <span className={styles.serviceGroupLabel}>
                  {group.category}
                </span>
                <div className={styles.serviceGroupBtns}>
                  {group.services.map((svc) =>
                    svc.url !== '#' ? (
                      <a
                        key={svc.name}
                        href={svc.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.serviceGroupBtn}
                      >
                        {svc.name} →
                      </a>
                    ) : (
                      <span
                        key={svc.name}
                        className={`${styles.serviceGroupBtn} ${styles.serviceGroupBtnDisabled}`}
                      >
                        {svc.name}
                      </span>
                    ),
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
