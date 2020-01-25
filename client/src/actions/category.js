import axios from "../config/axios"

export const setCategories = (categories) => {
    return {
        type: 'SET_CATEGORIES',
        payload: categories
    }
}

export const startSetCategories = () => {
    return (dispatch) => {
        axios.get('/categories', {
            headers: {
                'x-auth': localStorage.getItem('x-auth')
            }
        })
            .then((response) => {
                dispatch(setCategories(response.data))
            })
            .catch((err) => {
                window.alert(err)
            })
    }
}

export const addCategory = (category) => {
    return {
        type: 'ADD_CATEGORY',
        payload: category
    }
}

export const startAddCategory = (formData, props) => {
    return (dispatch) => {
        axios.post('/categories', formData, {
            headers: {
                'x-auth': localStorage.getItem('x-auth')
            }
        })
            .then((response) => {
                if(response.data.message) {
                    window.alert(response.data.message)
                } else {
                    dispatch(addCategory(response.data))
                    props.history.push('/categories')
                }
            })
            .catch((err) => {
                window.alert(err)
            })
    }   
}

export const editCategory = (category) => {
    return {
        type: 'EDIT_CATEGORY', 
        payload: category
    }
}

export const startEditCategory = (formData, props) => {
    return (dispatch) => {
        axios.put(`/categories/${props.match.params.id}`, formData, {
            headers: {
                'x-auth': localStorage.getItem('x-auth')
            }
        })
            .then((response) => {
                if(response.data.message) {
                    window.alert(response.data.message)
                } else {
                    dispatch(editCategory(response.data))
                    props.history.push('/categories')
                }
            })
            .catch((err) => {
                window.alert(err)
            })
    }
}

export const removeCategory = (id) => {
    return {
        type: 'REMOVE_CATEGORY',
        payload: id
    }
}

export const startRemoveCategory = (id) => {
    return (dispatch) => {
        axios.delete(`/categories/${id}`, {
            headers: {
                'x-auth': localStorage.getItem('x-auth')
            }
        })
            .then(() => {
                dispatch(removeCategory(id))
            })
            .catch((err) => {
                window.alert(err)
            })
    }
}