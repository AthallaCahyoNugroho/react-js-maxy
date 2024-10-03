export default function Sidebar() {
  return (
    <>
    <div className="w-1/5 py-4 h-full">
      <div className="bg-blue-800 p-2 rounded-lg overflow-hidden h-full">
        <ul className="flex flex-col gap-3">
          <li>
            <a href="/calculator">
              <div className="w-full px-4 py-2 text-white rounded-md hover:bg-blue-500">Calculator</div>
            </a>
          </li>
          <li>
            <a href="/count-words">
              <div className="w-full px-4 py-2 text-white rounded-md hover:bg-blue-500">Count Words</div>
            </a>
          </li>
          <li>
            <a href="/count-chars">
              <div className="w-full px-4 py-2 text-white rounded-md hover:bg-blue-500">Count Chars</div>
            </a>
          </li>
        </ul>
      </div>
    </div>
    </>
  );
}
