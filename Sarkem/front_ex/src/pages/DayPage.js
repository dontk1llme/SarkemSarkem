import React, { useState, useEffect } from 'react';
import '../index.css';
import styled from 'styled-components';
import Background from '../components/backgrounds/BackgroundDay';

import CamButton from '../components/buttons/CamButton';
import MicButton from '../components/buttons/MicButton';
import NoMicButton from '../components/buttons/NoMicButton';
import SunMoon from '../components/games/SunMoon';
import ScMini from '../components/games/ScMini';
import DayPopup from '../components/games/DayPopup';
import SarkMission from '../components/job/SarkMission';
import PsychologistBox from '../components/job/PsychologistBox';

import { useNavigate, useLocation } from 'react-router-dom';
import { useRoomContext } from '../Context';
import { useGameContext } from '../GameContext';
import DayNightCamera from '../components/camera/DayNightCamera';
import { loadModels, faceMyDetect, stopFace } from '../components/job/Psychologist';
// log
import LogButton from '../components/buttons/LogButton';
import Log from '../components/games/Log';
import Sound from '../sound/daystart.mp3';


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
  font: 400 42px "RixInooAriDuriR", sans-serif;
  position: absolute;
  left: 22px;
  top: 90px;
`;

const DayPage = () => {

  const { roomSession, player, setPlayer, players } = useRoomContext();
  const { threatedTarget, currentSysMessage, dayCount, 
    chatVisible,   remainTime, 
    getAlivePlayers, psychologist, psyTarget, dayCurrentSysMessagesArray,
    faceDetectionIntervalId, setFaceDetectionIntervalId, onbeforeunload, setPsychologist} = useGameContext();
  const navigate = useNavigate();
  const [isLogOn, setIsLogOn] = useState(true);
  const [currentHandNumber, setCurrentHandNumber] = useState(1); //삵 미션!
  const [running, setRunning] = useState(false);
  const audio = new Audio(Sound);
  const [detectExpressions, setDetectExpressions] = useState(null);//감정 결과
  const location = useLocation();

  useEffect(() => {
    loadModels();
    // 윈도우 객체에 화면 종료 이벤트 추가
    window.addEventListener('beforeunload', onbeforeunload);
    window.history.pushState(null, "", location.href);
    window.addEventListener("popstate", onbeforeunload);
    return () => {
      window.removeEventListener('beforeunload', onbeforeunload);
      window.removeEventListener('popstate', onbeforeunload);
    }
  }, []);

  const handleLogButtonClick = () => {
    setIsLogOn((prevIsLogOn) => !prevIsLogOn);
  };
  useEffect(()=>{
    if (psychologist) startFaceDetection();
    else stopFaceDetection();
  },[psychologist])
  
  useEffect(() => {
    if (roomSession === undefined || roomSession.current.roomId === undefined){
      console.log("세션 정보가 없습니다.")
      navigate("/");
      return;
    }
    
    if(player.current.isCamOn){
      daystatus();
    }
    threated();
    
    // 윈도우 객체에 화면 종료 이벤트 추가
    window.addEventListener('beforeunload', onbeforeunload);
    return () => {
        window.removeEventListener('beforeunload', onbeforeunload);
    }
  }, [currentSysMessage]);

  useEffect(() => {
    window.addEventListener("mousemove", playBGM);
  }, []);

  const playBGM = () => {
  
    // Play the audio when the component mounts
    audio.play();
    audio.playbackRate = 0.9;
    audio.volume = 0.7;
  
    // Update state to track audio playback
    window.removeEventListener("mousemove", playBGM);
    return () => {
      console.log('멈춰');
      audio.pause();
      audio.currentTime = 0;
    };
  }


    //faceapi 실행
  //심리학자 여기가 아니라 camarray 있는 곳에서 받아서 해야함
  const startFaceDetection = () => {
    let targetPlayer = players.current.get(psyTarget);
    if (targetPlayer === undefined|| !targetPlayer.isAlive) {
      setPsychologist(false);
      return;}
      const id = faceMyDetect(targetPlayer, running, setRunning, setDetectExpressions);
      setFaceDetectionIntervalId(id);
    }
  //끄는거 
  const stopFaceDetection = () => {
    if (faceDetectionIntervalId) {
        clearInterval(faceDetectionIntervalId);
        setFaceDetectionIntervalId(null);
        setRunning(false);
      }
    stopFace(faceDetectionIntervalId, setFaceDetectionIntervalId, setRunning);
  };

  const threated = () =>{
    if(threatedTarget){
      player.current.stream.publishAudio(false);
    }
  }

  const handleCamButtonClick = () => {
    const camOn = !player.current.isCamOn;
    if (player.current.stream) {
      player.current.stream.publishVideo(camOn);
    }
    setPlayer([{key: 'isCamOn', value: camOn}]);
  };

  const handleMicButtonClick = () => {
    const micOn = !player.current.isMicOn;
    if (player.current.stream) {
      player.current.stream.publishAudio(micOn);
      // 버튼 클릭 이벤트를 threatedTarget이 못하게
      if (player.current.stream !== threatedTarget) {
        player.current.stream.publishAudio(micOn);
      }
      setPlayer([{key: 'isMicOn', value: micOn}]);
    };
  }

  const daystatus = () =>{
    if(player.current.role !== 'OBSERVER') {
      player.current.stream.publishVideo(true);
      player.current.stream.publishAudio(true);
    }
  };

  return (
    <Background>
      <StyledDayPage>
        {!isLogOn && <Log />}
        <SunMoon alt="SunMoon" />
        <TimeSecond>{remainTime}s</TimeSecond>
        <CamButton alt="Camera Button" onClick={handleCamButtonClick} isCamOn={player.current.isCamOn} />
        {threatedTarget ? (
          <NoMicButton alt="Mic Button" />
          ) : (
          <MicButton alt="Mic Button" onClick={handleMicButtonClick} isMicOn={player.current.isMicOn}/>
        )}
        <LogButton alt="Log Button" onClick={handleLogButtonClick} isLogOn={isLogOn} />
        {dayCurrentSysMessagesArray.length>0 && <DayPopup sysMessage={dayCurrentSysMessagesArray}  dayCount={dayCount}/>} {/* sysMessage를 DayPopup 컴포넌트에 prop으로 전달 */}
        {players.current && <DayNightCamera players={getAlivePlayers()} />}
        <ScMini />
        <SarkMission handNumber={currentHandNumber} />
        {psychologist&&<PsychologistBox detectExpressions={detectExpressions} nickname={players.current.get(psyTarget).nickName}></PsychologistBox>}
        </StyledDayPage>
        {/* <TempButton url={`/${roomSession.current.roomId}/sunset`} onClick={() => navigate(`/${roomSession.current.roomId}/sunset`)} alt="Start Game" /> */}
        {chatVisible()}
      </Background>
      );
  };

export default DayPage;
