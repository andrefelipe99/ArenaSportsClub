import React from "react";
import Container from "react-bootstrap/Container";

function ButtonInfos({ actived, team }) {
  return actived && <p>Informações</p>;
}

export default ButtonInfos;
