import Head from "next/head";
import styled from "styled-components";
import { useWeb3 } from "@3rdweb/hooks";
import Dashboard from "./Dashboard";

export default function Home() {
  const { address, connectWallet } = useWeb3("");
  return (
    <Wrapper>
      <Head>
        <title>Mediverse</title>
        <meta name="description" content="Mediverse - Best website hospital transactions!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {address ? (
        <Dashboard address={address} />
      ) : (
        <WalletConnect>
          <Button onClick={() => connectWallet("injected")}>
            Connect Your Wallet
          </Button>
          <Detail>
            Run the app <br /> on chrome browser
          </Detail>
        </WalletConnect>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: grid;
  place-items: center;
  height: 100vh;
  max-width: 100vw;
  width: 100vw;
  background-color: #0a0b0d;
  color: white;
`;

const WalletConnect = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Button = styled.button`
  border: 1px solid #282b2f;
  padding: 0.8rem;
  font-size: 1.3rem;
  font-weight: 500;
  border-radius: 0.4rem;
  background-color: #3773f5;
  color: #000;
  &:hover {
    cursor: pointer;
  }
`;

const Detail = styled.div`
  font-size: 1.2rem;
  text-align: center;
  margin-top: 1rem;
  font-weight: 500;
  color: #282b2f;
`;