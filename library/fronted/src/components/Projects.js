import React from 'react'
import { Link } from 'react-router-dom'

const ProjectItem = ({ project, deleteProject }) => {
    return (
        <thead>
            <td>
                <Link to={`projects/${project.id}`}>{project.project_title}</Link>
            </td>
            <td>
                {project.repolink}
            </td>
            <td>
                {project.authors}
            </td>
            <td><button onClick={() => deleteProject(project.id)} type='button'>Удалить проект</button></td>
        </thead>
    )
}

const ProjectList = ({ projects, deleteProject }) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>
                        Название
                    </th>
                    <th>
                        Ссылка
                    </th>
                    <th>
                        Авторы
                    </th>
                    <th></th>
                </tr>
            </thead>
            {projects.map((project) => <ProjectItem project={project} key={project.id} deleteProject={deleteProject} />)}
        </table>
    )
}
export default ProjectList