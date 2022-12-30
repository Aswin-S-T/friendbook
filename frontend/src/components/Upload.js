import React, { useState } from "react";
import { BASE_URL } from "../constants/appliationConstants";
import { useSelector } from "react-redux";

const Upload = () => {
	const [fileInputState, setFileInputState] = useState("");
	const [previewSource, setPreviewSource] = useState("");
	const [selectedFile, setSelectedFile] = useState();

	const userSignin = useSelector((state) => state.userSignin);
	const { userInfo } = userSignin;

	console.log("user info=========", userInfo.data);

	const handleFileInputChange = (e) => {
		const file = e.target.files[0];
		previewFile(file);
		setSelectedFile(file);
		setFileInputState(e.target.value);
	};

	const handleSubmitFile = (e) => {
		e.preventDefault();
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
			await fetch(`${BASE_URL}/api/v1/p/add-my-post`, {
				method: "POST",
				body: JSON.stringify({ data: base64EncodedImage }),
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

	const previewFile = (file) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onloadend = () => {
			setPreviewSource(reader.result);
		};
	};

	return (
		<div>
			<h1>Upload</h1>
			<form onSubmit={handleSubmitFile}>
				<input
					id="fileInput"
					type="file"
					name="image"
					onChange={handleFileInputChange}
					value={fileInputState}
					className="form-input"
				/>
				<button className="btn" type="submit">
					Submit
				</button>
			</form>
			{previewSource && (
				<img src={previewSource} alt="chosen" style={{ height: "300px" }} />
			)}
		</div>
	);
};

export default Upload;
