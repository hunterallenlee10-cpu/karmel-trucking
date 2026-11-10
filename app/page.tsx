import { Calculator } from "@/components/sections/Calculator";
import { BeforeAfter } from "@/components/sections/BeforeAfter";
import { Hero } from "@/components/sections/Hero";
import { Nav } from "@/components/sections/Nav";
import { OurWork } from "@/components/sections/OurWork";
import { Process } from "@/components/sections/Process";
import { ProofMarquee } from "@/components/sections/ProofMarquee";
import { Reviews } from "@/components/sections/Reviews";
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
      </main>
    </>
  );
}
