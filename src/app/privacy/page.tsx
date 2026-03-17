import type { Metadata } from 'next';
import styles from './page.module.scss';

export const metadata: Metadata = {
  title: '개인정보처리방침 — GC MediAI',
  description: 'GC MediAI 개인정보처리방침',
};

export default function PrivacyPage() {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <h1 className={styles.heading}>개인정보처리방침</h1>
        <p className={styles.updated}>최종 업데이트: 2025년 1월 1일</p>

        <div className={styles.content}>
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>제1조 (개인정보의 처리 목적)</h2>
            <p className={styles.para}>
              GC MediAI 주식회사(이하 &quot;회사&quot;)는 다음의 목적을 위하여 개인정보를 처리합니다.
              처리하고 있는 개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며, 이용 목적이
              변경되는 경우에는 개인정보 보호법 제18조에 따라 별도의 동의를 받는 등 필요한
              조치를 이행할 예정입니다.
            </p>
            <ul className={styles.list}>
              <li>홈페이지 회원 가입 및 관리</li>
              <li>민원사무 처리</li>
              <li>재화 또는 서비스 제공</li>
              <li>마케팅 및 광고에의 활용</li>
            </ul>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>제2조 (개인정보의 처리 및 보유 기간)</h2>
            <p className={styles.para}>
              회사는 법령에 따른 개인정보 보유·이용기간 또는 정보주체로부터 개인정보를 수집 시에
              동의받은 개인정보 보유·이용기간 내에서 개인정보를 처리·보유합니다.
            </p>
            <p className={styles.para}>각각의 개인정보 처리 및 보유 기간은 다음과 같습니다.</p>
            <ul className={styles.list}>
              <li>홈페이지 회원 가입 및 관리: 회원 탈퇴 시까지</li>
              <li>전자상거래에서의 계약·청약철회 등에 관한 기록: 5년</li>
              <li>소비자의 불만 또는 분쟁처리에 관한 기록: 3년</li>
            </ul>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>제3조 (개인정보의 제3자 제공)</h2>
            <p className={styles.para}>
              회사는 정보주체의 개인정보를 제1조(개인정보의 처리 목적)에서 명시한 범위 내에서만
              처리하며, 정보주체의 동의, 법률의 특별한 규정 등 개인정보 보호법 제17조 및 제18조에
              해당하는 경우에만 개인정보를 제3자에게 제공합니다.
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>제4조 (정보주체의 권리·의무 및 행사방법)</h2>
            <p className={styles.para}>
              정보주체는 회사에 대해 언제든지 다음 각 호의 개인정보 보호 관련 권리를 행사할 수
              있습니다.
            </p>
            <ul className={styles.list}>
              <li>개인정보 열람 요구</li>
              <li>오류 등이 있을 경우 정정 요구</li>
              <li>삭제 요구</li>
              <li>처리 정지 요구</li>
            </ul>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>제5조 (개인정보 보호책임자)</h2>
            <p className={styles.para}>
              회사는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 정보주체의 개인정보 관련
              불만처리 및 피해구제 등을 위하여 아래와 같이 개인정보 보호책임자를 지정하고 있습니다.
            </p>
            <ul className={styles.list}>
              <li>개인정보 보호책임자: 개인정보보호팀장</li>
              <li>이메일: privacy@gcmediai.com</li>
              <li>전화: 1588-0000</li>
            </ul>
          </section>
        </div>
      </div>
    </main>
  );
}
