import { config } from 'dotenv';
import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import Album from './pages/Album';
import Error404 from './pages/404/404';
import Login from './pages/Login';
import Register from './pages/Register';
import Post from './pages/Post';
import AuthorizedRoute from './routes/AuthorizedRoute';
import AuthProvider from './context/AuthProvider';
import Admin from './pages/Admin';
import Users from './pages/Admin/Users';
import PostForAdmin from './pages/Admin/Post';

import Moderator from './pages/Moderator';
import PostForModerator from './pages/Moderator/Post';
import client from './lib/apollo-client';

import { Role } from './routes/AuthorizedRoute';

import './App.css';
config();

const App: React.FC = () => {
  return (
    <ApolloProvider client={client({})}>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <AuthProvider>
          <Switch>
            <AuthorizedRoute
              component={PostForModerator}
              path="/moderator/post/:id"
              role={Role.MODERATOR}
            />

            <AuthorizedRoute
              component={Moderator}
              path="/moderator"
              exact
              role={Role.MODERATOR}
            />

            <AuthorizedRoute
              component={Users}
              path="/admin/users"
              role={Role.ADMIN}
            />

            <AuthorizedRoute
              component={PostForAdmin}
              path="/admin/post/:id"
              role={Role.ADMIN}
            />

            <AuthorizedRoute
              path="/admin"
              exact
              component={Admin}
              role={Role.ADMIN}
            />

            <Route path="/post/:id" component={Post} />
            <Route path="/login" exact component={Login} />
            <Route path="/register" exact component={Register} />
            <Route path="/" exact component={Album} />
            <Route component={Error404} />
          </Switch>
        </AuthProvider>
      </BrowserRouter>
    </ApolloProvider>
  );
};
export default App;
