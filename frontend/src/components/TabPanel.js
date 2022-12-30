import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import GridOnIcon from "@mui/icons-material/GridOn";
import SplitscreenIcon from "@mui/icons-material/Splitscreen";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import StandardImageList from "./StandardImageList";
import Feeds from "./Feeds";
import { useSelector } from "react-redux";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { BASE_URL } from "../constants/appliationConstants";
import MyImages from "./MyImages";

function TabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			{value === index && (
				<Box sx={{ p: 3 }}>
					<Typography>{children}</Typography>
				</Box>
			)}
		</div>
	);
}

TabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.number.isRequired,
	value: PropTypes.number.isRequired,
};

function a11yProps(index) {
	return {
		id: `simple-tab-${index}`,
		"aria-controls": `simple-tabpanel-${index}`,
	};
}

export default function BasicTabs() {
	const [value, setValue] = React.useState(0);

	const [userDetails, setUserDetails] = React.useState({});
	const [userPost, setUserPost] = React.useState([]);
	const [timer, setTimer] = React.useState(null);
	const [loading, setLoading] = React.useState(false);
	const [error, setError] = React.useState(false);
	const [isMounted, setIsMounted] = React.useState(false);
	const userSignin = useSelector((state) => state.userSignin);
	const { userInfo } = userSignin;
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
					setUserDetails(data.user);
					setUserPost(data.data);
				});
		} catch (error) {
			setError(error.message);
		}
	};
	React.useEffect(() => {
		fetchData();
	}, []);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	return (
		<Box sx={{ width: "100%" }}>
			<Box sx={{ borderBottom: 1, borderColor: "divider" }}>
				<Tabs
					value={value}
					onChange={handleChange}
					aria-label="basic tabs example"
				>
					<Tab label={<GridOnIcon />} {...a11yProps(0)} />
					<Tab label={<SplitscreenIcon />} {...a11yProps(1)} />
					<Tab label={<LocalOfferIcon />} {...a11yProps(2)} />
				</Tabs>
			</Box>
			<TabPanel value={value} index={0}>
				<StandardImageList userPost={userPost} />
			</TabPanel>
			<TabPanel value={value} index={1}>
				<MyImages userPost={userPost} />
			</TabPanel>
			<TabPanel value={value} index={2}>
				Item Three
			</TabPanel>
		</Box>
	);
}
