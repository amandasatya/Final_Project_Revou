import React, { useEffect, useState } from "react";
import Modal from "../Modal";
import food1 from "../../components/images/sliderImagesv2/food1.jpg";
import time from "../../components/images/svg/clock-lines-svgrepo-com.svg";
import food2 from "../../components/images/slidersv3/1.png";
import { Button } from "../ui/button";
import { RecipeData } from "../RecipesFeeds/AllRecipes";
import Link from "next/link";
import {
  useRouter,
  usePathname,
  useSearchParams,
  RedirectType,
} from "next/navigation";
import { redirect } from "next/navigation";

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
  id: number;
}

const ModalRecipe = ({ recipe, showModal, setShowModal }: any) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const search = searchParams.get("id");
  // console.log("ini route", router);
  const [profileData, setProfileData] = useState({} as ProfileData);
  const [selectedRecipe, setSelectedRecipe] = useState<RecipeData | null>(null);
  useEffect(() => {
    fetchAuthorName(recipe.author_id);
  }, [recipe]);

  const fetchAuthorName = async (authorId: number) => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/users/${authorId}`);
      if (response.ok) {
        const authorData = await response.json();
        setProfileData(authorData);
        // console.log("123", authorData);
      } else {
        throw new Error("Failed to fetch author's username");
      }
    } catch (error) {
      console.error(error);
    }
  };
  // useEffect(() => {
  //   const fetchRecipeDetail = async () => {
  //     if (search) {
  //       try {
  //         const response = await fetch(
  //           `http://127.0.0.1:5000/recipes/details/${search}`
  //         );
  //         if (response.ok) {
  //           const recipe_data = await response.json();
  //           setSelectedRecipe(recipe_data);
  //           console.log("test id", response);
  //         } else {
  //           throw new Error("Failed to fetch author's username");
  //         }
  //       } catch (error) {
  //         console.error(error);
  //       }
  //       fetchRecipeDetail();
  //     }
  //   };
  // });

  const handleRedirectToRecipees = (id: number) => {
    router.push(`/RecipeDetailResponsive/${id}`);
  };
  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <Modal setShowModal={closeModal}>
        {recipe && (
          <div className="flex h-full w-full">
            <div className="flex flex-col justify-start  w-3/6 h-3/6">
              <div className="flex flex-col h-1/5">
                <div className="flex justify-center items-center p-3 ">
                  <div className="p-5 bg-orange-700 flex justify-center items-center rounded-xl shadow-md shadow-black">
                    <h1 className="text-3xl font-extrabold bg-clip-text text-white uppercase text-center flex justify-center items-center">
                      {recipe.title}
                    </h1>
                  </div>
                </div>
                <div className="flex justify-center items-center">
                  <div className="flex flex-col">
                    <div className="flex gap-2 text-md">
                      <div>
                        <h1>Recipe By:</h1>
                      </div>
                      <div className="flex gap-1 uppercase">
                        <h1 className="">{profileData.first_name}</h1>
                        <h1>{profileData.last_name}</h1>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="h-1/4 p-5">
                <div className="pt-10 flex justify-center items-center gap-14">
                  <div className="flex flex-col gap-2 ">
                    <div className="flex gap-2 justify-start items-center">
                      <img src={time.src} alt="" className="h-10 w-10" />
                      <h1>: {recipe.complexity}</h1>
                    </div>
                    <div className="flex gap-2 justify-start items-center">
                      <img src={time.src} alt="" className="h-10 w-10" />
                      <h1>: {recipe.cooktime}Minutes</h1>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 ">
                    <div className="flex gap-2 justify-start items-center">
                      <img src={time.src} alt="" className="h-10 w-10" />
                      <h1>: {recipe.nutriscore}</h1>
                    </div>
                    <div className="flex gap-2 justify-start items-center">
                      <img src={time.src} alt="" className="h-10 w-10" />
                      <h1>: {recipe.servings} People</h1>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-center items-center h-2/5 p-5">
                <div className="pt-10 flex flex-col p-5">
                  <h1 className="text-xl flex justify-center items-center">
                    Description:
                  </h1>
                  <h1>{recipe.description}</h1>
                </div>
              </div>
              <div
                className="flex justify-center items-end h-1/5 "
                // onClick={handleRecipeReadMore}
              >
                <Button onClick={() => handleRedirectToRecipees(recipe.id)}>
                  Read More
                </Button>
              </div>
            </div>
            <div className="w-3/6 h-3/6 flex justify-center items-center  overflow-auto ">
              <img
                src={food1.src}
                alt=""
                className="rounded-tr-xl rounded-br-xl object-cover object-center h-full w-full"
              />
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ModalRecipe;
