import type { Metadata } from 'next';
import Header from '@/components/layout/Header/Header';
import Footer from '@/components/layout/Footer/Footer';
import '../styles/globals.scss';

export const metadata: Metadata = {
  title: 'GC MediAI — Beyond EMR, Toward Medical OS',
  description: '27년간 쌓아온 의료 데이터 인프라 위에 AI와 클라우드가 더해진 다음 세대 의료 플랫폼',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ko'>
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
