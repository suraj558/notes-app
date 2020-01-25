import React from 'react'
import { connect } from 'react-redux'
import Form from './Form'
import { startAddNote } from '../../actions/note'

function New(props) {
    const handleSubmit = (note) => {
        props.dispatch(startAddNote(note, props))
    }
    return (
        <div className="container mt-5">
            <h2>Add Note</h2>
            <Form handleSubmit={handleSubmit} />
        </div>
    )
}

export default connect()(New)