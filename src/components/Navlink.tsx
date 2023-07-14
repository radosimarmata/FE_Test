import { Link } from "react-router-dom";

export default function NavLink({ href, children, ...props }: any) {
  return (
    <Link
      className="inline-flex px-4 py-2 text-blue-300 hover:text-white"
      to={href}
      {...props}
    >
      {children}
    </Link>
  );
}
