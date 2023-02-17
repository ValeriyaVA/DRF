import React from 'react'
import { useParams } from "react-router-dom"

const ProjectTodoItem = ({ todo }) => {
    return (
        <thead>
            <tr>
                <td>
                    {todo.note}
                </td>
                <td>
                    {todo.created_at}
                </td>
                <td>
                    {todo.updated_at}
                </td>
                <td>
                    {todo.author}
                </td>
            </tr>
        </thead>
    )
}
const ProjectTodoList = ({ todos }) => {
    let { projectId } = useParams();
    let filtered_todos = todos.filter((todo) => todo.project === projectId)
    return (
        <table>
            <thead>
                <tr>
                    <th>
                        Заметка
                    </th>
                    <th>
                        Создано
                    </th>
                    <th>
                        Обновлено
                    </th>
                    <th>
                        Автор
                    </th>
                </tr>
            </thead>
            {filtered_todos.map((todo) => <ProjectTodoItem todo={todo} />)}
        </table>
    )
}
export default ProjectTodoList