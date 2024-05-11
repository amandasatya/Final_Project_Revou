"use client";
import React, { useState } from "react";
import MyProfile from "../DedicatedProfilePage/MyProfile";
import MyRecipe from "../DedicatedProfilePage/MyRecipe";
import CreateRecipe from "../DedicatedProfilePage/CreateRecipe";
import Link from "next/link";
import Security from "../DedicatedProfilePage/Security";

const Sidebar: React.FC = () => {
  const categories = [
    "Home",
    "My Profile",
    "My Recipe",
    "Create Recipe",
    "Security",
  ];

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <div className="flex">
      <div className="fixed top-0 left-0 h-full bg-gray-800 text-white w-64 ">
        <div className="py-4 px-6">
          <div className="p-2 ">
            {categories.map((category) => (
              <h1
                className="hover:bg-red-200 hover:rounded-xl p-2 py-4 cursor-pointer"
                key={category}
                onClick={() => handleCategoryClick(category)}
              >
                {category === "Home" ? (
                  <Link href="/home">{category}</Link>
                ) : (
                  category
                )}
              </h1>
            ))}
          </div>
        </div>
      </div>
      <div className="w-1/5"></div>
      <div className="w-3/5 p-5">
        {selectedCategory === "My Profile" && <MyProfile />}
        {selectedCategory === "My Recipe" && <MyRecipe />}
        {selectedCategory === "Create Recipe" && <CreateRecipe />}
        {selectedCategory === "Security" && <Security />}
      </div>
    </div>
  );
};

export default Sidebar;
