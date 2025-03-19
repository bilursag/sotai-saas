import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Hero from "@/components/landing/hero";
import Features from "@/components/landing/features";
import Pricing from "@/components/landing/pricing";
import Testimonials from "@/components/landing/testimonials";
import CallToActions from "@/components/landing/call-to-actions";
import FaqSection from "@/components/landing/faq-section";
import Resources from "@/components/landing/resources";
import Contact from "@/components/landing/contact";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <Hero />
      <Features />
      <Pricing />
      <Testimonials />
      <CallToActions />
      <FaqSection />
      <Resources />
      <Contact />
      <Footer />
    </div>
  );
}