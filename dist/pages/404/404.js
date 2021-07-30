import React from "../../../_snowpack/pkg/react.js";
import {Box} from "../../../_snowpack/pkg/@material-ui/core.js";
import {Link} from "../../../_snowpack/pkg/react-router-dom.js";
const Error404 = () => {
  return /* @__PURE__ */ React.createElement(Box, {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }, "404", /* @__PURE__ */ React.createElement("br", null), "Page Not Found :(", /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement(Link, {
    to: "/"
  }, "Go to home"));
};
export default Error404;
