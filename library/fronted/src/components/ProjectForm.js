import React from 'react'

class ProjectForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = { project_title: '', repolink: '', author: 1 }
    }

    handleChange(event) {
        this.setState(
            {
                [event.target.name]: event.target.value
            }
        );
    }

    handleSubmit(event) {
        this.props.createProject(this.state.project_title, this.state.repolink, this.state.author)
        event.preventDefault()
    }

    render() {
        return (
            <form onSubmit={(event) => this.handleSubmit(event)}>
                <div className="form-group">
                    <label for="project_title">title</label>
                    <input type="text" className="form-control" name="project_title"
                        value={this.state.project_title} onChange={(event) => this.handleChange(event)} />
                </div>
                <div className="form-group">
                    <label for="repolink">repolink</label>
                    <input type="url" className="form-control" name="repolink"
                        value={this.state.repolink} onChange={(event) => this.handleChange(event)} />
                </div>
                <div className="form-group">
                    <label for="author">user</label>
                    <select name="author" className="form-control"
                        onChange={(event) => this.handleChange(event)}>
                        {this.props.authors.map((author) => <option value={author.id}>{author.name}</option>)}/>
                    </select>

                </div>
                <input type="submit" className="btn btn-primary" value="Save" />
            </form>
        );
    }
}

export default ProjectForm
