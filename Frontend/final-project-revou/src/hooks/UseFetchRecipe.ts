import React, { useState, useEffect } from "react";
import axios from "axios";

interface Comment {
  id: number;
  user_id: number;
  recipe_id: number;
  message: string;
}

export interface RecipeData {
  id: number;
  author_id: number;
  author_name: string;
  title: string;
  description: string;
  nutriscore: number;
  rating: number;
  like_count: number;
  cooktime: string;
  complexity: string;
  servings: string;
  budget: string;
  instruction: string;
  view_count: number;
  categories: string[];
  type: string;
  origin: string;
  tags: string[];
  attachment: string;
  ingredients: string[][];
  comments: Comment[];
  is_chef_recipe: boolean;
}

export default function useFetchRecipe() {
  const [recipes, setRecipes] = useState<RecipeData[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchRecipes = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:5000/feeds/recipes/all"
      );
      // console.log("tes", response);
      setRecipes(response.data);
    } catch (error) {
      console.error("Error fetching recipes:", error);
      setError("Failed to fetch recipes. Please try again.");
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  const refetchRecipes = async () => {
    await fetchRecipes();
  };

  return { recipes, error, refetchRecipes };
}
