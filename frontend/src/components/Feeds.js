import React, { useEffect, useState } from "react";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import axios from "axios";
import { BASE_URL } from "../constants/appliationConstants";
import LoadingBox from "../components/LoadingBox";
import GroupAvatars from "./GroupAvatars";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

function Feeds() {
	const [post, setPost] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);
	const [timer, setTimer] = React.useState(null);
	const [isMounted, setIsMounted] = React.useState(false);

	const fetchData = async () => {
		try {
			fetch(`${BASE_URL}/api/v1/p/get-all-post`)
				.then((response) => response.json())
				.then((data) => {
					setLoading(false);
					setPost(data.data);
				});
		} catch (error) {
			setError(error.message);
		}

		clearTimeout(timer);
		setTimer(setTimeout(fetchData, 200));
	};

	const [open, setOpen] = React.useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	useEffect(() => {
		if (!isMounted) {
			fetchData();
			setIsMounted(true);
		}
	});
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
									<div className="col-md-4 col-2">
										<img
											src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTdXt7NB0hy5Kyqgy751jHUbiYFY1-6SeRZiSUnqCO0Q&s"
											className="thumb"
										/>
									</div>
									<div className="col-md-8 col-8">
										<div>
											<h4 className="mt-3">{p.username}</h4>
										</div>
									</div>
									{/* <div className="col-md-2 mt-2 col-2">
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
									</div> */}
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
									<ChatBubbleOutlineIcon onClick={handleClickOpen} />
								</div>
								<div className="col-md-4 col-4">
									0
									<BookmarkBorderIcon />
								</div>
							</div>
							<div className="m-2 liked_response">
								Liked by
								<GroupAvatars
									style={{
										float: "left",
										display: "flex",
										justifyContent: "flex-start",
									}}
								/>
							</div>
							<p className="m-2">
								View All comments
								<div style={{ float: "right" }}>
									{new Date(p.postedTime * 1000).toLocaleString("en-GB")}
								</div>
							</p>
						</div>
						<Dialog
							fullScreen
							open={open}
							onClose={handleClose}
							TransitionComponent={Transition}
						>
							<AppBar sx={{ position: "relative" }}>
								<Toolbar>
									<IconButton
										edge="start"
										color="inherit"
										onClick={handleClose}
										aria-label="close"
									>
										<CloseIcon />
									</IconButton>
									<Typography
										sx={{ ml: 2, flex: 1 }}
										variant="h6"
										component="div"
									>
										Comments
									</Typography>
									<Button autoFocus color="inherit" onClick={handleClose}>
										save
									</Button>
								</Toolbar>
							</AppBar>
							<List>
								<ListItem button>
									<ListItemText primary="Phone ringtone" secondary="Titania" />
								</ListItem>
								<Divider />
								<ListItem button>
									<ListItemText
										primary="Default notification ringtone"
										secondary="Tethys"
									/>
								</ListItem>
							</List>
						</Dialog>
					</div>
				))
			)}
		</div>
	);
}

export default Feeds;
