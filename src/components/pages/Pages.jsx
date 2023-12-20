import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "../home/Home";
import About from "../about/About";
import Pricing from "../pricing/Pricing";
import Blog from "../blog/Blog";
import Services from "../services/Services";
import Contact from "../contact/Contact";
import Login from "../login/Login";
import Register from "../register/Register";
import Header from "../common/header/Header";
import Footer from "../common/footer/Footer";
import Profile from "../profile/Profile";
import ChangePassWord from "../changpassword/ChangPassWord";
import ManageUser from "../listUser/ManageUser";
import ManagerRoom from "../listRoom/ManageRoom";

const Pages = () => {
  return (
    <>
      <Router>
        <Header />
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/changepass" component={ChangePassWord} />
          <Route exact path="/" component={Home} />
          <Route exact path="/about" component={About} />
          <Route exact path="/services" component={Services} />
          <Route exact path="/blog" component={Blog} />
          <Route exact path="/pricing" component={Pricing} />
          <Route exact path="/contact" component={Contact} />
          <Route exact path="/manageuser" component={ManageUser} />
          <Route exact path="/manageroom" component={ManagerRoom} />
        </Switch>
        <Footer />
      </Router>
    </>
  );
};

export default Pages;
