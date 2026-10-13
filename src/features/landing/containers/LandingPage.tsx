"use client";

import { LandingHeader } from "@/features/landing/components/LandingHeader/LandingHeader";
import { HeroSection } from "@/features/landing/components/HeroSection/HeroSection";
import { TrustBar } from "@/features/landing/components/TrustBar/TrustBar";
import { FeaturesSection } from "@/features/landing/components/FeaturesSection/FeaturesSection";
import { ThemesCarousel } from "../components/ThemesCarousel/ThemesCarousel";
import { HowItWorks } from "../components/HowItWork/HowItWork";
import { TestimonialsCarousel } from "../components/TestimonialsCarousel/TestimonialsCarousel";
import { FinalCTASection } from "../components/FinalCTASection/FinalCTASection";
import { LandingFooter } from "../components/LandingFooter/LandingFooter";

export const LandingPage = () => {
  return (
    <>
      <LandingHeader />
      <main>
        <HeroSection />
        <TrustBar />
        <FeaturesSection />
        <ThemesCarousel />
        <HowItWorks />
        <TestimonialsCarousel />
        <FinalCTASection />
      </main>
      <LandingFooter />
    </>
  );
};