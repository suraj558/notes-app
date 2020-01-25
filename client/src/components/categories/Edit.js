import React from 'react'
import { connect } from 'react-redux'
import CategoryForm from './Form'
import { startEditCategory } from '../../actions/category'
import _ from 'lodash'

function CategoryEdit(props) {
    const handleSubmit = (category) => {
        props.dispatch(startEditCategory(category, props))
    }
    return (
        <div className="container mt-5">
            <h2>Edit Category</h2>
            {!_.isEmpty(props.category) && <CategoryForm handleSubmit={handleSubmit} {...props.category} />}
        </div>
    )
}

const mapStateToProps = (state, props) => {
    return {
        category: state.categories.find(category => category._id === props.match.params.id)
    }
}

export default connect(mapStateToProps)(CategoryEdit)