

import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { PERSIST } from "redux-persist"
import persistReducer from "redux-persist/es/persistReducer"
import persistStore from "redux-persist/es/persistStore"
import storage from "redux-persist/lib/storage"
import examSlice from './examSlice';
import testReducer from './testSlice';

const persistConfig={
    key:'exam',
    storage
}
const persistConfigTest={
    key:'test',
    storage
}


const rootReducer=combineReducers({
    exam:persistReducer(persistConfig,examSlice.reducer),
    test:persistReducer(persistConfigTest,testReducer)
})

export const store=configureStore({
    reducer:rootReducer,
    middleware:(getDefaultMiddleware)=>
    getDefaultMiddleware({
        serializableCheck:{
            ignoredActions:[PERSIST]
        }
    })
});

export const persistor=persistStore(store);
