import { BeforeAfter } from "@/components/sections/BeforeAfter";
import { Calculator } from "@/components/sections/Calculator";
import { ContactBlock } from "@/components/sections/ContactBlock";
import { FAQ } from "@/components/sections/FAQ";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Footer } from "@/components/sections/Footer";
import { Hero } from "@/components/sections/Hero";
import { Nav } from "@/components/sections/Nav";
import { OurWork } from "@/components/sections/OurWork";
import { Process } from "@/components/sections/Process";
import { ProofMarquee } from "@/components/sections/ProofMarquee";
import { Reviews } from "@/components/sections/Reviews";
import { ServiceArea } from "@/components/sections/ServiceArea";
import { Services } from "@/components/sections/Services";

export default function Home() {
  return (
    <>
      <Nav />
      <main id="main">
        <Hero />
        <ProofMarquee />
        <Services />
        <BeforeAfter />
        <Process />
        <OurWork />
        <Calculator />
        <Reviews />
        <ServiceArea />
        <FAQ />
        <FinalCTA />
        <ContactBlock />
      </main>
      <Footer />
    </>
  );
}
