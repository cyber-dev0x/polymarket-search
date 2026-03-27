import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import Ticker from "@/components/Ticker";
import LiveSearch from "@/components/LiveSearch";
import FeatureSection from "@/components/FeatureSection";
import NarrativeClusters from "@/components/NarrativeClusters";
import MomentumSection from "@/components/MomentumSection";
import UseCases from "@/components/UseCases";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="bg-[#080808] text-white">
      <Navbar />
      <HeroSection />
      <Ticker />
      <LiveSearch />
      <FeatureSection />
      <NarrativeClusters />
      <MomentumSection />
      <UseCases />
      <CTASection />
      <Footer />
    </main>
  );
}
