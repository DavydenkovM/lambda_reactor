import { combineReducers } from 'redux'
import locationReducer from './location'

import visitors from "../reducers/visitors";
import ws from "../reducers/ws";

export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    location: locationReducer,
    visitors,
    ws,
    ...asyncReducers
  })
}

export const injectReducer = (store, { key, reducer }) => {
  if (Object.hasOwnProperty.call(store.asyncReducers, key)) {
    return
  }

  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer
