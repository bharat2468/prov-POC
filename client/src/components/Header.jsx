import React from "react";
import { Link } from "react-router-dom";
// import ThemeToggle from "./ThemeToggle";
import { CiSearch } from "react-icons/ci";

const Header = () => {
	return (
		<div className="navbar bg-base-100 flex justify-between items-center p-4">
			<div>
				<Link to="/" className="btn btn-ghost text-xl">
                    Bharat's Blog
				</Link>
			</div>

			<div>
				<div className="hidden lg:flex">
					<label className="input input-bordered flex items-center gap-2 w-full max-w-md">
						<input
							type="text"
							className="flex-grow"
							placeholder="Search"
						/>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 16 16"
							fill="currentColor"
							className="h-4 w-4 opacity-70">
							<path
								fillRule="evenodd"
								d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
								clipRule="evenodd"
							/>
						</svg>
					</label>
				</div>
				<button className="btn btn-circle lg:hidden">
					<CiSearch className="w-5 h-5"/>
				</button>
			</div>

			<div className="hidden md:flex justify-center lg:justify-end">
				<ul className="menu menu-horizontal px-1">
					<li>
						<Link to="/">Home</Link>
					</li>
					<li>
						<Link to="/contact">Contact</Link>
					</li>
				</ul>
			</div>
			<div className=" items-center hidden sm:flex ">
				<ul className="menu menu-horizontal px-1">
					{/* <li>
						<ThemeToggle />
					</li> */}
					<li>
						<Link to="/sign-in">Sign In</Link>
					</li>
				</ul>
			</div>
			<details className="dropdown dropdown-end md:hidden">
				<summary className="btn m-1">Menu</summary>
				<ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
					<li>
						<Link to="/">Home</Link>
					</li>
					<li>
						<Link to="/contact">Contact</Link>
					</li>

					<div className="sm:hidden">
						{/* <li>
							<ThemeToggle />
						</li> */}
						<li>
							<Link to="/sign-in">Sign In</Link>
						</li>
					</div>
				</ul>
			</details>
		</div>
	);
};

export default Header;
