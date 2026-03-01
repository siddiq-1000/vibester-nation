"use client";

import React from "react";

interface AnimatedButtonProps {
  text: string;
  icon?: React.ReactNode;
}

const AnimatedButton = ({ text, icon }: AnimatedButtonProps) => {
  return (
    <button
      type="button"
      className="
        group
        relative
        flex
        justify-center
        items-center
        gap-3
        mx-auto
        px-6
        py-3
        overflow-hidden
        rounded-full
        border-2
        border-gray-500
        bg-transparent
        backdrop-blur-md
        shadow-xl
        text-sm
        md:text-lg
        lg:font-semibold
        isolation-auto

        /* LEFT ➜ RIGHT hover background */
        before:absolute
        before:inset-0
        before:-z-10
        before:-translate-x-full
        before:bg-black
        before:transition-transform
        before:duration-500
        hover:before:translate-x-0
      "
    >
      {/* Optional Icon */}
      {icon && (
        <span className="z-10 flex items-center justify-center text-gray-300 transition-colors duration-300 group-hover:text-white">
          {icon}
        </span>
      )}

      {/* Button Text */}
      <span className="z-10 font-heading uppercase tracking-widest text-gray-300 transition-colors duration-300 group-hover:text-white">
        {text}
      </span>

      {/* Arrow Icon */}
      <svg
        className="
          z-10
          ml-2
          w-8
          h-8
          rotate-45
          rounded-full
          border
          border-gray-500
          p-2
          text-gray-300
          transition-all
          duration-300
          group-hover:rotate-90
          group-hover:bg-white
          group-hover:text-black
          group-hover:border-none
        "
        viewBox="0 0 16 19"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M7 18C7 18.5523 7.44772 19 8 19C8.55228 19 9 18.5523 9 18H7ZM8.70711 0.292893C8.31658 -0.0976311 7.68342 -0.0976311 7.29289 0.292893L0.928932 6.65685C0.538408 7.04738 0.538408 7.68054 0.928932 8.07107C1.31946 8.46159 1.95262 8.46159 2.34315 8.07107L8 2.41421L13.6569 8.07107C14.0474 8.46159 14.6805 8.46159 15.0711 8.07107C15.4616 7.68054 15.4616 7.04738 15.0711 6.65685L8.70711 0.292893ZM9 18L9 1H7L7 18H9Z"
          className="fill-current"
        />
      </svg>
    </button>
  );
};

export default AnimatedButton;