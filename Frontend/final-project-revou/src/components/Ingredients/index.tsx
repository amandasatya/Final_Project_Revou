"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import { recipeDetailCards } from "@/data";

interface Props {
  className?: string;
  recipeData: any;
}
interface IngredientProps {
  name: string;
  amount: string;
}
const Ingredients: React.FC<Props> = ({ recipeData }) => {
  const [userInput, setUserInput] = useState(0);
  // console.log("ingredient", recipeData.ingredients.ingredient_image);
  const handleChange = (event: any) => {
    setUserInput(event.target.value);
  };

  // console.log("inidata", recipeData);

  return (
    <div className="flex flex-col mt-10 sm:px-8 md:mt-0 ">
      <div
        // key={card.id}
        className="lg:justify-around mb-3"
      >
        <h1 className="flex justify-center items-center text-xl font-bold text-orange-700">
          Ingredients
        </h1>
        {/* <div className="flex mt-4 lg:flex gap-2">
          <div>
            <Button
              onChange={handleChange}
              className="rounded-full bg-orange-900"
            >
              -
            </Button>
          </div>
          <div className="items-center">
            <input
              type="number"
              className=" text-white w-12 py-2 text-base rounded-xl pl-5 bg-orange-900"
              defaultValue={recipeData.servings}
            />
          </div>
          <div>
            <Button
              onChange={handleChange}
              className="rounded-full bg-orange-900"
            >
              +
            </Button>
          </div>
        </div> */}
      </div>
      <div
        // key={card.id}
        className="flex px-0 w-full justify-around sm:mt-2 sm:pb-1 container border-b-2 border-slate-200 "
      >
        <div className="flex flex-start justify-start items-center gap-2 py-1">
          {recipeData.ingredients
            ? recipeData.ingredients.map((ingredient: any, index: number) => (
                <picture key={index}>
                  <img
                    // src={recipeData.ingredients}
                    alt=""
                    className="w-12 h-12 flex rounded-full"
                  />
                </picture>
              ))
            : null}
          <div className="flex flex-col gap-2">
            {recipeData.ingredients
              ? recipeData.ingredients.map((ingredient: any, index: number) => (
                  <div
                    key={index}
                    className="text-base sm:pl-2 font-medium text-orange-900 justify-start items-center flex"
                  >
                    <h1>{ingredient[0]}</h1>
                  </div>
                ))
              : null}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          {recipeData.ingredients
            ? recipeData.ingredients.map((ingredient: any, index: number) => (
                <div key={index}>
                  <h1 className="flex text-base font-semibold justify-start items-start text-slate-800">
                    {ingredient[1]}
                  </h1>
                </div>
              ))
            : null}
        </div>
      </div>
    </div>
  );
};

export default Ingredients;
