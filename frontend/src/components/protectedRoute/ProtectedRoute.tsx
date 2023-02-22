import { Navigate, useNavigate } from "react-router-dom";
import { useUser } from "../../hooks/queryHooks";

function ProtectedRoute({ children }: { children: any }) {
  const { data, isSuccess } = useUser();
  const navigate = useNavigate();
  const user = data?.data;

  if (isSuccess && user?.error) {
    return navigate("/login", { replace: true });
  } else if (isSuccess && !user?.error) {
    return children;
  }
}

export default ProtectedRoute;
