import React, { useState } from "react";

function UpdateProfilePic() {
	const [fileInputState, setFileInputState] = useState("");
	const [previewSource, setPreviewSource] = useState("");

	const handleFileInputChange = (e) => {
		const file = e.target.files[0];
		previewFile(file);
		setFileInputState(e.target.value);
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
			<form>
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
}

export default UpdateProfilePic;
