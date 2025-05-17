import React from "react";
import { ColorShowcase } from "./components/color-showcase";

const page = () => {
  return (
    <div>
      <div className="p-8 text-3xl font-bold text-purple">Fuchsiu Academy</div>
      <ColorShowcase />
      <div className=" bg-stroke text-7xl font-bold">test</div>
    </div>
  );
};

export default page;
