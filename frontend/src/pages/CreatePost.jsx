import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getRandomPrompt } from "../utils";
import { preview } from "../assets";
import { FormField, Loader } from "../components";

const CreatePost = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", prompt: "", photo: "" });
  const [generatingImage, setGeneratingImage] = useState(false);
  const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (form.prompt && form.photo) {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:8080/api/v1/post", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        });
        await response.json();
        navigate("/");
      } catch (error) {
        alert(error);
      } finally {
        setLoading(false);
      }
    } else {
      alert("Enter a prompt and generate the image");
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSurpriseMe = (e) => {
    const randomPrompt = getRandomPrompt(form.prompt);
    setForm({ ...form, prompt: randomPrompt });
  };

  const generateImage = async () => {
    if (form.prompt) {
      setGeneratingImage(true);
      try {
        const response = await fetch("http://localhost:8080/api/v1/image", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ prompt: form.prompt }),
        });
        const data = await response.json();
        if (data.photo !== form.photo) {
          setForm({ ...form, photo: data.photo });
        } else {
          setForm({ ...form, photo: data.photo + "%20" });
        }
      } catch (error) {
        alert(error);
      } finally {
        setGeneratingImage(false);
      }
    } else {
      alert("Your prompt has nothing to show!");
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div>
        <h1 className="font-extrabold text-[32px]">Create</h1>
        <p className="mt-2 text-[gray] text-[16px] max-w-[500px]">
          Create your images with AI
        </p>
      </div>
      <form onSubmit={submitHandler}>
        <div className="flex flex-col gap-5">
          <FormField
            label="Your name"
            type="text"
            name="name"
            placeholder="John Doe"
            value={form.name}
            handleChange={handleChange}
          />
          <FormField
            label="Your prompt"
            type="text"
            name="prompt"
            placeholder={getRandomPrompt(form.prompt)}
            value={form.prompt}
            handleChange={handleChange}
            isSurpriseMe
            handleSurpriseMe={handleSurpriseMe}
          />
          <div
            className="relative bg-gray-50 border border-gray-300 text-sm rounded-lg
          focus:ring-green-500 focus:border-green-500 w-64 p-3 h-64
          flex justify-center items-center"
          >
            {form.photo ? (
              <img
                src={form.photo}
                alt={form.prompt}
                className="w-full h-full object-contain"
              />
            ) : (
              <img
                src={preview}
                alt="preview"
                className="w-2/5 h-2/5 object-contain opacity-40"
              />
            )}
            {generatingImage && (
              <div className="absolute inset-0 z-0 flex justify-center items-center rounded-lg bg-[rgba(0,0,0,0.5)]">
                <Loader />
              </div>
            )}
          </div>
          <div className="mt-5 flex gap-5">
            <button
              type="button"
              onClick={generateImage}
              className="text-white bg-green-900 font-medium rounded-md text-sm w-full p-3 text-center"
            >
              {generatingImage ? "Generating image..." : "Generate image"}
            </button>
          </div>
          <p className="text-gray font-medium">
            Share the image with your friends!
          </p>
          <button
            type="submit"
            className="text-white bg-blue-900 font-medium rounded-md text-sm w-full p-3 text-center"
          >
            {loading ? "Sharing..." : "Share"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
