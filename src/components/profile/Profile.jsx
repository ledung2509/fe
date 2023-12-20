import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

const Profile = () => {

    const [user, setUser] = useState({});


    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const storedData = sessionStorage.getItem("data");
                const { token } = JSON.parse(storedData);

                const response = await fetch('http://localhost:8080/api/v1/users/profile', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                if (response.ok) {
                    const userProfile = await response.json();
                    setUser(userProfile);
                } else {
                    console.error('Error fetching user profile');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchUserProfile();
    }, []);

    return (
        <div className="container mt-5 mb-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header">
                            <h3 className="text-center">Profile</h3>
                        </div>
                        <div className="card-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">Fullname</label>
                                    <p>{user.name}</p>
                                    <input type="text" className="form-control" id="name"/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input type="text" className="form-control" id="email" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="phone" className="form-label">Phone</label>
                                    <input type="text" className="form-control" id="phone" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="username" className="form-label">Username</label>
                                    <input type="text" className="form-control" id="username" />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
