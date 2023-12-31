import React from 'react';
import styled from 'styled-components';
import psychologistBox from '../../img/psychologistbox.png'
import { useRoomContext } from '../../Context';

const Psychologistboxdiv = styled.div`
  background-image: url(${psychologistBox});
  background-size: cover;
  background-color: transparent;
  background-repeat: no-repeat;
  width: 178px;
  height: 207px;
  display: flex;
  flex-direction: column;
  font-family: 'NeoDunggeunmoPro-Regular', sans-serif;
  font-size: 19px;
  position: absolute;
  top: 13%;
  right: 2%;
  z-index: 5;

  > div:first-child { /* Apply style to the first div element */
    padding-top: 6.5px;
    color: #723a00;
    text-align: center; /* Center align the content */
  }

  > div:not(:first-child) { /* Apply style to all other div elements */
    padding-left: 45px;
    padding-top: 5.5px;
    color: #723a00;
    text-align: left;
  }
`;


const PsychologistBox = ({detectExpressions, nickname}) => {
    let happy = 0;
    let sad = 0;
    let disgusted = 0;
    let neutral = 0;
    let angry = 0;
    let surprised = 0;
    let fearful = 0;
    if((detectExpressions!==undefined)&&(detectExpressions!==null)){
      happy = Math.round(detectExpressions.expressions.happy * 100) / 10;
      sad = Math.round(detectExpressions.expressions.sad * 100) / 10;
      disgusted = Math.round(detectExpressions.expressions.disgusted * 100) / 10;
      neutral = Math.round(detectExpressions.expressions.neutral * 100) / 10;
      angry = Math.round(detectExpressions.expressions.angry * 100) / 10;
      surprised = Math.round(detectExpressions.expressions.surprised * 100) / 10;
      fearful = Math.round(detectExpressions.expressions.fearful * 100) / 10;
    }
    const { player } = useRoomContext();
    const role = player.current.role;

    if (role === 'PSYCHO') { //&&  target===true
    return (
      <Psychologistboxdiv>
        {/* {Psychologist} */}
        <div> {nickname}의 심리</div>
        <div>행복 : {happy}</div>
        <div>슬픔 : {sad}</div>
        <div>보통 : {neutral}</div>
        <div>화남 : {angry}</div>
        <div>놀람 : {surprised}</div>
        <div>공포 : {fearful}</div>
        <div>역겹 : {disgusted}</div>
      </Psychologistboxdiv>
    );
  }
  
  };
  
  export default PsychologistBox;
  