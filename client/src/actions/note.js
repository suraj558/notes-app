import axios from "../config/axios"

export const setNotes = (notes) => {
    return {
        type: 'SET_NOTES',
        payload: notes
    }
}

export const startSetNotes = () => {
    return (dispatch) => {
        axios.get('/notes', {
            headers: {
                'x-auth': localStorage.getItem('x-auth')
            }
        })
            .then((response) => {
                const notes = response.data
                dispatch(setNotes(notes))
            })
            .catch((err) => {
                window.alert(err)
            })
    }   
}

export const addNote = (note) => {
    return {
        type: 'ADD_NOTE',
        payload: note
    }
}

export const startAddNote = (formData, props) => {
    return (dispatch) => {
        axios.post('/notes', formData, {
            headers: {
                'x-auth': localStorage.getItem('x-auth')
            }
        })
            .then((response) => {
                if(response.data.message) {
                    window.alert(response.data.message)
                } else {
                    dispatch(addNote(response.data))
                    props.history.push('/notes')
                }
            })
            .catch((err) => {
                window.alert(err)
            })
    }   
}

export const editNote = (note) => {
    return {
        type: 'EDIT_NOTE', 
        payload: note
    }
}

export const startEditNote = (formData, props) => {
    return (dispatch) => {
        axios.put(`/notes/${props.match.params.id}`, formData, {
            headers: {
                'x-auth': localStorage.getItem('x-auth')
            }
        })
            .then((response) => {
                if(response.data.message) {
                    window.alert(response.data.message)
                } else {
                    dispatch(editNote(response.data))
                    props.history.push('/notes')
                }
            })
            .catch((err) => {
                window.alert(err)
            })
    }
}

export const removeNote = (id) => {
    return {
        type: 'REMOVE_NOTE',
        payload: id
    }
}

export const startRemoveNote = (id) => {
    return (dispatch) => {
        axios.delete(`/notes/${id}`, {
            headers: {
                'x-auth': localStorage.getItem('x-auth')
            }
        })
            .then(() => {
                dispatch(removeNote(id))
            })
            .catch((err) => {
                window.alert(err)
            })
    }
}