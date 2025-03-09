// @verified
export default function SideBackground() {
  return (
    <div className="hidden h-screen w-1/2 lg:block xl:w-[50vw] 2xl:w-[44vw] relative">
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-800 via-zinc-900 to-black" />

      <div className="relative z-10 flex h-screen w-full flex-col items-center justify-center p-8">
        <div className="mb-16 mt-8 w-full text-center">
          <h5 className="text-4xl font-bold text-white">Content Stream</h5>
        </div>
        <div className="max-w-[600px] text-center text-2xl font-bold text-white">
          A unified dashboard to manage, schedule, and post content across streaming and social platforms,
          streamlining your workflow and maximizing audience reach.
        </div>
      </div>
    </div>
  );
}
