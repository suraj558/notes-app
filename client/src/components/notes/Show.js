import React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

function Show(props) {
    return (
        <div className="container mt-5">
            <h2>{ props.note.title } - { props.note.body } - { props.note.category && props.note.category.name }</h2>
            <hr/>
            
        </div>
    )
}

const mapStateToProps = (state, props) => {
    return {
        note: state.notes.find(note => note._id === props.match.params.id) || {}
        
    }
}

export default connect(mapStateToProps)(Show)