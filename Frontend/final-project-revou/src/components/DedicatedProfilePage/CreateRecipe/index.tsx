import React, { useState } from "react";
import useUploadRecipeImage from "@/hooks/useUploadRecipe";
import axios from "axios";
import { Button } from "@/components/ui/button";

interface Ingredient {
  name: string;
  quantity: string;
}

interface RecipeFormData {
  ingredients: Ingredient[];
}

const RecipeForm: React.FC = () => {
  const { file, imageUrl, handleFileChange, handleUploadImage } =
    useUploadRecipeImage();
  const [recipeData, setRecipeData] = useState({
    title: "",
    description: "",
    cooktime: "",
    complexity: "",
    servings: "",
    budget: "",
    instruction: "",
    nutriscore: "",
    categories: [""],
    type: "",
    origin: "",
    tags: [""],
    attachment: "",
    ingredients: [["", ""]],

    serving_per_container: "",
    serving_size: "",

    calories: "",
    total_fat: "",
    total_carbohydrate: "",
    total_sugar: "",
    cholesterol: "",
    protein: "",
    vitamin_d: "",

    sodium: "",
    calcium: "",
    potassium: "",
    iron: "",

    // image: "",
  });

  const handleCreate = async (uploadedImageUrl: any) => {
    try {
      const authToken = localStorage.getItem("access_token");
      if (authToken) {
        const headers = {
          Authorization: `Bearer ${authToken}`,
        };

        const updatedData = uploadedImageUrl;
        // console.log("ini imageurl", uploadedImageUrl);
        if (updatedData !== null && updatedData !== undefined) {
          const tempRecipeData = { ...recipeData, attachment: updatedData };
          // console.log("Updated recipe data:", tempRecipeData);
          setRecipeData(tempRecipeData);
          // console.log("123", recipeData);
          const response = await axios.post(
            "http://127.0.0.1:5000/recipes/create",
            tempRecipeData,
            {
              headers,
            }
          );
          // Handle response
          // console.log("Recipe created successfully:", response.data);
        }
      }
    } catch (error) {
      console.error("Error creating recipe:", error);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      if (!file) {
        console.error("No file selected");
        return;
      }
      const uploadedImageUrl = await handleUploadImage();
      // console.log("Uploaded image URL:", uploadedImageUrl);

      if (uploadedImageUrl !== null && uploadedImageUrl !== undefined) {
        setRecipeData((prevRecipeData) => ({
          ...prevRecipeData,
          attachment: uploadedImageUrl,
        }));

        await handleCreate(uploadedImageUrl);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);

  const handleAddIngredient = () => {
    setRecipeData({
      ...recipeData,
      ingredients: [...recipeData.ingredients, ["", ""]],
    });
  };

  const handleIngredientChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    const updatedIngredients = [...recipeData.ingredients];
    updatedIngredients[index] = [
      name === "name" ? value : updatedIngredients[index][0],
      name === "quantity" ? value : updatedIngredients[index][1],
    ];
    setRecipeData({ ...recipeData, ingredients: updatedIngredients });
  };

  const [instructionSteps, setInstructionSteps] = useState<string[]>(
    recipeData.instruction.split(/\n/).filter((step) => step.trim() !== "")
  );

  const handleInstructionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { value } = e.target;
    const steps = value.split(/\n/).filter((step) => step.trim() !== "");
    setInstructionSteps(steps);
    setRecipeData({ ...recipeData, instruction: steps.join("\n") });
  };

  // const [formData, setFormData] = useState({
  //   title: "",
  //   image: "",
  //   description: "",
  //   origin: "",
  //   category: "",
  //   cookTime: "",
  //   complexity: "",
  //   servings: "",
  //   budget: "",
  //   instructions: "",
  // });

  // const handleChange = (
  //   e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  //   index?: number
  // ) => {
  //   const { name, value } = e.target;
  //   if (index !== undefined) {
  //     const newInstructions = [...formData.instructions];
  //     newInstructions[index] = value;
  //     setFormData({ ...formData, instructions: newInstructions });
  //   } else {
  //     setFormData({ ...formData, [name]: value });
  //   }
  // };

  // const handleAddStep = () => {
  //   setFormData({ ...formData, instructions: [...formData.instructions, ""] });
  // };

  // const handleRemoveStep = (index: number) => {
  //   const newInstructions = [...formData.instructions];
  //   newInstructions.splice(index, 1);
  //   setFormData({ ...formData, instructions: newInstructions });
  // };

  // const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0];
  //   if (file) {
  //     console.log("File uploaded:", file);
  //   }
  // };
  // const handleSave = async () => {
  //   try {
  //     await handleUploadImage();
  //     await handleCreate(uploadedImageUrl);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  return (
    <div className="max-w-lg mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Add New Recipe</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={recipeData.title}
            onChange={(e) =>
              setRecipeData({ ...recipeData, title: e.target.value })
            }
            className="mt-1 p-2 border rounded-md w-full"
          />
        </div>
        {/* <div className="mb-4">
            <label
              htmlFor="image"
              className="block text-sm font-medium text-gray-700"
            >
              Recipe Image
            </label>
            <input
              type="file"
              accept="image/*"
              id="image"
              name="image"
              onChange={handleImageChange}
              className="mt-1 p-2 border rounded-md w-full"
            />
          </div> */}
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Recipe Description
          </label>
          <input
            type="text"
            id="description"
            name="description"
            value={recipeData.description}
            onChange={(e) =>
              setRecipeData({ ...recipeData, description: e.target.value })
            }
            className="mt-1 p-2 border rounded-md w-full"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Cook Time
          </label>
          <input
            type="number"
            id="cookTime"
            name="cookTime"
            value={recipeData.cooktime}
            onChange={(e) =>
              setRecipeData({ ...recipeData, cooktime: e.target.value })
            }
            className="mt-1 p-2 border rounded-md w-full"
          />
        </div>
        <div className="mb-4 ">
          <label>Ingredients:</label>
          <div className="flex flex-col gap-2">
            {recipeData.ingredients.map((ingredient, index) => (
              <div key={index}>
                <input
                  type="text"
                  name="name"
                  placeholder="Ingredient name"
                  value={ingredient[0]}
                  onChange={(e) => handleIngredientChange(index, e)}
                  className="mt-1 p-2 border rounded-md w-full"
                />
                <input
                  type="text"
                  name="quantity"
                  placeholder="Quantity"
                  value={ingredient[1]}
                  onChange={(e) => handleIngredientChange(index, e)}
                  className="mt-1 p-2 border rounded-md w-full"
                />
              </div>
            ))}
          </div>
          <div className="p-2 flex justify-end items-end">
            <Button type="button" onClick={handleAddIngredient}>
              Add more Ingredient
            </Button>
          </div>
        </div>
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Complexity
          </label>
          <input
            type="text"
            id="complexity"
            name="complexity"
            value={recipeData.complexity}
            onChange={(e) =>
              setRecipeData({ ...recipeData, complexity: e.target.value })
            }
            className="mt-1 p-2 border rounded-md w-full"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="servings"
            className="block text-sm font-medium text-gray-700"
          >
            Servings
          </label>
          <input
            type="number"
            id="servings"
            name="servings"
            value={recipeData.servings}
            onChange={(e) =>
              setRecipeData({ ...recipeData, servings: e.target.value })
            }
            className="mt-1 p-2 border rounded-md w-full"
            placeholder="Enter number of servings"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="budget"
            className="block text-sm font-medium text-gray-700"
          >
            Choose Type Of Food:
          </label>
          <select
            name="type"
            id="type"
            value={recipeData.type}
            onChange={(e) =>
              setRecipeData({ ...recipeData, type: e.target.value })
            }
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
        <div className="mb-4">
          <label
            htmlFor="budget"
            className="block text-sm font-medium text-gray-700"
          >
            Category
          </label>
          <input
            type="text"
            id="budget"
            name="budget"
            value={
              recipeData.categories ? recipeData.categories.join(", ") : ""
            }
            onChange={(e) =>
              setRecipeData({
                ...recipeData,
                categories: e.target.value.split(", "),
              })
            }
            className="mt-1 p-2 border rounded-md w-full"
            placeholder="Enter category ex sugar-free, low-sodium"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="budget"
            className="block text-sm font-medium text-gray-700"
          >
            budget
          </label>
          <input
            type="text"
            id="budget"
            name="budget"
            value={recipeData.budget}
            onChange={(e) =>
              setRecipeData({ ...recipeData, budget: e.target.value })
            }
            className="mt-1 p-2 border rounded-md w-full"
            placeholder="Enter budget"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="origin"
            className="block text-sm font-medium text-gray-700"
          >
            Origin
          </label>
          <input
            type="text"
            id="origin"
            name="origin"
            value={recipeData.origin}
            onChange={(e) =>
              setRecipeData({ ...recipeData, origin: e.target.value })
            }
            className="mt-1 p-2 border rounded-md w-full"
            placeholder="Enter recipe origin ex : indonesia or brazil"
            max={10}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="budget"
            className="block text-sm font-medium text-gray-700"
          >
            nutriscore
          </label>
          <input
            type="number"
            id="nutriscore"
            name="nutriscore"
            value={recipeData.nutriscore}
            onChange={(e) =>
              setRecipeData({ ...recipeData, nutriscore: e.target.value })
            }
            className="mt-1 p-2 border rounded-md w-full"
            placeholder="Enter nutriscore max 10"
            max={10}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="tags"
            className="block text-sm font-medium text-gray-700"
          >
            tags
          </label>
          <input
            type="text"
            id="tags"
            name="tags"
            value={recipeData.tags ? recipeData.tags.join(", ") : ""}
            onChange={(e) =>
              setRecipeData({
                ...recipeData,
                tags: e.target.value.split(", "),
              })
            }
            className="mt-1 p-2 border rounded-md w-full"
            placeholder="Enter tag for your recipe"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="attachment"
            className="block text-sm font-medium text-gray-700"
          >
            Recipe Image
          </label>
          <div>
            {imageUrl && (
              <img src={imageUrl} alt="Uploaded File" className="h-20 w-20" />
            )}
            <input
              type="file"
              onChange={handleFileChange}
              name="image"
              className="mt-1 p-2 border rounded-md w-full"
            />
            {/* <Button onClick={handleUpload}>Upload</Button>
                      {changeImage && <p>Image updated successfully!</p>} */}
          </div>
        </div>
        <div className="mb-4">
          <label
            htmlFor="serving_per_container"
            className="block text-sm font-medium text-gray-700"
          >
            serving per container :
          </label>
          <input
            type="number"
            id="serving_per_container"
            name="serving_per_container"
            value={recipeData.serving_per_container}
            onChange={(e) =>
              setRecipeData({
                ...recipeData,
                serving_per_container: e.target.value,
              })
            }
            className="mt-1 p-2 border rounded-md w-full"
            placeholder="Enter nutriscore max 10"
            max={10}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="serving_size"
            className="block text-sm font-medium text-gray-700"
          >
            serving size :
          </label>
          <input
            type="number"
            id="serving_size"
            name="serving_size"
            value={recipeData.serving_size}
            onChange={(e) =>
              setRecipeData({ ...recipeData, serving_size: e.target.value })
            }
            className="mt-1 p-2 border rounded-md w-full"
            placeholder="Enter nutriscore max 10"
            max={10}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="calories"
            className="block text-sm font-medium text-gray-700"
          >
            calories :
          </label>
          <input
            type="number"
            id="calories"
            name="calories"
            value={recipeData.calories}
            onChange={(e) =>
              setRecipeData({ ...recipeData, calories: e.target.value })
            }
            className="mt-1 p-2 border rounded-md w-full"
            placeholder="Enter nutriscore max 10"
            max={10}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="total_fats"
            className="block text-sm font-medium text-gray-700"
          >
            total fat :
          </label>
          <input
            type="number"
            id="total_fat"
            name="total_fat"
            value={recipeData.total_fat}
            onChange={(e) =>
              setRecipeData({ ...recipeData, total_fat: e.target.value })
            }
            className="mt-1 p-2 border rounded-md w-full"
            placeholder="Enter total_fat max 10"
            max={10}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="total_carbohydrate"
            className="block text-sm font-medium text-gray-700"
          >
            total carbohydrate :
          </label>
          <input
            type="number"
            id="total_carbohydrate"
            name="total_carbohydrate"
            value={recipeData.total_carbohydrate}
            onChange={(e) =>
              setRecipeData({
                ...recipeData,
                total_carbohydrate: e.target.value,
              })
            }
            className="mt-1 p-2 border rounded-md w-full"
            placeholder="Enter total_carbohydrate max 10"
            max={10}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="total_sugar"
            className="block text-sm font-medium text-gray-700"
          >
            total sugar :
          </label>
          <input
            type="number"
            id="total_sugar"
            name="total_sugar"
            value={recipeData.total_sugar}
            onChange={(e) =>
              setRecipeData({ ...recipeData, total_sugar: e.target.value })
            }
            className="mt-1 p-2 border rounded-md w-full"
            placeholder="Enter total sugar max 10"
            max={10}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="cholesterol"
            className="block text-sm font-medium text-gray-700"
          >
            cholesterol :
          </label>
          <input
            type="number"
            id="cholesterol"
            name="cholesterol"
            value={recipeData.cholesterol}
            onChange={(e) =>
              setRecipeData({ ...recipeData, cholesterol: e.target.value })
            }
            className="mt-1 p-2 border rounded-md w-full"
            placeholder="Enter cholesterol max 10"
            max={10}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="protein"
            className="block text-sm font-medium text-gray-700"
          >
            protein :
          </label>
          <input
            type="number"
            id="protein"
            name="protein"
            value={recipeData.protein}
            onChange={(e) =>
              setRecipeData({ ...recipeData, protein: e.target.value })
            }
            className="mt-1 p-2 border rounded-md w-full"
            placeholder="Enter protein max 10"
            max={10}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="vitamin_d"
            className="block text-sm font-medium text-gray-700"
          >
            vitamin D :
          </label>
          <input
            type="number"
            id="vitamin_d"
            name="vitamin_d"
            value={recipeData.vitamin_d}
            onChange={(e) =>
              setRecipeData({ ...recipeData, vitamin_d: e.target.value })
            }
            className="mt-1 p-2 border rounded-md w-full"
            placeholder="Enter vitamin D max 10"
            max={10}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="sodium"
            className="block text-sm font-medium text-gray-700"
          >
            sodium :
          </label>
          <input
            type="number"
            id="sodium"
            name="sodium"
            value={recipeData.sodium}
            onChange={(e) =>
              setRecipeData({ ...recipeData, sodium: e.target.value })
            }
            className="mt-1 p-2 border rounded-md w-full"
            placeholder="Enter vitamin D max 10"
            max={10}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="calcium"
            className="block text-sm font-medium text-gray-700"
          >
            calcium :
          </label>
          <input
            type="number"
            id="calcium"
            name="calcium"
            value={recipeData.calcium}
            onChange={(e) =>
              setRecipeData({ ...recipeData, calcium: e.target.value })
            }
            className="mt-1 p-2 border rounded-md w-full"
            placeholder="Enter calcium  max 10"
            max={10}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="potassium"
            className="block text-sm font-medium text-gray-700"
          >
            potassium :
          </label>
          <input
            type="number"
            id="potassium"
            name="potassium"
            value={recipeData.potassium}
            onChange={(e) =>
              setRecipeData({ ...recipeData, potassium: e.target.value })
            }
            className="mt-1 p-2 border rounded-md w-full"
            placeholder="Enter potassium  max 10"
            max={10}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="iron"
            className="block text-sm font-medium text-gray-700"
          >
            iron :
          </label>
          <input
            type="number"
            id="iron"
            name="iron"
            value={recipeData.iron}
            onChange={(e) =>
              setRecipeData({ ...recipeData, iron: e.target.value })
            }
            className="mt-1 p-2 border rounded-md w-full"
            placeholder="Enter iron  max 10"
            max={10}
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="budget"
            className="block text-sm font-medium text-gray-700"
          >
            Instructions
          </label>
          <textarea
            id="instructions"
            name="instruction"
            value={recipeData.instruction}
            onChange={handleInstructionChange}
            className="mt-1 p-2 border rounded-md w-full"
            placeholder="Enter intsructions"
          />
        </div>
        {/* <div className="mb-4">
            <label
              htmlFor="instructions"
              className="block text-sm font-medium text-gray-700"
            >
              Instructions
            </label>
            {formData.instructions.map((instruction, index) => (
            <div className="flex items-center mt-1">
              <textarea
                value={recipeData.instructions}
                onChange={(e) =>
                  setRecipeData({ ...recipeData, instructions: e.target.value })
                }
                onChange={(e) => handleChange(e, index)}
                className="p-4 border rounded-md flex-grow"
                placeholder={`Step ${index + 1}`}
              />
              <button
                type="button"
                onClick={() => handleRemoveStep(index)}
                className="ml-2 p-2 bg-red-500 text-white rounded-md"
              >
                Remove Step
              </button>
            </div>
            ))} 
            <button
              type="button"
              onClick={handleAddStep}
              className="mt-2 p-2 bg-blue-500 text-white rounded-md"
            >
              Add Step
            </button>
          </div> */}
        <button
          type="submit"
          className="bg-green-500 text-white py-2 px-4 rounded-md"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default RecipeForm;
