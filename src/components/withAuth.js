import { useRouter } from "next/router";
import { useEffect } from "react";
import Cookies from "js-cookie";

const withAuth = (WrappedComponent) => {
  const Wrapper = (props) => {
    const router = useRouter();

    useEffect(() => {
      // Check for the presence of the token
      const token = Cookies.get("token");

      if (!token) {
        // Redirect to the login page if the user is not authenticated
        router.push("/login");
      }
    }, []);

    // Render the wrapped component if the user is authenticated
    return <WrappedComponent {...props} />;
  };

  return Wrapper;
};

export default withAuth;
