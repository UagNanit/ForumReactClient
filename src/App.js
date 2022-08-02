import "./styles.css";
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./components/Home";
import Topic from "./components/Topic";
import AboutUs from "./components/AboutUs";
import NotFound from "./components/NotFound";
import { UserContext } from "./components/context";
import Footer from "./components/Footer";

export default function App() {
  const [userAurh, setUserAuth] = useState(null);

  return (
    <UserContext.Provider
      value={{
        userConAuth: userAurh,
        setUserConAuth: (val) => setUserAuth(val)
      }}
    >
      <Router>
        <div className="App">
          <Layout>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/topic/:id" component={Topic} />
              <Route exact path="/about-us" component={AboutUs} />
              <Route children={NotFound} />
            </Switch>
          </Layout>
        </div>
      </Router>
    </UserContext.Provider>
  );
}
