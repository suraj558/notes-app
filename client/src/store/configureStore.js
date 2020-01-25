import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import userReducer from '../reducers/userReducer'
import categoriesReducer from '../reducers/categoryReducer'
import notesReducer from '../reducers/noteReducer'

const configureStore = () => {
    const store = createStore(combineReducers({
        user: userReducer,
        categories: categoriesReducer,
        notes: notesReducer,
    }), applyMiddleware(thunk))
    return store
}

export default configureStore