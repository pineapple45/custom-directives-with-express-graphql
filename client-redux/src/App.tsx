import { config } from 'dotenv';
import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux';

import Login from './components/Login';
import Register from './components/Register';
import Album from './pages/Album';
import Post from './pages/Post';
import Admin from './pages/Admin';
import Users from './pages/Admin/Users';
import Moderator from './pages/Moderator';
import PostForAdmin from './pages/Admin/Post';
import PostForModerator from './pages/Moderator/Post';
import Error404 from './components/404/404';
import AuthenticatedRoute from './routes/AuthenticatedRoutes';
import AuthorizedRoutes from './routes/AuthorizedRoutes';
import { Role } from './redux/constants';
config();
// import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

function App() {
  // const client = new ApolloClient({
  //   uri:
  //     process.env.NODE_ENV === 'production'
  //       ? process.env.BACKEND_URL
  //       : process.env.BACKEND_URL_DEV,
  //   cache: new InMemoryCache(),
  // });

  return (
    // <ApolloProvider client={client}>
    <Provider store={store}>
      <BrowserRouter>
        {/* <Home /> */}
        <Switch>
          {/* <Route path="/moderator/post/:id" component={PostForModerator} /> */}
          <AuthorizedRoutes
            component={PostForModerator}
            path="/moderator/post/:id"
            role={Role.MODERATOR}
          />
          {/* <Route path="/moderator" component={Moderator} /> */}
          <AuthorizedRoutes
            component={Moderator}
            path="/moderator"
            exact
            role={Role.MODERATOR}
          />
          {/* <Route path="/admin/users" component={Users} /> */}
          <AuthorizedRoutes
            component={Users}
            path="/admin/users"
            role={Role.ADMIN}
          />
          {/* <Route path="/admin/post/:id" component={PostForAdmin} /> */}
          <AuthorizedRoutes
            component={PostForAdmin}
            path="/admin/post/:id"
            role={Role.ADMIN}
          />
          {/* <Route path="/admin" component={Admin} /> */}
          <AuthorizedRoutes
            path="/admin"
            exact
            component={Admin}
            role={Role.ADMIN}
          />
          <Route path="/post/:id" component={Post} />
          <Route path="/login" component={Login} />
          <Route path="/register" exact component={Register} />
          <Route path="/" exact component={Album} />
          <Route component={Error404} />
        </Switch>
      </BrowserRouter>
    </Provider>
    // </ApolloProvider>
  );
}

export default App;
