import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Background from '../components/backgrounds/BackgroundDay';

import CamButton from '../components/buttons/CamButton';
import MicButton from '../components/buttons/MicButton';
import SunMoon from '../components/games/SunMoon';
import ScMini from '../components/games/ScMini';
import DayPopup from '../components/games/DayPopup';

import CamCat from '../components/camera/camcat';
import { useNavigate, useLocation } from 'react-router-dom';
import { OpenVidu, Session, Subscriber } from 'openvidu-browser';
import axios from 'axios';
import { useRoomContext } from '../Context';
import { useGameContext } from '../GameContext';
import ChatButtonAndPopup from '../components/buttons/ChatButtonAndPopup';
import TempButton from '../components/buttons/TempButton';
import DayNightCamera from '../components/camera/DayNightCamera';

// log
import LogButton from '../components/buttons/LogButton';
import Log from '../components/games/Log';


const StyledDayPage = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
`;

const TimeSecond = styled.text`
  color: #000000;
  text-align: left;
  font: 400 42px "ONE Mobile POP", sans-serif;
  position: absolute;
  left: 22px;
  top: 90px;
`;

const DayPage = () => {
  const { roomId, publisher, camArray, leaveSession, isCamOn, setIsCamOn, isMicOn, setIsMicOn } = useRoomContext();
  const { myRole, peopleCount, systemMessages, threatedTarget  } = useGameContext();
  const [meetingTime, setMeetingTime] = useState(peopleCount.meetingTime);

  useEffect(() => {
    const timer = setInterval(() => {
      if (meetingTime > 0) {
        setMeetingTime((prevTime) => prevTime - 1);
      } else {
        clearInterval(timer);
      }
    }, 1000); // 1초마다 실행

    return () => {
      clearInterval(timer);
    };
  }, [meetingTime, roomId]);

  const navigate = useNavigate();
  const location = useLocation();
  const [voteCount, setVoteCount] = useState(0);

  // const handleVoteClick = () => {
  //   if (hasVoted) return;

  //   setVoteCount((prevCount) => prevCount + 1);
  //   setHasVoted(true);
  // };

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
    // 버튼 클릭 이벤트를 threatedTarget이 못하게
    console.log('냥아치 협박 대상인가?');
    if (publisher !== threatedTarget) {
      publisher.publishAudio(micOn);
      console.log('냥아치 협박 대상 아님! 마이크 버튼 클릭!');
    }
  };
  
  const handleScMiniClick = () => {
    console.log('ScMini clicked!');
  };

  const getMyRole = () => {
    if (myRole === 'SARK' || myRole === 'CITIZEN' || myRole === 'DOCTOR' || myRole === 'POLICE' || myRole === 'OBSERVER' || myRole === 'PSYCHO' || myRole === 'BULLY' || myRole === 'DETECTIVE') {
      return (
        <>
          <ScMini alt="ScMini" role={myRole} />
        </>
      );
    }
  };

  const chatVisible = () => {
    if (myRole === 'OBSERVER' || myRole === 'SARK') {
      return (
        <>
          <ChatButtonAndPopup />
        </>
      );
    }
  };

  useEffect(() => {
    console.log(roomId);
    if (roomId === '') {
      console.log("세션 정보가 없습니다.");
      navigate("/");
      return;
    }
    window.addEventListener("popstate", () => leaveSession);
    window.addEventListener('beforeunload', onbeforeunload);
  }, []);

  const [isLogOn, setIsLogOn] = useState(true);
  const handleLogButtonClick = () => {
    setIsLogOn((prevIsLogOn) => !prevIsLogOn);
  };

  const sysMessage = systemMessages.find((message) => message.code === 'NOTICE_MESSAGE'); // sysMessage 변수 추가

  return (
    <Background>
      <StyledDayPage>
        {!isLogOn && <Log top="60%" left="26%" />}
        <SunMoon alt="SunMoon" />
        <TimeSecond>{meetingTime}s</TimeSecond>
        <CamButton alt="Camera Button" onClick={handleCamButtonClick} isCamOn={isCamOn} />
        <MicButton alt="Mic Button" onClick={handleMicButtonClick} isMicOn={isMicOn} />
        <LogButton alt="Log Button" onClick={handleLogButtonClick} isLogOn={isLogOn} />
        {sysMessage && <DayPopup sysMessage={sysMessage} />} {/* sysMessage를 DayPopup 컴포넌트에 prop으로 전달 */}
        <DayNightCamera camArray={camArray} />
        {getMyRole()}
      </StyledDayPage>
      <TempButton url={`/${roomId}/sunset`} onClick={() => navigate(`/${roomId}/sunset`)} alt="Start Game" />
      {chatVisible()}
    </Background>
  );
};

export default DayPage;
