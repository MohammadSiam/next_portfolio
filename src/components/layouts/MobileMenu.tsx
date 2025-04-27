"use client";
import Link from "next/link";
import PerfectScrollbar from "react-perfect-scrollbar";

export default function MobileMenu({ isMobileMenu, handleMobileMenu }: any) {
  return (
    <>
      <div
        className={`mobile-header-active mobile-header-wrapper-style perfect-scrollbar button-bg-2 ${
          isMobileMenu ? "sidebar-visible" : ""
        }`}
      >
        <div className="mobile-header-wrapper-inner">
          <div className="mobile-header-logo">
            <div
              className={`burger-icon burger-icon-white border rounded-3 ${
                isMobileMenu ? "burger-close" : ""
              }`}
              onClick={handleMobileMenu}
            >
              <span className="burger-icon-top" />
              <span className="burger-icon-mid" />
              <span className="burger-icon-bottom" />
            </div>
          </div>
          <div className="mobile-header-content-area">
            <PerfectScrollbar className="perfect-scroll">
              <div className="mobile-menu-wrap mobile-header-border">
                <nav>
                  <ul className="mobile-menu font-heading ps-0">
                    <li className="nav-item" onClick={handleMobileMenu}>
                      <Link className="nav-link active" href="/">
                        Home
                      </Link>
                    </li>
                    <li className="nav-item" onClick={handleMobileMenu}>
                      <Link className="nav-link" href="#resume">
                        Resume
                      </Link>
                    </li>
                    <li className="nav-item" onClick={handleMobileMenu}>
                      <Link className="nav-link" href="#portfolio">
                        Portfolio
                      </Link>
                    </li>
                    <li className="nav-item" onClick={handleMobileMenu}>
                      <Link className="nav-link" href="#services">
                        Services
                      </Link>
                    </li>
                    <li className="nav-item" onClick={handleMobileMenu}>
                      <Link className="nav-link" href="/#projects">
                        Projects
                      </Link>
                    </li>
                    <li className="nav-item" onClick={handleMobileMenu}>
                      <Link className="nav-link" href="#contact">
                        Contact
                      </Link>
                    </li>
                  </ul>
                </nav>
              </div>
            </PerfectScrollbar>
          </div>
        </div>
      </div>
    </>
  );
}
