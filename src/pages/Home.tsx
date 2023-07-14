import Case from "../components/Case";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/auth.services";
import Navbar from "../components/Navbar";
export default function Home() {
  const navigate = useNavigate();
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    AuthService.logout().then(
      () => {
        navigate("/login");
      },
      (error) => {
        console.log(error);
      },
    );
  };
  return (
    <Case>
      <Navbar />
      <div className="w-full max-w-lg">
        <h4 className="text-2xl">Hello React</h4>
        <p className="text-lg leading-relaxed text-gray-400">
          A JavaScript library for building user interfaces
        </p>
        <button onClick={(e) => handleSubmit(e)}>Logout</button>
      </div>
    </Case>
  );
}
