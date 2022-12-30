import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { signin } from "../actions/userActions";

export default function SigninScreen(props) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const redirect = "/home";
	const userSignin = useSelector((state) => state.userSignin);
	const { userInfo, loading, error } = userSignin;

	const dispatch = useDispatch();
	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(signin(email, password));
	};
	useEffect(() => {
		if (userInfo) {
			props.history.push("/");
		}
	}, [props.history, redirect, userInfo]);
	return (
		<div className="signin_screen">
			<div className="container-fluid">
				<div className="row">
					<div className="col-md-3"></div>
					<div className="col-md-6 mt-5">
						<form className="form postBx p-4" onSubmit={submitHandler}>
							<div>
								<h1 className="text-center">Sign In</h1>
							</div>
							<div>
								<label htmlFor="email">Email address</label>
								<input
									type="email"
									id="email"
									placeholder="Enter email"
									required
									className="form-control"
									onChange={(e) => setEmail(e.target.value)}
								></input>
							</div>
							<div>
								<label htmlFor="password">Password</label>
								<input
									type="password"
									id="password"
									placeholder="Enter password"
									required
									className="form-control"
									onChange={(e) => setPassword(e.target.value)}
								></input>
							</div>
							<div>
								<label />
								<button
									className="primary btn btn-success ml-auto mt-2"
									type="submit"
								>
									Sign In
								</button>
							</div>
							<div>
								<label />
								<div>
									New customer? <Link to="/register">Create your account</Link>
								</div>
							</div>
						</form>
					</div>
					<div className="col-md-3"></div>
				</div>
			</div>
		</div>
	);
}
