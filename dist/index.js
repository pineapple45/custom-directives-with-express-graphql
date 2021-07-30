import * as __SNOWPACK_ENV__ from './env.js';
import.meta.env = __SNOWPACK_ENV__;

import React from "./pkg/react.js";
import ReactDOM from "./pkg/react-dom.js";
import App from "./App.js";
import "./index.css.proxy.js";
ReactDOM.render(/* @__PURE__ */ React.createElement(App, null), document.getElementById("root"));
if (undefined /* [snowpack] import.meta.hot */ ) {
  undefined /* [snowpack] import.meta.hot */ .accept();
}
