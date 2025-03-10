import HomeLayout from "@/components/layouts/HomeLayouts";
import Blog from "@/pages/home/Blogs";
import Contact from "@/pages/home/Contact";
import Education from "@/pages/home/Education";
import Experience from "@/pages/home/Experience";
import Hero from "@/pages/home/Hero";
import Projects from "@/pages/home/Projects";
import Service from "@/pages/home/Service";
import Skills from "@/pages/home/Skills";
import Statics from "@/pages/home/Statics";

export default function Home() {
  return (
    <>
      <HomeLayout>
        <Hero />
        <Statics />
        {/* <Coporation /> */}
        <Service />
        <Experience />
        <Education />
        <Projects />
        <Skills />
        <Blog />
        <Contact />
      </HomeLayout>
    </>
  );
}
