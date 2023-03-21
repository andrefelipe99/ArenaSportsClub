import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import NewsDataService from "../services/news.js";
import "../styles/pages/News.css";

export function News() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    NewsDataService.getAllNews().then((response) => {
      console.log(response.data);
      setNews(response.data);
      const timer = setTimeout(() => {
        setLoading(false);
      }, 500);
      return () => clearTimeout(timer);
    });
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      NewsDataService.getAllNews().then((response) => {
        setNews(response.data);
      });
    }, 30000);
    return () => clearTimeout(timer);
  });

  //https://react-bootstrap.github.io/components/cards/

  return (
    <Container>
      {news.map((category, i) => (
        <Row key={i} className="row-news">
          <span className="category-news">{category?._id.category}</span>
          {category.news.map((news, i) => (
            <Col key={i} md={6} className="center-news">
              <Col md={6} className="col-news">
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
              </Col>
              <Col md={6} className="col-news">
                <a
                  className="link-news"
                  href={news?.href}
                  target="_blank"
                  rel="noreferrer"
                >
                  <span className="description-news">{news?.title}</span>
                </a>
              </Col>
            </Col>
          ))}
        </Row>
      ))}
    </Container>
  );
}
