import type { Metadata } from 'next';
import ContactForm from './ContactForm';
import styles from './page.module.scss';

export const metadata: Metadata = {
  title: '문의하기 — GC MediAI',
  description: '도입 문의, 파트너십 제안 등 GC MediAI에 문의하세요.',
};

export default function ContactPage() {
  return (
    <main className={styles.main}>
      <section className={styles.hero}>
        <p className={styles.eyebrow}>Contact</p>
        <h1 className={styles.heading}>문의하기</h1>
        <p className={styles.sub}>
          도입 문의, 파트너십 제안 등 무엇이든 편하게 연락해주세요.
          <br />
          영업일 기준 2일 내로 답변드립니다.
        </p>
      </section>

      <div className={styles.container}>
        <div className={styles.infoGrid}>
          <div className={styles.infoCard}>
            <h3 className={styles.infoTitle}>대표번호</h3>
            <p className={styles.infoValue}>1588-0000</p>
            <p className={styles.infoNote}>평일 09:00 – 18:00</p>
          </div>
          <div className={styles.infoCard}>
            <h3 className={styles.infoTitle}>이메일</h3>
            <p className={styles.infoValue}>contact@gcmediai.com</p>
            <p className={styles.infoNote}>24시간 접수 가능</p>
          </div>
          <div className={styles.infoCard}>
            <h3 className={styles.infoTitle}>본사 주소</h3>
            <p className={styles.infoValue}>경기도 용인시 기흥구</p>
            <p className={styles.infoNote}>이스트밸리로 20</p>
          </div>
        </div>

        <div className={styles.formSection}>
          <h2 className={styles.formTitle}>온라인 문의</h2>
          <ContactForm />
        </div>
      </div>
    </main>
  );
}
