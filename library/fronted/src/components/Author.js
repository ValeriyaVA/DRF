import React from 'react'
const AuthorItem = ({ author }) => {
    return (
        <tr>
            <td>
                {author.firstname}
            </td>
            <td>
                {author.lastname}
            </td>
            <td>
                {author.date}
            </td>
        </tr>
    )
}
const AuthorList = ({ authors }) => {
    return (
        <table>
            <th>
                First Name
            </th>
            <th>
                Last Name
            </th>
            <th>
                Date
            </th>
            {authors.map((author) => <AuthorItem author={author} />)}
        </table>
    )
}
export default AuthorList