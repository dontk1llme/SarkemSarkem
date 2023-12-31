import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';

import Background from '../components/backgrounds/BackgroundSunset';
import StartButton from '../components/buttons/StartButton';
import Logo from '../components/buttons/Logo';
import { useNavigate } from 'react-router-dom';
import createRandomId from '../utils';
import { useRoomContext } from '../Context';

import logoSound from '../sound/mainstart.mp3';

// 애니메이션 정의 - 등장할 때 페이드 인
const fadeInAnimation = keyframes`
  from {
    transform: scale(0);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
`;

// 애니메이션 정의 - 로고가 페이드 인 후 위아래로 흔들리는 효과
const shakeAnimation = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  10%, 30%, 50%, 70%, 90% {
    transform: translateY(-5px);
  }
  20%, 40%, 60%, 80% {
    transform: translateY(5px);
  }
`;

const StyledStartPage = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
`;

const LogoWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${fadeInAnimation} 2s, ${shakeAnimation} 10s 2 2s; // 애니메이션 적용
  transform-origin: center center;
`;

const StartButtonContainer = styled.div`
  width: 15%;
  height: 10%;
  
  margin-top: 30px;
`;


const StartPage = () => {
  const navigate = useNavigate();
  const {setPlayer} = useRoomContext();
  const [logoVisible, setLogoVisible] = useState(false);
  const audio = new Audio(logoSound);

  // 로고가 화면에 나타날 때까지 대기하는 효과를 주기 위해 useEffect 사용
  useEffect(() => {
    console.log(`
    %cฅ^•ㅅ•^ฅ ฅ^•ㅅ•^ฅ ฅ^•ㅅ•^ฅ ฅ^•ㅅ•^ฅ ฅ^•ㅅ•^ฅ ฅ^•ㅅ•^ฅ
    %c ███████╗ █████╗ ██████╗ ██╗  ██╗███████╗███╗   ███╗
    %c ██╔════╝██╔══██╗██╔══██╗██║ ██╔╝██╔════╝████╗ ████║
    %c ███████╗███████║██████╔╝█████╔╝ █████╗  ██╔████╔██║
    %c ╚════██║██╔══██║██╔══██╗██╔═██╗ ██╔══╝  ██║╚██╔╝██║
    %c ███████║██║  ██║██║  ██║██║  ██╗███████╗██║ ╚═╝ ██║
    %c ╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝╚═╝     ╚═╝
    %cฅ^•ㅅ•^ฅ ฅ^•ㅅ•^ฅ ฅ^•ㅅ•^ฅ ฅ^•ㅅ•^ฅ ฅ^•ㅅ•^ฅ ฅ^•ㅅ•^ฅ
`, "color:#fefcbf", "color:#64379f", "color:#64379f", "color:#9854cb", "color:#ddacf5", "color:#accbf5", "color:#ddacf5",  "color:#fefcbf");
    

    setLogoVisible(true);
    var playPromise = audio.play();
    audio.volume = 0.5;

    if (playPromise !== undefined) {
      playPromise.then(_ => {}).catch(error => {});
    }

    return () => {
      // Clean up the audio when the component unmounts
      audio.pause();
      audio.currentTime = 0;
    };
  }, []);

  const goToCreateRoom = () => {
    setPlayer([{key: 'isHost', value: true}]);
    navigate(`/${createRandomId()}`);
  };

  return (
    <Background>
      <StyledStartPage>
        {logoVisible && ( // 로고가 화면에 나타날 때만 렌더링
          <LogoWrapper>
            <Logo />
          </LogoWrapper>
        )}
        <StartButtonContainer>
          <StartButton alt="Go to Login" onClick={goToCreateRoom} />
        </StartButtonContainer>
      </StyledStartPage>
    </Background>
  );
};

export default StartPage;
