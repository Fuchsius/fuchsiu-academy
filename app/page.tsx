import React from "react";
import { ColorShowcase } from "./components/color-showcase";

const page = () => {
  return (
    <div className="container mx-auto">
      <div className="text-3xl font-bold text-purple">Fuchsiu Academy</div>
      <ColorShowcase />
      <div className="text-7xl font-bold gradient-text py-5">
        Kalana Didulanga
      </div>
      <div className="text-2xl gradient-text">Course Duration p</div>
    </div>
  );
};

export default page;
