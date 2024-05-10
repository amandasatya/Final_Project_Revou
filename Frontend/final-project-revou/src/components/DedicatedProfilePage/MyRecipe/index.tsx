import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import useFetchRecipe from "@/hooks/UseFetchRecipe";
import useFetchProfile from "@/hooks/useFetchProfile";
import axios from "axios";
import ComplexityLogo from "../../../components/images/svg/levels-svgrepo-com.svg";
import NutriLogo from "../../../components/images/svg/cardlogo/scoreboard-svgrepo-com.svg";
import ServingLoo from "../../../components/images/svg/cardlogo/cover-dish-svgrepo-com.svg";
import { RecipeData } from "@/components/RecipesFeeds/AllRecipes";
import ModalEditRecipe from "@/components/ModalEditRecipe";

const MyRecipe: React.FC = () => {
  const [showCount, setShowCount] = useState(4);
  const [searchQuery, setSearchQuery] = useState("");
  const { recipes, error, refetchRecipes } = useFetchRecipe();
  const { profile } = useFetchProfile();
  const [userRecipes, setUserRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState<RecipeData | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (profile) {
      fetchRecipeByUserLogin();
    }
  }, [profile]);

  const fetchRecipeByUserLogin = async () => {
    const authToken = localStorage.getItem("access_token");
    try {
      const headers = {
        Authorization: `Bearer ${authToken}`,
      };
      const response = await axios.get(
        `http://127.0.0.1:5000/feeds/recipes/all`,
        { headers }
      );
      const filteredRecipes = response.data.filter(
        (recipe: any) => recipe.author_id === profile?.id
      );
      setUserRecipes(filteredRecipes);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteRecipe = async (id: number) => {
    const authToken = localStorage.getItem("access_token");
    try {
      const headers = {
        Authorization: `Bearer ${authToken}`,
      };
      const response = await axios.delete(
        `http://127.0.0.1:5000/recipes/delete/${id}`,
        { headers }
      );
      console.log(response.data);
      refetchRecipes();
    } catch (error) {
      console.error(error);
    }
  };

  const toggleShowMore = () => {
    setShowCount((prevCount) => prevCount + 4);
  };

  const toggleShowLess = () => {
    setShowCount((prevCount) => Math.max(4, prevCount - 4));
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleRecipeClick = (recipe: any) => {
    setSelectedRecipe(recipe);
  };

  const handleEditRecipe = (recipeId: number, recipe: RecipeData) => {
    // Set the selected recipe to the one clicked for editing
    setSelectedRecipe(recipe);
    // Show the modal
    setShowModal(true);
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">My Recipes</h1>
        <input
          type="search"
          className="border-2 border-slate-400 rounded-lg p-3"
          placeholder="Search here"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>
      <div className="pt-10">
        <div className="grid grid-cols-4 gap-4 px-10 pt-4">
          {userRecipes.map((recipe: any, index: number) => (
            <div
              key={index}
              className={`rounded-xl shadow-md shadow-black ${
                selectedRecipe === recipe ? "bg-red-300 p-1" : ""
              }`}
              onClick={() => handleRecipeClick(recipe)}
            >
              <img src={recipe.attachment} alt="" className="rounded-t-xl" />
              <div className="flex flex-col gap-2 pt-2 bg-white rounded-b-xl p-5 text-center">
                <div className="flex justify-center items-center">
                  {recipe.title}
                </div>
                <div className="flex justify-around items-center gap-7">
                  <div className="flex gap-1 justify-center items-center">
                    <img src={ComplexityLogo.src} alt="" className="h-6 w-6" />
                    <div>{recipe.complexity}</div>
                  </div>
                  <div className="flex gap-2 justify-center items-center">
                    <img src={ServingLoo.src} alt="" className="h-6 w-6" />
                    <div>{recipe.servings}</div>
                  </div>
                  <div className="flex gap-2 justify-center items-center">
                    <img src={NutriLogo.src} alt="" className="h-6 w-6" />
                    <div>{recipe.nutriscore}</div>
                  </div>
                </div>
                <Button onClick={() => handleEditRecipe(recipe.id, recipe)}>
                  Edit
                </Button>
              </div>
            </div>
          ))}
        </div>
        {selectedRecipe && (
          <div className="p-5 ">
            <Button onClick={() => deleteRecipe(selectedRecipe?.id)}>
              Delete
            </Button>
          </div>
        )}
        <div className="px-10 pt-4 flex justify-end items-center gap-2">
          {showCount > 4 && (
            <Button onClick={toggleShowLess} className="text-white">
              Show Less
            </Button>
          )}
          {showCount < userRecipes.length && (
            <Button onClick={toggleShowMore} className="text-white">
              Show More
            </Button>
          )}
        </div>
        {showModal && selectedRecipe && (
          <ModalEditRecipe
            recipe={selectedRecipe}
            showModal={showModal}
            setShowModal={setShowModal}
          />
        )}
      </div>
    </div>
  );
};

export default MyRecipe;
