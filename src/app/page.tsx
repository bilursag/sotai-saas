import { FeaturesSection } from "@/components/feature-section";
import Navbar from "@/components/navbar";
import { CTASection } from "@/components/cta-section";
import Footer from "@/components/footer";
import PriceSection from "@/components/price-section";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="container max-w-7xl mx-auto">
      <Navbar />
      <CTASection />
      <div className="py-20 mx-auto text-center">
        <hgroup>
          <h2 className="text-base/7 font-semibold text-black dark:text-white">Transforma tu forma de trabajar</h2>
          <p className="mt-2 text-balance text-2xl font-semibold tracking-tight text-black dark:text-white sm:text-5xl">
            Genera, gestiona y firma documentos legales con IA.
          </p>
        </hgroup>
        <p className="mx-auto mt-6 max-w-xl text-pretty text-lg/8 text-black dark:text-white">
          Ahorra tiempo y evita errores en la redacción de contratos y otros documentos legales con nuestra plataforma automatizada.
        </p>
        <div className="mt-8 flex justify-center">
          <Button>
            Comienza ahora
          </Button>
        </div>
      </div>
      <FeaturesSection />
      <PriceSection />
      <Footer />
    </div>
  );
}
