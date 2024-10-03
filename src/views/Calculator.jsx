import { useEffect, useState } from "react";
import Sidebar from "../components/sidebar";

export default function CalculatorPage() {
  const [input, setInput] = useState(0);
  const [inputA, setInputA] = useState(0);
  const [inputB, setInputB] = useState(0);
  const [inputC, setInputC] = useState(0);
  const [priority, setPriority] = useState({
    type: "",
    state: false,
  });
  const [pre, setPre] = useState(false);
  const [theEqual, setTheEqual] = useState(false);
  const [theDecimal, setTheDecimal] = useState(false);
  const [onType, setOnType] = useState(false);
  const [theType, setTheType] = useState("");

  function checkForDot(sentence) {
    return sentence.includes(".");
  }

  useEffect(() => {
    if (pre === false) {
      setTheDecimal(checkForDot(String(inputA)));
    } else if (pre === true) {
      setTheDecimal(checkForDot(String(inputB)));
    }
  }, [pre, inputA, inputB]);

  console.log(theDecimal);

  const handleDot = () => {
    if (theDecimal === false) {
      if (pre === false) {
        setInputA(inputA + ".");
      } else if (pre === true) {
        setInputB(inputB + ".");
      }

      setTheDecimal(true);
    }
  };

  const execution = (value) => {
    if (value === "sum") {
      setInputA(Number(inputA) + Number(inputB));
      return Number(inputA) + Number(inputB);
    } else if (value === "sub") {
      setInputA(Number(inputA) - Number(inputB));
      return Number(inputA) - Number(inputB);
    } else if (value === "div") {
      setInputA(Number(inputA) / Number(inputB));
      return Number(inputA) / Number(inputB);
    } else if (value === "mul") {
      setInputA(Number(inputA) * Number(inputB));
      return Number(inputA) * Number(inputB);
    }
  };

  const handleClear = () => {
    console.log("execution handleClear");
    setInput(0);
    setInputA(0);
    setInputB(0);
    setPre(false);
    setTheEqual(false);
    setOnType(false);
    setTheType("");
    setPriority({ type: "", state: false });
  };

  const handleDelete = (e) => {
    if (pre === false) {
      if (Number(inputA) === 0) {
        setInputA(0);
      } else if (theEqual === true && pre === false) {
        setInputA(inputA);
      } else {
        if (inputA.length > 1) {
          const newText = inputA.slice(0, inputA.length - 1);
          setInputA(newText);
        } else {
          setInputA(0);
        }
      }
    } else if (pre === true) {
      if (Number(inputB) === 0) {
        setInputB(e.target.value);
      } else if (theEqual === true && pre === false) {
        setInputB(e.target.value);
        setTheEqual(false);
      } else {
        setInputB((old) => old + e.target.value);
      }
    }
  };

  // handle Input
  const handleOnClick = (e) => {
    if (theEqual === true) setInput(0);
    setOnType(false);

    if (pre === false) {
      if (Number(inputA) === 0) {
        setInputA(e.target.value);
      } else if (theEqual === true && pre === false) {
        setInputA(e.target.value);
        setTheEqual(false);
      } else {
        setInputA((old) => old + e.target.value);
      }
    } else if (pre === true) {
      if (Number(inputB) === 0) {
        setInputB(e.target.value);
      } else if (theEqual === true && pre === false) {
        setInputB(e.target.value);
        setTheEqual(false);
      } else {
        setInputB((old) => old + e.target.value);
      }
    }
  };

  // Penjumlahan
  const addition = () => {
    if (pre === false) setInput(inputA + " + ");
    else if (pre === true) setInput(input + inputB + " + ");

    setTheEqual(false);

    if (onType === false) {
      if (priority.state === true) {
        if (theType === "sum") {
          setInputA(Number(inputC) + execution(priority.type));
          setInputC("");
        }
        if (theType === "sub") {
          setInputA(Number(inputC) - execution(priority.type));
          setInputC("");
        }
        setPriority({ state: false, type: "" });
        setTheType("sum");
        setInputB(0);
      } else {
        if (theType === "" || theEqual === true) {
          setTheType("sum");
          setPre(true);
        } else {
          execution(theType);
          setTheType("sum");
          setInputB(0);
        }
      }
      setOnType(true);
    }
  };

  // Pengurangan
  const subtraction = () => {
    if (pre === false) setInput(inputA + " - ");
    else if (pre === true) setInput(input + inputB + " - ");

    setTheEqual(false);

    if (onType === false) {
      if (priority.state === true) {
        if (theType === "sum") {
          setInputA(Number(inputC) + execution(priority.type));
          setInputC("");
        }
        if (theType === "sub") {
          setInputA(Number(inputC) - execution(priority.type));
          setInputC("");
        }
        setPriority({ state: false, type: "" });
        setTheType("sub");
        setInputB(0);
      } else {
        if (theType === "") {
          setTheType("sub");
          setPre(true);
        } else {
          execution(theType);
          setTheType("sub");
          setInputB(0);
        }
      }
      setOnType(true);
    }
  };

  // Pembagian
  const division = () => {
    if (pre === false) setInput(inputA + " / ");
    else if (pre === true) setInput(input + inputB + " / ");

    setTheEqual(false);
    if (onType === false) {
      if (priority.state === true) {
        execution(priority.type);
        setPriority({ state: true, type: "div" });
        setInputB(0);
      } else {
        if (theType === "") {
          setTheType("div");
          setPre(true);
        } else if (theType === "sum" || theType === "sub") {
          setInputC(inputA);
          setInputA(inputB);
          setPriority({ state: true, type: "div" });
          if (theType === "sum") {
            setTheType("sum");
          }
          if (theType === "sub") {
            setTheType("sub");
          }
          setInputB(0);
        } else {
          execution(theType);
          setTheType("div");
          setInputB(0);
        }
      }
      setOnType(true);
    }
  };

  // Perkalian
  const multiplication = () => {
    if (pre === false) setInput(inputA + " * ");
    else if (pre === true) setInput(input + inputB + " * ");

    setTheEqual(false);
    if (onType === false) {
      if (priority.state === true) {
        execution(priority.type);
        setPriority({ state: true, type: "mul" });
        setInputB(0);
      } else {
        if (theType === "") {
          setTheType("mul");
          setPre(true);
        } else if (theType === "sum" || theType === "sub") {
          setInputC(inputA);
          setInputA(inputB);
          setPriority({ state: true, type: "mul" });
          if (theType === "sum") {
            setTheType("sum");
          }
          if (theType === "sub") {
            setTheType("sub");
          }
          setInputB(0);
        } else {
          execution(theType);
          setTheType("mul");
          setInputB(0);
        }
      }
      setOnType(true);
    }
  };

  // equal
  const equal = () => {
    if (pre === true) setInput(input + inputB + " = ");

    if (theEqual === false) {
      if (priority.state === true) {
        if (theType === "sum") {
          setInputA(Number(inputC) + execution(priority.type));
          setInputC("");
        }
        if (theType === "sub") {
          setInputA(Number(inputC) - execution(priority.type));
          setInputC("");
        }
        setTheEqual(true);
        setTheType("");
        setPre(false);
        setInputB(0);
        setPriority({ state: false, type: "" });
      } else {
        execution(theType);
        setTheEqual(true);
        setTheType("");
        setPre(false);
        setInputB(0);
      }
    }
  };
  console.log(priority);

  return (
    <>
      <div className="w-full h-screen flex flex-col justify-center items-center">
        <div className="h-full w-full max-h-[800px] max-w-[1600px] mx-auto xl:px-40 lg:px-20 md:px-8 sm:px-6 px-4 flex ">
          <Sidebar />
          <div className="w-full py-4 px-8">
            <main className="h-full p-8 bg-slate-100">
              <form
                className="h-full"
                method="POST"
                onSubmit={(e) => e.preventDefault()}
              >
                <div className="h-2/5">
                  <div className="text-lg w-full text-right font-semibold">{input}</div>
                  <div className="text-2xl w-full text-right font-semibold">
                    {pre === false
                      ? inputA === null
                        ? 0
                        : inputA
                      : inputB === null
                      ? 0
                      : inputB}
                  </div>
                </div>
                <div className="h-3/5">
                  <div className="grid grid-cols-4 h-full gap-2">
                    <button
                      className="border border-black rounded-[1rem] bg-slate-50 font-medium hover:bg-blue-100"
                      onClick={handleClear}
                    >
                      Clear
                    </button>
                    <button
                      className="border border-black rounded-[1rem] bg-slate-50 font-medium hover:bg-blue-100"
                      onClick={handleDelete}
                    >
                      Delete
                    </button>
                    <button className=""></button>
                    <button
                      className="border border-black rounded-[1rem] bg-slate-50 font-medium hover:bg-blue-100"
                      onClick={division}
                    >
                      :
                    </button>
                    <button
                      className="border border-black rounded-[1rem] bg-slate-50 font-medium hover:bg-blue-100"
                      onClick={handleOnClick}
                      value={1}
                    >
                      1
                    </button>
                    <button
                      className="border border-black rounded-[1rem] bg-slate-50 font-medium hover:bg-blue-100"
                      onClick={handleOnClick}
                      value={2}
                    >
                      2
                    </button>
                    <button
                      className="border border-black rounded-[1rem] bg-slate-50 font-medium hover:bg-blue-100"
                      onClick={handleOnClick}
                      value={3}
                    >
                      3
                    </button>
                    <button
                      className="border border-black rounded-[1rem] bg-slate-50 font-medium hover:bg-blue-100"
                      onClick={multiplication}
                    >
                      *
                    </button>
                    <button
                      className="border border-black rounded-[1rem] bg-slate-50 font-medium hover:bg-blue-100"
                      onClick={handleOnClick}
                      value={4}
                    >
                      4
                    </button>
                    <button
                      className="border border-black rounded-[1rem] bg-slate-50 font-medium hover:bg-blue-100"
                      onClick={handleOnClick}
                      value={5}
                    >
                      5
                    </button>
                    <button
                      className="border border-black rounded-[1rem] bg-slate-50 font-medium hover:bg-blue-100"
                      onClick={handleOnClick}
                      value={6}
                    >
                      6
                    </button>
                    <button
                      className="border border-black rounded-[1rem] bg-slate-50 font-medium hover:bg-blue-100"
                      onClick={subtraction}
                    >
                      -
                    </button>
                    <button
                      className="border border-black rounded-[1rem] bg-slate-50 font-medium hover:bg-blue-100"
                      onClick={handleOnClick}
                      value={7}
                    >
                      7
                    </button>
                    <button
                      className="border border-black rounded-[1rem] bg-slate-50 font-medium hover:bg-blue-100"
                      onClick={handleOnClick}
                      value={8}
                    >
                      8
                    </button>
                    <button
                      className="border border-black rounded-[1rem] bg-slate-50 font-medium hover:bg-blue-100"
                      onClick={handleOnClick}
                      value={9}
                    >
                      9
                    </button>
                    <button
                      className="border border-black rounded-[1rem] bg-slate-50 font-medium hover:bg-blue-100"
                      onClick={addition}
                    >
                      +
                    </button>
                    <button className="border border-black rounded-[1rem] bg-slate-50 font-medium hover:bg-blue-100">
                      +/-
                    </button>
                    <button
                      className="border border-black rounded-[1rem] bg-slate-50 font-medium hover:bg-blue-100"
                      onClick={handleOnClick}
                      value={0}
                    >
                      0
                    </button>
                    <button
                      className="border border-black rounded-[1rem] bg-slate-50 font-medium hover:bg-blue-100"
                      onClick={handleDot}
                      value={"."}
                    >
                      .
                    </button>
                    <button
                      className="border border-black rounded-[1rem] bg-slate-50 font-medium hover:bg-blue-100"
                      onClick={equal}
                    >
                      =
                    </button>
                  </div>
                </div>
              </form>
            </main>
          </div>
        </div>
      </div>
    </>
  );
}
