import React, { useState, useEffect, useRef } from "react";
import styles from "./header.module.css";
import { FaSearch, FaBars, FaMapMarkerAlt, FaUser, FaTimes } from "react-icons/fa";
import { HiOutlineShoppingCart } from "react-icons/hi2";
import { FiChevronDown } from "react-icons/fi";
import { Link } from "react-router-dom";
import nav_logo from "../../assets/Images/nav_log.png";
import usa_flag from "../../assets/Images/usa_flag.png";
import { useCart } from "../DataProvider/DataProvider";
import { ACTIONS } from "../../Utility/actions";
import { toast } from "react-toastify";

// Importar las categorías del componente Category
import { categories as categoryList } from "../Category/Category";

function Header() {
  const [showAccountDropdown, setShowAccountDropdown] = useState(false);
  const [showLangDropdown, setShowLangDropdown] = useState(false);
  // Estados para el menú desplegable
  const [showMenu, setShowMenu] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const menuRef = useRef(null);
  
  // Cerrar menú al hacer clic fuera
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  // Categorías para el menú desplegable
  const categories = [
    { name: 'Ofertas del Día', icon: '🔥' },
    ...categoryList.map(cat => ({ name: cat.title, icon: '📦' }))
  ];
  
  // Efecto para depuración
  useEffect(() => {
    console.log('showMenu actualizado a:', showMenu);
  }, [showMenu]);
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

  // Estado y funciones para el menú lateral
  // showMenu y setShowMenu ya están declarados arriba

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
        <div className={styles.navContainer}>
          {/* Botón Todo */}
          <div className={styles.todoButtonContainer} ref={menuRef}>
            <button 
              className={styles.todoButton}
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                console.log('Botón clickeado, estado actual:', showMenu);
                
                // Forzar un nuevo renderizado asegurando que el menú se muestre
                requestAnimationFrame(() => {
                  setShowMenu(prev => {
                    const newState = !prev;
                    console.log('Nuevo estado de showMenu:', newState);
                    return newState;
                  });
                });
              }}
              aria-expanded={showMenu}
            >
              <FaBars className={styles.todoIcon} />
              <span>Todo</span>
            </button>
            
            {/* Menú desplegable - Versión simplificada */}
            <div 
              className={styles.dropdownMenu}
              style={{
                display: showMenu ? 'block' : 'none',
                position: 'fixed',
                top: '60px',
                left: '10px',
                backgroundColor: 'white',
                border: '1px solid #ddd',
                borderRadius: '4px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.15)',
                zIndex: '9999',
                width: '300px',
                padding: '10px',
                opacity: showMenu ? 1 : 0,
                transition: 'opacity 0.2s ease',
                pointerEvents: showMenu ? 'auto' : 'none'
              }}
            >
              <div className={styles.menuHeader}>
                <h3>Hola, {user ? (user.displayName || 'Usuario') : 'Invitado'}</h3>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowMenu(false);
                  }}
                  className={styles.closeButton}
                  aria-label="Cerrar menú"
                >
                  <FaTimes />
                </button>
              </div>
              <div className={styles.menuSections}>
                <div className={styles.menuSection}>
                  <h4>Buscar por departamento</h4>
                  <ul className={styles.categoriesList}>
                    {categories.map((category, index) => (
                      <li key={index} className={styles.categoryItem}>
                        <span className={styles.categoryIcon} aria-hidden="true">
                          {category.icon}
                        </span>
                        <span className={styles.categoryName}>{category.name}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className={styles.menuDivider}></div>
                <div className={styles.menuSection}>
                  <h4>Tu cuenta</h4>
                  <ul>
                    {user ? (
                      <>
                        <li>Mi perfil</li>
                        <li>Mis pedidos</li>
                        <li>Lista de deseos</li>
                        <li onClick={handleSignOut}>Cerrar sesión</li>
                      </>
                    ) : (
                      <>
                        <li>Iniciar sesión</li>
                        <li>Crear cuenta</li>
                      </>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          {isMobile ? (
            secondaryNavLinks.map((link) => (
              <span key={link} className={styles.navLink}>
                {link}
              </span>
            ))
          ) : (
            desktopNavLinks.map((link, index) => (
              <span 
                key={link} 
                className={styles.navLink}
                style={{ 
                  fontWeight: index === 0 ? 'bold' : 'normal',
                  color: index === 0 ? '#f08804' : 'inherit'
                }}
              >
                {link}
              </span>
            ))
          )}
        </div>
      </nav>

      {/* Menú lateral único */}

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



    </header>
  );
}

export default Header;
