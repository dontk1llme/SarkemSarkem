/* eslint-disable */

import React, { useState, useEffect, useRef }  from 'react';
import styled from 'styled-components';
import Background from '../components/backgrounds/BackgroundSunset';
/* Code generated with AutoHTML Plugin for Figma */
import CamButton from '../components/buttons/CamButton';
import MicButton from '../components/buttons/MicButton';
import SunMoon from '../components/games/SunMoon';
import ScMini from '../components/games/ScMini';
import CamCat from '../components/camera/camcat';
import { useNavigate, useLocation } from 'react-router-dom';
import { useRoomContext } from '../Context';
import TempButton from '../components/buttons/TempButton';

const CamCatGridContainer = styled.div`
  flex: 1;
  left : 5%;
  width : 80%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content : center;
  overflow: visible;
  position: relative; /* Add position relative */
`;

const CamCatGrid = styled.div`
  display: grid;
  gap: 3px;
  align-items: center;
  justify-items: center;
  ${({ style }) =>
    style &&
    `
    grid-template-rows: ${style.gridTemplateRows};
    grid-template-columns: ${style.gridTemplateColumns};
    width: ${style.width};
    max-height: ${style.maxHeight};
  `}
`;


const calculateGrid = (camCount) => {
  const positions = [
  ];

  if (camCount <= positions.length) {
    const { gridTemplateRows, gridTemplateColumns } = positions[camCount - 1];
    return {
      gridTemplateRows,
      gridTemplateColumns,
      positions: positions.slice(0, camCount),
      width: '90%',
    };
  } else if (camCount === 1) {
    return {
      gridTemplateRows: '1fr',
      gridTemplateColumns: '1fr',
      positions: [{ row: 1, col: 1 }],
      width: '100%',
    };
  } else if (camCount === 2) {
    return {
      gridTemplateRows: '1fr',
      gridTemplateColumns: '1fr 1fr',
      positions: [
        { row: 1, col: 1 },
        { row: 1, col: 2 },
      ],
      width: '50%',
    };
  } else if (camCount === 3) {
    return {
      gridTemplateRows: '1fr',
      gridTemplateColumns: '1fr 3fr 1fr',
      positions: [
        { row: 1, col: 1 },
        { row: 2, col: 1 },
        { row: 2, col: 2 },
      ],
      width: '90%',
    };
  } else if (camCount === 4) {
    return {
      gridTemplateRows: '1fr 0.1fr',
      gridTemplateColumns: '1fr 3fr 1fr',
      positions:
      [
        { row: 1, col: 1 },
        { row: 1, col: 3 },
        { row: 2, col: 1 },
        { row: 2, col: 3 },
      ],
      width: '100%',
    };
  } else if (camCount === 5) {
    return {
      gridTemplateRows: '1fr 1fr 1fr',
      gridTemplateColumns: '1fr 1fr',
      positions: positions.slice(0, camCount),
      width: '62%',
    };
  } else if (camCount === 6) {
    return {
      gridTemplateRows: '1fr 1fr 1fr',
      gridTemplateColumns: '1fr 1fr',
      positions: positions.slice(0, camCount),
      width: '62%',
    };
  } else if (camCount === 7) {
    return {
      gridTemplateRows: '1fr 1fr 1fr',
      gridTemplateColumns: '1fr 1fr 1fr',
      positions: positions.slice(0, camCount),
      width: '92%',
    };
  } else if (camCount === 8) {
    return {
      gridTemplateRows: '1fr 1fr 1fr',
      gridTemplateColumns: '1fr 1fr 1fr',
      positions: positions.slice(0, camCount),
      width: '92%',
    };
  } else if (camCount === 9) {
    return {
      gridTemplateRows: '1fr 1fr 1fr',
      gridTemplateColumns: '1fr 1fr 1fr',
      positions: positions.slice(0, camCount),
      width: '92%',
    };
  } else if (camCount === 10) {
    return {
      gridTemplateColumns: '1fr 1fr 1fr 1fr',
      positions: positions.slice(0, camCount),
      width: '92%',
    };
  } else {
    // Add more cases as needed
    return {
      gridTemplateRows: '1fr 1fr',
      gridTemplateColumns: '1fr 1fr',
      positions: positions.slice(0, camCount),
    };
  }
};

  const TimeSecond = styled.text`
  /* 스타일 내용 동일 */
`;


const handleScMiniClick = () => {
  console.log('ScMini clicked!');
};

const SunsetPage = () => {
   
  const { roomId, setRoomId, isHost, setIsHost, nickName, setNickName,
    publisher, setPublisher, subscribers, setSubscribers, camArray, setCamArray,
    session, setSession, token, setToken, OV, joinSession, connectSession, leaveSession, isCamOn, setIsCamOn, isMicOn, setIsMicOn} = useRoomContext(); 
  const navigate = useNavigate();
  const location = useLocation();

  const handleCamButtonClick = () => {
    const camOn = !isCamOn;
    setIsCamOn(camOn);
    if (publisher) {
      publisher.publishVideo(camOn);
    }
  };
  
  
  const handleMicButtonClick = () => {
    const micOn = !isMicOn;
    setIsMicOn(micOn);
    if (publisher) {
      publisher.publishAudio(micOn);
    }
  };
  
  
    useEffect(() => {
        console.log(roomId);
        if (roomId === undefined){
          console.log("세션 정보가 없습니다.")
          navigate("/");
          return;
        }
        window.history.pushState(null, "", location.href);
        window.addEventListener("popstate", () => window.history.pushState(null, "", location.href));
        window.addEventListener('beforeunload', (event) => {
          // 표준에 따라 기본 동작 방지
          event.preventDefault();
          // Chrome에서는 returnValue 설정이 필요함
          event.returnValue = '';
        });
      }, [])

  const camCount = camArray.length; // camCount를 SunsetPage 내부에서 계산

  // camCount가 변경될 때마다 gridStyles를 업데이트
  const gridStyles = calculateGrid(camCount);

  return (
    <Background>
      <SunMoon alt="SunMoon"></SunMoon>
      <TimeSecond>60s</TimeSecond>
      <CamButton alt="Camera Button" onClick={handleCamButtonClick} isCamOn={isCamOn} />
      <MicButton alt="Mic Button" onClick={handleMicButtonClick} isMicOn={isMicOn}/>
      <ScMini alt="ScMini Button" onClick={handleScMiniClick}></ScMini>
      <CamCatGridContainer>
      <CamCatGrid style={{ gridTemplateRows: gridStyles.gridTemplateRows, gridTemplateColumns: gridStyles.gridTemplateColumns }}>
          {gridStyles.positions.map(({ row, col }, index) => (
            <CamCat key={index} props={camArray[index]} style={{ gridRow: row, gridColumn: col }} />
          ))}
        </CamCatGrid>
      </CamCatGridContainer>

      <TempButton url="/${roomId}/night" onClick={() => navigate(`/${roomId}/night`)}/>
    </Background>
  );
};


export default SunsetPage;