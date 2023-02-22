import React, { useEffect, useState } from "react";
import { ListGroup, Button, Placeholder } from "react-bootstrap";
import "../../styles/components/Home/SideBar.css";

export function Search(list) {
  const [listaCamps, setListaCamps] = useState([{}]);

  console.log(list);

  useEffect(() => {
    fetch("/api")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setListaCamps(data);
      });
  }, []);

  return (
    <ListGroup id="display-search">
      {typeof list?.list === "undefined" ? (
        <ListGroup.Item id="list-group-sidebar">
          <Placeholder type="avatar" animation="glow">
            <Placeholder xs={8} />
          </Placeholder>
        </ListGroup.Item>
      ) : (
        list.list.map((c, i) => (
          <ListGroup.Item
            id="list-group-sidebar"
            className="justify-content-md-center"
            key={i}
          >
            <Button id="button-favorite-sidebar">
              <span>{c.name}</span>
            </Button>
          </ListGroup.Item>
        ))
      )}
    </ListGroup>
  );
}

export default Search;
