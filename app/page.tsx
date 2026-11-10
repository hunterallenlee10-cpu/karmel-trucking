import { BeforeAfter } from "@/components/sections/BeforeAfter";
import { Hero } from "@/components/sections/Hero";
import { Nav } from "@/components/sections/Nav";
import { Process } from "@/components/sections/Process";
import { ProofMarquee } from "@/components/sections/ProofMarquee";
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
      </main>
    </>
  );
}
