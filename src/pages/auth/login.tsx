import Login from "@/views/auth/Login";
import AuthWrapper from "@/components/AuthWrapper";

const LoginPage = () => {
  return (
    <AuthWrapper>
      <Login />
    </AuthWrapper>
  );
};

export default LoginPage;