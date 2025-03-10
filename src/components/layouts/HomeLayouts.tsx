"use client";
import Footer from "@/pages/home/Footer";
import Header from "@/pages/home/Header";
import { useEffect, useState } from "react";
import BackToTop from "../elements/BackToTop";

interface LayoutProps {
  children: React.ReactNode;
}

export default function HomeLayout({ children }: LayoutProps) {
  const [scroll, setScroll] = useState<boolean>(false);
  // Mobile Menu
  const [isMobileMenu, setMobileMenu] = useState<boolean>(false);
  const handleMobileMenu = (): void => {
    setMobileMenu(!isMobileMenu);
    !isMobileMenu
      ? document.body.classList.add("mobile-menu-active")
      : document.body.classList.remove("mobile-menu-active");
  };

  // Search
  const [isSearch, setSearch] = useState<boolean>(false);
  const handleSearch = (): void => setSearch(!isSearch);

  // OffCanvas
  const [isOffCanvas, setOffCanvas] = useState<boolean>(false);
  const handleOffCanvas = (): void => setOffCanvas(!isOffCanvas);

  useEffect(() => {
    const WOW: any = require("wowjs");
    (window as any).wow = new WOW.WOW({
      live: false,
    });

    // Initialize WOW.js
    (window as any).wow.init();

    const handleScroll = (): void => {
      const scrollCheck: boolean = window.scrollY > 100;
      if (scrollCheck !== scroll) {
        setScroll(scrollCheck);
      }
    };

    document.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, [scroll]);
  return (
    <>
      <div id="top" />
      {/* <AddClassBody />
      <DataBg />
      <ImageHoverEffect /> */}
      <Header
        scroll={scroll}
        isMobileMenu={isMobileMenu}
        handleMobileMenu={handleMobileMenu}
        isOffCanvas={isOffCanvas}
        handleOffCanvas={handleOffCanvas}
      />
      <main className="main">{children}</main>
      <Footer />
      <BackToTop target="#top" />
    </>
  );
}
