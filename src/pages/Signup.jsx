import AuthLayout from "../layouts/AuthLayout";
import AuthCard from "../components/auth/AuthCard";
import SignupForm from "../components/auth/SignupForm";

function Signup() {
  return (
    <AuthLayout>
      <AuthCard
        title="Create your account"
        subtitle="Join StreamForge and start sharing your creativity."
      >
        <SignupForm />
      </AuthCard>
    </AuthLayout>
  );
}

export default Signup;
