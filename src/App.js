import React, { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import Routes from "./components/Routes";
import NavBar from "./components/NavBar";
import JoblyApi from "./helpers/JoblyApi";
import UserContext from "./userContext";

function App() {
  const [_token, setToken] = useState({ _token: "" });
  const [user, setUser] = useState({});

  async function signIn() {
    let jwt = JSON.parse(window.localStorage.getItem("_token"));
    if (jwt) {
      setUser(jwt);
      let tokens = jwt.split(".");
      let data = JSON.parse(atob(tokens[1]));
      let userInfo = await JoblyApi.getCurrUser(data.username, {
        _token: jwt,
      });
      setToken(jwt);
      setUser(userInfo);
      console.log(userInfo);
    }
  }
  useEffect(() => {
    signIn();
  }, []);

  const signOut = () => {
    window.localStorage.removeItem("_token");
    setUser(null);
    setToken(null);
  };
  return (
    <BrowserRouter className="App ">
      <UserContext.Provider value={{ _token, user, signOut, signIn }}>
        <NavBar></NavBar>
        <Routes></Routes>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
