/* eslint-disable */

import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import Background from '../components/backgrounds/BackgroundNight';
/* Code generated with AutoHTML Plugin for Figma */
import CamButton from '../components/buttons/CamButton';
import MicButton from '../components/buttons/MicButton';
import SunMoon from '../components/games/SunMoon';
import ScMini from '../components/games/ScMini';
import NightPopup from '../components/games/NightPopup';
import TempButton from '../components/buttons/TempButton';
import ChatButtonAndPopup from '../components/buttons/ChatButtonAndPopup';
import { useRoomContext } from '../Context';
import { useGameContext } from '../GameContext';
import { useNavigate, useLocation } from 'react-router-dom';
import DayNightCamera from '../components/camera/DayNightCamera';
import LogButton from '../components/buttons/LogButton';
import Log from '../components/games/Log';


const StyledNightPage = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative; /* position을 relative로 설정합니다. */
  width: 100%;
  height: 100vh;
  overflow: hidden;
`;

const TimeSecond = styled.text`
    color: #FFFFFF;
    text-align: left;
    font: 400 42px "ONE Mobile POP", sans-serif;
    position: absolute; /* position을 absolute로 설정합니다. */
    left: 22px; /* 원하는 위치 값을 지정합니다. */
    top: 90px; /* 원하는 위치 값을 지정합니다. */
`;

const handleScMiniClick = () => {
    // 버튼이 클릭되었을 때 실행되어야 할 작업을 여기에 정의
    console.log('ScMini clicked!');
};

const NightPage = () => {
  const { player, setPlayer, roomSession, roomId, gameOption, setRoomId, isHost, setIsHost, 
    subscribers, setSubscribers, camArray, setCamArray,
    OV, initSession, connectSession, leaveSession } = useRoomContext(); 
  const navigate = useNavigate();
  const location = useLocation();
  const { myRole } = useGameContext();
  

  const handleCamButtonClick = () => {
    const camOn = !player.isCamOn;
    setPlayer((prevState) => {
      return {...prevState,
        isCamOn: camOn,
      };
    });
    if (player.stream) {
      player.stream.publishVideo(camOn);
    }
  };
  
    const getMyRole = () => {
    if (myRole === 'SARK' || myRole === 'CITIZEN' || myRole === 'DOCTOR' || myRole === 'POLICE' || myRole === 'OBSERVER' || myRole === 'PSYCHO' || myRole === 'BULLY' || myRole === 'DETECTIVE' ) {
      return (
        <>
          <ScMini alt="ScMini" role={myRole} />
        </>
      );
    } else {
      return <ScMini alt="ScMini" role={'CITIZEN'} />
    }
  };

  const handleMicButtonClick = () => {
    const micOn = !player.isMicOn;
    setPlayer((prevState) => {
      return {...prevState,
        isMicOn: micOn,
      };
    });
    if (player.stream) {
      player.stream.publishAudio(micOn);
    }
  };

  const [isLogOn, setIsLogOn] = useState(true);
  const handleLogButtonClick = () => {
    setIsLogOn((prevIsLogOn) => !prevIsLogOn);
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


    return (   
    <Background>
      <StyledNightPage>
         {!isLogOn && <Log top="60%" left="26%" />}
        <DayNightCamera camArray={camArray}/>
        <SunMoon alt="SunMoon"></SunMoon>
        <TimeSecond>60s</TimeSecond>
        <CamButton alt="Camera Button" onClick={handleCamButtonClick} isCamOn={player.isCamOn} />
        <MicButton alt="Mic Button" onClick={handleMicButtonClick} isMicOn={player.isMicOn}/>
        <LogButton alt="Log Button"onClick={handleLogButtonClick} isLogOn={isLogOn}></LogButton>
          <NightPopup></NightPopup>
        {getMyRole()}
        <TempButton url="/${roomId}/result" onClick={() => navigate(`/${roomId}/result`)} />
        <ChatButtonAndPopup />
      </StyledNightPage>
        
    </Background>
  );
};

export default NightPage;
