import { useState } from "react";

export default function SearchBox({ onSearchClick }) {
  const [searchValue, setSearchValue] = useState("");

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!searchValue.trim()) return;
    onSearchClick(searchValue);
  };

  return (
    <form
      onSubmit={handleFormSubmit}
      className="search-bar-container flex items-center gap-3 mt-6 w-full max-w-2xl px-3"
    >
      <input
        type="text"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        placeholder="🔍 Search meals (e.g., pasta, chicken, salad)..."
        className="search-input flex-1 px-5 py-3 border border-gray-300 rounded-xl shadow focus:outline-none focus:ring-2 focus:ring-primaryBlue text-lg"
      />
      <button
        type="submit"
        className="search-btn px-6 py-3 bg-primaryBlue text-white font-semibold rounded-xl shadow hover:bg-primaryBlueDark active:scale-95 transition"
      >
        Search
      </button>
    </form>
  );
}
