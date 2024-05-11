"use client";
import React, { useState } from "react";
import Sidebar_vmhb from "@/components/Sidebar_vmhb";

const App: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <Sidebar_vmhb />
    </div>
  );
};

export default App;
