import { useCart } from "./components/DataProvider/DataProvider";
import { ACTIONS } from "./Utility/actions";
import "./App.css";
import AppRouter from "./Router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";

function App() {
  const { dispatch } = useCart();
  
  // Mock user for local development
  useEffect(() => {
    const mockUser = {
      uid: "mock-user-id",
      email: "mock@example.com",
      displayName: "Mock User"
    };
    
    // Set mock user on component mount
    dispatch({ type: ACTIONS.SET_USER, payload: mockUser });
  }, [dispatch]);
  
  return (
    <>
      <AppRouter />
      <ToastContainer />
    </>
  );
}

export default App;
