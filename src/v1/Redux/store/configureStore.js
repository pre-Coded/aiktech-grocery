import { createStore, applyMiddleware } from 'redux';

import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../sagas';
import { actionsCreator } from '../actions/actionsCreator';
import rootReducer from '../reducers';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage,
}
const persistedReducer = persistReducer(persistConfig, rootReducer)

const sagaMiddleware = createSagaMiddleware();
const composeEnhancers = composeWithDevTools({
  actionsCreator,
  trace: true,
  traceLimit: 25,
});
const isDebugMode = process.env.REACT_APP_DEBUG_MODE === 'true';

export default function configureStore() {
  let store = createStore(
    persistedReducer,
    isDebugMode
      ? composeEnhancers(applyMiddleware(sagaMiddleware))
      : applyMiddleware(sagaMiddleware)
  );
  let persistor = persistStore(store)
  sagaMiddleware.run(rootSaga);

  return { store, sagaMiddleware, persistor };
}
