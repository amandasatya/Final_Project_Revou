import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import useFetchRecipe from "@/hooks/UseFetchRecipe";
import { Recipe } from "@/hooks/UseFetchRecipe";
import { RecipeData } from "../AllRecipes";

import ModalRecipe from "@/components/ModalRecipe";
import ComplexityLogo from "../../../components/images/svg/levels-svgrepo-com.svg";
import NutriLogo from "../../../components/images/svg/cardlogo/scoreboard-svgrepo-com.svg";
import ServingLoo from "../../../components/images/svg/cardlogo/cover-dish-svgrepo-com.svg";

interface dessertsProps {
  categories: string[];
}

const desserts: React.FC<dessertsProps> = () => {
  const [showCount, setShowCount] = useState(4);
  const { recipes } = useFetchRecipe();
  const [selectedRecipe, setSelectedRecipe] = useState<RecipeData | null>(null);
  const [showModal, setShowModal] = useState(false);

  const toggleShowMore = () => {
    setShowCount((prevCount) => prevCount + 4);
  };

  const toggleShowLess = () => {
    setShowCount((prevCount) => Math.max(4, prevCount - 4));
  };

  const handleRecipeClick = (recipe: RecipeData) => {
    setSelectedRecipe(recipe);
    setShowModal(true);
    // console.log(setSelectedRecipe);
  };
  return (
    <div className="item-list">
      <h1>Desserts</h1>
      <div className=" pr-16 ">
        <div className="grid grid-cols-4 gap-7 px-20 py-10 ">
          {recipes
            .filter((recipe) => recipe.type === "Dessert")
            .slice(0, showCount)
            .map((recipe, index) => (
              <div
                className="rounded-xl shadow-md shadow-black cursor-pointer"
                key={index}
                onClick={() =>
                  handleRecipeClick(recipe as unknown as RecipeData)
                }
              >
                <div className=" h-44 overflow-hidden">
                  <img
                    src={recipe.attachment}
                    alt=""
                    className="rounded-t-xl object-cover flex"
                  />
                </div>
                <div className="flex flex-col pt-2 bg-slate-50 rounded-b-xl p-5  overflow-hidden justify-center items-center gap-10 h-40">
                  <div className="flex justify-center items-center text-center">
                    {recipe.title}
                  </div>
                  <div className="flex justify-around items-center gap-2">
                    <div className="flex gap-1 justify-center items-center">
                      <img
                        src={ComplexityLogo.src}
                        alt=""
                        className="h-6 w-6"
                      />
                      <div>{recipe.complexity}</div>
                    </div>
                    <div className="flex gap-2 justify-center items-center">
                      <img src={ServingLoo.src} alt="" className="h-6 w-6" />
                      <div>4 persons</div>
                    </div>
                    <div className="flex gap-2 justify-center items-center">
                      <img src={NutriLogo.src} alt="" className="h-6 w-6" />
                      <div>{recipe.nutriscore}</div>
                    </div>
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
          {showCount <
            recipes.filter((recipe) => recipe.type === "desserts").length && (
            <Button onClick={toggleShowMore} className="text-white">
              Show More
            </Button>
          )}
        </div>
        {showModal && selectedRecipe && (
          <ModalRecipe
            recipe={selectedRecipe}
            showModal={showModal}
            setShowModal={setShowModal}
          />
        )}
      </div>
    </div>
  );
};

export default desserts;
