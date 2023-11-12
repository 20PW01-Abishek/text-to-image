import React, { useState, useEffect } from "react";
import { Loader, Card, FormField } from "../components";

const RenderCards = ({ data, title }) => {
  if (data?.length > 0) {
    return data.map((post) => <Card key={post._id} {...post} />);
  }
  return <h2 className="mt-5 font-bold text-[green] uppercase">{title}</h2>;
};

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [allPosts, setAllPosts] = useState(null);
  const [text, setText] = useState("");
  const [searchedResults, setSearchedResults] = useState(null);
  const [searchTimeout, setSearchTimeout] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:8080/api/v1/post", {
          method: "GET",
        });
        if (response.ok) {
          const result = await response.json();
          setAllPosts(result.data.reverse());
        }
      } catch (error) {
        alert(error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setText(e.target.value);
    setSearchTimeout(
      setTimeout(() => {
        const searchResults = allPosts.filter(
          (item) =>
            item.name.toLowerCase().includes(text.toLowerCase()) ||
            item.prompt.toLowerCase().includes(text.toLowerCase())
        );
        setSearchedResults(searchResults);
      }, 500)
    );
  };

  return (
    <section className="max-w-7xl mx-auto">
      <div>
        <h1 className="font-extrabold text-[32px]">Text-to-Image</h1>
        <p className="mt-2 text-[gray] text-[16px] max-w-[500px]">
          Here are some sample images generated
        </p>
      </div>

      <div className="mt-16">
        <FormField
          label="Search posts"
          type="text"
          name="text"
          placeholder="Search posts"
          value={text}
          handleChange={handleSearchChange}
        />
      </div>

      <div className="mt-10">
        {loading ? (
          <div className="flex justify-center items-center">
            <Loader />
          </div>
        ) : (
          <div>
            {text ? (
              <h2 className="text-[gray] text-xl mb-3">
                Showing results for{" "}
                <span className="text-[black] font-bold">{text}</span>
              </h2>
            ) : (
              <h2 className="text-[gray] text-xl mb-3">Showing all results</h2>
            )}
            <div className="grid lg:grid-cols-4 gap-2 sm:grid-cols-3 xm:grid-cols-2">
              {text ? (
                <RenderCards
                  data={searchedResults}
                  title="No search results found"
                />
              ) : (
                <RenderCards data={allPosts} title="No posts found" />
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Home;
