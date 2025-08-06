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

const Signin = () => {
  const { dispatch } = useCart();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [bgLoaded, setBgLoaded] = useState(false);
  const navigate = useNavigate();

  document.title = "Amazon";

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

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

  const LogInUser = async () => {
    if (emailError || passwordError || !email || !password) return;
    setIsLoading(true);
    
    // Mock authentication
    setTimeout(() => {
      const mockUser = {
        uid: "mock-user-id",
        email: email,
        displayName: email.split("@")[0]
      };
      
      dispatch({ type: ACTIONS.SET_USER, payload: mockUser });
      toast.success("¡Sesión iniciada exitosamente!");
      navigate("/home");
      setIsLoading(false);
    }, 1000);
  };

  const GoogleAuth = async () => {
    setIsGoogleLoading(true);
    
    // Mock Google authentication
    setTimeout(() => {
      const mockUser = {
        uid: "google-mock-user-id",
        email: "mock@gmail.com",
        displayName: "Mock Google User"
      };
      
      dispatch({ type: ACTIONS.SET_USER, payload: mockUser });
      toast.success("¡Sesión iniciada exitosamente con Google!");
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
          <h1>Iniciar Sesión</h1>
          <form onSubmit={(e) => e.preventDefault()}>
            <div className={styles.inputGroup}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={handleEmailChange}
                onBlur={handleEmailBlur}
                placeholder="Enter your email"
              />
              {emailError && <span className={styles.error}>{emailError}</span>}
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={handlePasswordChange}
                onBlur={handlePasswordBlur}
                placeholder="Enter your password"
              />
              {passwordError && <span className={styles.error}>{passwordError}</span>}
            </div>
            <button
              type="submit"
              onClick={LogInUser}
              disabled={isLoading}
              className={styles.signinButton}
            >
                              {isLoading ? <ClipLoader size={20} color="#ffffff" /> : "Iniciar Sesión"}
            </button>
          </form>
          <div className={styles.divider}>
            <span>or</span>
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
                Iniciar Sesión con Google
              </>
            )}
          </button>
          <p className={styles.signupLink}>
            ¿No tienes una cuenta? <Link to="/signup">Regístrate</Link>
          </p>
        </div>
        <div className={styles.loginImage}>
          <img
            src={bgLoaded ? BG2 : BG1}
            alt="Login background"
            onLoad={handleBgLoad}
          />
        </div>
      </div>
    </div>
  );
};

export default Signin;
