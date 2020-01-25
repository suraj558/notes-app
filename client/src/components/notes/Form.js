import React from 'react'
import { connect } from 'react-redux'

class Form extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            title: props.title || '',
            body: props.body || '',
            category: props.category ? props.category._id : ''
        }
    }
    handleSubmit = (e) => {
        e.preventDefault()
        const formData = {
            title: this.state.title,
            body: this.state.body,
           category: this.state.category
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
                    <label htmlFor="title">Title</label>
                    <input type="text" className="form-control" id="title" placeholder="Title" name="title" value={this.state.title} onChange={this.handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="body">Body</label>
                    <textarea className="form-control" id="body" placeholder="Body" name="body" value={this.state.body} onChange={this.handleChange} />
                </div>
                
                <div className="form-group">
                    <label htmlFor="department">Category</label>
                    <select className="form-control" id="category" name="category" value={this.state.category} onChange={this.handleChange } >
                        <option>select</option>
                        {
                            this.props.categories.map(category => {
                                return <option key={category._id} value={category._id}>{ category.name }</option>
                            })
                        }
                    </select>
                </div>
                <button type="submit" className="btn btn-success">Submit</button>
            </form>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        categories: state.categories
    }
}

export default connect(mapStateToProps)(Form)