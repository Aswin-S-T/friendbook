import React from "react";
import Feeds from "../components/Feeds";
import Upload from "../components/Upload";

function HomeScreen() {
	return (
		<div>
			<div className="container-fluid">
				<div className="row">
					<div className="col-md-4">dsds</div>
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
