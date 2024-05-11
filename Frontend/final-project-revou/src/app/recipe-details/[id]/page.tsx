"use client";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

import NavbarWrapper from "@/components/NavbarWrapper";
import RecipeHeroPage from "@/components/RecipeHeroPage";
import CatOrNutLoSh from "@/components/CatOrNutLoSh";
import Author from "@/components/Author";
import RecipeSummary from "@/components/RecipeSummary";
import Ingredients from "@/components/Ingredients";
import Instructions from "@/components/Instructions";
import RecipeTags from "@/components/RecipeTags";
import CommentSection from "@/components/CommentSection";
import SliderImagev2_2 from "@/components/SliderImage_vmhb/SliderImagev2_2_2";

// import { recipeDetailCards } from "@/data";

import Food1 from "../../../components/images/sliderImagesv2/food1.jpg";
import Food2 from "../../../components/images/sliderImagesv2/food2.jpg";
import Food3 from "../../../components/images/sliderImagesv2/food3.jpg";
import Food4 from "../../../components/images/sliderImagesv2/food4.jpg";
import SliderImagev2_2_2 from "@/components/SliderImage_vmhb/SliderImagev2_2_2";
import Footer from "@/components/Footer";
import SliderImagev2_2_3 from "@/components/SliderImage_vmhb/SliderImagev2_2_3";
import Footer_v2 from "@/components/Footer_vmhb";
import SliderImagev2_2_4 from "@/components/SliderImage_vmhb/SliderImagev2_2_4";
import useFetchRecipe, { Recipe } from "@/hooks/UseFetchRecipe";
import { RecipeData } from "@/components/RecipesFeeds/AllRecipes";
import { Redirect } from "next";

export default function Recipees({ params }: { params: { id: string } }) {
  const truncate = (str: string) => {
    if (str.length > 100) {
      return str.substring(0, 150) + "...";
    } else {
      return str;
    }
  };
  const images: string[] = [Food1.src, Food2.src, Food3.src, Food4.src];
  const { recipes, error } = useFetchRecipe();
  const [recipeData, setRecipeData] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      if (recipes && recipes.length > 0) {
        const recipeId = params.id;
        const apiUrl = `http://127.0.0.1:5000/recipes/details/${recipeId}`;
        // console.log("ini id", apiUrl);
        try {
          const response = await fetch(apiUrl);
          if (!response.ok) {
            throw new Error("Failed to fetch data");
          }
          const data = await response.json();
          // console.log("hasil result", data);
          setRecipeData(data);
        } catch (error) {
          console.error(error);
        }
      }
    };
    // console.log("tes hasil2", recipes);
    fetchData();
  }, [recipes, setRecipeData]);

  return (
    <div className="px-3 sm:px-5 justify-center items-center">
      {/* <h1>tes</h1> */}
      <NavbarWrapper />
      <RecipeHeroPage images={images} recipeData={recipeData} />
      <CatOrNutLoSh recipeData={recipeData} />
      <div className="md:flex md:my-3 lg:mb-10 lg:mt-0 lg:px-12 lg:gap-3 2xl:gap-10">
        <Author recipeData={recipeData} />
        <RecipeSummary recipeData={recipeData} />
      </div>
      {/* Ingredients n instructions */}
      <div className="px-1 md:flex md:gap-6 md:mt-6 lg:flex lg:pl-6">
        <div className="md:w-2/5 lg:w-1/3">
          <Ingredients
            className="flex justify-items-center items-center"
            recipeData={recipeData}
          />
        </div>
        <div className="md:w-0.5 md:bg-slate-400 md:h-96 md:my-auto"></div>
        <div className="md:w-3/5 lg:w-2/3 pt-8 md:pt-0 md:mt-0 lg:pr-6">
          <Instructions recipeData={recipeData} />
        </div>
      </div>
      {/* End of ingredients n instructions */}
      <RecipeTags recipeData={recipeData} />
      <div className="lg:flex lg:pl-6 lg:pt-2">
        <div className="lg:w-1/3 ">
          <CommentSection recipeData={recipeData} />
        </div>
        <div className="lg:w-2/3 xl:hidden">
          <SliderImagev2_2_3 className="hidden lg:block xl:hidden" />
        </div>
        <div className="xl:w-2/3 2xl:px-20">
          <SliderImagev2_2_4 className="hidden xl:block" />
        </div>
      </div>
      {/* <div className="lg:flex lg:pl-20 lg:pt-5">
        <div className="lg:w-2/3 lg:flex-col justify-start items-start pt-5">
          <SliderImagev2
            foodImages={images}
            title="Recipe Galery:"
            className="h-1/3"
          />
        </div>
      </div> */}
      <SliderImagev2_2_2 className="sm:hidden" />
      <SliderImagev2_2_3 className="hidden sm:block md:hidden" />
      <SliderImagev2_2_4 className="hidden md:block lg:hidden" />
      <Footer_v2 />
    </div>
  );
}
