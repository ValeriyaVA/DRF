import React from 'react'
const TodoItem = ({ todo }) => {
    return (
        <tr>
            <td>
                {todo.project}
            </td>
            <td>
                {todo.note}
            </td>
            <td>
                {todo.author}
            </td>
            <td>
                {todo.created_at}
            </td>
            <td>
                {todo.updated_at}
            </td>
            <td>
                {todo.status}
            </td>
            <td>
                {todo.mark_close}
            </td>
        </tr>
    )
}
const TodoList = ({ todos }) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>
                        Project
                    </th>
                    <th>
                        Note
                    </th>
                    <th>
                        Author
                    </th>
                    <th>
                        Created at
                    </th>
                    <th>
                        Updated at
                    </th>
                    <th>
                        Status
                    </th>
                    <th>
                        Close
                    </th>
                </tr>
            </thead>
            {todos.map((todo) => <TodoItem todo={todo} />)}
        </table>
    )
}
export default TodoList