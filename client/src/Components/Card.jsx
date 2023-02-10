import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 150px;
  height: 240px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid #000000;
  border-radius: 4px;
  padding: 10px;
  margin: 10px;
  cursor: pointer;
  background: ${(props) =>
    props.isOpen && props.src === "./car.svg"
      ? "blue"
      : props.isOpen
      ? "tomato"
      : ""};
  &:hover {
    background-color: ${(props) => !props.isOpen && "#eeeeee"};
  }
`;

const CardStyle = styled.img`
  width: 100%;
`;

function Card({ data, clickCard, idx }) {
  return (
    <>
      <Container
        onClick={() => clickCard(data.src, idx)}
        isOpen={data.isOpen}
        src={data.src}
      >
        {data.isOpen && <CardStyle src={data.src}></CardStyle>}
      </Container>
    </>
  );
}

export default Card;
