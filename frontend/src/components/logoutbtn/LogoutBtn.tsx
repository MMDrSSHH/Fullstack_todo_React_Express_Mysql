import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

function LogoutBtn() {
  const [cookies, setCookies, removeCookies] = useCookies(["token"]);
  const navigate = useNavigate();
  function handleLogout() {
    removeCookies("token");
    navigate("/login", { replace: true });
  }
  return (
    <button
      onClick={handleLogout}
      className="text-gray-50 font-medium bg-slate-800 py-1 px-2 rounded-md"
    >
      Logout
    </button>
  );
}

export default LogoutBtn;
