import React from "react";

function Footer() {
  return (
    <footer className="bg-gray mt-auto w-full h-full py-8 ">
      <div className="container flex items-center justify-between gap-8">
        <p>©{new Date().getFullYear()} CookRecipes - All rights reserved.</p>
        <p>
          Made by{" "}
          <a
            target="_blank"
            className="font-bold"
            href="https://sujoykh.vercel.app"
          >
            Sujoy
          </a>
          , build with <span className="font-bold">React.js,</span>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
