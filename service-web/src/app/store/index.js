import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import createSagaMiddleware from 'redux-saga';
import {persistStore, persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import logger from 'redux-logger';
import uiModule from './ui';

const sagaMiddleware = createSagaMiddleware();

const persistConfig = {
    key: 'root',
    storage,
};

export const store = createStore(
    persistReducer(persistConfig, combineReducers({
        ui: uiModule.reducer
    })), compose(
        applyMiddleware(sagaMiddleware),
    )
);

sagaMiddleware.run(uiModule.saga);

export const persistor = persistStore(store);

