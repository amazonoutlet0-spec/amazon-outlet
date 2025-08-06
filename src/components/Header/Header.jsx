import React, { useState, useEffect, useRef } from "react";
import styles from "./header.module.css";
import { FaSearch, FaBars, FaMapMarkerAlt, FaUser } from "react-icons/fa";
import { HiOutlineShoppingCart } from "react-icons/hi2";
import { FiChevronDown } from "react-icons/fi";
import { Link } from "react-router-dom";
import nav_logo from "../../assets/Images/nav_log.png";
import usa_flag from "../../assets/Images/usa_flag.png";
import { useCart } from "../DataProvider/DataProvider";
import { ACTIONS } from "../../Utility/actions";
import { toast } from "react-toastify";

function Header() {
  const [showAccountDropdown, setShowAccountDropdown] = useState(false);
  const [showLangDropdown, setShowLangDropdown] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [headerState, setHeaderState] = useState("visible"); // 'visible', 'hidden', 'topFixed'
  const [country, setCountry] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todas las categorías");
  const headerRef = useRef(null);
  const { cart, user, dispatch, shippingDetails } = useCart();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const headerHeight = headerRef.current
        ? headerRef.current.offsetHeight
        : 0;

      if (currentScrollY > lastScrollY && currentScrollY > headerHeight) {
        // Scrolling Down and past the header
        if (headerState !== "hidden") setHeaderState("hidden");
      } else if (currentScrollY < lastScrollY && currentScrollY > 0) {
        // Scrolling Up (not at top)
        if (headerState !== "topFixed") setHeaderState("topFixed");
      } else if (currentScrollY === 0) {
        // At the very top
        if (headerState !== "visible") setHeaderState("visible");
      }
      setLastScrollY(currentScrollY <= 0 ? 0 : currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, headerState]);

  useEffect(() => {
    if (!shippingDetails?.country) {
      fetch("https://ipapi.co/json/")
        .then((res) => res.json())
        .then((data) => {
          if (data && data.country_name) {
            setCountry(data.country_name);
          }
        })
        .catch(() => {});
    }
  }, [shippingDetails]);

  const displayCountry = shippingDetails?.country || country || "Country";

  const desktopNavLinks = [
    { name: "Todo", icon: FaBars },
    "Ofertas del Día",
    "Servicio al Cliente",
    "Registro",
    "Tarjetas de Regalo",
  ];

  const secondaryNavLinks = [
    "Video",
    "Ofertas",
    "Amazon Basics",
    "Más Vendidos",
    "Transmisiones",
    "Prime",
    "Tarjetas de Regalo",
    "Comprar de Nuevo",
    "Servicio al Cliente",
    "Hogar y Cocina",
    "Electrónicos",
    "Libros",
    "Moda",
    "Juguetes y Juegos",
    "Salud y Cuidado Personal",
    "Belleza y Cuidado Personal",
    "Deportes y Aire Libre",
    "Automotriz",
    "Cupones",
    "Ideas de Regalo",
  ];

  // Sign out handler
  const handleSignOut = async () => {
    await auth.signOut();
    dispatch({ type: ACTIONS.SET_USER, payload: null });
    toast.success("¡Sesión cerrada exitosamente!");
  };

  return (
    <header
      ref={headerRef}
      className={`
        ${styles.headerWrapper}
        ${headerState === "hidden" ? styles.headerHidden : ""}
        ${headerState === "topFixed" ? styles.headerTopFixed : ""}
      `}
    >
      {/* Top Row */}
      <div className={styles.topRow}>
        <div className={styles.leftSection}>
          <button
            className={`${styles.menuBtn} ${
              isMobile ? "" : styles.hideOnDesktopFlex
            }`}
            onClick={() => setShowMenu(!showMenu)}
          >
            <FaBars />
          </button>
          <Link to="/" className={styles.logoLink}>
            <img src={nav_logo} alt="Amazon Logo" className={styles.logo} />
          </Link>
          {/* DeliverTo for DESKTOP - hidden on mobile via CSS */}
          <Link
            to="/shipping"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div className={`${styles.deliverTo} ${styles.deliverToDesktop}`}>
              <FaMapMarkerAlt className={styles.locationIcon} />
              <div className={styles.deliverTextWrap}>
                <span className={styles.deliverLabel}>Enviar a</span>
                <span className={styles.deliverCountry}>Colombia</span>
              </div>
            </div>
          </Link>
        </div>

        {/* Center: Search Bar */}
        <form className={styles.searchBar}>
          <select 
            className={styles.searchDropdown} 
            title="Search category"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="Todas las categorías">Todas las categorías</option>
            <option value="Automotriz">Automotriz</option>
            <option value="Bebé">Bebé</option>
            <option value="Belleza y cuidado personal">Belleza y cuidado personal</option>
            <option value="Computadoras">Computadoras</option>
            <option value="Electrodomésticos">Electrodomésticos</option>
            <option value="Equipaje">Equipaje</option>
            <option value="Herramientas">Herramientas</option>
            <option value="Mascotas">Mascotas</option>
            <option value="Juguetes">Juguetes</option>
            <option value="Moda para Niños">Moda para Niños</option>
            <option value="Moda para Niñas">Moda para Niñas</option>
            <option value="Moda para Hombre">Moda para Hombre</option>
            <option value="Moda para Mujer">Moda para Mujer</option>
            <option value="Software">Software</option>
            <option value="Video Juegos">Video Juegos</option>
            <option value="Joyería">Joyería</option>
            <option value="Celulares">Celulares</option>
          </select>
          <input
            className={styles.searchInput}
            placeholder="Buscar en Amazon"
            aria-label="Buscar en Amazon"
          />
          <button className={styles.searchBtn} type="submit" title="Search">
            <FaSearch />
          </button>
        </form>

        {/* Right: Language, Account, Orders, Cart */}
        <div className={styles.rightSection}>
          <div
            className={`${styles.langWrap} ${styles.hideOnMobile}`}
            onMouseEnter={() => setShowLangDropdown(true)}
            onMouseLeave={() => setShowLangDropdown(false)}
          >
            <img src={usa_flag} alt="ES" className={styles.flag} />
            <span className={styles.langText}>ES</span>
            <FiChevronDown className={styles.chevronIcon} />
            {showLangDropdown && (
              <div className={styles.dropdownMenu}>
                <div>ES - Español</div>
                <div>EN - English</div>
                <div>DE - Deutsch</div>
              </div>
            )}
          </div>
          {/* Account & Lists - Adapts for mobile */}
          <div
            className={styles.accountWrap}
            onMouseEnter={() => setShowAccountDropdown(true)}
            onMouseLeave={() => setShowAccountDropdown(false)}
          >
            <FaUser
              className={`${styles.accountIcon} ${styles.showOnMobile}`}
            />
            {isMobile ? (
              user ? (
                <>
                  <span className={styles.smallText}>
                    Hola,{` `}
                    {user.reloadUserInfo?.displayName ||
                      user.displayName ||
                      (user.email
                        ? user.email.split("@")[0]
                        : user.reloadUserInfo?.email?.split("@")[0])}
                  </span>
                  <span
                    className={styles.boldText}
                    onClick={handleSignOut}
                    style={{ cursor: "pointer" }}
                  >
                    Sign Out
                  </span>
                </>
              ) : (
                <Link
                  to="/auth/signin"
                  className={`${styles.boldText} ${styles.signInMobile}`}
                >
                  Iniciar Sesión{" "}
                  <FiChevronDown className={styles.chevronIconMobileSignIn} />
                </Link>
              )
            ) : user ? (
              <>
                <span className={styles.smallText}>
                  Hola,{` `}
                  {user.reloadUserInfo?.displayName ||
                    user.displayName ||
                    (user.email
                      ? user.email.split("@")[0]
                      : user.reloadUserInfo?.email?.split("@")[0])}
                </span>
                <span className={styles.boldText}>
                  Cuenta y Listas{" "}
                  <FiChevronDown className={styles.chevronIcon} />
                </span>
              </>
            ) : (
              <>
                <span className={styles.smallText}>Hola, inicia sesión</span>
                <Link to="/auth/signin" className={styles.boldText}>
                  Cuenta y Listas{" "}
                  <FiChevronDown className={styles.chevronIcon} />
                </Link>
              </>
            )}
            {showAccountDropdown && (
              <div className={styles.dropdownMenu}>
                {user ? (
                  <>
                    <Link to="/account">Tu Cuenta</Link>
                    <Link to="/orders">Tus Pedidos</Link>
                    <span onClick={handleSignOut} style={{ cursor: "pointer" }}>
                      Cerrar Sesión
                    </span>
                  </>
                ) : (
                  <>
                    <Link to="/auth/signin">Iniciar Sesión</Link>
                    <Link to="/orders">Tus Pedidos</Link>
                  </>
                )}
              </div>
            )}
          </div>

          <div className={`${styles.ordersWrap} ${styles.hideOnMobile}`}>
            <span className={styles.smallText}>Devoluciones</span>
            <Link to="/orders" className={styles.boldText}>
              y Pedidos
            </Link>
          </div>
          {/* Cart  */}
          <Link to="/cart" className={styles.cartWrap}>
            <HiOutlineShoppingCart className={styles.cartIcon} />
            <span className={styles.cartCount}>
              {cart.reduce((sum, item) => sum + item.quantity, 0)}
            </span>
            <span className={styles.cartText}>Carrito</span>
          </Link>
        </div>
      </div>
      {/* Secondary Nav Links (Scrollable on Mobile) */}
      <nav
        className={`
          ${styles.bottomRow}
          ${headerState !== "visible" ? styles.bottomRowHidden : ""}
        `}
      >
        {isMobile
          ? secondaryNavLinks.map((link) => (
              <span key={link} className={styles.navLink}>
                {link}
              </span>
            ))
          : desktopNavLinks.map((link) =>
              typeof link === "string" ? (
                <span key={link} className={styles.navLink}>
                  {link}
                </span>
              ) : (
                <span
                  key={link.name}
                  className={`${styles.navLink} ${styles.navLinkWithIcon}`}
                >
                  <link.icon className={styles.navIcon} />
                  {link.name}
                </span>
              )
            )}
      </nav>

      <div
        className={`
          ${styles.deliverTo}
          ${styles.deliverToMobile}
          ${headerState !== "visible" ? styles.bottomRowHidden : ""} 
        `}
      >
        <Link
          to="/shipping"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <div className={styles.deliverToMobile}>
            <FaMapMarkerAlt className={styles.locationIcon} />
            <span>Enviar a Colombia</span>
          </div>
        </Link>
      </div>

      {/* Responsive Mobile Menu (triggered by top-left hamburger) */}
      {/* Hamburger Mobile Menu Overlay */}
      <div
        className={`${styles.mobileMenu} ${
          showMenu ? styles.mobileMenuOpen : ""
        }`}
        style={{ pointerEvents: showMenu ? "auto" : "none" }}
      >
                 <div className={styles.mobileMenuHeader}>
           <FaUser className={styles.accountIcon} />
           <h3 style={{ flex: 1 }}>
             Hola,{" "}
             {user ? (
               user.displayName || user.email
             ) : (
               <Link to="/auth/signin">Identifícate</Link>
             )}
           </h3>
          <button
            className={styles.menuCloseBtn}
            aria-label="Close menu"
            onClick={() => setShowMenu(false)}
            style={{
              background: "none",
              border: "none",
              color: "white",
              fontSize: "1.5rem",
              cursor: "pointer",
            }}
          >
            ×
          </button>
        </div>
        <Link
          to="/"
          className={styles.navLink}
          onClick={() => setShowMenu(false)}
        >
          Home
        </Link>
        <span className={styles.navLink}>Shop by Department</span>
        <Link
          to="/results"
          className={styles.navLink}
          onClick={() => setShowMenu(false)}
        >
          Today's Deals
        </Link>
        <div className={styles.mobileMenuItem}>
          <Link
            to="/orders"
            className={styles.navLink}
            onClick={() => setShowMenu(false)}
          >
            Your Orders
          </Link>
        </div>
        <div className={styles.mobileMenuItem}>
          <span className={styles.navLink}>Language: ES</span>
        </div>
        <span className={styles.navLink}>Customer Service</span>
        <span className={styles.navLink}>Settings</span>
        <span
          className={styles.navLink}
          onClick={() => {
            handleSignOut();
            setShowMenu(false);
          }}
          style={{ cursor: "pointer" }}
        >
          Sign Out
        </span>
      </div>
    </header>
  );
}

export default Header;
