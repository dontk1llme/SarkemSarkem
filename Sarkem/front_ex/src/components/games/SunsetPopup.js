import React, { useState } from 'react';
import styled from 'styled-components';
import closeBtn from '../../img/btn_close.png';

const StyledPopupContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); /* 중앙 정렬 */
  background: #cd5e97;
  border-radius: 30.94px;
  border: 5.16px solid #000000;
  padding: 61.87px;
  height: 180px; /* Set a fixed height for the popup box */
  width: 650px;
  display: flex;
  flex-direction: column;
  gap: 12.89px;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 5.16px 5.16px 0px rgba(0, 0, 0, 0.25), 10.31px 10.31px 0px 0px rgba(0, 0, 0, 1);
  z-index: 9999;
  opacity: ${({ showPopup }) => (showPopup ? 1 : 0)};
  `;

const StyledPopupTitle = styled.div`
  color: #ffffff;
  font-size: 35px;
  font-family: "RixInooAriDuriR", sans-serif;
  text-align: center;
  text-shadow: 1px 1px black;
  -webkit-text-stroke: 1px black; /* For webkit-based browsers like Chrome, Safari */
  text-stroke: 1px black; /* Standard property for future compatibility */
  padding: 10px; /* Optionally, you can add some padding to create space between the text and the border */
`;

const CloseBtn = styled.img`
  width: 15%;
  position: fixed;
  top: 85%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const StyledButton = styled.button`
  border: none;
  background: transparent;
  padding: 0;
  cursor: pointer;
  display: flex;
  align-items: center;
`;



const SunsetPopup = ({dayCount}) => {
  const [showPopup, setShowPopup] = useState(true);

  const handleClosePopup = () => {
    setShowPopup(false);
  };
  return (
    <StyledPopupContainer showPopup={showPopup} >
      <div
        style={{
          flexShrink: '0',
          width: '59.29px',
          height: '0.01px',
          position: 'relative',
          transformOrigin: '0 0',
        }}
      >
        <div
          style={{
            background: '#ffffff',
            borderRadius: '72.18px',
            borderStyle: 'solid',
            borderColor: '#000000',
            borderWidth: '5.16px',
            padding: '10.31px 21.91px 10.31px 21.91px',
            display: 'flex',
            flexDirection: 'row',
            gap: '12.89px',
            alignItems: 'center',
            justifyContent: 'center', // Center the content horizontally
            width: '229.44px',
            height: '45px',
            position: 'relative',
            top: '-100px',
            right: '110px',
          }}
        >
          {dayCount}일차 저녁
        </div>
      </div>

      <StyledPopupTitle>추방하려면 찬성, <br></br> 아니라면 반대를 선택하세요.</StyledPopupTitle>
      <StyledButton onClick={handleClosePopup}><CloseBtn src={closeBtn} alt="Close" /></StyledButton>
    </StyledPopupContainer>
  );
};

export default SunsetPopup;
