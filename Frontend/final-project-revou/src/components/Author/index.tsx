import { chefMainCard } from "@/data";
import React, { useState, useEffect } from "react";
import facebooksvg from "../../components/images/svg/317727_facebook_social media_social_icon.svg";
import tiktoksvg from "../../components/images/svg/tiktok-logo-logo-svgrepo-com.svg";
import instagramsvg from "../../components/images/svg/instagram2.svg";
import { Button } from "../ui/button";
import useFetchProfile from "@/hooks/useFetchProfile";
import axios from "axios";
import { ProfileData } from "../ModalRecipe";

export default function Author({ recipeData }: any) {
  const { profile, error, refetchProfile } = useFetchProfile();
  const [isFollowing, setIsFollowing] = useState(false);
  const [profileData, setProfileData] = useState<ProfileData>();
  console.log("ini recipedatabung", recipeData);
  useEffect(() => {
    const authorProfile = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:5000/users/${recipeData.author_id}`
        );
        if (!response) {
          throw new Error("Failed to fetch data");
        }
        // console.log("response author", response);
        const data = response.data;

        setProfileData(data);
      } catch (error) {
        console.error(error);
      }
    };

    authorProfile();
  }, [recipeData]);
  console.log("profiledataatas", profileData?.id);
  const handleFollow = async () => {
    if (isFollowing === false) {
      setIsFollowing(true);
    }
    console.log("iniprofiledata", profileData);
    const authToken = localStorage.getItem("access_token");
    if (!authToken) {
      console.error("Authorization token is missing.");
      return;
    }
    try {
      const response = await axios.post(
        `http://127.0.0.1:5000/users/follow/${profileData?.id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      console.log("response follow", response);
      refetchProfile();
    } catch (error) {
      console.error(error);
    }
  };
  const handleUnfollow = async () => {
    if (isFollowing === true) {
      setIsFollowing(false);
    }
    console.log("iniprofiledata", profileData);
    const authToken = localStorage.getItem("access_token");
    if (!authToken) {
      console.error("Authorization token is missing.");
      return;
    }
    try {
      const response = await axios.post(
        `http://127.0.0.1:5000/users/unfollow/${profileData?.id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      console.log("response follow", response);
      refetchProfile();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="border-4 bg-slate-300 border-slate-400 p-4 mt-5 sm:mt-7 lg:mt-5 mx-1 rounded-xl md:w-1/2">
      <div className="flex justify-start items-center">
        <div className="justify-center items-center w-full">
          <div className="flex justify-center w-full items-center gap-2 sm:gap-4">
            <picture className="w-max">
              <img
                src={profileData?.image}
                alt=""
                className=" h-16 w-20 rounded-full object-cover"
              />
            </picture>
            <div className="flex flex-col gap-2 w-full">
              <div className="flex justify-start gap-2 md:gap-1">
                <h1 className="text-xl font-bold text-orange-900">
                  {profileData?.first_name}
                </h1>
                <h1 className="text-xl font-bold text-orange-900">
                  {profileData?.last_name}
                </h1>
              </div>
              {/* {chefMainCard[0].socialMedia.map((social: any) => ( */}
              <div
                className="flex justify-between items-center"
                // key={social.id}
              >
                <div className="flex justify-start items-center gap-3">
                  {/* <a href={social.facebook}>
                      <picture>
                        <img
                          src={facebooksvg.src}
                          alt=""
                          className="w-8 h-8 rounded-lg"
                        />
                      </picture>
                    </a>
                    <a href={social.tiktok}>
                      <picture>
                        <img
                          src={tiktoksvg.src}
                          alt=""
                          className="w-8 h-8 rounded-lg"
                        />
                      </picture>
                    </a>
                    <a href={social.instagram}>
                      <picture>
                        <img
                          src={instagramsvg.src}
                          alt=""
                          className="w-9 h-9 rounded-lg"
                        />
                      </picture>
                    </a> */}
                </div>
                {isFollowing ? (
                  <Button
                    className="bg-slate-800 px-2 hover:bg-slate-900"
                    onClick={handleUnfollow}
                  >
                    Unfollow
                  </Button>
                ) : (
                  <Button
                    className="bg-slate-800 px-2 hover:bg-slate-900"
                    onClick={handleFollow}
                  >
                    + Follow
                  </Button>
                )}
              </div>
              {/* ))} */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
