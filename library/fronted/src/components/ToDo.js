import React from 'react'
const TodoItem = ({ todo, deleteTodo }) => {
    return (
        <thead>
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
                <td><button onClick={() => deleteTodo(todo.id)} type='button'>Удалить заметку</button></td>
            </tr>
        </thead>
    )
}
const TodoList = ({ todos, deleteTodo }) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>
                        Проект
                    </th>
                    <th>
                        Заметка
                    </th>
                    <th>
                        Автор
                    </th>
                    <th>
                        Создано
                    </th>
                    <th>
                        Обновлено
                    </th>
                    <th>
                        Статус
                    </th>
                    <th></th>
                </tr>
            </thead>
            {/* {todos.map((todo) => <TodoItem todo={todo} />)} */}
            {todos.map((todo) => <TodoItem todo={todo} deleteTodo={deleteTodo} />)}
        </table>
    )
}
export default TodoList