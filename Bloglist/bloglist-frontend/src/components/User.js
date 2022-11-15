import { useState } from 'react'
import Table from 'react-bootstrap/Table'
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    Navigate,
    useParams,
    useNavigate,
    useMatch,
} from 'react-router-dom'

const User = ({ user }) => {
    if (!user) {
        return null
    }
    return (
        <div>
            <h3> {user.name}</h3>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>added blogs</th>
                    </tr>
                </thead>
                <tbody>
                    {user.blogs.map((blog) => (
                        <tr key={blog.id}>
                            <td>
                                {' '}
                                <Link>{blog.title}</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    )
}

export default User
