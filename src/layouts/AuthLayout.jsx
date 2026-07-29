import BackgroundGlow from "../components/common/BackgroundGlow";

function AuthLayout({ children }) {
  return (
    <div
      className="relative min-h-screen overflow-hidden bg-slate-950"
    >
      <BackgroundGlow />

      <div
        className="relative  z-10 flex min-h-screen items-center justify-center px-6 py-12"
      >
        {children}
      </div>
    </div>
  );
}

export default AuthLayout;
