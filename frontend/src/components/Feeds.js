import React, { useEffect, useState } from "react";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import axios from "axios";
import { BASE_URL } from "../constants/appliationConstants";
import LoadingBox from "../components/LoadingBox";

function Feeds() {
	const [post, setPost] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);
	useEffect(() => {
		setLoading(true);
		try {
			const fetchData = async () => {
				const data = await axios.get(`${BASE_URL}/api/v1/p/get-all-post`);
				setLoading(false);
				setPost(data.data.data);
			};
			fetchData();
		} catch (error) {
			setError(error.message);
		}
	}, []);
	return (
		<div>
			{loading ? (
				<LoadingBox />
			) : error ? (
				<h1>Error</h1>
			) : (
				post &&
				post.map((p, index) => (
					<div className="postBx mt-4" key={index}>
						<div className="post_details">
							<div className="row">
								<div className="row m-2">
									<div className="col-md-2 col-2">
										<img
											src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTdXt7NB0hy5Kyqgy751jHUbiYFY1-6SeRZiSUnqCO0Q&s"
											className="thumb"
										/>
									</div>
									<div className="col-md-8 col-8">
										<div>
											<h4 className="mt-2">Dulquer Salman</h4>
										</div>
									</div>
									<div className="col-md-2 mt-2 col-2">
										<div>
											<div className="dropdown ml-auto">
												<i
													className="fa fa-ellipsis-v dropleft"
													id="dropdownMenuButton"
													data-toggle="dropdown"
													aria-haspopup="true"
													aria-expanded="false"
												></i>

												<div
													className="dropdown-menu"
													aria-labelledby="dropdownMenuButton"
												>
													<a className="dropdown-item" href="#">
														Action
													</a>
													<a className="dropdown-item" href="#">
														Another action
													</a>
													<a className="dropdown-item" href="#">
														Something else here
													</a>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="post_image p-2">
							<img src={p.imageUrl} className="post_im " />
						</div>
						<div className="post_actions">
							<hr />
							<div className="row m-4">
								<div className="col-md-4 col-4">
									0
									<ThumbUpIcon />
								</div>
								<div className="col-md-4 col-4">
									0
									<ChatBubbleOutlineIcon />
								</div>
								<div className="col-md-4 col-4">
									0
									<BookmarkBorderIcon />
								</div>
							</div>
						</div>
					</div>
				))
			)}
		</div>
	);
}

export default Feeds;
