import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../assets/css/Developer/Dashboard.css"; // Optional custom styles
import Header from "../../components/Header";

const DeveloperDashboard = () => {
  const [techNews, setTechNews] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get("https://talentbridge-backend.onrender.com/api/developer/dashboard");
        setTechNews(response.data.techNews);
      } catch (err) {
        setError("Failed to load tech news. Please try again later.");
      }
    };

    fetchNews();
  }, []);

  return (
    <div className="dashboard-container bg-light min-vh-100">
      <Header />

      <main className="container py-3">
        <h2 className="text-primary mb-4 text-center">Latest Tech News</h2>

        {error ? (
          <div className="alert alert-danger text-center">{error}</div>
        ) : techNews.length > 0 ? (
          <div className="row g-4">
            {techNews.map((newsItem, index) => (
              <div className="col-md-6 col-lg-4" key={index}>
                <div className="card h-100 shadow-sm">
                  {newsItem.urlToImage && (
                    <img
                      src={newsItem.urlToImage}
                      className="card-img-top"
                      alt={newsItem.title}
                      style={{ height: "200px", objectFit: "cover" }}
                    />
                  )}
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">
                      <a
                        href={newsItem.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-decoration-none text-dark"
                      >
                        {newsItem.title}
                      </a>
                    </h5>
                    <p className="card-text text-muted flex-grow-1">
                      {newsItem.description || "No description available."}
                    </p>
                    <div className="mt-3 small text-muted">
                      <span>{newsItem.source}</span> |{" "}
                      <span>{new Date(newsItem.publishedAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-secondary">Loading news... Hang in there 🚀</div>
        )}
      </main>
    </div>
  );
};

export default DeveloperDashboard;
