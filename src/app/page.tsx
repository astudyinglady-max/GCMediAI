import HeroSection from '@/components/sections/HeroSection';
import AiCapabilitySection from '@/components/sections/AiCapabilitySection';
import CompanyIntroduce from '@/components/sections/CompanyIntroduce';
import BusinessSection from '@/components/sections/BusinessSection';
import NewsSection from '@/components/sections/NewsSection';
import IrSection from '@/components/sections/IrSection';

export default function Home() {
  return (
    <main>
      <HeroSection />
      <AiCapabilitySection />
      <CompanyIntroduce />
      <BusinessSection />
      <NewsSection />
      <IrSection />
    </main>
  );
}
