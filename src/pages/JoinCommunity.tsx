### **2. Replace JoinCommunity.tsx with this simple redirect:**

```tsx
import { useEffect } from "react";
import { Navigate } from "react-router-dom";

const Page = () => {
  useEffect(() => {
    // Redirect to the combined community/learning page
    window.location.href = "/learn";
  }, []);
  
  return <Navigate to="/learn" replace />;
};

export default Page;