import React from "react";

function Header() {
	return (
		<div>
			<nav className="m-2">
				<div className="row">
					<div className="col-md-4">
						<a className="navbar-brand" href="#">
							<h2 className="brand text-white">Crowdly</h2>
						</a>
					</div>
					<div className="col-md-4">
						<form>
							<input
								type="text"
								className="form-control mt-2"
								placeholder="Search name,phone...."
							/>
							<i className="fa fa-search"></i>
						</form>
					</div>
					<div className="col-md-4"></div>
				</div>
			</nav>
		</div>
	);
}

export default Header;
