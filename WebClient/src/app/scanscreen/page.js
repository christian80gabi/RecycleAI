import React from "react";
import Image from "next/image";

export default function page() {
  return (
    <div
      className="relative min-h-screen flex justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-500 bg-no-repeat bg-cover items-center"
      style={{ backgroundImage: `url("https://images.unsplash.com/photo-1616763355603-9755a640a287?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80")` }}
    >
      <div className="absolute bg-black opacity-60 inset-0 z-0"></div>
      <div className="sm:max-w-lg w-full p-10 bg-white rounded-xl z-10">
        <div className="text-center">
          <h2 className="mt-5 text-3xl font-bold text-gray-900">File Upload!</h2>
          <p className="mt-2 text-sm text-gray-400">
            Lorem ipsum is placeholder text.
          </p>
        </div>
        <form className="mt-8 space-y-3" action="#" method="POST">
          <div className="grid grid-cols-1 space-y-2">
            <label className="text-sm font-bold text-gray-500 tracking-wide">
              Title
            </label>
            <input
              className="text-base p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
              type="text"
              placeholder="mail@gmail.com"
            />
          </div>
          <div className="grid grid-cols-1 space-y-2">
            <label className="text-sm font-bold text-gray-500 tracking-wide">
              Attach Document
            </label>
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col rounded-lg border-4 border-dashed w-full h-60 p-10 group text-center">
                <div className="h-full w-full text-center flex flex-col items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-10 h-10 text-blue-400 group-hover:text-blue-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>
                  <div id="input-file" className="flex flex-auto max-h-48 w-2/5 mx-auto -mt-10">
                    <Image
                      classNameName="has-mask h-36 object-center"
                      src="https://img.freepik.com/free-vector/image-upload-concept-landing-page_52683-27130.jpg?size=338&ext=jpg"
                      alt="freepik image"
                      width={300}
                      height={300}
                    />
                  </div>
                  <p className="pointer-none text-gray-500 ">
                    <span className="text-sm">Drag and drop</span> files here <br />{" "}
                    or{" "}
                    <a href="" id="" className="text-blue-600 hover:underline">
                      select a file
                    </a>{" "}
                    from your computer
                  </p>
                </div>
                <input type="file" className="hidden" />
              </label>
            </div>
          </div>
          <p className="text-sm text-gray-300">
            <span>File type: doc,pdf,types of images</span>
          </p>
          <div>
            <button
              type="submit"
              className="my-5 w-full flex justify-center bg-blue-500 text-gray-100 p-4  rounded-full tracking-wide
                                    font-semibold  focus:outline-none focus:shadow-outline hover:bg-blue-600 shadow-lg cursor-pointer transition ease-in duration-300"
            >
              Upload
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
