import React from "react";
import BasicTabs from "../components/TabPanel";

function ProfileScreen() {
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
										src="https://upload.wikimedia.org/wikipedia/commons/3/3b/Prithviraj_oil_paint_2019.jpg"
										className="rounded-circle text-center center"
									/>
								</div>
								<div className="row">
									<div className="center">
										<h2 className="text-center">Aswin.S.Thampalakad</h2>
										<br />
										<p>Here is my small description. Iam a software engineer</p>
										<br />
										<ul class="nav justify-content-center">
											<li class="nav-item">
												<a
													class="nav-link active"
													style={{ color: "#111" }}
													href="#"
												>
													0 Post
												</a>
											</li>
											<li class="nav-item">
												<a class="nav-link" href="#" style={{ color: "#111" }}>
													0 Followers
												</a>
											</li>
											<li class="nav-item">
												<a class="nav-link" href="#" style={{ color: "#111" }}>
													0 Following
												</a>
											</li>
										</ul>
									</div>
									<div className="container-fluid">
										<BasicTabs />
									</div>
								</div>
								<div></div>
							</div>
						</div>
					</div>
					<div className="col-md-3"></div>
				</div>
			</div>
		</div>
	);
}

export default ProfileScreen;
