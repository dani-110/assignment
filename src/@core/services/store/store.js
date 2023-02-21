import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import autoMergeLevel1 from 'redux-persist/lib/stateReconciler/autoMergeLevel1';
import tokenReducer from './token/reducer';
import UserReducer from './user/reducer'
import filterReducer from './isFilter/reducer'
import infoReducer from './info/reducer'
import contactReducer from './contact/reducer'


const rootReducer = combineReducers({
    tokenReducer,
    UserReducer,
    filterReducer,
    infoReducer,
    contactReducer
})

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    stateReconciler: autoMergeLevel1,
    blackList: [''],
    whiteList: ['tokenReducer', 'UserReducer', 'contactReducer']
}
const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(persistedReducer, applyMiddleware(thunk));
store.subscribe(() => store.getState())
export const persistor = persistStore(store);
export default store;

