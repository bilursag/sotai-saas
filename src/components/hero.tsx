import { Spotlight } from "@/components/ui/spotlight";

const Hero = () => {
  return (
    <div className="min-h-screen w-full relative flex items-center justify-center">
      <Spotlight />
      <div className="container max-w-7xl mx-auto">
        <div className="text-center items-center justify-center">
          <h2 className="text-6xl font-semibold">
            La forma más rápida y fácil de generar documentos legales con IA.
          </h2>
        </div>
        <div className="flex flex-1 justify-center items-center py-8 gap-2">
        </div>
      </div>
    </div>
  )
}

export default Hero