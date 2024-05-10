import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import photo1 from "../../components/images/chefimage/gordonram.jpeg";
import photo2 from "../../components/images/chefimage/jemieolif.jpg";
import noimage from "../images/svg/cardlogo/No_image_available.svg.png";
import useFetchProfile from "@/hooks/useFetchProfile";
import useFetchRecipe from "@/hooks/UseFetchRecipe";
import axios from "axios";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
interface RecipeData {
  comments: {
    message: string;
    comment: string;
    id: string;
  }[];
}

const CommentSection = ({ recipeData, setRecipeData }: any) => {
  const [profileComment, setProfileComment] = useState("");
  const { recipes } = useFetchRecipe();

  const { profile } = useFetchProfile();
  const [comments, setComments] = useState("");

  // useEffect(() => {
  //   const fetchDataProfile = async () => {
  //     if (profile) {
  //       console.log("first", profile);
  //       const profileId = profile.id;
  //       const apiUrl = `http://127.0.0.1:5000/users/${profileId}`;
  //       try {
  //         const response = await fetch(apiUrl);
  //         if (!response.ok) {
  //           throw new Error("Failed to fetch data");
  //         }
  //         const data = await response.json();
  //         console.log("data profile", data);
  //         setProfileComment(data);
  //       } catch (error) {
  //         console.error(error);
  //       }
  //     }
  //   };

  //   fetchDataProfile();
  // });

  const postComments = async () => {
    try {
      const authToken = localStorage.getItem("access_token");
      // Verify authToken is not null before proceeding
      if (!authToken) {
        console.error("Authorization token is missing.");
        return;
      }

      const response = await axios.post(
        `http://127.0.0.1:5000/recipes/comment/${recipeData.id}`,
        {
          message: profileComment,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      console.log("Comment posted successfully:", response.data);
      setRecipeData(response.data);
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  };
  useEffect(() => {
    if (recipeData && recipeData.comments) {
      setComments(recipeData.comments);
    }
  }, [recipeData]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent default form submission
    postComments();
    setProfileComment("");
  };
  // console.log("inirecipedata", recipeData);
  // console.log("ini profile", profile);

  const imageIsValid = profile?.image && profile?.image !== "";
  return (
    <div className="px-2 mt-10">
      <div className="border-2 border-slate-700 bg-slate-100 rounded-xl p-4">
        <div className="flex flex-col">
          <div className="flex">
            <h1 className="text-xl text-slate-800 font-bold">Comments</h1>
            <div className="flex justify-center items-center h-8 w-8 bg-slate-800 ml-2 text-white rounded-full">
              {/* {CommentsCard[0].comments.length} */}
            </div>
          </div>
          <div className="mt-4">
            <h1 className="text-slate-800">
              Add comment as{" "}
              {profile ? (
                <span className="font-semibold text-slate-800">
                  {profile?.first_name} {profile?.last_name}
                </span>
              ) : (
                <span className="font-semibold text-slate-800">
                  You Must Login first to comment,{" "}
                  <span className="font-semibold text-red-500">Login here</span>
                </span>
              )}
            </h1>
          </div>
          <form action="" method="post" onSubmit={handleSubmit}>
            <div className="relative mt-1">
              <textarea
                className="w-full h-20 border-slate-400 border-2 bg-white text-slate-800 rounded-xl text-sm"
                value={profileComment}
                onChange={(e) => setProfileComment(e.target.value)}
              />
              <div className="absolute -top-5 -right-2">
                <picture>
                  {imageIsValid ? (
                    <img
                      src={profile?.image}
                      alt=""
                      className="h-12 w-12 rounded-full object-cover shadow-md shadow-slate-800"
                    />
                  ) : (
                    <img
                      src={noimage.src}
                      alt=""
                      className="h-12 w-12 rounded-full object-cover shadow-md shadow-slate-800"
                    />
                  )}
                </picture>
              </div>
            </div>
            <div className="flex justify-end items-center mt-2">
              <Button type="submit" className="bg-red-500 hover:bg-red-600">
                Submit
              </Button>
            </div>
          </form>
        </div>
        <div className="flex border-b-2 w-full">
          <div className="flex flex-col justify-start items-start w-full p-2">
            <div className="flex flex-col lg:px-0 bg-white rounded-xl w-full ">
              <div className="p-2">
                {/* <div className="p-2">
                  {recipeData &&
                    recipeData.comments &&
                    recipeData.comments.map((comment, index) => (
                      <p key={index} className="text-slate-800">
                        {comment.id}
                      </p>
                    ))}
                </div> */}
                {recipeData ? (
                  <div className="p-2">
                    {recipeData?.comments?.map((comment: any, index: any) => (
                      <div key={index}>
                        <p className="text-slate-800">{comment.message}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <h1>There is no comment yet</h1>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CommentSection;
