import { PageLoader } from "./components/aether/page-loader"
import { AetherNavbar } from "./components/aether/navbar"
import { HeroSection } from "./components/aether/hero-section"
import { IntroSection } from "./components/aether/intro-section"
import { HowItWorksSection } from "./components/aether/how-it-works-section"
import { FeaturesSection } from "./components/aether/features-section"
import { CTASection } from "./components/aether/cta-section"
import { AetherFooter } from "./components/aether/footer"

export default function Home() {
  return (
    <>
      <div className="grain-overlay" />
      <PageLoader />
      <AetherNavbar />
      <main>
        <HeroSection />
        <IntroSection />
        <HowItWorksSection />
        <FeaturesSection />
        <CTASection />
      </main>
      <AetherFooter />
    </>
  )
}
