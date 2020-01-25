import React from 'react'
import { connect } from 'react-redux'
import Form from './Form'
import { startEditNote } from '../../actions/note'
import _ from 'lodash'

function Edit(props) {
    const handleSubmit = (note) => {
        props.dispatch(startEditNote(note, props))
    }
    return (
        <div className="container mt-5">
            <h2>Edit Note</h2>
            {!_.isEmpty(props.note) && <Form handleSubmit={handleSubmit} {...props.note} />}
        </div>
    )
}

const mapStateToProps = (state, props) => {
    return {
        note: state.notes.find(note => note._id === props.match.params.id)
    }
}

export default connect(mapStateToProps)(Edit)