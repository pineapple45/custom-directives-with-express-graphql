import React from "../../pkg/react.js";
import Navbar from "../NavBar/index.js";
import Footer from "../Footer/index.js";
const Layout = ({children}) => {
  return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(Navbar, null), /* @__PURE__ */ React.createElement("br", null), children, /* @__PURE__ */ React.createElement(Footer, null));
};
export default Layout;
