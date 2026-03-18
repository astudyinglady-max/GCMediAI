'use server';

export type ContactState = {
  success: boolean;
  message: string;
};

export async function submitContact(
  _prevState: ContactState | null,
  formData: FormData,
): Promise<ContactState> {
  const name = formData.get('name') as string;
  const phone = formData.get('phone') as string;
  const organization = formData.get('organization') as string;
  const department = formData.get('department') as string;
  const email = formData.get('email') as string;
  const message = formData.get('message') as string;
  const inquiryType = formData.get('inquiryType') as string;

  if (!name || !phone || !organization || !department || !email || !message || !inquiryType) {
    return { success: false, message: '필수 항목을 모두 입력해주세요.' };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { success: false, message: '올바른 이메일 주소를 입력해주세요.' };
  }

  // 실제 환경에서는 이메일 발송 또는 DB 저장
  return {
    success: true,
    message: '문의가 접수되었습니다. 영업일 기준 2일 내로 연락드리겠습니다.',
  };
}
