import React from "react";

const categories = [
  "All",
  "Politics",
  "Technology",
  "Sports",
  "Business",
  "Health",
  "Entertainment",
  "Science"
];

const CategoryFilter = ({ setFilters }) => {
  const handleCategoryClick = (category) => {
    // If setFilters is provided, call it. Otherwise do nothing.
    if (setFilters) {
      setFilters((prev) => ({
        ...prev,
        category: category === "All" ? "" : category,
      }));
    }
  };

  return (
    <div className="flex flex-wrap gap-3 items-center mb-4">
      <span className="font-semibold text-gray-700 mr-2">Topics:</span>
      {categories.map((cat, idx) => (
        <button
          key={idx}
          onClick={() => handleCategoryClick(cat)}
          className="px-4 py-2 rounded-full text-sm font-medium bg-gray-100 text-gray-700 border border-transparent hover:bg-red-500 hover:text-white hover:shadow-md transition-all duration-200"
        >
          {cat}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;