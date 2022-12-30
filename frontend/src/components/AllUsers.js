import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";
import { BASE_URL } from "../constants/appliationConstants";

function AllUsers() {
	const [loading, setLoading] = React.useState(false);
	const [error, setError] = React.useState(false);
	const userSignin = useSelector((state) => state.userSignin);
	const [users, setUsers] = React.useState([]);
	const { userInfo } = userSignin;
	const fetchData = async () => {
		try {
			fetch(`${BASE_URL}/api/v1/user/all-users`, {
				headers: {
					"Content-Type": "application/json",
					Authorization: userInfo.data,
				},
			})
				.then((response) => response.json())
				.then((data) => {
					setLoading(false);
					setUsers(data.data);
				});
		} catch (error) {
			setError(error.message);
		}
	};
	React.useEffect(() => {
		fetchData();
	}, []);
	return (
		<List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
			{users &&
				users != "none" &&
				users.map((user) => (
					<ListItem alignItems="flex-start">
						<ListItemAvatar>
							<Avatar alt="Remy Sharp" src={user.profilePhoto} />
						</ListItemAvatar>
						<ListItemText
							primary={user.username}
							secondary={
								<React.Fragment>
									<Typography
										sx={{ display: "inline" }}
										component="span"
										variant="body2"
										color="text.primary"
									>
										{user.about}
									</Typography>
								</React.Fragment>
							}
						/>
						<a href={`/profile/${user._id}`} className="btn btn-primary">
							View profile
						</a>
					</ListItem>
				))}
			<Divider variant="inset" component="li" />
		</List>
	);
}

export default AllUsers;
