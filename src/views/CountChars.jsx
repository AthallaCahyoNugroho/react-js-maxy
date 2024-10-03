import { useState } from "react";
import Sidebar from "../components/sidebar";

export default function CountCharsPage() {
  const [chars, setChars] = useState('')

  const handleSubmit = (e) => {
    setChars('');
    e.preventDefault();
    e.target[0].value.split(" ").forEach((word) => word !== "" ? setChars(n => n + word) : false);
  }

  return(
    <>
      <div className="w-full h-screen flex flex-col justify-center items-center">
        <div className="h-full w-full max-h-[800px] max-w-[1600px] mx-auto xl:px-40 lg:px-20 md:px-8 sm:px-6 px-4 flex">
          <Sidebar />
          <div className="w-full py-4 px-8">
            <main className="h-full p-8 bg-slate-100">
            <form
                className="h-full flex flex-col items-center justify-center"
                method="POST"
                onSubmit={handleSubmit}
              >
                <div className="font-medium text-lg">Banyak Char Dalam Input</div>
                <div className="font-semibold text-2xl mb-4">{ chars.length }</div>
                <label htmlFor="input-words" className="block">
                  Masukan Kalimat
                </label>
                <input type="text" name="input-words" id="input-words" className="block border border-black" />
                <button type="submit" className="mt-2 bg-blue-600 text-white font-semibold px-4 py-2 rounded">Submit</button>
              </form>
            </main>
          </div>
        </div>
      </div>
    </>
  )
}