import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "../styles/pages/News.css";

export function News() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/pp")
      .then((response) => response.json())
      .then((data) => {
        console.log(data.news);
        setNews(data.news);
      });
  }, []);

  //https://react-bootstrap.github.io/components/cards/

  return (
    <Container>
      <Row className="row-news">
        {news.map((news, i) => (
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
                  alt={news?.description}
                  title={news?.description}
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
                <span className="description-news">{news?.description}</span>
              </a>
            </Col>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
