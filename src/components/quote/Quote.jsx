import React, { useState, useEffect } from "react";
import styled from "styled-components";
import colors from "../../data/themeData";
import { ImQuotesLeft, ImQuotesRight } from "react-icons/im";
import FadeIn from "../fadeIn/fadeIn";

const Quote = () => {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [color, setColor] = useState("");
  const [ready, setReady] = useState("");

  const getQuotesData = (e) => {
    fetch("https://goquotes-api.herokuapp.com/api/v1/random?count=1")
      .then((res) => res.json())
      .then((result) => {
        setQuote(result.quotes[0].text);
        setAuthor("~" + result.quotes[0].author);
        setColor(getRandomColor);
        setReady(true);
      });
  };
  useEffect(getQuotesData, []);

  const OutputData = () => {
    return (
      <>
        <FadeIn>
          <Wrapper>
            <Hint>click anywhere to view the new quote </Hint>
            <QuoteBox>
              <QuoteText>
                <QuotesL /> {quote}
                <QuotesR />
              </QuoteText>
              <QuoteAuthor>{author}</QuoteAuthor>
            </QuoteBox>
          </Wrapper>
        </FadeIn>
      </>
    );
  };

  const getRandomColor = () => {
    const randomNumber = Math.floor(Math.random() * colors.length);
    return colors[randomNumber].color;
  };

  return (
    <>
      <Container onClick={getQuotesData} colorBg={color}>
        {ready ? <OutputData /> : ""}
      </Container>
    </>
  );
};

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  overflow: hidden;
  justify-content: center;
  align-items: center;
  background: ${(props) => (props.colorBg ? props.colorBg : "white")};
`;

const QuotesL = styled(ImQuotesLeft)`
  margin: 5px;
`;
const QuotesR = styled(ImQuotesRight)`
  margin: 5px;
`;

const Wrapper = styled.div`
  width: 50vw;
  margin: 0 auto;
  height: auto;
  background: #ffffffba;
  border-radius: 5px;
  box-shadow: 0px 15px 33px 0px rgb(0 0 0 / 15%);
  overflow: hidden;
  @media (max-width: 800px) {
    background: transparent;
    width: 100vw;
    box-shadow: initial;
  }
`;

const QuoteBox = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  width: 100%;
  height: auto;
  min-height: 500px;
  justify-content: center;
  align-items: center;
  padding: 50px;
  overflow: hidden;
`;

const QuoteText = styled.div`
  position: relative;
  width: 100%;
  text-align: center;
  font-size: 1.5rem;
  margin-bottom: 5vh;
  min-height: 150px;
  overflow: hidden;
`;

const QuoteAuthor = styled.div`
  width: 100%;
  text-align: right;
`;

const Hint = styled.label`
  display: block;
  position: relative;
  padding: 10px;
  text-align: right;
  width: 100%;
  font-size: 0.6rem;
  @media (max-width: 500px) {
    position: absolute;
    top: 0;
  }
`;

export default Quote;
