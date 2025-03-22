import { useState } from "react";
import { Category } from "../../../../types/Categories";
import { Search } from "lucide-react";

const SearchBar = () => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const toggleFilterCategory = (key: string) => {
    setSelectedCategories((prev) => {
      if (prev.includes(key)) {
        return prev.filter((category) => category !== key); // Remove key if it exists
      } else {
        return [...prev, key]; // Add key if it doesn't exist
      }
    });
  };

  return (
    <div>
      <div className="flex justify-between gap-5 mb-5">
        <input type="text" className="border rounded-[10px] w-full p-2" />
        <button className="text-center align-middle">
          <Search className="w-5" />
        </button>
      </div>
      <div className="categories w-4/5 flex justify-between gap-2 rounded-b-lg">
        {Object.entries(Category).map(([key, category]) => {
          return (
            <button
              key={key}
              className={`border rounded-lg w-full p-2 font-semibold ${
                selectedCategories.includes(key) ? "bg-gray-200 text-black" : ""
              }`}
              onClick={() => {
                toggleFilterCategory(key);
              }}
            >
              {category}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default SearchBar;
