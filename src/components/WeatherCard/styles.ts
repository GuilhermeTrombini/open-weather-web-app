import styled from "styled-components";

export const Container = styled.div`
  display: block;
  margin: 0 auto;
  height: 65vh;
  width: 100%;
  margin: 0;
  padding: 0;
`;

export const WeatherContainer = styled.div`
  width: 290px;
  display: block;
  margin: 0 auto;
  padding-top: 20vh;
  alignself: center;

  @media (min-width: 768px) {
    width: 450px;
  }
`;

export const ContentContainer = styled.div`
  display: flex;
  justify-content: space-around;
  alignself: center;
`;

export const Icon = styled.div`
  height: 150px;
  width: 150px;
`;

export const Temperature = styled.h2`
  font-size: 50px;
  margin-bottom: 5px;
`;

export const Location = styled.h3`
  width: 150px;
  font-size: 20px;
  font-family: Roboto-light;
`;

export const Description = styled.h4`
  font-size: 15px;
  font-family: Roboto-light;
`;

export const RefreshButton = styled.button`
  margin-top: 15px;
  cursor: pointer;
  font-family: Roboto-bold;
  position: relative;
  border: none;
  font-size: 18px;
  transition: color 0.5s, transform 0.2s, background-color 0.2s;
  background-color: transparent;
  outline: none;
  border-radius: 10px;
  margin: 0 10px;
  padding: 23px 33px;
  border: 3px solid white;
  color: white;

  :hover {
    background-color: white;
    color: #1c86be;
  }
`;
