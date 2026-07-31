import AuthLayout from "../layouts/AuthLayout";
import AuthCard from "../components/auth/AuthCard";
import LoginForm from "../components/auth/LoginForm";

function Login() {
  return (
    <AuthLayout>
      <AuthCard
        title="Login to your account"
        subtitle="Welcome back! Please enter your credentials to access your account."
      >
        <LoginForm />
      </AuthCard>
    </AuthLayout>
  );
}

export default Login;
