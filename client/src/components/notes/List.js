import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { startRemoveNote } from '../../actions/note'

function List(props) {
    const handleRemove = (id) => {
        if(window.confirm('Are you Sure?')) {
            props.dispatch(startRemoveNote(id))
        }
    }

    return (
        <div className="container mt-5">
            <h2>Notes - {props.notes.length} </h2>
            <table className="table">
                <thead>
                    <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Title</th>
                    <th scope="col">Body</th>
                    <th scope="col">Category</th>
                    <th scope="col">Show</th>
                    <th scope="col">Edit</th>
                    <th scope="col">Remove</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        props.notes.map((note, index) => {
                            return (
                                <tr key={note._id}>
                                    <th scope="row">{ index + 1 }</th>
                                    <td>{ note.title }</td>
                                    <td>{ note.body}</td>
                                    <td>{ note.category && note.category.name }</td>
                                    <td><Link to={`/notes/show/${note._id}`} className="btn btn-primary">Show</Link></td>
                                    <td><Link to={`/notes/${note._id}`} className="btn btn-secondary">Edit</Link></td>
                                    <td><button className="btn btn-danger" onClick={ () => {
                                        handleRemove(note._id)
                                    }} >Remove</button></td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
            <Link to="/notes/new">Add Notes</Link>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        notes: state.notes
    }
}

export default connect(mapStateToProps)(List)