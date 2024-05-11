"use client";
import React, { useState } from "react";
import Sidebar from "@/components/SideBar";

const App: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <Sidebar />
    </div>
  );
};

export default App;
