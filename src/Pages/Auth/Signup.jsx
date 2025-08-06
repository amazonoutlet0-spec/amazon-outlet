import React, { useState } from "react";
import styles from "./auth.module.css";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import { useCart } from "../../components/DataProvider/DataProvider";
import { ACTIONS } from "../../Utility/actions";

// Images
import logo from "../../assets/Images/logo2.png";
import BG1 from "../../assets/Images/login-BG.png";
import BG2 from "../../assets/Images/login-BG2.png";
import googleIcon from "../../assets/Images/google.png";

const Signup = () => {
  const { dispatch } = useCart();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [bgLoaded, setBgLoaded] = useState(false);
  const navigate = useNavigate();

  document.title = "Amazon";

  const handleNameChange = (e) => setName(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleNameBlur = (e) => {
    if (e.target.value.trim() === "") {
      setNameError("Por favor ingresa tu nombre.");
    } else {
      setNameError("");
    }
  };

  const handleEmailBlur = (e) => {
    if (
      e.target.value === "" ||
      !e.target.value.includes("@") ||
      !e.target.value.includes(".com")
    ) {
      setEmailError("Por favor ingresa una dirección de correo válida.");
    } else {
      setEmailError("");
    }
  };

  const handlePasswordBlur = (e) => {
    if (e.target.value === "") {
      setPasswordError("Por favor ingresa tu contraseña.");
    } else if (e.target.value.length < 4) {
              setPasswordError("La contraseña es muy corta.");
    } else {
      setPasswordError("");
    }
  };

  const RegisterUser = async () => {
    if (
      nameError ||
      emailError ||
      passwordError ||
      !name ||
      !email ||
      !password
    )
      return;
    setIsLoading(true);
    
    // Mock registration
    setTimeout(() => {
      const mockUser = {
        uid: "mock-signup-user-id",
        email: email,
        displayName: name
      };
      
      dispatch({ type: ACTIONS.SET_USER, payload: mockUser });
      toast.success("¡Registro exitoso!");
      navigate("/home");
      setIsLoading(false);
    }, 1000);
  };

  const GoogleAuth = async () => {
    setIsGoogleLoading(true);
    
    // Mock Google authentication
    setTimeout(() => {
      const mockUser = {
        uid: "google-mock-signup-user-id",
        email: "mock@gmail.com",
        displayName: "Mock Google User"
      };
      
      dispatch({ type: ACTIONS.SET_USER, payload: mockUser });
      toast.success("¡Registro exitoso con Google!");
      navigate("/home");
      setIsGoogleLoading(false);
    }, 1000);
  };

  const handleBgLoad = () => setBgLoaded(true);

  return (
    <div className={styles.signinPage}>
      <div className={styles.loginNavbar}>
        <div className={styles.mainLogo}>
          <Link to="/">
            <img src={logo} className={styles.amazonLogo} alt="Amazon logo" />
          </Link>
        </div>
      </div>
      <div className={styles.loginContainer}>
        <div className={styles.loginForm}>
          <h1>Registrarse</h1>
          <form onSubmit={(e) => e.preventDefault()}>
            <div className={styles.inputGroup}>
              <label htmlFor="name">Nombre</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={handleNameChange}
                onBlur={handleNameBlur}
                placeholder="Ingresa tu nombre"
              />
              {nameError && <span className={styles.error}>{nameError}</span>}
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="email">Correo Electrónico</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={handleEmailChange}
                onBlur={handleEmailBlur}
                placeholder="Ingresa tu correo electrónico"
              />
              {emailError && <span className={styles.error}>{emailError}</span>}
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="password">Contraseña</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={handlePasswordChange}
                onBlur={handlePasswordBlur}
                placeholder="Ingresa tu contraseña"
              />
              {passwordError && <span className={styles.error}>{passwordError}</span>}
            </div>
            <button
              type="submit"
              onClick={RegisterUser}
              disabled={isLoading}
              className={styles.signinButton}
            >
              {isLoading ? <ClipLoader size={20} color="#ffffff" /> : "Registrarse"}
            </button>
          </form>
          <div className={styles.divider}>
            <span>o</span>
          </div>
          <button
            onClick={GoogleAuth}
            disabled={isGoogleLoading}
            className={styles.googleButton}
          >
            {isGoogleLoading ? (
              <ClipLoader size={20} color="#ffffff" />
            ) : (
              <>
                <img src={googleIcon} alt="Google" />
                Registrarse con Google
              </>
            )}
          </button>
          <p className={styles.signupLink}>
            ¿Ya tienes una cuenta? <Link to="/signin">Inicia sesión</Link>
          </p>
        </div>
        <div className={styles.loginImage}>
          <img
            src={bgLoaded ? BG2 : BG1}
            alt="Signup background"
            onLoad={handleBgLoad}
          />
        </div>
      </div>
    </div>
  );
};

export default Signup;
