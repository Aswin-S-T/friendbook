import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import BasicTabs from "../components/TabPanel";
import UpdateProfilePic from "../components/UpdateProfilePic";
import { BASE_URL } from "../constants/appliationConstants";
import { useParams } from "react-router-dom";

function ProfileScreen(props) {
	const [userDetails, setUserDetails] = useState({});
	const [userPost, setUserPost] = useState([]);
	const [timer, setTimer] = React.useState(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);
	const [isMounted, setIsMounted] = React.useState(false);
	const userSignin = useSelector((state) => state.userSignin);
	const { userInfo } = userSignin;
	const [selectedFile, setSelectedFile] = useState();
	const [uid, setUid] = useState("");

	const [username, setUsername] = useState("");
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [about, setAbout] = useState("");
	const [profilePhoto, setProfilePhoto] = useState("");

	const params = useParams();

	const [fileInputState, setFileInputState] = useState("");
	const [previewSource, setPreviewSource] = useState("");

	const handleFileInputChange = (e) => {
		const file = e.target.files[0];
		previewFile(file);
		setSelectedFile(file);
		setFileInputState(e.target.value);
	};

	const previewFile = (file) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onloadend = () => {
			setPreviewSource(reader.result);
		};
	};

	const handleSubmitFile = (e) => {
		e.preventDefault();
		console.log("hello");

		if (!selectedFile) return;
		const reader = new FileReader();
		reader.readAsDataURL(selectedFile);
		reader.onloadend = () => {
			uploadImage(reader.result);
		};
		reader.onerror = () => {
			console.log("Error");
		};
	};

	const uploadImage = async (base64EncodedImage) => {
		try {
			await fetch(`${BASE_URL}/api/v1/user/edit-profile`, {
				method: "POST",
				body: JSON.stringify({
					profilePhoto: base64EncodedImage,
					name,
					email,
					username,
					about,
				}),
				headers: {
					"Content-Type": "application/json",
					Authorization: userInfo.data,
				},
			});
			setFileInputState("");
			setPreviewSource("");
		} catch (error) {
			console.log(error);
		}
	};

	const getUserDetails = async (userId) => {
		try {
			fetch(`${BASE_URL}/api/v1/user/get-user/${userId}`, {
				method: "GET",
			})
				.then((response) => response.json())
				.then((data) => {
					setUsername(data.data.username);
					setName(data.data.name);
					setEmail(data.data.email);
					setAbout(data.data.about ? data.data.about : "");
					setProfilePhoto(
						data.data.profilePhoto
							? data.data.profilePhoto
							: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8yJmOL8nb6x7NO2xuLB-Cc1qP2MRFdq24qg&usqp=CAU"
					);
				});
		} catch (error) {
			setError(error.message);
		}
	};

	const fetchData = async () => {
		try {
			fetch(`${BASE_URL}/api/v1/p/get-my-post`, {
				headers: {
					"Content-Type": "application/json",
					Authorization: userInfo.data,
				},
			})
				.then((response) => response.json())
				.then((data) => {
					setLoading(false);
					setUserPost(data.data);
				});
		} catch (error) {
			setError(error.message);
		}
	};
	useEffect(() => {
		fetchData();
		getUserDetails(params.id);
	}, []);
	return (
		<div className="profile_screen">
			<div className="container-fluid">
				<div className="row">
					<div className="col-md-3"></div>
					<div className="col-md-6">
						<div>
							<div className="profileHead">
								<img
									src="https://t3.ftcdn.net/jpg/02/88/62/02/360_F_288620275_Pfgr2PrELJktUtf4OsGHbPYeufWN7kiM.jpg"
									className="w-100 bg"
								/>
								<div className="profileImage">
									<img
										src={profilePhoto}
										className="rounded-circle text-center center"
									/>
								</div>
								<div className="row">
									{userDetails && (
										<div className="center">
											<h2 className="text-center">{username}</h2>

											<p className="text-center">{about}</p>

											<ul className="nav justify-content-center">
												<li className="nav-item">
													<a
														className="nav-link active"
														style={{ color: "#111" }}
														href="#"
													>
														0 Post
													</a>
												</li>
												<li className="nav-item">
													<a
														className="nav-link"
														href="#"
														style={{ color: "#111" }}
													>
														0 Followers
													</a>
												</li>
												<li className="nav-item">
													<a
														className="nav-link"
														href="#"
														style={{ color: "#111" }}
													>
														0 Following
													</a>
												</li>
											</ul>
											<div style={{ float: "right" }}>
												<button className="btn btn-success m-2">
													Add Post
												</button>
												<button
													className="btn btn-secondary m-2"
													data-toggle="modal"
													data-target="#exampleModalCenter"
												>
													Edit Profile
												</button>
											</div>
										</div>
									)}
									<div className="container-fluid">
										<BasicTabs />
									</div>
								</div>
								<div></div>
							</div>
						</div>
					</div>
					<div className="col-md-3"></div>
					<div
						className="modal fade"
						id="exampleModalCenter"
						tabIndex="-1"
						role="dialog"
						aria-labelledby="exampleModalCenterTitle"
						aria-hidden="true"
					>
						<div className="modal-dialog modal-dialog-centered" role="document">
							<div className="modal-content">
								<div className="modal-header">
									<h5
										className="modal-title text-center"
										id="exampleModalLongTitle"
									>
										Edit Profile
									</h5>
									<button
										type="button"
										className="close"
										data-dismiss="modal"
										aria-label="Close"
									></button>
								</div>
								<div className="modal-body">
									<form onSubmit={handleSubmitFile}>
										<div>
											{previewSource ? (
												<img
													style={{
														width: "100px",
														height: "100px",
														borderRadius: "50%",
														top: "-23px",
														position: "relative",
													}}
													className=" text-center center mt-5"
													src={previewSource}
													alt="chosen"
												/>
											) : (
												<img
													className=" text-center center mt-5"
													style={{
														width: "100px",
														height: "100px",
														top: "-23px",
														position: "relative",
													}}
													src={profilePhoto}
												/>
											)}

											<input
												id="fileInput"
												type="file"
												name="image"
												onChange={handleFileInputChange}
												value={fileInputState}
												className="form-input"
											/>

											<div>
												<p>Username</p>
												<input
													type="text"
													value={username}
													className="form-control"
													onChange={(e) => setUsername(e.target.value)}
												/>
												<p>Name</p>
												<input
													type="text"
													value={name}
													onChange={(e) => setName(e.target.value)}
													className="form-control"
												/>
												<p>Email</p>
												<input
													type="email"
													value={email}
													onChange={(e) => setEmail(e.target.value)}
													className="form-control"
												/>
												<p>About</p>
												<input
													type="text"
													value={about}
													onChange={(e) => setAbout(e.target.value)}
													style={{ height: "40px", padding: "20px" }}
													className="form-control"
												/>
											</div>
										</div>
										<div className="modal-footer">
											<button
												type="button"
												className="btn btn-secondary"
												data-dismiss="modal"
											>
												Close
											</button>
											<button type="submit" className="btn btn-primary">
												Save changes
											</button>
										</div>
									</form>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ProfileScreen;
