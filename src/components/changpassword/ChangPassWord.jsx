import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

const ChangePassWord = () => {

    const [userProfile, setUserProfile] = useState({});

    useEffect(() => {
        const infoProfile = sessionStorage.getItem("data");
        if(infoProfile){
            setUserProfile(JSON.parse(infoProfile));
        }
    }, []);


    return (
        <div className="container mt-5 mb-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header">
                            <h3 className="text-center">Chang PassWord</h3>
                        </div>
                        <div className="card-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="username" className="form-label">Username</label>
                                    <p>{userProfile.username}</p>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">Password</label>
                                    <p>{userProfile.name}</p>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="phone" className="form-label">Phone</label>
                                    <p>{userProfile.phone}</p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChangePassWord;
