"use client";
import { useState, useEffect } from "react";
import svg1 from "../images/svg/whole-foods-1.svg";
import Link from "next/link";
import axios from "axios";

type SetToggleMenuType = (
  value: boolean | ((prev: boolean) => boolean)
) => void;

interface Props {
  setShowLoginModal: SetToggleMenuType;
  setShowNavbarHamburgerMenu: SetToggleMenuType;
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
}

const Navbar = ({
  setShowLoginModal,
  setShowNavbarHamburgerMenu,
  isLoggedIn,
  setIsLoggedIn,
}: Props) => {
  const [showSearchBar, setShowSearchBar] = useState(false);

  const toggleSearchBar = () => {
    setShowSearchBar((prev: boolean) => !prev);
  };

  const toggleNavbarHamburgerMenu = () => {
    setShowNavbarHamburgerMenu((prev: boolean) => !prev);
  };
  const toggleLoginModal = () => {
    setShowLoginModal((prev: boolean) => !prev);
  };

  const [username, setUsername] = useState("");

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const authToken = localStorage.getItem("access_token");
        if (authToken) {
          const response = await axios.get("http://127.0.0.1:5000/users/", {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          });
          setUsername(response.data.username.toUpperCase());
          console.log("Username:", response.data.username);
        }
      } catch (error) {
        console.error("Error fetching username:", error);
      }
    };

    if (isLoggedIn) {
      fetchUsername();
    }
  }, [isLoggedIn]);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    setIsLoggedIn(false);
  };

  return (
    <>
      <div className="hidden items-center justify-around sm:flex sm:gap-6 sm:rounded-b-xl sm:p-2 sm:px- bg-orange-200">
        <div className="flex gap-2">
          <svg
            width="25px"
            height="25px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M3.75 5.25L3 6V18L3.75 18.75H20.25L21 18V6L20.25 5.25H3.75ZM4.5 7.6955V17.25H19.5V7.69525L11.9999 14.5136L4.5 7.6955ZM18.3099 6.75H5.68986L11.9999 12.4864L18.3099 6.75Z"
              fill="#080341"
            />
          </svg>
          <h1 className="text-slate-800">
            have a question?{" "}
            <span className="sm:hover:font-semibold cursor-pointer">
              contact us
            </span>
          </h1>
        </div>
        <div className="flex justify-between gap-4 md:gap-8">
          <div className="flex border-b-2 border-slate-800 sm:max-w-44">
            <input
              type="text"
              placeholder="search here"
              className="sm:max-w-36 sm:px-2 bg-transparent border-transparent border-none"
            />
            <svg
              className=""
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 30 30"
              width="20px"
              height="20px"
            >
              <path d="M 13 3 C 7.4889971 3 3 7.4889971 3 13 C 3 18.511003 7.4889971 23 13 23 C 15.396508 23 17.597385 22.148986 19.322266 20.736328 L 25.292969 26.707031 A 1.0001 1.0001 0 1 0 26.707031 25.292969 L 20.736328 19.322266 C 22.148986 17.597385 23 15.396508 23 13 C 23 7.4889971 18.511003 3 13 3 z M 13 5 C 17.430123 5 21 8.5698774 21 13 C 21 17.430123 17.430123 21 13 21 C 8.5698774 21 5 17.430123 5 13 C 5 8.5698774 8.5698774 5 13 5 z" />
            </svg>
          </div>
          <div className="flex justify-center items-center gap-2">
            <h1>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 50 50"
                className="w-7 h-7"
              >
                <path d="M 44.898438 14.5 C 44.5 12.300781 42.601563 10.699219 40.398438 10.199219 C 37.101563 9.5 31 9 24.398438 9 C 17.800781 9 11.601563 9.5 8.300781 10.199219 C 6.101563 10.699219 4.199219 12.199219 3.800781 14.5 C 3.398438 17 3 20.5 3 25 C 3 29.5 3.398438 33 3.898438 35.5 C 4.300781 37.699219 6.199219 39.300781 8.398438 39.800781 C 11.898438 40.5 17.898438 41 24.5 41 C 31.101563 41 37.101563 40.5 40.601563 39.800781 C 42.800781 39.300781 44.699219 37.800781 45.101563 35.5 C 45.5 33 46 29.398438 46.101563 25 C 45.898438 20.5 45.398438 17 44.898438 14.5 Z M 19 32 L 19 18 L 31.199219 25 Z" />
              </svg>
            </h1>
            <h1>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 50 50"
                className="w-6 h-6"
              >
                <path d="M 16 3 C 8.8324839 3 3 8.8324839 3 16 L 3 34 C 3 41.167516 8.8324839 47 16 47 L 34 47 C 41.167516 47 47 41.167516 47 34 L 47 16 C 47 8.8324839 41.167516 3 34 3 L 16 3 z M 16 5 L 34 5 C 40.086484 5 45 9.9135161 45 16 L 45 34 C 45 40.086484 40.086484 45 34 45 L 16 45 C 9.9135161 45 5 40.086484 5 34 L 5 16 C 5 9.9135161 9.9135161 5 16 5 z M 37 11 A 2 2 0 0 0 35 13 A 2 2 0 0 0 37 15 A 2 2 0 0 0 39 13 A 2 2 0 0 0 37 11 z M 25 14 C 18.936712 14 14 18.936712 14 25 C 14 31.063288 18.936712 36 25 36 C 31.063288 36 36 31.063288 36 25 C 36 18.936712 31.063288 14 25 14 z M 25 16 C 29.982407 16 34 20.017593 34 25 C 34 29.982407 29.982407 34 25 34 C 20.017593 34 16 29.982407 16 25 C 16 20.017593 20.017593 16 25 16 z" />
              </svg>
            </h1>
            <h1>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 30 30"
                className="w-7 h-7"
              >
                {" "}
                <path d="M15,3C8.373,3,3,8.373,3,15c0,6.016,4.432,10.984,10.206,11.852V18.18h-2.969v-3.154h2.969v-2.099c0-3.475,1.693-5,4.581-5 c1.383,0,2.115,0.103,2.461,0.149v2.753h-1.97c-1.226,0-1.654,1.163-1.654,2.473v1.724h3.593L19.73,18.18h-3.106v8.697 C22.481,26.083,27,21.075,27,15C27,8.373,21.627,3,15,3z" />
              </svg>
            </h1>
          </div>
        </div>
      </div>
      {/* Main Navbar */}
      <div className="relative z-10 justify-center flex items-center ">
        <div className="hidden sm:flex sm:justify-center sm:items-center font-sans font-medium text-lg">
          <ul className="flex gap-10 md:gap-16 lg:gap-28 xl:gap-32 2xl:gap-40 justify-center items-center">
            <Link href="/home">Home</Link>
            <Link href="/about-us">About us</Link>
            <li>
              <a href="">
                {" "}
                <picture>
                  <img src={svg1.src} alt="" />
                </picture>
              </a>
            </li>
            <Link href="/explore">Recipe</Link>
            <li>
              {isLoggedIn ? (
                <button
                  className="text-red-500 hover:text-red-700 font-bold py-2 px-4 rounded"
                  onClick={handleLogout}
                >
                  Log Out
                </button>
              ) : (
                <Link href="" onClick={toggleLoginModal}>
                  Sign In
                </Link>
              )}
            </li>
          </ul>
        </div>
      </div>
      {/* Mobile menu */}
      <div className="px-2 relative justify-between items-center flex sm:hidden">
        <div className="bg-orange-200 w-full h-16 top-2 left-0 absolute rounded-xl"></div>
        <div className="flex justify-center items-center z-10">
          <a href="">
            {" "}
            <picture>
              <img className="w-20 h-20" src={svg1.src} alt="" />
            </picture>
          </a>
        </div>
        {!showSearchBar && (
          <div
            onClick={toggleSearchBar}
            className="flex justify-center items-center cursor-pointer z-10"
          >
            <svg
              className="w-8 h-8 "
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 30 30"
            >
              <path d="M 13 3 C 7.4889971 3 3 7.4889971 3 13 C 3 18.511003 7.4889971 23 13 23 C 15.396508 23 17.597385 22.148986 19.322266 20.736328 L 25.292969 26.707031 A 1.0001 1.0001 0 1 0 26.707031 25.292969 L 20.736328 19.322266 C 22.148986 17.597385 23 15.396508 23 13 C 23 7.4889971 18.511003 3 13 3 z M 13 5 C 17.430123 5 21 8.5698774 21 13 C 21 17.430123 17.430123 21 13 21 C 8.5698774 21 5 17.430123 5 13 C 5 8.5698774 8.5698774 5 13 5 z" />
            </svg>
          </div>
        )}
        {showSearchBar && (
          <div className="flex justify-between border-b-2 border-slate-800 w-36 transform duration-1000 z-10">
            <input
              type="text"
              placeholder="search here"
              className="bg-transparent w-28 border-transparent border-none px-1"
            />
            <svg
              onClick={toggleSearchBar}
              className="w-7 h-7 cursor-pointer"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 30 30"
            >
              <path d="M 13 3 C 7.4889971 3 3 7.4889971 3 13 C 3 18.511003 7.4889971 23 13 23 C 15.396508 23 17.597385 22.148986 19.322266 20.736328 L 25.292969 26.707031 A 1.0001 1.0001 0 1 0 26.707031 25.292969 L 20.736328 19.322266 C 22.148986 17.597385 23 15.396508 23 13 C 23 7.4889971 18.511003 3 13 3 z M 13 5 C 17.430123 5 21 8.5698774 21 13 C 21 17.430123 17.430123 21 13 21 C 8.5698774 21 5 17.430123 5 13 C 5 8.5698774 8.5698774 5 13 5 z" />
            </svg>
          </div>
        )}
        <div className="flex justify-center items-center z-10">
          <button
            onClick={toggleNavbarHamburgerMenu}
            type="button"
            className="text-black hover:text-gray-900 focus:outline-none focus:text-gray-950"
          >
            <svg
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
      {/* End of mobile menu */}
    </>
  );
};

export default Navbar;
