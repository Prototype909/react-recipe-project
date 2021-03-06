// Redux store
import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import currentUser from './reducers/currentUser'
import loginForm from './reducers/loginForm'
import myRecipes from './reducers/myRecipes'
import signupForm from './reducers/signupForm'
import thunk from 'redux-thunk'

// displaying different syntax options
const reducer = combineReducers({
    currentUser,
    loginForm,
    myRecipes,
    signupForm,
})

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, composeEnhancer(applyMiddleware(thunk)))

export default store