import React from "react";
import AllUsers from "../components/AllUsers";
import Feeds from "../components/Feeds";
import Upload from "../components/Upload";

function HomeScreen() {
	return (
		<div>
			<div className="container-fluid">
				<div className="row">
					<div className="col-md-3 profile_screen">
						<div
							className="postBx"
							style={{ position: "fixed", width: "24.5%" }}
						>
							<h2 className="all-users mt-3 m-4">All Users</h2>
							<AllUsers />
						</div>
					</div>
					<div className="col-md-4 mt-5">
						<Feeds />
					</div>
					<div className="col-md-4 mt-5">
						<Upload />
					</div>
				</div>
			</div>
		</div>
	);
}

export default HomeScreen;
