import React from 'react'
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
const Users = ({ login, handleLogout, usersList }) => {
    return (
        <div>
            <p> {login.name} logged in</p>
            <button onClick={handleLogout}>log out</button>
            <h3>Users</h3>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>usernames</th>
                        <th>blogs created</th>
                    </tr>
                </thead>
                <tbody>
                    {usersList.map((itemUser) => (
                        <tr key={itemUser.id}>
                            <td>
                                {' '}
                                <Link to={`/users/${itemUser.id}`}>
                                    {itemUser.name}
                                </Link>
                            </td>
                            <td>{itemUser.blogs.length}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    )
}

export default Users
