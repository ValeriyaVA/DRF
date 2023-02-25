import React from 'react'

class TodoForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = { note: '', project: 1 }
        console.log(props.projects)
    }

    handleChange(event) {
        this.setState(
            {
                [event.target.name]: event.target.value
            }
        );
    }

    handleSubmit(event) {
        this.props.createTodo(this.state.note, this.state.project)
        event.preventDefault()
    }

    render() {
        return (
            <form onSubmit={(event) => this.handleSubmit(event)}>
                <div className="form-group">
                    <label for="note">note</label>
                    <input type="note" className="form-control" name="note"
                        value={this.state.note} onChange={(event) => this.handleChange(event)} />
                </div>
                <div className="form-group">
                    <label for="project">project</label>
                    <select name="project" className="form-control"
                        onChange={(event) => this.handleChange(event)}>
                        {this.props.projects.map((project) => <option value={project.id}>{project.title}</option>)}/>
                    </select>
                </div>
                <input type="submit" className="btn btn-primary" value="Save" />
            </form>
        );
    }
}

export default TodoForm
