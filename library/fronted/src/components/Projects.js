import React from 'react'
import { Link } from 'react-router-dom'

const ProjectItem = ({ project }) => {
    return (
        <tr>
            <td>
                <Link to={`projects/${project.project_title}`}>{project.project_title}</Link>
            </td>
            <td>{project.repolink}</td>
            <td>{project.authors}</td>
        </tr>
    )
}

const ProjectList = ({ projects }) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>
                        Title
                    </th>
                    <th>
                        Repo Link
                    </th>
                    <th>
                        Authors
                    </th>
                </tr>
            </thead>
            {projects.map((project) => <ProjectItem project={project} />)}
        </table>
    )
}
export default ProjectList