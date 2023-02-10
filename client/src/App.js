import { useState, useEffect } from "react";
import Card from "./Components/Card";
import styled from "styled-components";

const Container = styled.div`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CardContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 20px;
`;

const Title = styled.div`
  display: flex;
  justify-content: center;
  font-weight: bold;
  font-size: 40px;
`;

const ResetButton = styled.button`
  width: 70px;
  height: 40px;
  margin-top: 20px;
  font-size: 22px;
  border-radius: 4px;
  background: #4f9fde;
  hover: #4f7fde;
  border: none;
  cursor: pointer;
`;

const CenterContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  li {
    margin: 15px 0 15px 0;
  }
`;

const TableContainer = styled.div`
  display: flex;
  border-bottom: 1px dashed #2e2e2e;
  justify-content: space-between;
  align-items: center;
  height: 80px;
  margin-top: 15px;
  font-size: 18px;
`;

const TableColum = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px;

  .perTitle {
    margin-top: 20px;
    font-size: 20px;
    font-weight: "bold";
  }
  .per {
    font-size: 24px;
    font-weight: "bold";
    color: blue;
    margin-top: 10px;
  }
  .realTime {
    color: red;
  }
`;

const PerContainer = styled.div`
  display: flex;
  justify-content: space-around;
`;

function App() {
  const [cardData, setCardData] = useState([]);
  const [count, setCount] = useState(0);
  const [isLastChance, setIsLastChance] = useState(false);
  const [isOver, setIsOver] = useState(false);
  const [success, setSuccess] = useState(0);
  const [realTimeSuccess, setRealTimeSuccess] = useState(0);

  const makeRandomIndex = () => {
    const cardImages = ["./sheep.svg", "./sheep.svg", "./car.svg"];
    const arr = [];

    while (arr.length < 3) {
      const obj = {};
      const randomNum = Math.floor(Math.random() * cardImages.length);
      obj["src"] = cardImages.splice(randomNum, 1)[0];
      obj["isOpen"] = false;
      obj["isFirstChoice"] = false;
      arr.push(obj);
    }
    setIsLastChance(false);
    setIsOver(false);
    setCardData(arr);
  };

  const clickCard = (src, idx) => {
    const copyCardData = [...cardData];
    if (!isOver && !copyCardData[idx].isOpen) {
      if (isLastChance) {
        for (let i = 0; i < copyCardData.length; i++) {
          copyCardData[i].isOpen = true;
        }
        if (copyCardData[idx].src === "./car.svg") {
          setRealTimeSuccess(realTimeSuccess + 1);
        }
        if (
          !copyCardData[idx].isFirstChoice &&
          copyCardData[idx].src === "./car.svg"
        ) {
          setSuccess(success + 1);
        } else if (
          copyCardData[idx].isFirstChoice &&
          copyCardData[idx].src === "./sheep.svg"
        ) {
          setSuccess(success + 1);
        }
        setIsOver(true);
      } else {
        for (let i = 0; i < copyCardData.length; i++) {
          if (copyCardData[i].src === "./sheep.svg" && idx !== i) {
            copyCardData[idx].isFirstChoice = true;
            copyCardData[i].isOpen = true;
            setIsLastChance(true);
            break;
          }
        }
      }

      setCardData(copyCardData);
    }
  };

  useEffect(() => {
    makeRandomIndex();
  }, []);

  useEffect(() => {
    if (isOver) setCount(count + 1);
  }, [isOver]);

  const contents = [
    "총 세 장의 카드는 양 두장, 자동차 한 장으로 구성되어있다",
    "세 장의 카드중 한장의 카드를 고르면, 다른 두장의 카드 중 양의 위치를 하나 알려준다",
    "다른 카드로 선택을 바꿀 기회가 주어졌을때 자동차를 받기 위해서는 선택을 바꾸는게 이득이다",
  ];

  return (
    <Container>
      <Title>몬테홀</Title>
      <div>자동차 카드를 찾아라!</div>
      <CardContainer>
        {cardData.map((data, idx) => {
          return <Card data={data} clickCard={clickCard} idx={idx} key={idx} />;
        })}
      </CardContainer>
      <ResetButton onClick={() => makeRandomIndex()}>다시</ResetButton>
      <CenterContainer>
        <ul>
          {contents.map((text) => {
            return <li>{text}</li>;
          })}
        </ul>
        <div style={{ fontWeight: "bold" }}>정말일까?</div>
        {count >= 1 ? (
          <>
            <TableContainer>
              <TableColum>
                <div>전체</div>
                <div>{count}</div>
              </TableColum>
              <TableColum>
                <div>선택을 바꾸면 자동차일 경우</div>
                <div>{success}</div>
              </TableColum>
              <TableColum>
                <div>실시간 내 선택</div>
                <div>{realTimeSuccess}</div>
              </TableColum>
            </TableContainer>
            <PerContainer>
              <TableColum>
                <div className="perTitle">선택 바꿨을 때 확률</div>
                <div className="per">
                  {((success / count) * 100).toFixed(2)} %
                </div>
              </TableColum>
              <TableColum>
                <div className="perTitle">실시간 확률</div>
                <div className="per realTime">
                  {((realTimeSuccess / count) * 100).toFixed(2)} %
                </div>
              </TableColum>
            </PerContainer>
          </>
        ) : (
          <></>
        )}
      </CenterContainer>
    </Container>
  );
}

export default App;
