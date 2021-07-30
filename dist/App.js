import * as __SNOWPACK_ENV__ from '../_snowpack/env.js';

import {config} from "../_snowpack/pkg/dotenv.js";
import React from "../_snowpack/pkg/react.js";
import {BrowserRouter, Switch, Route} from "../_snowpack/pkg/react-router-dom.js";
import {ApolloProvider} from "../_snowpack/pkg/@apollo/client.js";
import Album from "./pages/Album/index.js";
import Error404 from "./pages/404/404.js";
import Login from "./pages/Login/index.js";
import Register from "./pages/Register/index.js";
import Post from "./pages/Post/index.js";
import AuthorizedRoute from "./routes/AuthorizedRoute.js";
import AuthProvider from "./context/AuthProvider.js";
import Admin from "./pages/Admin/index.js";
import Users from "./pages/Admin/Users/index.js";
import PostForAdmin from "./pages/Admin/Post/index.js";
import Moderator from "./pages/Moderator/index.js";
import PostForModerator from "./pages/Moderator/Post/index.js";
import client from "./lib/apollo-client.js";
import {Role} from "./routes/AuthorizedRoute.js";
import "./App.css.proxy.js";
config();
console.log("backend_uri", __SNOWPACK_ENV__.SNOWPACK_PUBLIC_BACKEND_URI);
const App = () => {
  return /* @__PURE__ */ React.createElement(ApolloProvider, {
    client: client({})
  }, /* @__PURE__ */ React.createElement(BrowserRouter, null, /* @__PURE__ */ React.createElement(AuthProvider, null, /* @__PURE__ */ React.createElement(Switch, null, /* @__PURE__ */ React.createElement(AuthorizedRoute, {
    component: PostForModerator,
    path: "/moderator/post/:id",
    role: Role.MODERATOR
  }), /* @__PURE__ */ React.createElement(AuthorizedRoute, {
    component: Moderator,
    path: "/moderator",
    exact: true,
    role: Role.MODERATOR
  }), /* @__PURE__ */ React.createElement(AuthorizedRoute, {
    component: Users,
    path: "/admin/users",
    role: Role.ADMIN
  }), /* @__PURE__ */ React.createElement(AuthorizedRoute, {
    component: PostForAdmin,
    path: "/admin/post/:id",
    role: Role.ADMIN
  }), /* @__PURE__ */ React.createElement(AuthorizedRoute, {
    path: "/admin",
    exact: true,
    component: Admin,
    role: Role.ADMIN
  }), /* @__PURE__ */ React.createElement(Route, {
    path: "/post/:id",
    component: Post
  }), /* @__PURE__ */ React.createElement(Route, {
    path: "/login",
    exact: true,
    component: Login
  }), /* @__PURE__ */ React.createElement(Route, {
    path: "/register",
    exact: true,
    component: Register
  }), /* @__PURE__ */ React.createElement(Route, {
    path: "/",
    exact: true,
    component: Album
  }), /* @__PURE__ */ React.createElement(Route, {
    component: Error404
  })))));
};
export default App;
