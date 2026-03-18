'use client';

import { useState } from 'react';
import { useActionState } from 'react';
import { submitContact } from './actions';
import Dropdown from '@/components/ui/Dropdown/Dropdown';
import Checkbox from '@/components/ui/Checkbox/Checkbox';
import Button from '@/components/ui/Button/Button';
import styles from './page.module.scss';
import Input from '@/components/ui/Input/Input';

const INQUIRY_OPTIONS = [
  { value: '대표 문의', label: '대표 문의' },
  { value: 'IR', label: 'IR' },
  { value: 'PR', label: 'PR' },
  { value: '협업 문의', label: '협업 문의' },
];

const PRIVACY_POLICY_TEXT = `GC MediAI(이하 '회사')는 개인정보 보호법 등 관련 법령에 따라 이용자의 개인정보를 수집·이용합니다.

■ 수집 항목
이름, 연락처, 이메일, 회사(소속), 부서/직함, 문의 내용

■ 수집 목적
문의 접수 및 답변, 서비스 안내

■ 보유 기간
문의 처리 완료 후 1년간 보관 후 파기

위 개인정보 수집·이용에 동의하지 않을 권리가 있으나,
거부 시 문의 접수가 불가합니다.`;

export default function ContactForm() {
  const [state, action, isPending] = useActionState(submitContact, null);
  const [inquiryType, setInquiryType] = useState('');

  if (state?.success) {
    return (
      <div className={styles.successBox}>
        <p className={styles.successIcon}>✓</p>
        <p className={styles.successMsg}>{state.message}</p>
      </div>
    );
  }

  return (
    <form action={action} className={styles.form}>
      <p className={styles.formDesc}>
        궁금한 사항을 남겨주시면 빠른 시일 내에 답변해 드리겠습니다
      </p>

      {state && !state.success && (
        <p className={styles.errorMsg}>{state.message}</p>
      )}

      {/* 문의 유형 드롭다운 */}
      <div className={styles.fieldGroup}>
        <span className={styles.label}>
          문의 유형 <span className={styles.required}>*</span>
        </span>
        <Dropdown
          options={INQUIRY_OPTIONS}
          value={inquiryType}
          placeholder="선택해주세요"
          onChange={setInquiryType}
        />
        {/* 서버 액션 전달용 hidden input */}
        <input type="hidden" name="inquiryType" value={inquiryType} />
      </div>

      {/* 이름 + 연락처 */}
      <div className={styles.row}>
        <label className={styles.label}>
          <span className={styles.labelText}>
            이름 <span className={styles.required}>*</span>
          </span>
          <Input name="name" required placeholder="홍길동" />
        </label>
        <label className={styles.label}>
          <span className={styles.labelText}>
            연락처 <span className={styles.required}>*</span>
          </span>
          <Input type="tel" name="phone" required placeholder="010-0000-0000" />
        </label>
      </div>

      {/* 회사(소속) + 부서/직함 */}
      <div className={styles.row}>
        <label className={styles.label}>
          <span className={styles.labelText}>
            회사(소속) <span className={styles.required}>*</span>
          </span>
          <Input
            name="organization"
            required
            placeholder="병원명 또는 회사명"
          />
        </label>
        <label className={styles.label}>
          <span className={styles.labelText}>
            부서/직함 <span className={styles.required}>*</span>
          </span>
          <Input name="department" required placeholder="부서명 또는 직함" />
        </label>
      </div>

      {/* 이메일 */}
      <label className={styles.label}>
        <span className={styles.labelText}>
          이메일 <span className={styles.required}>*</span>
        </span>
        <Input
          type="email"
          name="email"
          required
          placeholder="hello@example.com"
        />
      </label>

      {/* 문의 내용 */}
      <label className={styles.label}>
        <span className={styles.labelText}>
          문의 내용 <span className={styles.required}>*</span>
        </span>
        <textarea
          name="message"
          required
          placeholder="도입 관련 문의, 파트너십 제안 등 자유롭게 작성해주세요."
          rows={6}
          className={styles.textarea}
        />
      </label>

      {/* 개인정보 수집 및 이용 동의 */}
      <div className={styles.privacyGroup}>
        <span className={styles.label}>
          개인정보 수집 및 이용 동의 <span className={styles.required}>*</span>
        </span>
        <div className={styles.privacyBox}>
          <pre className={styles.privacyText}>{PRIVACY_POLICY_TEXT}</pre>
        </div>
        <Checkbox
          name="privacy"
          required
          label="개인정보 수집 및 이용에 동의합니다."
        />
      </div>

      <Button
        type="submit"
        variant="solid"
        size="md"
        disabled={isPending}
        className={styles.submitBtn}
      >
        {isPending ? '전송 중…' : '문의 보내기'}
      </Button>
    </form>
  );
}
