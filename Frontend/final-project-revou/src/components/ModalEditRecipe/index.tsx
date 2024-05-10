import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "../Modal";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select } from "../ui/select";
import { Textarea } from "../ui/textarea";
import { RecipeData } from "../RecipesFeeds/AllRecipes";
import useUploadRecipeImage from "@/hooks/useUploadRecipe";
import useFetchRecipe from "@/hooks/UseFetchRecipe";

const ModalEditRecipe = ({ recipe, showModal, setShowModal }: any) => {
  const { file, imageUrl, handleFileChange, handleUploadImage } =
    useUploadRecipeImage();
  const { recipes } = useFetchRecipe();
  const totalSteps = 5;

  // Initialize state with the recipe data
  const [step, setStep] = useState(1);
  const [recipeData, setRecipeData] = useState({
    title: recipe.title,
    description: recipe.description,
    cooktime: recipe.cooktime,
    complexity: recipe.complexity,
    servings: recipe.servings,
    budget: recipe.budget,
    instruction: recipe.instruction,
    nutriscore: recipe.nutriscore,
    categories: recipe.categories,
    type: recipe.type,
    origin: recipe.origin,
    tags: recipe.tags,
    attachment: recipe.attachment,
    ingredients: recipe.ingredients,
    serving_per_container: recipe.serving_per_container,
    serving_size: recipe.serving_size,
    calories: recipe.calories,
    total_fat: recipe.total_fat,
    total_carbohydrate: recipe.total_carbohydrate,
    total_sugar: recipe.total_sugar,
    cholesterol: recipe.cholesterol,
    protein: recipe.protein,
    vitamin_d: recipe.vitamin_d,
    sodium: recipe.sodium,
    calcium: recipe.calcium,
    potassium: recipe.potassium,
    iron: recipe.iron,
  });

  // Handler for input changes
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setRecipeData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleEditIngredient = (index: number) => {
    const ingredientToEdit = recipeData.ingredients[index];
    const editedIngredientName = prompt(
      "Enter the new name for the ingredient:",
      ingredientToEdit[0]
    );
    const editedIngredientQuantity = prompt(
      "Enter the new quantity for the ingredient:",
      ingredientToEdit[1]
    );
    if (editedIngredientName !== null && editedIngredientQuantity !== null) {
      const updatedIngredients = [...recipeData.ingredients];
      updatedIngredients[index] = [
        editedIngredientName,
        editedIngredientQuantity,
      ];
      setRecipeData({ ...recipeData, ingredients: updatedIngredients });
    }
  };

  // Handler for form submission
  const handleSubmit = async () => {
    try {
      const authToken = localStorage.getItem("access_token");
      if (authToken) {
        const headers = {
          Authorization: `Bearer ${authToken}`,
        };
        const response = await axios.put(
          `http://127.0.0.1:5000/recipes/edit/${recipe.id}`,
          recipeData,
          {
            headers,
          }
        );
        // Handle response as needed
        console.log("Recipe updated successfully:", response.data);
        setShowModal(false); // Close the modal after successful submission
      }
    } catch (error) {
      console.error("Error updating recipe:", error);
    }
  };

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  return (
    <Modal showModal={showModal} setShowModal={setShowModal}>
      <form onSubmit={handleSubmit}>
        <div className="w-full p-3" style={{ width: "500px" }}>
          {/* Add your form fields here */}
          {step === 1 && (
            <div className="p-2">
              <Label>Title</Label>
              <Input
                type="text"
                name="title"
                value={recipeData.title}
                onChange={handleInputChange}
              />
              {/* Repeat the above pattern for other fields */}
              <Label>Description</Label>
              <Textarea
                name="description"
                value={recipeData.description}
                onChange={handleInputChange}
              />
              <Label>Cooktime</Label>
              <Input
                type="text"
                name="cooktime"
                value={recipeData.cooktime}
                onChange={handleInputChange}
              />
              <Label>Complexity</Label>
              <Input
                type="text"
                name="complexity"
                value={recipeData.complexity}
                onChange={handleInputChange}
              />
              <Label>Servings</Label>
              <Input
                type="text"
                name="servings"
                value={recipeData.servings}
                onChange={handleInputChange}
              />
            </div>
          )}
          {step === 2 && (
            <div className="p-2">
              {/* <Label>Ingredients</Label>
              {recipeData?.ingredients?.map(
                (ingredient: any, index: number) => (
                  <div key={index} className="flex gap-2">
                    <p>
                      {ingredient[0]} - {ingredient[1]}
                    </p>
                    <button onClick={() => handleEditIngredient(index)}>
                      Edit
                    </button>
                  </div>
                )
              )} */}
              <Label>Budget</Label>
              <Input
                type="text"
                name="budget"
                value={recipeData.budget}
                onChange={handleInputChange}
              />
              <Label>Type Of Food</Label>
              <div className="flex flex-col">
                <select
                  name="type"
                  id="type"
                  value={recipeData.type}
                  onChange={handleInputChange}
                  className="w-full flex p-2 border-2 rounded-md"
                >
                  <option value="" disabled>
                    --Please choose an option--
                  </option>
                  <option value="mainDishes">Main Dishes</option>
                  <option value="sideDishes">Side Dishes</option>
                  <option value="Appetizers">Appetizers</option>
                  <option value="Beverages">Beverages</option>
                  <option value="Desserts">Desserts</option>
                  <option value="HealtyRecipes">Healty Recipes</option>
                </select>
              </div>
              <Label>Instruction</Label>
              <Textarea
                name="instruction"
                value={recipeData.instruction}
                onChange={handleInputChange}
              />
            </div>
          )}
          {step === 3 && (
            <div className="p-2">
              <Label>Categories</Label>
              <Input
                type="text"
                name="categories"
                value={recipeData.categories}
                onChange={handleInputChange}
              />
              <Label>Origin</Label>
              <Input
                type="text"
                name="origin"
                value={recipeData.origin}
                onChange={handleInputChange}
              />
              <Label>Tags</Label>
              <Input
                type="text"
                name="tags"
                value={recipeData.tags}
                onChange={handleInputChange}
              />
              <Label>Recipe Image</Label>
              {imageUrl && (
                <img src={imageUrl} alt="Recipe Image" width={200} />
              )}
              <Input
                type="file"
                name="image"
                //   value={recipeData.attachment}
                onChange={handleInputChange}
              />
            </div>
          )}
          {step === 4 && (
            <div className="p-2">
              <Label>nutriscore</Label>
              <Input
                type="text"
                name="nutriscore"
                value={recipeData.nutriscore}
                onChange={handleInputChange}
              />
              <Label>serving size:</Label>
              <Input
                type="text"
                name="nutriscore"
                value={recipeData.serving_size}
                onChange={handleInputChange}
              />
              <Label>Calories:</Label>
              <Input
                type="text"
                name="nutriscore"
                value={recipeData.calories}
                onChange={handleInputChange}
              />
              <Label>Total Fat:</Label>
              <Input
                type="text"
                name="nutriscore"
                value={recipeData.total_fat}
                onChange={handleInputChange}
              />
              <Label>Total Carbohydrate:</Label>
              <Input
                type="text"
                name="nutriscore"
                value={recipeData.total_carbohydrate}
                onChange={handleInputChange}
              />
              <Label>Total Sugar:</Label>
              <Input
                type="text"
                name="nutriscore"
                value={recipeData.total_sugar}
                onChange={handleInputChange}
              />
            </div>
          )}
          {step === 5 && (
            <div className="p-2">
              <Label>Cholesterol:</Label>
              <Input
                type="text"
                name="nutriscore"
                value={recipeData.cholesterol}
                onChange={handleInputChange}
              />
              <Label>Protein:</Label>
              <Input
                type="text"
                name="nutriscore"
                value={recipeData.protein}
                onChange={handleInputChange}
              />
              <Label>Vitamin D:</Label>
              <Input
                type="text"
                name="nutriscore"
                value={recipeData.vitamin_d}
                onChange={handleInputChange}
              />
              <Label>Sodium:</Label>
              <Input
                type="text"
                name="nutriscore"
                value={recipeData.sodium}
                onChange={handleInputChange}
              />
              <Label>Calcium:</Label>
              <Input
                type="text"
                name="nutriscore"
                value={recipeData.calcium}
                onChange={handleInputChange}
              />
              <Label>Potassium:</Label>
              <Input
                type="text"
                name="nutriscore"
                value={recipeData.potassium}
                onChange={handleInputChange}
              />
              <Label>Iron:</Label>
              <Input
                type="text"
                name="nutriscore"
                value={recipeData.iron}
                onChange={handleInputChange}
              />
            </div>
          )}

          <div className="flex p-2 gap-2">
            {step > 1 && (
              <Button type="button" onClick={prevStep} className="p-2">
                Previous
              </Button>
            )}
            {step < totalSteps && (
              <Button type="button" onClick={nextStep} className="p-2">
                Next
              </Button>
            )}
            {step === totalSteps && (
              <Button type="submit" className="p-2">
                Submit
              </Button>
            )}
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default ModalEditRecipe;
