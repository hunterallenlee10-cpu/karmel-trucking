import { Hero } from "@/components/sections/Hero";
import { Nav } from "@/components/sections/Nav";

export default function Home() {
  return (
    <>
      <Nav />
      <main id="main">
        <Hero />
      </main>
    </>
  );
}
