import React from 'react'
const AuthorItem = ({ author }) => {
    return (
        <tr>
            <td>
                {author.author_name}
            </td>
            <td>
                {author.firstname}
            </td>
            <td>
                {author.lastname}
            </td>
            <td>
                {author.birthday_year}
            </td>
            <td>
                {author.email}
            </td>
        </tr>
    )
}

const AuthorList = ({ authors }) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>
                        Nickname
                    </th>
                    <th>
                        First Name
                    </th>
                    <th>
                        Last Name
                    </th>

                    <th>
                        email
                    </th>
                </tr>
            </thead>
            {authors.map((author) => <AuthorItem author={author} />)}
        </table>
    )
}
export default AuthorList