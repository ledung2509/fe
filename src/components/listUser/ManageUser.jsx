import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Table from "react-bootstrap/Table";

const ManageUser = () => {
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalRecords, setTotalRecords] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = JSON.parse(sessionStorage.getItem("data"))?.token;

                if (!token) {
                    setError("Authentication token not found.");
                    return;
                }

                const response = await fetch(`http://localhost:8080/api/v1/landlord/userlist?page=${currentPage}&size=4`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    const result = await response.json();
                    setUsers(result.content);
                    setTotalRecords(result.totalElements);
                } else {
                    setError(`Error fetching data: ${response.statusText}`);
                }
            } catch (error) {
                setError(`Error: ${error.message}`);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [currentPage]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div className="listusers">
            <main className="container mt-4">
                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Full name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Username</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((item) => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.fullname}</td>
                                <td>{item.email}</td>
                                <td>{item.phone}</td>
                                <td>{item.username}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </main>
            <nav aria-label="Page navigation" className="mt-4">
                <ul className="pagination justify-content-center">
                    <li className={`page-item ${currentPage === 0 && 'disabled'}`}>
                        <button className="page-link" onClick={() => setCurrentPage(currentPage - 1)} aria-label="Previous" hidden={currentPage === 0}>
                            <span aria-hidden="true">&laquo;</span>
                        </button>
                    </li>
                    <li className="page-item disabled"><span className="page-link">Page {currentPage + 1}</span></li>
                    <li className={`page-item ${users.length < 4 && 'disabled'}`}>
                        <button className="page-link" onClick={() => setCurrentPage(currentPage + 1)} aria-label="Next" hidden={(currentPage + 1) * 4 >= totalRecords}>
                            <span aria-hidden="true">&raquo;</span>
                        </button>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default ManageUser;
