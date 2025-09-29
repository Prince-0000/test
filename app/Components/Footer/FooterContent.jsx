"use client";

import Image from "next/image";

const FooterPage = () => {
  return (
    <>
  
      

      {/* Footer Main */}
      <div className="bg-white dark:bg-[#0d0d0d] sm:p-10 m-auto items-center lg:p-16  mb-2 rounded-2xl shadow-2xl p-5">
        {/* Logo Section */}
        <div className="text-black dark:text-white  text-lg sm:text-xl flex items-center gap-3">
          <Image
            src="/acquireWithAsh.png"
            alt="My Logo"
            width={50}
            height={50}
          />
          <span className="publica-font">
            AcquireWith
            <span className="font-bold text-violet-700">Ash</span>
          </span>
        </div>

        {/* Description */}
        <div className="mt-6 sm:mt-10 text-black dark:text-white  text-base sm:text-lg">
          <p>Open source community to help and grow together</p>
          <p>with developers across the world</p>
        </div>

        {/* Mid Footer */}
        <div className="flex flex-col md:flex-row md:justify-around justify-between items-start md:items-center text-black dark:text-white  mt-10 text-sm sm:text-base gap-4 md:gap-0 px-2 sm:px-0">
          <div className="flex flex-col justify-between sm:flex-row items-start sm:items-center md:gap-x-36 gap-x-6">
            <div>©2024</div>
            <div>acquirewithash.com</div>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center md:gap-x-36 gap-x-6">
            <div>Privacy</div>
            <div>Terms and Conditions</div>
          </div>
        </div>

        {/* Social Icons */}
        <div className="flex flex-wrap justify-center sm:justify-around mt-8 text-black dark:text-white  text-sm sm:text-base">
          <div className="flex flex-col items-center m-4 text-center">
            <a href="https://instagram.com/acquirewithash" target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-instagram text-pink-600 text-xl mb-1"></i>
            <p>@acquireWithAsh</p></a>
          </div>
          <div className="flex flex-col items-center m-4 text-center">
          <a href=" https://www.linkedin.com/in/ashhutoshpandey/" target="_blank" rel="noopener noreferrer">   <i className="fa-brands fa-linkedin text-blue-600 text-xl mb-1"></i>
            <p>@acquireWithAsh</p></a>
           
          </div>
          <div className="flex flex-col items-center m-4 text-center">
            <a href="https://github.com/ashhutoshpandey" target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-square-github text-gray-400 text-xl mb-1"></i>
            <p>@acquireWithAsh</p></a>
          </div>
        </div>
      </div>
    </>
  );
};

export default FooterPage;
