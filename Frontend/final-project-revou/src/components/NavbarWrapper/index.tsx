"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import LoginModal from "../LoginModal";
import Navbar from "../Navbar";
import NavbarDropdown from "../NavbarDropdown";
import RegisterModalv1 from "../RegisterModalv1";
import { useAuth } from "@/context";
import Link from "next/link";

interface NavbarProps {
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
}

export default function NavbarWrapper({
  isLoggedIn,
  setIsLoggedIn,
}: NavbarProps) {
  const [showNavbarHamburgerMenu, setShowNavbarHamburgerMenu] =
    useState<boolean>(false);
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);
  const [showRegisterModal, setShowRegisterModal] = useState<boolean>(false);

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
  console.log("first", isLoggedIn);

  return (
    <>
      <div className="">
        <Navbar
          setShowLoginModal={setShowLoginModal}
          setShowNavbarHamburgerMenu={setShowNavbarHamburgerMenu}
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
        />
        {showNavbarHamburgerMenu && (
          <NavbarDropdown
            setShowNavbarHamburgerMenu={setShowNavbarHamburgerMenu}
            setShowLoginModal={setShowLoginModal}
          />
        )}
        {showLoginModal && (
          <LoginModal
            setShowLoginModal={setShowLoginModal}
            setShowRegisterModal={setShowRegisterModal}
            isLoggedIn={isLoggedIn}
            setIsLoggedIn={setIsLoggedIn}
          />
        )}
        {showRegisterModal && (
          <RegisterModalv1 setShowRegisterModal={setShowRegisterModal} />
        )}
      </div>
    </>
  );
}
