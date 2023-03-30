import React, { useState, useEffect } from "react";
import { Container, Spinner } from "react-bootstrap";
import NewsDataService from "../services/news.js";
import "../styles/pages/News.css";

export function News() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const updateWindowDimensions = () => {
      const newWidth = window.innerWidth;
      setWidth(newWidth);
    };

    window.addEventListener("resize", updateWindowDimensions);
    return () => window.removeEventListener("resize", updateWindowDimensions);
  }, []);

  useEffect(() => {
    NewsDataService.getAllNews().then((response) => {
      setNews(response.data);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      NewsDataService.getAllNews().then((response) => {
        setNews(response.data);
      });
    }, 606000);
    return () => clearTimeout(timer);
  });

  return (
    <Container>
      {loading ? (
        <div className="spinner-news">
          <Spinner animation="border" />
        </div>
      ) : (
        news.map((category, i) => (
          <div key={i} className="row-news">
            <span className="category-news">{category?._id.category}</span>
            {category.news.map((news, i) => (
              <div key={i} className="center-news">
                <a
                  className="link-news"
                  href={news?.href}
                  target="_blank"
                  rel="noreferrer"
                >
                  <img
                    src={news?.img}
                    alt={news?.title}
                    title={news?.title}
                    className="img-news"
                  ></img>
                </a>

                <a
                  className="link2-news"
                  href={news?.href}
                  target="_blank"
                  rel="noreferrer"
                >
                  <span className="title-news">{news?.title}</span>
                  {width > 768 && (
                    <span className="subtitle-news">{news?.subtitle}</span>
                  )}
                </a>
              </div>
            ))}
          </div>
        ))
      )}
    </Container>
  );
}
