import Link from "next/link";
import { useState, useEffect } from "react";
import appData from "@data/app.json";
import { useLocalStorage } from "@common/useLocalStorage";

const DefaultHeader = ({ contactButton, cartButton }) => {
  const navItems = [];

  appData.header.menu.forEach((item, index) => {
    let s_class1 = '';

    if ( item.children != 0 ) {
      s_class1 = 'menu-item-has-children';
    }
    let newobj = Object.assign({}, item, { "classes" :  s_class1 });
    navItems.push(newobj);
  });


  const [desktopMenu, desktopMenuToggle] = useState(false);
  const [mobileMenu, mobileMenuToggle] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  
  const clickedCartButton = (e) => {
    e.preventDefault();
    setCartOpen(!cartOpen);
  }

  const clickedDesktopMenu = (e) => {
    e.preventDefault();
    desktopMenuToggle(!desktopMenu);
    document.getElementsByClassName('desktop-menu')[0].classList.toggle('open');
  }

  const clickedMobileMenu = (e) => {
    e.preventDefault();
    mobileMenuToggle(!mobileMenu);
    document.getElementsByClassName('mobile-menu')[0].classList.toggle('open');
  }
  const clickedMobileMenuItemParent = (e) => {
    e.preventDefault();
    e.target.parentNode.classList.toggle('active');
  }

  

  return (
    <header className="header-style-one" >
      <div className="container">
        <div className="row">
          <div className="desktop-nav" id="stickyHeader">
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  <div className="d-flex-all justify-content-between">
                    <div className="header-logo">
                      <Link href="/">
                        <figure>
                          <img src={appData.header.logo.image} alt={appData.header.logo.alt} />
                        </figure>
                      </Link>
                    </div>
                    <div className="nav-bar">
                      <ul>
                        {navItems.map((item, key) => (
                        <li key={`headernav-item-${key}`} className={item.classes}>
                          <Link href={item.link}>{item.label}</Link>
                          {item.children != 0 &&
                          <ul className="sub-menu">
                            {item.children.map((subitem, key) => (
                            <li key={`headernavsub-item-${key}`} className={subitem.children != 0 ? "menu-item-has-children" : ""}>
                              <Link href={subitem.link}>{subitem.label}</Link>
                              {subitem.children != 0 &&
                              <ul className="sub-menu">
                                {subitem.children.map((subsubitem, key) => (
                                <li key={`headernavsub2-item-${key}`}><Link href={subsubitem.link}>{subsubitem.label}</Link></li>
                                ))}
                              </ul>
                              }
                            </li>
                            ))}
                          </ul>
                          }
                        </li>
                        ))}
                      </ul>
                      
                      <div className="extras">
                       
                        <a href="#" id="mobile-menu" className={mobileMenu ? "menu-start open" : "menu-start"} onClick={ (e) => clickedMobileMenu(e) }>
                          <svg id="ham-menu" viewBox="0 0 100 100"> <path className="line line1" d="M 20,29.000046 H 80.000231 C 80.000231,29.000046 94.498839,28.817352 94.532987,66.711331 94.543142,77.980673 90.966081,81.670246 85.259173,81.668997 79.552261,81.667751 75.000211,74.999942 75.000211,74.999942 L 25.000021,25.000058" /> <path className="line line2" d="M 20,50 H 80" /> <path className="line line3" d="M 20,70.999954 H 80.000231 C 80.000231,70.999954 94.498839,71.182648 94.532987,33.288669 94.543142,22.019327 90.966081,18.329754 85.259173,18.331003 79.552261,18.332249 75.000211,25.000058 75.000211,25.000058 L 25.000021,74.999942" /> </svg>
                        </a>
                        <a href="#" id="desktop-menu" className={desktopMenu ? "menu-start open" : "menu-start"} onClick={ (e) => clickedDesktopMenu(e) }>
                          <svg id="ham-menue" viewBox="0 0 100 100"> <path className="line line1" d="M 20,29.000046 H 80.000231 C 80.000231,29.000046 94.498839,28.817352 94.532987,66.711331 94.543142,77.980673 90.966081,81.670246 85.259173,81.668997 79.552261,81.667751 75.000211,74.999942 75.000211,74.999942 L 25.000021,25.000058" /> <path className="line line2" d="M 20,50 H 80" /> <path className="line line3" d="M 20,70.999954 H 80.000231 C 80.000231,70.999954 94.498839,71.182648 94.532987,33.288669 94.543142,22.019327 90.966081,18.329754 85.259173,18.331003 79.552261,18.332249 75.000211,25.000058 75.000211,25.000058 L 25.000021,74.999942" /> </svg>
                        </a>
                       
                      
                        {/* <a href="tel:+97145761193" className="theme-btn">
                          +97145761193 
                          <i>
                            <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="40" height="62" viewBox="0 0 40 62">
                              <defs>
                                <clipPath id="saddasdasdasdasda">
                                  <rect width="40" height="62"/>
                                </clipPath>
                              </defs>
                              <g id="Mobisdfle" clipPath="url(#saddasdasdasdasda)">
                                <path id="Path_125" data-name="Path 1" d="M10,6a4,4,0,0,0-4,4V50a4,4,0,0,0,4,4H28a4,4,0,0,0,4-4V10a4,4,0,0,0-4-4H10m0-6H28A10,10,0,0,1,38,10V50A10,10,0,0,1,28,60H10A10,10,0,0,1,0,50V10A10,10,0,0,1,10,0Z" transform="translate(1 1)"/>
                                <path id="Path_4342" data-name="Path 2" d="M2.5,0h7a2.5,2.5,0,0,1,0,5h-7a2.5,2.5,0,0,1,0-5Z" transform="translate(14 48)"/>
                              </g>
                            </svg>
                          </i>
                        </a>                         */}
                      
                        <a href="mailto:info@ferrigor.com" className="theme-btn">
  info@ferrigor.com
  <i>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 62" width="40" height="62">
      <g fill="none" stroke="white" strokeWidth="2">
      
        <rect x="4" y="16" width="32" height="28" rx="2" ry="2"/>
       
        <polyline points="4,16 20,34 36,16" />
      </g>
    </svg>
  </i>
</a>
                   

                      </div>

                    </div>
                    
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mobile-nav mobile-menu" id="mobile-nav">
            <div className="res-log">
              <Link href="/">
                <img src={appData.header.logo.image} alt={appData.header.logo.alt} />
              </Link>
            </div>

            <ul>
              {navItems.map((item, key) => (
              <li key={`mobilenav-item-${key}`} className={item.classes}>
                <Link href={item.link} onClick={item.children != 0 ? (e) => clickedMobileMenuItemParent(e) : ""}>{item.label}</Link>
                {item.children != 0 &&
                <ul className="sub-menu">
                  {item.children.map((subitem, key) => (
                  <li key={`mobilenavsub-item-${key}`} className={subitem.children != 0 ? "menu-item-has-children" : ""}>
                    <Link href={subitem.link}>{subitem.label}</Link>
                    {subitem.children != 0 &&
                    <ul className="sub-menu">
                      {subitem.children.map((subsubitem, key) => (
                      <li key={`mobilenavsub2-item-${key}`}><Link href={subsubitem.link}>{subsubitem.label}</Link></li>
                      ))}
                    </ul>
                    }
                  </li>
                  ))}
                </ul>
                }
              </li>
              ))}
            </ul>

            <a href="#" id="res-cross" onClick={ (e) => clickedMobileMenu(e) }></a>
          </div>

          <div className="mobile-nav desktop-menu">
            <h2>Build Smarter with Ferrigor – Post-Tensioning Experts </h2>
            <p className="des">Ferrigor delivers advanced post-tensioning systems for high-rise towers, podium slabs, and infrastructure projects. Our solutions reduce material costs, enable longer spans, and accelerate construction timelines.</p>
            <h3>We Offer:</h3>
            <ul class="popup-new-card">
              <li>Optimized slab design</li>
              <li>Durable tendon systems</li>
              <li>Long-term structural reliability</li>
            </ul>
          
            <figure>
              <img src="/img/logocontact.png" alt="image" />
            </figure>

            <h3>Get in touch</h3>
            <p className="num">+97145761193</p>
            <p className="adrs">M-22, Sky Business Center, Dubai Festival City, Dubai, UAE</p>

            <div className="social-medias">
              {appData.social.map((item, key) => (
                <a className="linkedin-new" href={item.link} target="_blank" key={`hsocial-item-${key}`}><i className="fa-brands fa-linkedin" /></a>
              ))}
            </div>
          </div>

        </div>
      </div>
    </header>
  );
};
export default DefaultHeader;
