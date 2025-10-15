import { useNavigate, Link } from "react-router-dom";
import AuthForm from "../components/AuthForm";
import { authService } from "../services/authService";

export default function LoginPage() {
  const navigate = useNavigate();

  const handleLogin = (username, password) => {
    authService.login(username, password);
    navigate("/");
  };

  return (
    <div>
      <AuthForm type="login" onSubmit={handleLogin} />
      <p className="text-center mt-3 text-sm">
        Don’t have an account?{" "}
        <Link to="/register" className="text-blue-500 underline">
          Register
        </Link>
      </p>
    </div>
  );
}
