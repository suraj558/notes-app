import axios from '../config/axios'
import { startSetCategories } from './category'
import { startSetNotes } from './note'
import { setCategories } from './category'
import { setNotes } from './note'


export const setUser = (user) => {
    return {
        type: 'SET_USER',
        payload: user
    }
}

export const startSetUser = () => {
    return (dispatch) => {
        axios.get('/users/account', {
            headers: {
                'x-auth': localStorage.getItem('x-auth')
            }
        })
            .then((response) => {
                if(response.data.name === 'JsonWebTokenError'){
                    localStorage.clear('x-auth')
                    window.location.href = '/user/login'
                } else {
                    const user = response.data
                    dispatch(setUser(user))
                    dispatch(startSetCategories())
                    dispatch(startSetNotes())
                    
                }
            })
            .catch(() => {
                localStorage.clear('x-auth')
                window.location.href = '/user/login'
            })
    }   
}

export const startLoginUser = (formData, props) => {
    return (dispatch) => {
        axios.post('/users/login', formData)
            .then((response) => {
                const { token } = response.data
                if(token){
                    localStorage.setItem('x-auth', token)
                    dispatch(startSetUser())
                    props.history.push('/')
                } else {
                    window.alert(response.data)
                }
            })
            .catch((err) => {
                window.alert(err)
            })
    }
}

export const startRegisterUser = (formData, props) => {
    return (dispatch) => {
        axios.post('/users/register', formData)
            .then((response) => {
                if(response.data.errors) {
                    window.alert(response.data.message)
                } else if(response.data.errmsg) {
                    window.alert(response.data.errmsg)
                } else {
                    window.alert('Registered')
                    dispatch(setUser({}))
                    props.history.push('/user/login')
                }
            })
            .catch((err) => {
                window.alert(err)
            })
    }
}

export const startRemoveUser = () => {
    return (dispatch) => {
        axios.delete('/users/logout', {
            headers: {
                'x-auth': localStorage.getItem('x-auth')
            }
        })
            .then((response) => {
                window.alert(response.data)
                localStorage.clear('x-uath')
                dispatch(setUser({}))
                dispatch(setCategories([{}]))
                dispatch(setNotes([{}]))
                
            })
            .catch((err) => {
                window.alert(err)
            })
    }
}