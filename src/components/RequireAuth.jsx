import { useUrlState } from "@/contexts/UrlContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BarLoader } from "react-spinners";

// eslint-disable-next-line react/prop-types
function RequireAuth({ children }) {
  const navigate = useNavigate();
  const { loading, isAuthenticated } = useUrlState();

  useEffect(() => {
    if (!isAuthenticated && loading === false) navigate("/auth");
  }, [isAuthenticated, loading]);

  if (loading) return <BarLoader width={"100%"} color="36d7b7" />;
  if (isAuthenticated) return children;
}

export default RequireAuth;
