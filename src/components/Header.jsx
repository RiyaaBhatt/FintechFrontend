const Header = () => {
  return (
    <div className="">
      <header className="fixed top-0 left-0 w-full flex items-center justify-between bg-[#A9DEF9] p-4 shadow-sm z-50 ">
        {/* Logo */}
        <div className="flex items-center">
          <h1 className="ml-3 text-lg font-bold text-gray-800">Fintech</h1>
        </div>

        {/* Search Bar */}
        <div className="flex-grow mx-4 max-w-xs">
          <input
            type="text"
            placeholder="Search..."
            className="w-full px-3 py-1 border-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-500 text-sm"
          />
        </div>

        {/* User Actions (Icons) */}
        <div className="flex items-center space-x-4">
          <button className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
          </button>
          <button className="p-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </button>
        </div>
      </header>
    </div>
  );
};

export default Header;
