function BackgroundGlow() {
  return (
    <>
      <div className="absolute left-0 top-0 h-[450px] w-[450px] rounded-full bg-blue-600/25 blur-[150px]" />

      <div className="absolute right-0 bottom-0 h-[500px] w-[500px] rounded-full bg-cyan-500/20 blur-[170px]" />

      <div className="absolute left-1/2 top-1/3 h-[300px] w-[300px] -translate-x-1/2 rounded-full bg-indigo-500/20 blur-[140px]" />
    </>
  );
}

export default BackgroundGlow;
