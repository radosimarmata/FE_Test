import Case from "./Case";
import NavLink from "./Navlink";
import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <div className="bg-blue-600 py-2">
            <Case>
                <div className="flex items-center ms-6">
                    <Link
                        className="mr-2 text-sm font-semibold uppercase text-white"
                        to="/"
                    >
                        React Starter
                    </Link>
                    <NavLink href="/">Dashboard</NavLink>
                    <NavLink href="#">Master Data</NavLink>
                    <a>LOGOUT</a>
                </div>
            </Case>
        </div>
    );
}