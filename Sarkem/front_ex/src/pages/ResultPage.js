import React from 'react';
import styled from 'styled-components';
import Background1 from '../components/backgrounds/BackgroundSunset';
import Background2 from '../components/backgrounds/BackgroundNight';
import ReButton from '../components/buttons/reButton';
import ResultBox from '../components/games/ResultBox';
import ResultBox2 from '../components/games/ResultBox2';
import logoImage from '../img/logo.png';
import { useNavigate } from 'react-router-dom';
import { useRoomContext } from '../Context';
import { useGameContext } from '../GameContext';
import createRandomId from '../utils';

const StyledSunsetPage = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  align-items: center;
`;

const Logo = styled.img`
  /* 로고 이미지 스타일 작성 */
  max-width: 150px;
  height: auto;
  max-height: 100%;
  position: absolute;
  top: -30%;
  left: 55%;
  transform: translate(-50%, -50%);
  z-index: 1;
`;

const ButtonContainer = styled.div`
  position: absolute;
  bottom: 35px;
  right: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Title = styled.div`
  position: absolute;
  top: 90px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 75px;
  color: #ffffff;
  text-shadow: 1px 1px black;
  -webkit-text-stroke: 3px black;
  text-stroke: 5px black;
`;

const Table = styled.table`
  width: 70%;
  max-height: 62%;
  overflow-x: auto;
  border-collapse: collapse;
  text-align: center;
  z-index: 1;
  margin: 0 auto; /* 가로 중앙 정렬 */
  margin-left: -63%; /* 왼쪽으로 이동 */
  margin-top: -10%; /* 상단으로 이동 */
`;

const TableHeader = styled.th`
  font-size: 35px; /* Adjust the font size as needed */
  background-color: #f2f2f2;
  padding: 10px;
`;

const TableRow = styled.tr`
  background-color: ${(props) => (props.even ? '#f2f2f2' : 'white')};
  
`;

const TableCell = styled.td`
  font-size: 20px; /* Adjust the font size as needed */
  padding: 10px;
`;

const ResultPage = () => {
  const {
    setPublisher,
    setSubscribers,
    setCamArray,
    session,
    setSession,
  } = useRoomContext();
  const { roleAssignedArray, winner } = useGameContext();
  const navigate = useNavigate();
  console.log(roleAssignedArray);

  const handleAgainButtonClick = () => {
    console.log("세션 해제중입니다.....");
    if (session) session.disconnect();

    setSession(undefined);
    setSubscribers([]);
    setPublisher(undefined);
    setCamArray([]);
    console.log("새로운 방 만들기");
    navigate(`/${createRandomId()}`, { state: { isHost: true } });
  };

  const handleExitButtonClick = () => {
    console.log("세션 해제중입니다.....");
    if (session) session.disconnect();

    setSession(undefined);
    setSubscribers([]);
    setPublisher(undefined);
    setCamArray([]);
    console.log("홈으로 나가기");
    navigate('/');
  };

  return (
    <div>
    {winner === 'CITIZEN' ? (
      <Background1>
        <StyledSunsetPage>
        <ResultBox> </ResultBox>
          <ButtonContainer>
            <Logo src={logoImage} alt="로고" />
            <ReButton onClick={handleAgainButtonClick}>다시하기</ReButton>
            <ReButton onClick={handleExitButtonClick}>나가기</ReButton>
          </ButtonContainer>
          <Title> 냥냥이팀 승리!</Title>
          <Table>
            <thead>
              <tr>
                <TableHeader>승리여부</TableHeader>
                <TableHeader>플레이어</TableHeader>
                <TableHeader>직업</TableHeader>
              </tr>
            </thead>
            <tbody>
              {roleAssignedArray.map((playerRole, index) => (
                <TableRow key={index} even={index % 2 === 0}>
                  <TableCell>승리여부</TableCell>
                  <TableCell>{playerRole.nickname}</TableCell>
                  <TableCell>{playerRole.job}</TableCell>
                </TableRow>
              ))}
            </tbody>
          </Table>
        </StyledSunsetPage>
      </Background1>
    ) : (
      <Background2>
        <StyledSunsetPage>
        <ResultBox2> </ResultBox2>
        <ButtonContainer>
          <Logo src={logoImage} alt="로고" />
          <ReButton onClick={handleAgainButtonClick}>다시하기</ReButton>
          <ReButton onClick={handleExitButtonClick}>나가기</ReButton>
        </ButtonContainer>
        <Title> 삵팀 승리!</Title>
        <Table>
          <thead>
            <tr>
              <TableHeader>승리여부</TableHeader>
              <TableHeader>플레이어</TableHeader>
              <TableHeader>직업</TableHeader>
            </tr>
          </thead>
          <tbody>
            {roleAssignedArray.map((playerRole, index) => (
              <TableRow key={index} even={index % 2 === 0}>
                <TableCell>승리여부</TableCell>
                <TableCell>{playerRole.nickname}</TableCell>
                <TableCell>{playerRole.job}</TableCell>
              </TableRow>
            ))}
          </tbody>
        </Table>
        </StyledSunsetPage>
      </Background2>
    )}
  </div>


  );
};

export default ResultPage;
