import { SignUpButton } from '@clerk/nextjs';
import React from 'react'
import { Button } from '../ui/button';
import Link from 'next/link';

const CallToActions = () => {
  return (
    <>
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="container mx-auto px-4 max-w-7xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Comienza a crear documentos legales inteligentes hoy mismo
          </h2>
          <p className="text-lg mb-8 max-w-3xl mx-auto opacity-90">
            Únete a miles de profesionales chilenos que están optimizando su
            trabajo legal con Sotai Docs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <SignUpButton mode="modal">
              <Button
                size="lg"
                className="font-medium bg-white text-blue-600 hover:bg-gray-100"
              >
                Comenzar gratis
              </Button>
            </SignUpButton>
            <Link href="#pricing">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10"
              >
                Ver planes
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default CallToActions