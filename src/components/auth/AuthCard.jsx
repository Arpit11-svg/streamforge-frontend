import { Logo } from "../ui";

function AuthCard({ title, subtitle, children }) {
  return (
    <div className="w-full max-w-xl rounded-3xl border border-slate-700/50 bg-slate-900/60 backdrop-blur-xl shadow-2xl shadow-blue-900/20 p-10">
      <div className="flex justify-center">
        <Logo width="140px" />
      </div>

      <h1 className=" mt-6 text-center text-4xl font-bold text-white">
        {title}
      </h1>

      <p className=" mt-3 text-center text-slate-400">{subtitle}</p>

      <div className="my-8 h-px bg-gradient-to-r from-transparent via-slate-600to-transparent" />

      {children}
    </div>
  );
}

export default AuthCard;
