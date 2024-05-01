"use client";
import { useState } from "react";
import Card from "../Card";
import food1 from "../images/sliderImagesv2/food1.jpg";
import food2 from "../images/sliderImagesv2/food2.jpg";
import food3 from "../images/sliderImagesv2/food3.jpg";
import food4 from "../images/sliderImagesv2/food4.jpg";
import { Button } from "../ui/button";
import CardSmall from "../CardSmall";

interface Props {
  className?: string;
}

export default function SliderImagev2_2_2({ className }: Props) {
  const [endIndex, setEndIndex] = useState(4);

  const cards = [
    {
      title: "Spaghetti Lasagna",
      complexity: "Easy",
      time: "20Min",
      foodImage: food1.src,
    },
    {
      title: "Spaghetti Lasagna",
      complexity: "Medium",
      time: "5Min",
      foodImage: food2.src,
    },
    {
      title: "Spaghetti Lasagna",
      complexity: "Hard",
      time: "1Hour",
      foodImage: food3.src,
      role: "chef",
    },
    {
      title: "Spaghetti Lasagna",
      complexity: "Easy",
      time: "25Min",
      foodImage: food4.src,
    },
    {
      title: "Spaghetti Lasagna",
      complexity: "Easy",
      time: "20Min",
      foodImage: food1.src,
    },
    {
      title: "Spaghetti Lasagna",
      complexity: "Medium",
      time: "5Min",
      foodImage: food2.src,
      role: "chef",
    },
    {
      title: "Spaghetti Lasagna",
      complexity: "Hard",
      time: "1Hour",
      foodImage: food3.src,
    },
    {
      title: "Spaghetti Lasagna",
      complexity: "Easy",
      time: "25Min",
      foodImage: food4.src,
    },
    {
      title: "Spaghetti Lasagna",
      complexity: "Easy",
      time: "20Min",
      foodImage: food1.src,
    },
    {
      title: "Spaghetti Lasagna",
      complexity: "Medium",
      time: "5Min",
      foodImage: food2.src,
    },
    {
      title: "Spaghetti Lasagna",
      complexity: "Hard",
      time: "1Hour",
      foodImage: food3.src,
      role: "chef",
    },
    {
      title: "Spaghetti Lasagna",
      complexity: "Easy",
      time: "25Min",
      foodImage: food4.src,
    },
    {
      title: "Spaghetti Lasagna",
      complexity: "Easy",
      time: "20Min",
      foodImage: food1.src,
    },
    {
      title: "Spaghetti Lasagna",
      complexity: "Medium",
      time: "5Min",
      foodImage: food2.src,
      role: "chef",
    },
    {
      title: "Spaghetti Lasagna",
      complexity: "Hard",
      time: "1Hour",
      foodImage: food3.src,
    },
    {
      title: "Spaghetti Lasagna",
      complexity: "Easy",
      time: "25Min",
      foodImage: food4.src,
    },
    {
      title: "Spaghetti Lasagna",
      complexity: "Easy",
      time: "20Min",
      foodImage: food1.src,
    },
    {
      title: "Spaghetti Lasagna",
      complexity: "Medium",
      time: "5Min",
      foodImage: food2.src,
    },
    {
      title: "Spaghetti Lasagna",
      complexity: "Hard",
      time: "1Hour",
      foodImage: food3.src,
      role: "chef",
    },
    {
      title: "Spaghetti Lasagna",
      complexity: "Easy",
      time: "25Min",
      foodImage: food4.src,
    },
    {
      title: "Spaghetti Lasagna",
      complexity: "Easy",
      time: "20Min",
      foodImage: food1.src,
    },
    {
      title: "Spaghetti Lasagna",
      complexity: "Medium",
      time: "5Min",
      foodImage: food2.src,
      role: "chef",
    },
    {
      title: "Spaghetti Lasagna",
      complexity: "Hard",
      time: "1Hour",
      foodImage: food3.src,
    },
    {
      title: "Spaghetti Lasagna",
      complexity: "Easy",
      time: "25Min",
      foodImage: food4.src,
    },
    {
      title: "Spaghetti Lasagna",
      complexity: "Easy",
      time: "20Min",
      foodImage: food1.src,
    },
    {
      title: "Spaghetti Lasagna",
      complexity: "Medium",
      time: "5Min",
      foodImage: food2.src,
    },
    {
      title: "Spaghetti Lasagna",
      complexity: "Hard",
      time: "1Hour",
      foodImage: food3.src,
      role: "chef",
    },
    {
      title: "Spaghetti Lasagna",
      complexity: "Easy",
      time: "25Min",
      foodImage: food4.src,
    },
    {
      title: "Spaghetti Lasagna",
      complexity: "Easy",
      time: "20Min",
      foodImage: food1.src,
    },
    {
      title: "Spaghetti Lasagna",
      complexity: "Medium",
      time: "5Min",
      foodImage: food2.src,
      role: "chef",
    },
    {
      title: "Spaghetti Lasagna",
      complexity: "Hard",
      time: "1Hour",
      foodImage: food3.src,
    },
    {
      title: "Spaghetti Lasagna",
      complexity: "Easy",
      time: "25Min",
      foodImage: food4.src,
    },
    {
      title: "Spaghetti Lasagna",
      complexity: "Easy",
      time: "20Min",
      foodImage: food1.src,
    },
    {
      title: "Spaghetti Lasagna",
      complexity: "Medium",
      time: "5Min",
      foodImage: food2.src,
    },
    {
      title: "Spaghetti Lasagna",
      complexity: "Hard",
      time: "1Hour",
      foodImage: food3.src,
      role: "chef",
    },
    {
      title: "Spaghetti Lasagna",
      complexity: "Easy",
      time: "25Min",
      foodImage: food4.src,
    },
    {
      title: "Spaghetti Lasagna",
      complexity: "Easy",
      time: "20Min",
      foodImage: food1.src,
    },
    {
      title: "Spaghetti Lasagna",
      complexity: "Medium",
      time: "5Min",
      foodImage: food2.src,
      role: "chef",
    },
    {
      title: "Spaghetti Lasagna",
      complexity: "Hard",
      time: "1Hour",
      foodImage: food3.src,
    },
    {
      title: "Spaghetti Lasagna",
      complexity: "Easy",
      time: "25Min",
      foodImage: food4.src,
    },
  ];

  const displayCards = cards.slice(0, endIndex);

  const handleNext = () => {
    if (endIndex < cards.length - 2) {
      setEndIndex((prev) => prev + 2);
    }
  };

  return (
    <div className={className}>
      <div className="flex justify-center items-center px-6 pt-10 pb-4 text-xl gap-3 text-gray-700">
        <h1>&mdash;&mdash;&mdash;&mdash;&mdash;</h1>
        <h1 className="text-xl font-semibold text-gray-700 flex justify-center items-center text-center">
          Be Inspired With
        </h1>
        <h1>&mdash;&mdash;&mdash;&mdash;&mdash;</h1>
      </div>
      <h1 className="flex justify-center items-center text-3xl font-bold text-gray-800">
        Our Recipes
      </h1>
      <div className="group justify-center items-center mt-4">
        <div className="flex flex-wrap justify-center items-center gap-3 gap-y-5 lg:flex xl:flex">
          {displayCards.map((card, index) => (
            <div key={index} className="w-40 flex cursor-pointer">
              <CardSmall
                key={index}
                title={card.title}
                complexity={card.complexity}
                time={card.time}
                foodImage={card.foodImage}
                role={card.role}
                maxHeight="50vh"
              />
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center items-center p-5 my-4">
        <Button onClick={handleNext}>Show More</Button>
      </div>
    </div>
  );
}
