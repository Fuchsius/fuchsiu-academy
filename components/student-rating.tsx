import React from "react";

export const StudentRating = () => {
  return (
    <div className="flex flex-col items-center">
      <div className="flex -space-x-2">
        {[1, 2, 3, 4].map((item) => (
          <div
            key={item}
            className="w-8 h-8 rounded-full border-2 border-white overflow-hidden bg-gray-300"
            style={{ zIndex: 5 - item }}
          >
            {/* Replace with actual student images when available */}
            <div className="w-full h-full bg-gradient-to-r from-purple-300 to-purple-500">
              <img src={"assets/2.png"} />
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center mt-1">
        <span className="text-lg font-bold mr-1">4.9</span>
        <div className="flex">
          {[1, 2, 3, 4, 5].map((star) => (
            <svg
              key={star}
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-[#facc15]"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
              />
            </svg>
          ))}
        </div>
      </div>
      <p className="text-xs text-purple text-center">10k+ Student Enroll</p>
    </div>
  );
};
