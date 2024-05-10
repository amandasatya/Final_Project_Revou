"use client";
import React, { useEffect, useState } from "react";
import logo1 from "../../components/images/cookingtools/spatula-svgrepo-com.svg";
import SliderImage from "../SliderImage";
import Card from "../../components/Card";
import useFetchRecipe from "@/hooks/UseFetchRecipe";
import { Recipe } from "@/hooks/UseFetchRecipe";
import { RecipeData } from "./AllRecipes";

import { chefMainCard, chefMainCard2 } from "@/data";
import HealtyRecipes from "./HealtyRecipes";
import MainDishes from "./MainDishes";
import Appetizers from "./Appetizers";
import Desserts from "./Desserts";
import Beverages from "./Beverages";
import SideDishes from "./SideDishes";
import WeeklyRecipes from "./WeeklyRecipes";
import AllRecipes from "./AllRecipes";

import MyRecipeSide from "../RecipeFeedSide/MyRecipe";
import MyFavoriteRecipe from "../RecipeFeedSide/MyFavoriteRecipe";
import FollowedRecipe from "../RecipeFeedSide/FollowedRecipe";

import { Button } from "../ui/button";
import Food1 from "../../components/images/sliderImagesv2/food1.jpg";
import Food2 from "../../components/images/sliderImagesv2/food2.jpg";
import Food3 from "../../components/images/sliderImagesv2/food3.jpg";
import Food4 from "../../components/images/sliderImagesv2/food4.jpg";
import Magnifier from "../../components/images/svg/icons8-magnifier.svg";
import NavbarWrapper from "../NavbarWrapper";
import DiscoverContent from "../DiscoverContent";
import ModalRecipe from "@/components/ModalRecipe";

import HomeLogo from "../../components/images/sidebarlogo/home-svgrepo-com.svg";
import MyRecipeLogo from "../../components/images/sidebarlogo/notes-svgrepo-com.svg";
import FollowedRecipesLogo from "../../components/images/sidebarlogo/follower-svgrepo-com.svg";
import MyFavoriteRecipesLogo from "../../components/images/sidebarlogo/love-letter-note-svgrepo-com.svg";
import NutritionsLogo from "../../components/images/sidebarlogo/nutrition-svgrepo-com.svg";
import CategoriesLogo from "../../components/images/sidebarlogo/category-svgrepo-com.svg";
import OriginsLogo from "../../components/images/sidebarlogo/country-direction-location-map-navigation-pin-svgrepo-com.svg";
import ComplexityLogo from "../../components/images/svg/levels-svgrepo-com.svg";
import NutriLogo from "../../components/images/svg/cardlogo/scoreboard-svgrepo-com.svg";
import ServingLoo from "../../components/images/svg/cardlogo/cover-dish-svgrepo-com.svg";

const RecipeFeeds = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { recipes } = useFetchRecipe();
  const [recipesData, setRecipesData] = useState<[]>([]);
  const [categoriesData, setCategoriesData] = useState<string[]>([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showCount, setShowCount] = useState(4);
  const [selectedRecipe, setSelectedRecipe] = useState<RecipeData | null>(null);
  const [showModal, setShowModal] = useState(false);
  // console.log("ini recipes", recipes);

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
  const fetchSearchResults = async (keyword: any) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:5000/feeds/recipes/search/${keyword}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };
  useEffect(() => {
    if (searchKeyword) {
      fetchSearchResults(searchKeyword);
    } else {
      setSearchResults([]);
    }
  }, [searchKeyword]);

  useEffect(() => {
    if (recipes) {
      const categories: string[] = [];
      recipes.forEach((recipe) => {
        if (recipe.type) {
          categories.push(recipe.type);
        }
      });
      setCategoriesData(categories);
    }
  }, [recipes]);

  const handleSearch = () => {
    fetchSearchResults(searchKeyword);
  };
  const handleInputChange = (e: any) => {
    setSearchKeyword(e.target.value);
  };

  const categories = [
    "Healty Recipe",
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

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const [selectedSideCategory, setSelectedSideCategory] = useState<
    string | null
  >(null);

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
  };

  const handleSideCategoryClick = (sideCategory: string) => {
    setSelectedSideCategory(sideCategory);
  };

  const images: string[] = [Food1.src, Food2.src, Food3.src, Food4.src];
  return (
    <div className="">
      {/* <SliderImage images={images} maxHeight="300" className="hidden" /> */}
      <div className="flex ">
        <div className="flex flex-col justify-center items-center  p-5">
          <div className="flex flex-col justify-center items-center p-5">
            <div className="flex justify-center items-center p-5">
              <div className="flex flex-col justify-center items-start p-5 bg-slate-50 rounded-lg shadow-lg shadow-slate-400 gap-5">
                {sideBarCategories.map((category) => (
                  <div
                    key={category.name}
                    className={`sideBarCategories flex gap-3 justify-start items-center p-2 ${
                      selectedSideCategory === category.name
                        ? "bg-slate-500 w-full rounded-lg shadow-md shadow-black"
                        : ""
                    }`}
                    onClick={() => handleSideCategoryClick(category.name)}
                  >
                    <img src={category.image} alt="" className="h-7 w-7" />
                    <h1>{category.name}</h1>
                  </div>
                ))}

                {/* {isMenuOpen && (
                  <div className=" transform translate-x-10 ease-out duration-400 p-4">
                    <ul>
                      <li>Menu item 1</li>
                      <li>Menu item 2</li>
                    </ul>
                  </div>
                )} */}
              </div>
            </div>
          </div>
        </div>
        <div className="w-3/4 flex flex-col justify-center items-center ">
          <div className="pt-10">
            <div className="flex flex-col">
              <div>
                <h1 className="text-2xl">Discover Recipes</h1>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex gap-5 p-5">
                  {categories.map((category) => (
                    <Button
                      key={category}
                      className={`category p-2 bg-slate-400 ${
                        selectedCategory === category
                          ? "bg-black rounded-lg shadow-sm shadow-black"
                          : ""
                      }`}
                      onClick={() => handleCategoryClick(category)}
                    >
                      <h1>{category}</h1>
                    </Button>
                  ))}
                </div>
                <div className="pr-24">
                  <div className="relative flex">
                    <input
                      type="search"
                      className="border-slate-500 border-2 rounded-md p-2"
                      placeholder="Search Recipe Here"
                      value={searchKeyword}
                      onChange={handleInputChange}
                    />
                    <img
                      src={Magnifier.src}
                      alt=""
                      className="h-6 w-6 absolute right-2 top-2 cursor-pointer"
                      onClick={handleSearch}
                    />
                  </div>
                </div>
              </div>
              <div className="pt-5">
                {searchResults && searchResults.length > 0 && (
                  <div>
                    <h2>Search Result:</h2>
                    <div className="item-list">
                      <div className="pr-16 px-5 w-full">
                        <div className="grid grid-cols-4 gap-7 px-20 py-10 ">
                          {searchResults
                            .slice(0, showCount)
                            .map((recipe: any, index: number) => (
                              <div
                                className="rounded-xl shadow-md shadow-black cursor-pointer"
                                key={index}
                                onClick={() =>
                                  handleRecipeClick(
                                    recipe as unknown as RecipeData
                                  )
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
                                      <img
                                        src={ServingLoo.src}
                                        alt=""
                                        className="h-6 w-6"
                                      />
                                      <div>4 persons</div>
                                    </div>
                                    <div className="flex gap-2 justify-center items-center">
                                      <img
                                        src={NutriLogo.src}
                                        alt=""
                                        className="h-6 w-6"
                                      />
                                      <div>{recipe.nutriscore}</div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                        </div>
                      </div>
                      <div className="px-10 pt-4 flex justify-end items-center gap-2">
                        {showCount > 4 && (
                          <Button
                            onClick={toggleShowLess}
                            className="text-white"
                          >
                            Show Less
                          </Button>
                        )}
                        {showCount < recipes.length && (
                          <Button
                            onClick={toggleShowMore}
                            className="text-white"
                          >
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
                )}
              </div>
              <div className="p-2">
                <h1>Weekly Recipes</h1>
                <WeeklyRecipes recipeCategoryName="" />
              </div>
              <div className="p-2">
                <h1>All Recipes</h1>
                <AllRecipes recipeCategoryName="" />
              </div>
            </div>
          </div>
          {selectedCategory === "Healty Recipe" && (
            <HealtyRecipes categories={categoriesData} />
          )}
          {selectedCategory === "Main Dishes" && (
            <MainDishes categories={categoriesData} />
          )}
          {selectedCategory === "Appetizers" && (
            <Appetizers categories={categoriesData} />
          )}
          {selectedCategory === "Desserts" && (
            <Desserts categories={categoriesData} />
          )}
          {selectedCategory === "Beverages" && (
            <Beverages categories={categoriesData} />
          )}
          {selectedCategory === "Side Dishes" && (
            <SideDishes categories={categoriesData} />
          )}
          {selectedCategory === "Home" && (
            <HealtyRecipes categories={categoriesData} />
          )}
          {selectedSideCategory === "My Favorite Recipes" && (
            <MyFavoriteRecipe />
          )}
          {selectedSideCategory === "Followed Recipes" && <FollowedRecipe />}
          {selectedSideCategory === "My Recipe" && <MyRecipeSide />}
        </div>
      </div>
    </div>
  );
};

export default RecipeFeeds;
