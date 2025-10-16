import { useNavigate, Link } from "react-router-dom";
import AuthForm from "../components/AuthForm";
import { authService } from "../services/authService";

export default function RegisterPage() {
  const navigate = useNavigate();

  const handleRegister = (username, password) => {
    authService.register(username, password);
    navigate("/login");
  };

  return (
    <div>
      <AuthForm type="register" onSubmit={handleRegister} />
      <p className="text-center mt-3 text-sm">
        Already have an account?{" "}
        <Link to="/login" className="text-blue-500 underline">
          Login
        </Link>
      </p>
    </div>
  );
}
