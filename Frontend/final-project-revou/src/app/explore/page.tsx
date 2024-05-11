"use client";
import React from "react";
import RecipeFeeds from "@/components/RecipesFeeds";
import Footer from "@/components/Footer";
import food1 from "../../components/images/sliderImagesv2/food1.jpg";
import food2 from "../../components/images/sliderImagesv2/food2.jpg";
import food3 from "../../components/images/sliderImagesv2/food3.jpg";
import food4 from "../../components/images/sliderImagesv2/food4.jpg";

const RecipePage: React.FC = () => {
  const images = [food1, food2, food3, food4];
  return (
    <div>
      {/* <SliderImagev2 foodImages={images} title="test" /> */}
      <RecipeFeeds />
      <Footer />
      {/* <h1>tes</h1> */}
    </div>
  );
};

export default RecipePage;
