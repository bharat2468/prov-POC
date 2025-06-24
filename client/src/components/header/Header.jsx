import { Link, useNavigate } from "react-router-dom";
import { Container, Logo } from "../index";
import ThemeToggle from "./Themetoggle";
import { useSelector } from "react-redux";

function Header() {
	const navigate = useNavigate();

	const navItems = [
		{
			name: "Home",
			slug: "/",
			active: true,
		},
		{
			name: "Favourites",
			slug: "/favourites",
			active: true,
		},
		{
			name: "All",
			slug: "/all",
			active: true,
		},
		{
			name: "Some",
			slug: "/some",
			active: true,
		},
	];

	return (
		<Container>
			<div className="navbar bg-base-100">
				<div className="navbar-start">
					<div className="dropdown">
						<div
							tabIndex={0}
							role="button"
							className="btn btn-ghost lg:hidden">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-5 w-5"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor">
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M4 6h16M4 12h8m-8 6h16"
								/>
							</svg>
						</div>
						<ul
							tabIndex={0}
							className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
							{navItems.map(
								(item) =>
									item.active && (
										<button
											key={item.name}
											onClick={() => navigate(item.slug)}
											className="btn btn-ghost">
											{item.name}
										</button>
									)
							)}
							<div className="flex justify-center">
								<ThemeToggle />
							</div>
						</ul>
					</div>
					<Link to="/" className="btn btn-ghost text-base">
						<Logo />
					</Link>
				</div>

				<div className="navbar-center hidden lg:flex">
					{navItems.map(
						(item) =>
							item.active && (
								<button
									key={item.name}
									onClick={() => navigate(item.slug)}
									className="btn btn-ghost">
									{item.name}
								</button>
							)
					)}
					<div className="flex justify-center ml-2">
						<ThemeToggle />
					</div>
				</div>
			</div>
		</Container>
	);
}

export default Header;
