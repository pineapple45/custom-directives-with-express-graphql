import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';

const middlewares = [thunk];

const userDataFromStorage = localStorage.getItem('userData')
  ? JSON.parse(localStorage.getItem('userData')!)
  : null;

const startState: any = {
  loginUser: { data: userDataFromStorage, loading: false, error: null },
};

export const store = createStore(
  reducers,
  startState,
  composeWithDevTools(applyMiddleware(...middlewares))
);

export type RootState = ReturnType<typeof reducers>;
