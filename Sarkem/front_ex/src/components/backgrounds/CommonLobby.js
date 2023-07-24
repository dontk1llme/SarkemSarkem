import Background from './BackgroundSunset';
import styled from 'styled-components';
import React, { useState } from 'react';
import boxImage from '../../img/box.png'
import camcatImage from '../../img/camcat.png'
import sc_police from '../../img/sc_경찰.png'
import sc_vet from '../../img/sc_수의사.png'
import sc_sark from '../../img/sc_삵.png'
import sc_citizen from '../../img/sc_시민.png'
import sc_scoop from '../../img/sc_탐정.png'
import sc_psychologist from '../../img/sc_심리학자.png'
import sc_nyangachi from '../../img/sc_냥아치.png'
import timesetting from '../../img/timesetting.png'
import settingbuttonImage from '../../img/settingbutton.png'
import startButtonImage from '../../img/startbutton.png'
import inviteButtonImage from '../../img/invitebutton.png'
import BackButton from '../buttons/backButton';

const StyledStartPage = styled.div`
`;

const StyledContent = styled.div`
  display: flex;
  height: 100vh;
  width: 100%;
`;

const LeftSection = styled.div`
  /* 왼쪽 섹션 스타일 작성 */
  flex: 4.5; /* 40% of the available width */
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url(${camcatImage});
  background-size: 85% 85%;
  background-repeat: no-repeat;
  background-position: center center;
`;

const RightSection = styled.div`
  /* 오른쪽 섹션 스타일 작성 */
  flex: 5.5; /* 60% of the available width */
  background-image: url(${boxImage});
  background-size: 92% 95%;
  background-repeat: no-repeat;
  background-position: center center;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 15px 0px; /* 원하는 크기로 설정 */
`;

const DivWrapper = styled.div`
  /* Wrapper for each RightDiv to split into two parts, except for Div 4 */
  display: flex;
  width : 100%;
  height : 100%;  
`;

const LeftPart = styled.div`
  /* Left part of each RightDiv */
  flex: 5;
  display: flex;
  justify-content: center;
  align-items: center;
  background-size: 15vw;
  background-position: center center;
  background-repeat: no-repeat;
`;

const RightPart = styled.div`
  /* Right part of each RightDiv */
  flex: 5;
  display: flex;
  justify-content: center;
  align-items: center;
  background-size: 15vw;
  background-position: center center;
  background-repeat: no-repeat;
  padding : 50px 0px 50px 150px;
`;

const Logo = styled.img`
  /* 로고 이미지 스타일 작성 */
  max-width: 60vw; /* 가로 크기 60% */
  height: auto; /* 세로 크기 자동으로 조정 */
  max-height: 100%; /* 세로 크기 100% */
`;



const CommonLobby = ()=>{

  const [isHost, setIsHost] = useState(true);

  const handleGamePageClick = () => {
    // Logic to navigate to the GamePage when the user is a host
    // Replace the following line with the actual logic to navigate to the GamePage
    console.log('Navigate to the GamePage');
  };

  // Function to handle the click event when the user wants to invite others
  const handleInviteClick = () => {
    // Logic to handle the invite functionality when the user is a host
    // Replace the following line with the actual logic for inviting others
    console.log('Invite functionality for hosts');
  };

return (
  <Background>
    <BackButton/>
    <StyledStartPage>
      <StyledContent>
        <LeftSection></LeftSection>
        <RightSection>
          <DivWrapper style={{ backgroundRepeat: 'no-repeat', backgroundPosition : 'center',  backgroundSize: '95%', backgroundImage: `url(${settingbuttonImage})` }}>
          </DivWrapper>
          <DivWrapper>
            <LeftPart style={{ backgroundImage: `url(${sc_sark})` }}></LeftPart>
            <RightPart style={{ backgroundImage: `url(${sc_citizen})` }}></RightPart>
          </DivWrapper>
          <DivWrapper>
          <LeftPart style={{ backgroundImage: `url(${sc_vet})` }}></LeftPart>
            <RightPart style={{ backgroundImage: `url(${sc_police})` }}></RightPart>
          </DivWrapper>
          <DivWrapper>
          <LeftPart style={{ backgroundImage: `url(${sc_scoop})` }}></LeftPart>
            <RightPart style={{ backgroundImage: `url(${sc_psychologist})` }}></RightPart>
          </DivWrapper>
          <DivWrapper>
            <LeftPart style={{ backgroundImage: `url(${sc_nyangachi})` }}></LeftPart>
            <RightPart style={{ backgroundImage: `url(${timesetting})` }}></RightPart>
          </DivWrapper>
          <DivWrapper>
              {isHost ? (
                <>
                  <LeftPart
                    onClick={handleGamePageClick}
                    style={{ backgroundSize: '75% 75%', backgroundImage: `url(${startButtonImage})` }}
                  ></LeftPart>
                  <RightPart
                    onClick={handleInviteClick}
                    style={{ backgroundImage: `url(${inviteButtonImage})` }}
                  ></RightPart>
                </>
              ) : (
                <>
                  <RightPart
                    onClick={handleInviteClick}
                    style={{ backgroundImage: `url(${inviteButtonImage})` }}
                  ></RightPart>
                </>
              )}
            </DivWrapper>
        </RightSection>
      </StyledContent>
    </StyledStartPage>
  </Background>
);
};

export default CommonLobby;