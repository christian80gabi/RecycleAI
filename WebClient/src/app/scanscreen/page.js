"use client";
import React from "react";
import Image from "next/image";
import Bgrecycle from "./../../../public/assets/bgrecycle.jpg";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function page() {
    const [image, setImage] = React.useState(null);
    const router = useRouter();

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    // check if file is an image jpg, jpeg, png, or webp
    if (!file.type.startsWith("image/") || !file.name.endsWith(".jpg") && !file.name.endsWith(".jpeg") && !file.name.endsWith(".png") && !file.name.endsWith(".webp")) {
      toast.error("Please select an image file (jpg, jpeg, png, or webp)", {
        position: "bottom-right",
      });
    }else {
      setImage(file);
      toast.success("Image selected successfully", {
        position: "bottom-right",
      }); 
    }
  };
  
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("image", image);

    console.log(formData);
    fetch("http://127.0.0.1:8000/api/1.0/analyze-picture", {
      method: "POST",
      body: formData,
    }).then((response) => {
      response.json().then((data) => {
        console.log(data);
        console.log(data.message);
        console.log(data.data);
        console.log(data.url);
        // Redirect to another page
        router.push("/scanresult");
    })
    })
  }
  return (
    <>
      <div
      className="relative min-h-screen flex justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-500 bg-no-repeat bg-cover items-center"
      style={{ backgroundImage: `url(${Bgrecycle.src})` }}
    >
      <div className="absolute bg-black opacity-60 inset-0 z-0"></div>
      <div className="sm:max-w-lg w-full p-10 bg-white rounded-xl z-10">
        <div className="text-center">
          <h2 className="mt-5 text-3xl font-bold text-[#151D07]">Scan your waste with AI</h2>
          <p className="mt-2 text-sm text-gray-400">
            Insert the image you want to scan with AI
          </p>
        </div>
        <form className="mt-8 space-y-3" action="#" method="POST">
          <div className="grid grid-cols-1 space-y-2">
            <label className="text-sm font-bold text-gray-500 tracking-wide">
              Attach image
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
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>
                  <div id="input-file" className="flex flex-auto max-h-48 w-2/5 mx-auto -mt-10">
                    <Image
                      className=" h-36 object-cover"
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
                    from your device
                  </p>
                </div>
                <input type="file" className="hidden" onChange={handleImageChange}/>
              </label>
            </div>
          </div>
          <p className="text-sm text-gray-300">
            <span>File type: JPG, PNG, WEBP, JPEG</span>
          </p>
          <div>
            <button
              type="submit"
              className="my-5 w-full flex justify-center bg-[#A2D544] text-[#151D07] p-4  rounded-full tracking-wide
                                    font-semibold  focus:outline-none focus:shadow-outline hover:bg-green-600 shadow-lg cursor-pointer transition ease-in duration-300"
            >
              Scan now
            </button>
          </div>
        </form>
      </div>
    </div>
    <ToastContainer />
    </>
  );
}
