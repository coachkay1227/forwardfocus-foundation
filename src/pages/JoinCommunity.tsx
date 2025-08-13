import { useEffect } from "react";
import { Navigate } from "react-router-dom";

const JoinCommunityRedirect = () => {
  useEffect(() => {
    // Redirect to the combined community/learning page
    window.location.replace("/learn");
  }, []);

  return <Navigate to="/learn" replace />;
};

export default JoinCommunityRedirect;
