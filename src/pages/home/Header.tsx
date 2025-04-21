import ThemeSwitch from "@/components/elements/ThemeSwitch";
import MobileMenu from "@/components/layouts/MobileMenu";
import OffCanvas from "@/components/layouts/OffCanvas";
import Link from "next/link";

export default function Header({
  scroll,
  isMobileMenu,
  handleMobileMenu,
  isOffCanvas,
  handleOffCanvas,
}: any) {
  return (
    <>
      <header>
        <div className="container relative">
          <div className="relative">
            <nav className="navbar navbar-expand-lg navbar-home-2 h-[80px] flex-nowrap z-999 p-0 border border-1 rounded-3">
              <a
                className="navbar-menu p-4 text-center square-100 menu-tigger icon_80 icon-shape d-none d-md-flex"
                data-bs-target=".offCanvas__info"
                aria-controls="offCanvas__info"
                onClick={handleOffCanvas}
              >
                <i className="ri-menu-2-line" />
              </a>
              <div className="container py-3 px-4">
                <Link
                  className="d-none d-md-block navbar-brand d-flex main-logo align-items-center pt-4"
                  href="/"
                >
                  <img
                    src="assets/imgs/home-page-2/template/favicon.svg"
                    alt="zelio"
                  />
                  <span className="fs-4 ms-2"></span>
                </Link>
                <div className="d-none d-lg-flex">
                  <div className="" id="navbarSupportedContent">
                    <ul className="flex gap-3 items-center font-bold text-[18px] dark:text-gray-300 me-auto mb-2 mb-lg-0">
                      <li className="nav-item">
                        <Link className="nav-link" href="#about">
                          About me
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link className="nav-link" href="#resume">
                          Resume
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link className="nav-link" href="#services">
                          Services
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link className="nav-link" href="#portfolio">
                          Portfolio
                        </Link>
                      </li>
                      {/* <li className="nav-item">
                        <Link className="nav-link" href="#blog">
                          Blog
                        </Link>
                      </li> */}
                      <li className="nav-item">
                        <Link className="nav-link" href="#contact">
                          Contact
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="navbar-social d-flex align-items-center pe-5 pe-lg-0 me-5 me-lg-0">
                  <div className="d-md-flex d-none gap-3">
                    <Link href="https://www.facebook.com/abdurrahman.siam.9/about">
                      <i className="ri-facebook-circle-fill fs-18" />
                    </Link>
                    {/* <Link href="/http://twitter.com">
                      <i className="ri-twitter-x-fill fs-18" />
                    </Link> */}
                    <Link href="https://www.linkedin.com/in/siamk417/">
                      <i className="ri-linkedin-fill fs-18" />
                    </Link>
                    <Link href="https://github.com/mohammadSiam/">
                      <i className="ri-github-fill fs-18" />
                    </Link>
                  </div>
                </div>
              </div>
              <div
                className="burger-icon burger-icon-white border rounded-3"
                onClick={handleMobileMenu}
              >
                <span className="burger-icon-top" />
                <span className="burger-icon-mid" />
                <span className="burger-icon-bottom" />
              </div>
              <ThemeSwitch />
            </nav>
          </div>
          {/* offCanvas-menu */}
          <OffCanvas
            isOffCanvas={isOffCanvas}
            handleOffCanvas={handleOffCanvas}
          />
          <MobileMenu
            isMobileMenu={isMobileMenu}
            handleMobileMenu={handleMobileMenu}
          />
        </div>
      </header>
    </>
  );
}
