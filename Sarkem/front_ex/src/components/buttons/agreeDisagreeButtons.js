import React from 'react';
import styled from 'styled-components';
import agreeButtonImage from '../../img/찬성.png';
import disagreeButtonImage from '../../img/반대.png';
import buttonclickSound from '../../sound/buttonclick.mp3'

const SmallButton = styled.button`
  padding: 0;
  background: url(${props => props.imageSrc}) no-repeat center center;
  background-size: cover;
  width: 20%;
  height: 20%;
  border : none;
  cursor: pointer;
  &:hover {
      filter: brightness(0.8);
  }
`;

const ButtonWithSound = ({ onClick, imageSrc, alt, disabled }) => {
  const handleClick = () => {
    const sound = new Audio(buttonclickSound);
    sound.play();
    onClick(); // Call the provided onClick handler from the parent component
  };

  return (
    <SmallButton onClick={handleClick} disabled={disabled}>
      <img src={imageSrc} alt={alt} style={{ width: '100%', height: '100%' }} />
    </SmallButton>
  );
};

const AgreeButton = ({ onClick, disabled }) => {
  const imageSrc = agreeButtonImage;
  return (
    <ButtonWithSound
      onClick={onClick}
      imageSrc={imageSrc}
      alt="찬성"
      disabled={disabled}
    />
  );
};

const DisagreeButton = ({ onClick, disabled }) => {
  const imageSrc = disagreeButtonImage;
  return (
    <ButtonWithSound
      onClick={onClick}
      imageSrc={imageSrc}
      alt="반대"
      disabled={disabled}
    />
  );
};


export { AgreeButton, DisagreeButton };
