import React, { useState, useEffect } from "react";
import styled from "styled-components";
import imageUrlBuilder from "@sanity/image-url";
import { client } from "../../lib/sanity";
import { FaCheck } from "react-icons/fa";

const CoinItem = ({
  token, // this token is from sanityTokens
  sender,
  setAction,
  selectedToken, // this is from sanityTokens as well
  setSelectedToken,
  sanityTokens,
  thirdWebTokens,
}) => {
  const [balance, setBalance] = useState("Fetching...");
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    const getBalance = async () => {
      let activeThirdWebToken;

      thirdWebTokens.map((thirdWebToken) => {
        if (thirdWebToken.address === token.contractAddress) {
          activeThirdWebToken = thirdWebToken;
        }
      });
      //Promise
      const balance = await activeThirdWebToken.balanceOf(sender);

      return setBalance(balance.displayValue.split(".")[0]);
    };

    const getImageUrl = async () => {
      const imgUrl = imageUrlBuilder(client).image(token.logo).url();
      setImageUrl(imgUrl);
    };

    if (thirdWebTokens || sanityTokens) {
      getImageUrl();
      getBalance();
    }
  }, [thirdWebTokens, sanityTokens]);

  return (
    <Wrapper
      onClick={() => {
        setSelectedToken(token);
        setAction("send");
      }}
      style={{
        backgroundColor: selectedToken.name === token.name && `#141519`,
      }}
    >
      <Main>
        <Icon>
          <img src={imageUrl} alt="" />
        </Icon>
        <NameDetails>
          <Name>{token.name}</Name>
          <Symbol>{token.symbol}</Symbol>
        </NameDetails>
        <Balance>
          {balance} {token.symbol}
        </Balance>
        <IsSelected>
          {selectedToken.contractAddress === token.contractAddress && (
            <FaCheck />
          )}
        </IsSelected>
      </Main>
    </Wrapper>
  );
};

export default CoinItem;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem 0.5rem;
  border-radius: 0.5rem;
  margin-bottom: 0.5rem;
  &:hover {
    background-color: #0e0f14;
    cursor: pointer;
  }
`;

const Main = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Icon = styled.div`
  margin-right: 1rem;
  height: 1.8rem;
  width: 1.8rem;
  border-radius: 50%;
  overflow: hidden;
  display: grid;
  place-items: center;
  & > img {
    /* margin: -0.5rem 1rem */
    height: 120%;
    width: 120%;
    object-fit: cover;
  }
`;

const NameDetails = styled.div``;

const Name = styled.div`
  font-size: 1.1rem;
  margin-bottom: 0.2rem;
`;

const Symbol = styled.div`
  color: #888f9b;
  font-size: 0.8rem;
`;

const Balance = styled.div`
  flex: 1;
  text-align: right;
`;

const IsSelected = styled.div`
  margin-left: 0.5rem;
  color: #3773f5;
`;