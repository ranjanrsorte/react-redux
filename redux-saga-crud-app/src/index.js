import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import reducers from './reducers/reducers';
import rootSaga from './sagas';
import createSagaMiddleware from 'redux-saga';
import MainSagaComponent from './components/mainsagacomponent';

const appSagaMiddleware = createSagaMiddleware();

const parameterEnhancer = window.__REDUX_DEVTOOLS_EXTENSION__ || compose;

let store = createStore(reducers, applyMiddleware(appSagaMiddleware));

appSagaMiddleware.run(rootSaga);

const root = ReactDOM.createRoot(document.getElementById('root'));
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <MainSagaComponent />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
