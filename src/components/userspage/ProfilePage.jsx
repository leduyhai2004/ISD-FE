import React, { useState, useEffect } from 'react';
import UserService from '../service/UserService';
import { Link } from 'react-router-dom';



function ProfilePage() {
    const [profileInfo, setProfileInfo] = useState({});

    useEffect(() => {
        fetchProfileInfo();
    }, []);

    const fetchProfileInfo = async () => {
        try {

            const token = localStorage.getItem('token'); // Retrieve the token from localStorage
            const response = await UserService.getYourProfile(token);
            setProfileInfo(response.ourUsers);
        } catch (error) {
            console.error('Error fetching profile information:', error);
        }
    };

    return (
		<section
			className="shadow"
			style={{ backgroundColor: "whitesmoke" }}>
			<div className="container py-5">
				<div className="row">
					<div className="col-lg-3">
						<div className="card mb-4">
							<div className="card-body text-center">
								<img
									src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
									alt="avatar"
									className="rounded-circle img-fluid"
									style={{ width: 150 }}
								/>
								<h5 className="my-3">
									{profileInfo.name}
								</h5>
								<div className="d-flex justify-content-center mb-2">
									<button
										type="button"
										className="btn btn-outline-primary">
										Call
									</button>
									<button
										type="button"
										className="btn btn-outline-warning ms-1">
										Message
									</button>
								</div>
							</div>
						</div>
					</div>

					<div className="col-lg-9">
						<div className="card mb-4">
							<div className="card-body">
								<hr />

								<div className="row">
									<div className="col-sm-3">
										<h5 className="mb-0">
											Name
										</h5>
									</div>

									<div className="col-sm-9">
										<p className="text-muted mb-0">
											{profileInfo.name}
										</p>
									</div>
								</div>

								<hr />

								<div className="row">
									<div className="col-sm-3">
										<h5 className="mb-0">
											Email
										</h5>
									</div>

									<div className="col-sm-9">
										<p className="text-muted mb-0">
											{profileInfo.email}
										</p>
									</div>
								</div>
								<hr />

								<div className="row">
									<div className="col-sm-3">
										<h5 className="mb-0">
											City
										</h5>
									</div>

									<div className="col-sm-9">
										<p className="text-muted mb-0">
											{profileInfo.city}
										</p>
									</div>
								</div>
								<hr />

								<div className="row">
									<div className="col-sm-3">
										<h5 className="mb-0">
											Contract
										</h5>
									</div>

									<div className="col-sm-9">
										<p className="text-muted mb-0">
											{profileInfo.contract}
										</p>
									</div>
								</div>
                                <hr/>
								
								<div className="row">
									<div className="col-sm-3">
										<h5 className="mb-0">
											Phone Number
										</h5>
									</div>

									<div className="col-sm-9">
										<p className="text-muted mb-0">
											{profileInfo.phone}
										</p>
									</div>
								</div>
                                <hr/>

								<div className="row">
									<div className="col-sm-3">
										<h5 className="mb-0">
											Address
										</h5>
									</div>

									<div className="col-sm-9">
										<p className="text-muted mb-0">
											{profileInfo.address}
										</p>
									</div>
								</div>
                                <hr/>
								
								<div className="row">
									<div className="col-sm-3">
										<h5 className="mb-0">
											Age
										</h5>
									</div>

									<div className="col-sm-9">
										<p className="text-muted mb-0">
											{profileInfo.age}
										</p>
									</div>
								</div>
                                <hr/>
								<div className="row">
									<div className="col-sm-3">
										<h5 className="mb-0">
											Role
										</h5>
									</div>

									<div className="col-sm-9">
										<p className="text-muted mb-0">
											{profileInfo.role}
										</p>
									</div>
								</div>
								
                                <hr/>
                                {profileInfo.role === "ADMIN" && (
                                    <button><Link to={`/update-user/${profileInfo.id}`}>Update This Profile</Link></button>
                                )}
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
    );
}

export default ProfilePage;
