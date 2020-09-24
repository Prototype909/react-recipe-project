import { resetLoginForm } from './loginForm'
import { getMyRecipes } from './myRecipes'

// synchronous action creators
export const setCurrentUser = user => {
    return {
        type: "SET_CURRENT_USER",
        user
    }
}

export const clearCurrentUser = () => {
    return {
        type: "CLEAR_CURRENT_USER"
    }
}

// asynchronous action creators
export const login = credentials => {
    return dispatch => {
        return fetch("http://localhost:3001/login", {
            credentials: "include",
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(credentials)
        })
        .then(res => res.json())
        .then(response => {
            if (response.error) {
                alert(response.error)
            } else {
                dispatch(setCurrentUser(response.data))
                dispatch(getMyRecipes())
                dispatch(resetLoginForm())
            }
        })
        .catch(console.log)
    }
}

export const logout = () => {
    return dispatch => {
        dispatch(clearCurrentUser())
        return fetch("http://localhost:3001/logout", {
            credentials: "include",
            method: "DELETE"
        })
    }
}

export const getCurrentUser = () => {
    return dispatch => {
        return fetch("http://localhost:3001/get_current_user", {
            credentials: "include",
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        })
        .then(res => res.json())
        .then(response => {
            // debugger
            if (response.error) {
                alert(response.error)
            } else {
                dispatch(setCurrentUser(response.data))
                dispatch(getMyRecipes())
            }
        })
        .catch(console.log)
    }
}
