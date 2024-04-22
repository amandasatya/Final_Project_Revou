"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import bg1 from "../../components/images/sliderImagesv2/food3.jpg";
import googlesvg from "../../components/images/svg/7123025_logo_google_g_icon.svg";
import facebooksvg from "../../components/images/svg/317727_facebook_social media_social_icon.svg";
import inboxsvg from "../../components/images/svg/email-1-svgrepo-com.svg";
import locksvg from "../../components/images/svg/4213432_closed_lock_password_protect_secure_icon.svg";

type SetToggleMenuType = (
  value: boolean | ((prev: boolean) => boolean)
) => void;

interface Props {
  setShowLoginModal: SetToggleMenuType;
}

export default function LoginModal({ setShowLoginModal }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Handle login logic here
    setShowLoginModal(false);
  };

  return (
    <>
      <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center z-50">
        <div
          className="fixed inset-0 bg-black opacity-50 z-40"
          onClick={() => setShowLoginModal(false)}
        ></div>

        <div className="fixed flex top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl z-50">
          {/* Sign-in options */}
          <div className="px-0 sm:px-6 md:px-0 lg:px-6">
            <div className="justify-center p-5 pb-0">
              <h1 className="text-3xl font-bold text-slate-700">WELCOME!</h1>
              <p className="text-slate-600">
                Please choose Sign-in option below.
              </p>
            </div>
            <div className="flex flex-col gap-2 p-5">
              <div className="flex py-2">
                <Button
                  className="gap-1 w-72 py-6 pl-1 text-base text-slate-600 bg-slate-200 hover:bg-slate-100 hover:text-slate-800"
                  onClick={() => setShowLoginModal(false)}
                >
                  <img
                    src={googlesvg.src}
                    alt="Google logo."
                    className="w-12 h-12"
                  />
                  Sign-in with Google
                </Button>
              </div>
              <div className="flex py-2">
                <Button
                  className="gap-1 w-72 py-6 text-base text-slate-600 bg-slate-200 hover:bg-slate-100 hover:text-slate-800"
                  onClick={() => setShowLoginModal(false)}
                >
                  <img
                    src={facebooksvg.src}
                    alt="Facebook logo."
                    className="w-8 h-8 mr-2"
                  />
                  <p className="text-base">Sign-in with Facebook</p>
                </Button>
              </div>
              {/* LoginForm */}
              <div className="flex justify-center items-center mt-6 gap-4">
                <h2 className="text-base">&mdash;&mdash;&mdash;</h2>
                <h2 className="text-base text-slate-700">
                  Or Sign-in with Email
                </h2>
                <h2 className="text-base">&mdash;&mdash;&mdash;</h2>
              </div>
              <form action="{{}}" method="post">
                <div className="py-2">
                  <label
                    htmlFor="email"
                    className="text-sm cursor-pointer text-slate-600 font-semibold"
                  >
                    Email
                  </label>
                  <div className="relative ">
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={email}
                      className="border border-gray-300 rounded-xl w-72 p-2 text-sm pl-9"
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      required
                    />
                    <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
                      <img src={inboxsvg.src} alt="Logo" className="h-6 w-6" />
                    </div>
                  </div>
                </div>
                <div className="py-2">
                  <label
                    htmlFor="password"
                    className="text-sm cursor-pointer text-slate-600 font-semibold"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      name="password"
                      id="password"
                      value={password}
                      className="border border-gray-300 rounded-xl w-72 p-2 text-sm pl-9"
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      required
                    />
                    <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
                      <img src={locksvg.src} alt="Logo" className="h-5 w-5" />
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex gap-1">
                    <input
                      type="checkbox"
                      name="remember"
                      id="remember"
                      className="cursor-pointer"
                    />
                    <label
                      htmlFor="remember"
                      className="text-xs cursor-pointer text-slate-600 hover:text-slate-800 active:text-slate-800"
                    >
                      Remember Me
                    </label>
                  </div>
                  <div
                    onClick={() => setShowLoginModal(false)}
                    className="cursor-pointer"
                  >
                    <p className="text-xs border-b-2 border-slate-700 hover:border-slate-800 text-slate-600 hover:text-slate-800">
                      Forgot Password?
                    </p>
                  </div>
                </div>
                <div>
                  <Button
                    className="w-72 bg-red-500 hover:bg-red-600 mt-4"
                    type="submit"
                    value={"Login"}
                  >
                    <p className="text-base">Login</p>
                  </Button>
                </div>
                <div className="mt-2">
                  <p className="text-sm text-slate-700">
                    Don't have an account? Sign up{" "}
                    <span
                      onClick={() => setShowLoginModal(false)}
                      className="text-red-500 hover:text-red-600 cursor-pointer hover:font-semibold"
                    >
                      here
                    </span>
                  </p>
                </div>
              </form>
            </div>
          </div>
          <div className="hidden md:flex md:min-w-96">
            <img
              src={bg1.src}
              alt=""
              className="object-cover rounded-tr-xl rounded-br-xl"
            />
          </div>
          <div className="absolute top-1 right-1">
            <button
              onClick={() => setShowLoginModal(false)}
              type="button"
              className="bg-transparent rounded-md m-3 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            >
              <span className="sr-only">Close menu</span>
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
