import React from 'react';
import styled from 'styled-components';
import makeroomButtonSrc from '../../img/makebutton.png';
import { useNavigate } from 'react-router-dom';
import buttonclickSound from '../../sound/buttonclick.mp3'

const MakeroomButtonImage = styled.img`
  width: 20%;
  height: 20%; 
  cursor: pointer;
  &:hover {
    filter: brightness(0.8);
  }
`;

const MakeroomButton = ({ src, alt }) => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    const sound = new Audio(buttonclickSound);
    sound.play();
    // /lobby로 이동
    navigate('/lobby');
  };

  return <MakeroomButtonImage src={makeroomButtonSrc} alt={alt} onClick={handleButtonClick} />;
};

export default MakeroomButton;