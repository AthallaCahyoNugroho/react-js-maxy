export default function MainPage() {
  return (
    <>
      <main className="w-full h-full">
        <div className="h-screen w-full max-w-[1600px] mx-auto xl:px-40 lg:px-20 md:px-8 sm:px-6 px-4 flex flex-col items-center justify-center">
          <div className="text-4xl font-semibold mb-4">
            This website built for task Day-28, Day-29, dan Day-30 from{" "}
            <span>
              <a href="">Maxy Academy</a>
            </span>
          </div>
          <div className="mt-4">
            <a href="/calculator" className="bg-blue-600 text-xl text-white font-semibold px-8 py-4 rounded">Getting Started</a>
          </div>
        </div>
      </main>
    </>
  );
}
