import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import autoMergeLevel1 from 'redux-persist/lib/stateReconciler/autoMergeLevel1';
import { favMovieReducer } from './FavMovie/reducer'

const rootReducer = combineReducers({
    favMovieReducer
})

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    stateReconciler: autoMergeLevel1,
    blackList: [],
    whiteList: ['favMovieReducer']
}
const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(persistedReducer, applyMiddleware(thunk));
store.subscribe(() => store.getState())
export const persistor = persistStore(store);
export default store;



// import themeReducer from './theme/reducer';

// const rootReducer = combineReducers({
//     themeReducer
// })

// const persistConfig = {
//     key: 'root',
//     storage: AsyncStorage,
//     stateReconciler: autoMergeLevel1,
//     blackList: ['themeReducer'],
//     whitelist: ['themeReducer'], // have already data after app kills
// }

// const persistedReducer = persistReducer(persistConfig, rootReducer);
// const store = createStore(persistedReducer, applyMiddleware(thunk));
// store.subscribe(() => store.getState())
// export const persistor = persistStore(store);
// export default store;