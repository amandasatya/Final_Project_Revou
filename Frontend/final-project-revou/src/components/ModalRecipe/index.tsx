import React, { useEffect, useState } from "react";
import Modal from "../Modal";
import food1 from "@/components/images/sliderImagesv2/food1.jpg";
import time from "@/components/images/svg/clock-lines-svgrepo-com.svg";
import food2 from "@/components/images/slidersv3/1.png";
import { Button } from "@/components//ui/button";
import { RecipeData } from "../RecipesFeeds/AllRecipes";
import Link from "next/link";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-regular-svg-icons";
import { faThumbsUp, faComment } from "@fortawesome/free-regular-svg-icons";

interface RecipeProps {
  author_id: number;
  image: string;
  title: string;
  description: string;
  ingredients: string[];
  tags: string[];
  instructions: string;
  cooktime: number;
  complexity: string;
  servings: string;
  time: string;
  category: string;
  nutriscore: number;
}
export interface ProfileData {
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  location: string;
  phone: string;
  image: string;
  role: string;
  bio: string;
}

const ModalRecipe = ({ recipe, showModal, setShowModal }: any) => {
  const router = useRouter();
  // console.log("ini route", router);
  const [profileData, setProfileData] = useState({} as ProfileData);
  // const [selectedRecipe, setSelectedRecipe] = useState<RecipeData | null>(null);

  // useEffect(() => {
  //   fetchAuthorName(recipe.author_id);
  // }, [recipe]);

  // const fetchAuthorName = async (authorId: number) => {
  //   try {
  //     const response = await fetch(`http://127.0.0.1:5000/users/${authorId}`);
  //     if (response.ok) {
  //       const authorData = await response.json();
  //       setProfileData(authorData);
  //       // console.log("123", authorData);
  //     } else {
  //       throw new Error("Failed to fetch author's username");
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // useEffect(() => {
  //   const fetchRecipeDetail = async () => {
  //     try {
  //       const response = await fetch(
  //         `http://127.0.0.1:5000/recipes/details/${recipe.id}`
  //       );
  //       if (response.ok) {
  //         const recipe_data = await response.json();
  //         setSelectedRecipe(recipe_data);
  //         console.log("test id", recipe_data);
  //       } else {
  //         throw new Error("Failed to fetch author's username");
  //       }
  //     } catch (error) {
  //       console.error(error);
  //     }
  //     fetchRecipeDetail();
  //   };
  // });

  const handleRedirectToRecipees = (id: number) => {
    router.push(`/recipe-details/${id}`);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <Modal setShowModal={closeModal}>
        {recipe && (
          <div className="flex h-full w-full  rounded-xl">
            <div className="flex flex-col justify-center items-center w-96 px-5 py-8 gap-6">
              <div className="px-6 py-3 bg-orange-700 flex justify-center items-center rounded-3xl">
                <h1 className="text-3xl font-bold bg-clip-text text-orange-100 text-center flex justify-center items-center">
                  {recipe.title}
                </h1>
              </div>
              <div className="flex justify-center items-center gap-2 text-md">
                <div>
                  <h2 className="text-lg font-semibold text-slate-700">
                    Recipe by:
                  </h2>
                </div>
                <div className="flex px-3 py-1 rounded-2xl gap-1 bg-orange-400">
                  <h2 className="text-lg font-semibold text-orange-100">
                    {profileData.first_name} {profileData.last_name}Iman Satya
                  </h2>
                </div>
              </div>
              <div className="flex w-full flex-col py-3">
                <div className="px-5">
                  <h3>$$$</h3>
                </div>
                <div className="px-5 py-4 flex w-full justify-between items-center">
                  <div className="flex flex-col gap-4">
                    <div className="flex gap-2 justify-start items-center">
                      <img src={time.src} alt="" className="h-8 w-8" />
                      <h3 className="px-2 bg-sky-700 text-slate-100 rounded-xl">
                        {recipe.complexity}
                      </h3>
                    </div>
                    <div className="flex gap-2 justify-start items-center">
                      <img src={time.src} alt="" className="h-8 w-8" />
                      <h3 className="text-slate-800">
                        {recipe.cooktime} minutes
                      </h3>
                    </div>
                  </div>
                  <div className="flex flex-col gap-4">
                    <div className="flex gap-2 justify-start items-center">
                      <img src={time.src} alt="" className="h-8 w-8" />
                      <h3 className="p-1 bg-slate-800 text-slate-100 font-semibold rounded-md">
                        {recipe.nutriscore}
                      </h3>
                    </div>
                    <div className="flex gap-2 justify-start items-center">
                      <img src={time.src} alt="" className="h-8 w-8" />
                      <h3 className="text-slate-800">
                        {recipe.servings} servings
                      </h3>
                    </div>
                  </div>
                </div>
                <div className="flex px-5 justify-between">
                  <div className="flex gap-2 justify-start items-center">
                    <img src={time.src} alt="" className="h-8 w-8" />
                    <h3 className="text-slate-800">{recipe.categories[0]}</h3>
                  </div>
                  <div className="flex gap-2 justify-start items-center">
                    <img src={time.src} alt="" className="h-8 w-8" />
                    <h3 className="text-slate-800">{recipe.type}</h3>
                  </div>
                  <div className="flex gap-2 justify-start items-center">
                    <img src={time.src} alt="" className="h-8 w-8" />
                    <h3 className="text-slate-800">{recipe.origin}</h3>
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-center items-center px-3">
                <h2 className="text-lg font-semibold text-slate-700 flex justify-center items-center">
                  Description:
                </h2>
                <p className="text-sm font-medium text-slate-800">
                  {recipe.description}
                </p>
              </div>
              <div
                className="flex justify-center items-end h-1/5 "
                // onClick={handleRecipeReadMore}
              >
                <Button
                  onClick={() => handleRedirectToRecipees(recipe.id)}
                  className="px-6 py-6 rounded-3xl text-xl bg-emerald-700 text-emerald-100 hover:bg-emerald-800 hover:text-emerald-50 shadow-md shadow-slate-900"
                >
                  Cook Now
                </Button>
              </div>
            </div>
            <div className="relative w-96 flex justify-center items-center overflow-y-hidden">
              <img
                src={recipe.attachment}
                alt=""
                className="rounded-tr-xl rounded-br-xl object-cover object-center h-full w-full"
              />
              <div className="w-full justify-around absolute left-0 -bottom-10 hover:bottom-6 hover:duration-500 hover:ease-in-out flex flex-col gap-7">
                <div className="w-full flex justify-around items-center">
                  <Button className="text-yellow-500 text-base gap-1">
                    <FontAwesomeIcon
                      icon={faStar}
                      style={{ color: "#FFD43B" }}
                    />
                    <span>{recipe.rating}</span>
                  </Button>
                  <Button className="text-green-500 text-base gap-1">
                    <FontAwesomeIcon
                      icon={faThumbsUp}
                      style={{ color: "#2adf57" }}
                    />
                    <span>{recipe.like_count}</span>
                  </Button>
                  <Button className="text-blue-500 text-base gap-1">
                    <FontAwesomeIcon
                      icon={faComment}
                      style={{ color: "#3b82f6" }}
                    />
                    <span>4</span>
                  </Button>
                </div>
                <div className="w-full flex justify-around items-center">
                  <Button className="text-yellow-500 text-base">Rate</Button>
                  <Button className="text-green-500 text-base">Like</Button>
                  <Button className="text-blue-500 text-base">Comment</Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ModalRecipe;
