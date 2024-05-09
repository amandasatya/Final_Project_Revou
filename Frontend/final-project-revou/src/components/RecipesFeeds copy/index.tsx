"use client";
import React, { useState, useEffect } from "react";
import logo1 from "../../components/images/cookingtools/spatula-svgrepo-com.svg";
import useFetchRecipe from "@/hooks/UseFetchRecipe";

import { Button } from "../ui/button";

import MainDishes_vmhb from "./MainDishes_vmhb";
import Appetizers_vmhb from "./Appetizers_vmhb";
import Desserts_vmhb from "./Desserts_vmhb";
import Beverages_vmhb from "./Beverages_vmhb";
import SideDishes_vmhb from "./SideDishes_vmhb";
import WeeklyRecipes_vmhb from "./WeeklyRecipes_vmhb";
import HealthyRecipes_vmhb from "./HealthyRecipes_vmhb";

import HomeLogo from "../../components/images/sidebarlogo/home-svgrepo-com.svg";
import MyRecipeLogo from "../../components/images/sidebarlogo/notes-svgrepo-com.svg";
import FollowedRecipesLogo from "../../components/images/sidebarlogo/follower-svgrepo-com.svg";
import MyFavoriteRecipesLogo from "../../components/images/sidebarlogo/love-letter-note-svgrepo-com.svg";
import NutritionsLogo from "../../components/images/sidebarlogo/nutrition-svgrepo-com.svg";
import CategoriesLogo from "../../components/images/sidebarlogo/category-svgrepo-com.svg";
import OriginsLogo from "../../components/images/sidebarlogo/country-direction-location-map-navigation-pin-svgrepo-com.svg";

import Magnifier from "../../components/images/svg/icons8-magnifier.svg";
import WeeklyRecipes from "../RecipesFeeds/WeeklyRecipes";
import AllRecipes from "../RecipesFeeds/AllRecipes";

const RecipeFeeds_vmhb = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { recipes } = useFetchRecipe();
  const [recipesData, setRecipesData] = useState<[]>([]);
  const [categoriesData, setCategoriesData] = useState<string[]>([]);
  // console.log("ini recipes", recipes);

  useEffect(() => {
    if (recipes) {
      const categories: string[] = [];
      recipes.forEach((recipe) => {
        if (recipe.type === "mainDishes") {
          categories.push("Main Dishes");
        }
        if (recipe.type === "sideDish") {
          categories.push("Side Dishes");
        }
        if (recipe.type === "appetizers") {
          categories.push("Appetizers");
        }
        if (recipe.type === "beverages") {
          categories.push("Beverages");
        }
        if (recipe.type === "desserts") {
          categories.push("Desserts");
        }
        if (recipe.type === "healtyRecipe") {
          categories.push("Healty Recipe");
        }
      });
      setCategoriesData(categories);
    }
  }, [recipes]);

  const categories = [
    "Healthy Recipes",
    "Appetizers",
    "Main Dishes",
    "Desserts",
    "Beverages",
    "Side Dishes",
  ];

  const sideBarCategories = [
    { name: "Home", image: HomeLogo.src },
    { name: "My Recipe", image: MyRecipeLogo.src },
    { name: "Followed Recipes", image: FollowedRecipesLogo.src },
    { name: "My Favorite Recipes", image: MyFavoriteRecipesLogo.src },
    { name: "Nutritions", image: NutritionsLogo.src },
    { name: "Categories", image: CategoriesLogo.src },
    { name: "Origins", image: OriginsLogo.src },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <div className="flex relative w-full sm:justify-around">
      {/* Sidebar */}
      {isSidebarOpen && (
        <div className="z-20 absolute top-0 left-0 sm:hidden sm:static flex-col items-center p-5 pl-0 pt-0">
          <div className="flex flex-col justify-center items-start p-4 bg-slate-50 rounded-lg shadow-sm shadow-slate-500 gap-2 lg:gap-5">
            {sideBarCategories.map((sideBarCategory) => (
              <div
                key={sideBarCategory.name}
                className={`sideBarCategories flex w-full rounded-lg gap-3 justify-start items-center p-2 xl:p-3 cursor-pointer hover:bg-slate-200 ${
                  selectedCategory === sideBarCategory.name
                    ? "bg-slate-200 shadow-sm shadow-slate-500 font-medium text-slate-800"
                    : ""
                }`}
                onClick={() => handleCategoryClick(sideBarCategory.name)}
              >
                <img src={sideBarCategory.image} alt="" className="h-6 w-6" />
                <h2 className="text-slate-700 text-sm xl:text-base">
                  {sideBarCategory.name}
                </h2>
              </div>
            ))}
          </div>
        </div>
      )}
      <div className="hidden z-20 absolute top-0 left-0 sm:static sm:flex flex-col items-center p-5 pl-0 pt-0">
        <div className="flex flex-col justify-center items-start p-4 sm:pr-8 bg-slate-50 rounded-lg shadow-sm shadow-slate-500 gap-2 lg:gap-5">
          {sideBarCategories.map((sideBarCategory) => (
            <div
              key={sideBarCategory.name}
              className={`sideBarCategories flex w-full rounded-lg gap-3 justify-start items-center p-2 xl:p-3 cursor-pointer hover:bg-slate-200 ${
                selectedCategory === sideBarCategory.name
                  ? "bg-slate-200 shadow-sm shadow-slate-500 font-medium text-slate-800"
                  : ""
              }`}
              onClick={() => handleCategoryClick(sideBarCategory.name)}
            >
              <img src={sideBarCategory.image} alt="" className="h-6 w-6" />
              <h2 className="text-slate-700 text-sm xl:text-base sm:pr-5">
                {sideBarCategory.name}
              </h2>
            </div>
          ))}
        </div>
      </div>
      {/* Main side */}
      <div className="w-full lg:w-3/4 flex flex-col px-1 py-3">
        {/* Title and kebab button */}
        <div className="flex justify-between items-center">
          <h1 className="text-xl xl:text-2xl font-semibold text-slate-800">
            Discover Recipes
          </h1>
          <Button
            onClick={toggleSidebar}
            className="bg-slate-800 hover:bg-slate-900 sm:hidden"
          >
            ...
          </Button>
        </div>
        {/* Category tags */}
        <div className="flex flex-wrap gap-1 lg:gap-3 xl:gap-4 pl-1 mt-3 lg:pl-3 xl:pl-5">
          {categories.map((category) => (
            <Button
              key={category}
              className={`category p-2 bg-slate-500 hover:bg-slate-700 ${
                selectedCategory === category
                  ? "bg-slate-700 rounded-lg shadow-sm text-white shadow-slate-900"
                  : ""
              }`}
              onClick={() => handleCategoryClick(category)}
            >
              <h2 className="text-sm xl:text-base text-slate-100">
                {category}
              </h2>
            </Button>
          ))}
          <div className="pr-24 z-0">
            <div className="relative flex">
              <input
                type="search"
                className="border-slate-500 border-2 rounded-md p-2"
                placeholder="Search Recipe Here"
              />
              <img
                src={Magnifier.src}
                alt=""
                className="h-6 w-6  absolute right-2 top-2 "
              />
            </div>
          </div>
        </div>
        <div className="pt-5">
          <h1>Weekly Recipes</h1>
          <WeeklyRecipes recipeCategoryName="" />
        </div>
        <div className="pt-5">
          <h1>All Recipes</h1>
          <AllRecipes recipeCategoryName="All Recipes" />
        </div>
        <div className="pt-5">
          {selectedCategory === "Home" && (
            <WeeklyRecipes_vmhb recipeCategoryName="" />
          )}
          {selectedCategory === "Healthy Recipes" && (
            <HealthyRecipes_vmhb recipeCategoryName="Healthy Recipes" />
          )}
          {selectedCategory === "Appetizers" && <Appetizers_vmhb />}
          {selectedCategory === "Main Dishes" && <MainDishes_vmhb />}
          {selectedCategory === "Desserts" && <Desserts_vmhb />}
          {selectedCategory === "Beverages" && <Beverages_vmhb />}
          {selectedCategory === "Side Dishes" && <SideDishes_vmhb />}
        </div>
      </div>
    </div>
  );
};

export default RecipeFeeds_vmhb;
