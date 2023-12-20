import React, { useEffect, useState } from "react";

const ManagerRoom = () => {


    const [room, setRoom] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalRecords, setTotalRecords] = useState(0);

    const [showEditForm, setShowEditForm] = useState(false);

    const handleEditClick = () => {
        setShowEditForm(!showEditForm);
    };

    const renderEditForm = () => {
        if (showEditForm) {
            return (
                <div className="edit-room-form">
                    <h2>Add/Edit Room</h2>
                    <form>
                        <div className="mb-3">
                            <label htmlFor="tenant_id">Tenant:</label>
                            <input type="text" className="form-control" id="tenant_id" name="tenant_id" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="room_code">RoomCode:</label>
                            <input type="text" className="form-control" id="room_code" name="room_code" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="size">Size:</label>
                            <input type="text" className="form-control" id="size" name="size" />
                        </div>
                        <button className="btn btn-success" onClick={handleEditClick}>Save</button>
                    </form>
                </div>
            );
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = JSON.parse(sessionStorage.getItem("data"))?.token;

                if (!token) {
                    console.error("Authentication token not found.");
                    return;
                }

                const response = await fetch(`http://localhost:8080/api/v1/landlord/roomlist?page=${currentPage}&size=4`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    const result = await response.json();
                    setRoom(result.content);
                    setTotalRecords(result.totalElements);
                } else {
                    console.log("Error fetching data");
                }
            } catch (error) {
                console.log("Error:", error);
            }
        };

        fetchData();
    }, [currentPage]);


    const handleDeleteClick = async (id) => {
        try {
            const token = JSON.parse(sessionStorage.getItem("data"))?.token;

            if (!token) {
                console.error("Authentication token not found.");
                return;
            }

            const response = await fetch(`http://localhost:8080/api/v1/bedsitter/delete/${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });

            if (response.ok) {
                const result = await response.json();
                setRoom(result.content);
                setTotalRecords(result.totalElements);
            } else {
                console.log("Error deleting data");
            }
        } catch (error) {
            console.log("Error:", error);
        }
    };

    return (
        <div className="managerroom">
            <main>
                <div className="d-flex  align-items-center mb-3 mt-3">
                    <h2>Search</h2>
                    <div className="input-group w-25">
                        <input type="text" className="form-control" placeholder="Search..." />
                    </div>
                </div>
                <table className="table table-bordered">
                    <thead className="table-dark">
                        <tr>
                            <th>BedsitterId</th>
                            <th>RoomCode</th>
                            <th>Size</th>
                            <th>ElectricityPrice</th>
                            <th>WaterPrice</th>
                            <th>RoomPrice</th>
                            <th>Description</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {room.map((item) => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.roomCode}</td>
                                <td>{item.size}</td>
                                <td>{item.electricityPrice}.000(vnd)</td>
                                <td>{item.waterPrice}.000(vnd)</td>
                                <td>{item.roomPrice}.000(vnd)</td>
                                <td>{item.description}</td>
                                <td>
                                    <button className="btn btn-primary" onClick={handleEditClick}>Edit</button>
                                    <button className="btn btn-danger ms-2" onClick={() => handleDeleteClick(item.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </main>
            <nav aria-label="Page navigation" className='mt-4'>
                <ul className="pagination justify-content-center">
                    <li className={`page-item ${currentPage === 0 && 'disabled'}`}>
                        <button className="page-link" onClick={() => setCurrentPage(currentPage - 1)} aria-label="Previous" hidden={currentPage === 0}>
                            <span aria-hidden="true">&laquo;</span>
                        </button>
                    </li>
                    <li className="page-item disabled"><span className="page-link">Page {currentPage + 1}</span></li>
                    <li className={`page-item ${room.length < 4 && 'disabled'}`}>
                        <button className="page-link" onClick={() => setCurrentPage(currentPage + 1)} aria-label="Next" hidden={(currentPage + 1) * 4 >= totalRecords}>
                            <span aria-hidden="true">&raquo;</span>
                        </button>
                    </li>
                </ul>
            </nav>
            {renderEditForm()}
        </div>
    );
};

export default ManagerRoom;