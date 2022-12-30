import React from "react";

function Header({ userId }) {
	return (
		<div>
			<nav className="m-2">
				<div className="row">
					<div className="col-md-4">
						<a className="navbar-brand" href="/">
							<h2 className="brand text-white">Crowdly</h2>
						</a>
					</div>
					<div className="col-md-4">
						<form className="searchBx">
							<input
								type="text"
								className="form-control mt-2"
								placeholder="Search name,phone...."
							/>
							<i className="fa fa-search"></i>
						</form>
					</div>
					<div className="col-md-4">
						<ul className="nav">
							<li className="nav-item">
								<a className="nav-link active text-white" href="#">
									Chat
								</a>
							</li>
							<li className="nav-item">
								<a className="nav-link text-white" href="#">
									Notifications
								</a>
							</li>
							<li className="nav-item">
								<a className="nav-link text-white" href={`/profile/${userId}`}>
									Profile
								</a>
							</li>
						</ul>
					</div>
				</div>
			</nav>
		</div>
	);
}

export default Header;
