import React, { useState } from "react";
import { chefMainCard2 } from "@/data";
import { Button } from "@/components/ui/button";

const MyRecipe: React.FC = () => {
  const [showCount, setShowCount] = useState(4);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleShowMore = () => {
    setShowCount((prevCount) => prevCount + 4);
  };

  const toggleShowLess = () => {
    setShowCount((prevCount) => Math.max(4, prevCount - 4));
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filteredRecipes = chefMainCard2[0]?.recipe
    .flatMap((recipeCategory) => recipeCategory.category.HealtyRecipes)
    .filter((recipe) =>
      recipe.recipeName.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl">My Recipe</h1>
        <input
          type="search"
          className="border-2 border-slate-400 rounded-lg p-3"
          placeholder="Search here"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>
      <div className="pt-10">
        <h1>Healthy Recipes</h1>
        <div className="grid grid-cols-4 gap-4 px-10 pt-4">
          {filteredRecipes?.slice(0, showCount).map((recipe, index) => (
            <div key={index} className="rounded-xl shadow-md shadow-black">
              <img src={recipe.image} alt="" className="rounded-t-xl" />
              <div className="flex flex-col gap-2 pt-2 bg-slate-50 rounded-b-xl p-5">
                <div className="flex justify-center items-center">
                  {recipe.recipeName}
                </div>
                <div className="flex justify-around items-center">
                  <div>{recipe.difficulty}</div>
                  <div>{recipe.servings}</div>
                  <div>{recipe.nutriScore}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="px-10 pt-4 flex justify-end items-center gap-2">
          {showCount > 4 && (
            <Button onClick={toggleShowLess} className="text-white">
              Show Less
            </Button>
          )}
          {showCount < filteredRecipes?.length && (
            <Button onClick={toggleShowMore} className="text-white">
              Show More
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyRecipe;
