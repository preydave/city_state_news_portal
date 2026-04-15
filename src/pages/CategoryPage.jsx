import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import NewsCard from "../components/NewsCard";
import axios from "axios";

const CategoryPage = () => {
  const { categoryName } = useParams();

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);

  // ✅ YOUR API KEY
  const API_KEY = "78733bf551304a95938fe13521a53466";

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);

        const res = await axios.get(
          `https://newsapi.org/v2/everything?q=${categoryName}&apiKey=${API_KEY}`
        );

        setArticles(res.data.articles);
      } catch (error) {
        console.log("Error fetching category news", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [categoryName]);

  return (
    <>
      <Header />
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-8">

        <h1 className="text-3xl font-bold mb-6 capitalize">
          {categoryName} News
        </h1>

        {loading && <p>Loading...</p>}

        {!loading && articles.length === 0 && (
          <p>No news found</p>
        )}

        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article, index) => (
            <NewsCard key={index} article={article} />
          ))}
        </div>

      </div>
    </>
  );
};

export default CategoryPage;