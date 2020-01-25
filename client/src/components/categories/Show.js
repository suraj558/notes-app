import React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

function CategoryShow(props) {
    return (
        <div className="container mt-5">
            <h2>{ props.category.name }</h2>
            <hr/>
            
        </div>
    )
}

const mapStateToProps = (state, props) => {
    return {
        category: state.categories.find(category => category._id === props.match.params.id) || {},
        
    }
}

export default connect(mapStateToProps)(CategoryShow)