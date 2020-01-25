import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { startRemoveCategory } from '../../actions/category'

function CategoryList(props) {
    const handleRemove = (id) => {
        if(window.confirm('Are you Sure?')) {
            props.dispatch(startRemoveCategory(id))
        }
    }

    return (
        <div className="container mt-5" style={{width: '50rem'}}>
            <h2>Categories - {props.categories.length} </h2>
            <table className="table">
                <thead>
                    <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Name</th>
                    <th scope="col">Show</th>
                    <th scope="col">Edit</th>
                    <th scope="col">Remove</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        props.categories.map((category, index) => {
                            return (
                                <tr key={category._id}>
                                    <th scope="row">{ index + 1 }</th>
                                    <td>{ category.name }</td>
                                    <td><Link to={`/categories/show/${category._id}`} className="btn btn-primary">Show</Link></td>
                                    <td><Link to={`/categories/${category._id}`} className="btn btn-secondary">Edit</Link></td>
                                    <td><button className="btn btn-danger" onClick={ () => {
                                        handleRemove(category._id)
                                    }} >Remove</button></td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
            <Link to="/categories/new">Add Category</Link>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        categories: state.categories
    }
}

export default connect(mapStateToProps)(CategoryList)