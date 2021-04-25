import React, { useState, useEffect } from "react";
import styled from "styled-components";
import colors from "../../data/themeData";
import { ImQuotesLeft, ImQuotesRight } from "react-icons/im";
import FadeIn from "../fadeIn/fadeIn";
import Typing from "react-typing-animation";

const Quote = () => {
  const [quote, setQuote] = useState(" ");
  const [author, setAuthor] = useState("");
  const [length, setLength] = useState("");
  const [color, setColor] = useState("");
  const [ready, setReady] = useState("");

  const getQuotesData = (e) => {
    fetch("https://api.quotable.io/random")
      .then((res) => res.json())
      .then((result) => {
        setQuote(result.content);
        setAuthor("~" + result.author);
        setLength(recognizeLength(result.length));
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
              <QuoteText alignText={length}>
                <QuotesL />
                <TypingEffect speed={20}>{quote}</TypingEffect>
                <QuotesR />
              </QuoteText>
              <QuoteAuthor>
                <span>{author}</span>
              </QuoteAuthor>
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
  const recognizeLength = (length) => {
    let isLong = "";
    if (length > 48) {
      isLong = true;
    } else {
      isLong = false;
    }
    return isLong;
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
  background: #ffffff7d;
  border-radius: 5px;
  box-shadow: 0px 15px 33px 0px rgb(0 0 0 / 15%);
  overflow: hidden;
  min-width: 250px;
  max-width: 800px;
  @media (max-width: 950px) {
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
  min-height: 300px;
  justify-content: center;
  align-items: center;
  padding: 50px;
  overflow: hidden;
`;

const QuoteText = styled.div`
  position: relative;
  width: 100%;
  font-size: 1.5rem;
  margin-bottom: 5vh;
  min-height: 150px;
  overflow: hidden;
  text-align: ${(props) => (props.alignText ? "left" : "center")};
`;

const QuoteAuthor = styled.div`
  width: 100%;
  text-align: right;
`;
const TypingEffect = styled(Typing)`
  display: contents;
`;

const Hint = styled.label`
  display: block;
  position: relative;
  padding: 10px;
  text-align: right;
  width: 100%;
  font-size: 0.6rem;
  @media (max-width: 950px) {
    position: absolute;
    top: 0;
  }
`;

export default Quote;
