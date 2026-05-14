import Contact from "@/sections/home/Contact";
import Education from "@/sections/home/Education";
import Experience from "@/sections/home/Experience";
import Hero from "@/sections/home/Hero";
import Projects from "@/sections/home/Projects";
import Service from "@/sections/home/Service";
import Skills from "@/sections/home/Skills";
import Statics from "@/sections/home/Statics";

export default function Home() {
  return (
    <>
      <Hero />
      <Statics />
      <Experience />
      <Projects />
      <Skills />
      <Service />
      <Education />
      <Contact />
    </>
  );
}
