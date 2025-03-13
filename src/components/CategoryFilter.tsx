import React, { useCallback, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  getAllCategoryList,
  getMeals,
  getMealsByCategory,
  getMealsBySearch,
} from "../api/mealApi";
import debounce from "lodash.debounce";

interface Category {
  strCategory: string;
}

interface CategoryFilterProps {
  setMeals: React.Dispatch<React.SetStateAction<any[]>>;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ setMeals }) => {
  const {
    data: categories,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["category"],
    queryFn: getAllCategoryList,
    staleTime: 1000 * 60 * 5,
  });

  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const handleCategoryChange = async (category: string) => {
    setSelectedCategory(category);

    if (category === "") {
      const meals = await getMeals();
      setMeals(meals);
    } else {
      const meals = await getMealsByCategory(category);
      setMeals(meals);
    }
  };

  const handleSearchChange = (search: string) => {
    setSearchQuery(search);

    debouncedSearch(search);
  };

  const debouncedSearch = useCallback(
    debounce(async (search: string) => {
      if (search) {
        const meals = await getMealsBySearch(search);
        setMeals(meals);
      } else {
        if (selectedCategory) {
          const meals = await getMealsByCategory(selectedCategory);
          setMeals(meals);
        } else {
          const allMeals = await getMealsByCategory("");
          setMeals(allMeals);
        }
        const meals = await getMealsBySearch("");
        setMeals(meals);
      }
    }, 500),
    [selectedCategory, setMeals]
  );

  if (isLoading) {
    return <div>Loading categories...</div>;
  }

  if (isError) {
    return <div>Error loading categories.</div>;
  }

  return (
    <div className="category-filter">
      <div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => handleSearchChange(e.target.value)}
          placeholder="Search for meals..."
        />
      </div>
      <div>
        <select
          onChange={(e) => handleCategoryChange(e.target.value)}
          value={selectedCategory}
        >
          <option value="">All categories</option>
          {categories?.map((category: Category) => (
            <option key={category.strCategory} value={category.strCategory}>
              {category.strCategory}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default CategoryFilter;
