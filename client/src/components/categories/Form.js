import React from 'react'
import { connect } from 'react-redux'

class CategoryForm extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            name: props.name || ''
        }
    }
    handleSubmit = (e) => {
        e.preventDefault()
        const formData = {
            name: this.state.name
        }
        this.props.handleSubmit(formData)
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    render(){
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" className="form-control" id="name" placeholder="Category" name="name" value={this.state.name} onChange={this.handleChange} />
                </div>
                <button type="submit" className="btn btn-success">Submit</button>
            </form>
        )
    }
}

export default connect()(CategoryForm)