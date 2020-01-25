import React from 'react'
import { connect } from 'react-redux'
import CategoryForm from './Form'
import { startAddCategory } from '../../actions/category'

function CategoryNew(props) {
    const handleSubmit = (category) => {
        props.dispatch(startAddCategory(category, props))
    }
    return (
        <div className="container mt-5">
            <h2>Add Category</h2>
            <CategoryForm handleSubmit={handleSubmit} />
        </div>
    )
}

export default connect()(CategoryNew)