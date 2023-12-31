import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { OpenVidu } from 'openvidu-browser';
import { useLocation } from 'react-use';

const RoomContext = createContext();

const RoomProvider = ({ children }) => {
  const roomSession = useRef({});
  const player = useRef({});
  const players = useRef(new Map());

  const OV = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const [, updateState] = useState();
  const forceUpdate = useCallback(() => updateState({}), []);


  ////////////   RoomContext Effect   ////////////

  useEffect(() => {
    console.log('RoomProvider 생성');
    OV.current = new OpenVidu();
    // openvidu log 제거
    OV.current.enableProdMode();
  }, []);

  ////////////   RoomContext 함수   ////////////
  
  const setPlayer = (props) => {
    if (!player.current) return;

    for (let prop of props) {
      player.current[prop.key] = prop.value;
    }
    
    if (player.current.playerId === undefined) return;
    setPlayers(player.current);
  }

  const setPlayers = (player) => {
    if (!players.current) return;
    players.current.set(player.playerId, player);
  }

  const getGameRoom = async (roomId) => {
    // 게임방 정보 획득
    console.log(`getGameRoom`, roomId);
    let response;
    try{
      response = await axios.get('/api/game/' + roomId, {
        headers: { 'Content-Type': 'application/json;charset=utf-8', },
      });
    } catch (error) {
      console.log("서버와 연결이 원활하지 않습니다.", error);
      alert("서버와 연결이 원활하지 않습니다.");
      leaveSession(); // 바꿔야할 수도;
      navigate("/");
      return;
    }
    
    if (response.status == '204') {
      console.log('gameRoom null');
      return null;
    }
    else if (response.status == '200') {
      console.log('게임방 정보 획득');
      const gameRoom = response.data;
      return gameRoom;
    }
    else {
      alert('게임방 세션 획득 실패');
      console.log(response.data);
      return null;
    };
  }


  // 세션 해제
  const leaveSession = async () => {
      console.log("세션 해제중입니다.....")
      // 세션 연결 종료
      try{
        console.log(roomSession.current.openviduSession);
        if (roomSession.current.openviduSession) {
          await roomSession.current.openviduSession.disconnect().then(() => {
            console.log("세션 연결이 해제되었습니다.")
          });
          roomSession.current.openviduSession = undefined;
        }
      } catch(error) {
        console.error(error);
      }
      // game 퇴장 요청
      let response;
      try{
        response = await axios.delete(`/api/game/${roomSession.current.roomId}/player/${player.current.playerId}`,
          {
            headers: { 'Content-Type': 'application/json;charset=utf-8', },
          }
        )
      } catch(error){
        console.log("서버와 연결이 원활하지 않습니다.", error);
      }
      players.current = new Map();
      player.current = {};
  }


  // Openvidu 세션 생성 및 이벤트 정보 등록
  const initSession = async () => {
    console.log(`initSession`);
    // openvidu 세션 시작

    const newSession = OV.current.initSession();

    // 세션에서 발생하는 구체적인 이벤트 정의
    // stream 생성 이벤트 발생
    newSession.on('streamCreated', (event) => {
      const subscriber = newSession.subscribe(event.stream, undefined);
      console.log(`streamCreated`);
      var newPlayer = {
        ...JSON.parse(event.stream.streamManager.stream.connection.data),
        stream: subscriber,
      };
      setPlayers(newPlayer);
      forceUpdate();
      console.log(newPlayer.nickName, "님이 접속했습니다.");
    });

    // stream 종료 이벤트 발생 시
    newSession.on('streamDestroyed', (event) => {
      const targetId = JSON.parse(event.stream.streamManager.stream.connection.data).playerId;
      const targetNickname = JSON.parse(event.stream.streamManager.stream.connection.data).nickName;
      players.current.delete(targetId);
      console.log(targetNickname, "님이 접속을 종료했습니다.");
      forceUpdate();
    });

    newSession.on('sessionDisconnected', sessionDisconnectedHandler);

    // stream 예외 이벤트 발생 시 에러 출력
    newSession.on('exception', (e) => console.warn(e));

    console.log(`initSession - session`);
    // 설정한 세션 useState 갱신
    roomSession.current.openviduSession = newSession;

    return newSession;
  }

  const sessionDisconnectedHandler = () => {
    console.log("openvidu 세션 연결이 끊겼습니다.");
    roomSession.current.openviduSession.off('sessionDisconnected', sessionDisconnectedHandler); // 등록 해제
    leaveSession();
    window.location.href = "/";
  }


  const connectSession = async (response, roomId) => {
    console.log(`connectSession`);
    try {
      const session = response;
      // 오픈비두 토큰 발급
      const data = await getToken(roomId);

      if (data == null) throw '오픈비두 세션연결 실패';

      await session.connect(data.token, {
        nickName: data.nickName, 
        playerId: data.playerId,
        isMicOn: player.current.isMicOn,
        isCamOn: player.current.isCamOn,
        isHost: player.current.isHost,
        isAlive: true,
      });

      // 내 퍼블리셔 객체 생성
      let publisher = await OV.current.initPublisherAsync(undefined, {
        audioSource: undefined,
        videoSource: undefined,
        publishAudio: player.current.isMicOn,
        publishVideo: player.current.isCamOn,
        resolution: '640x480',
        frameRate: 30,
        insertMode: 'APPEND',
        mirror: true,
      });
      // 세션에 내 정보 게시
      session.publish(publisher);

      // 내 디바이스 on/off 상태 게시
      publisher.publishVideo(player.current.isCamOn);
      publisher.publishAudio(player.current.isMicOn);
      setPlayer([{key: 'stream', value: publisher}]);
    }
    catch (error) {
      console.error(error);
      return error;
    }
  }

  
  // 게임룸 여부 확인
  const checkGameRoom = async () => {

    // 룸아이디 유무 여부 확인하고 룸아이디 있으면 오류 X, 없으면 오류페이지 O 확인하기
    let roomId = location.pathname.split("/")[1];
    if (roomId === ""){
      alert("roomId 정보가 없습니다.");
      navigate("/");
      return;
    }

    console.log('checkGameRoom');
    var gameRoom = await getGameRoom(roomId);
    if (gameRoom == null) {
      setPlayer([{key: 'isHost', value: true}]);
      roomSession.current.roomId = undefined;
      roomSession.current.gameId = undefined;
    }
    else {
      setPlayer([{key: 'isHost', value: player.current.playerId === gameRoom.hostId}]);
      roomSession.current.roomId = gameRoom.roomId;
      roomSession.current.gameId = gameRoom.gameId;
    }

    return gameRoom;
  };
  
  // 서버에 요청하여 화상 채팅 세션 생성하는 함수
  const createGameRoom = async () => {
    let roomId = location.pathname.split("/")[1];
    console.log(`${roomId} 세션을 생성합니다.`);
    let response;
    try{
      response = await axios.post('/api/game', { 
        customSessionId: roomId, 
        nickName: player.current.nickName,
      }, 
      {
        headers: { 'Content-Type': 'application/json;charset=utf-8', },
        responseType: 'text',
        transformResponse: [data => data]
      });
    } catch(error) {
      console.log("서버와 연결이 원활하지 않습니다.", error);
      alert("서버와 연결이 원활하지 않습니다.");
      leaveSession();
      navigate("/");
      return;
    }
    console.log('세션 생성됨');
    console.log(response.data);
    return response; // The sessionId
  }
  
  
  // 서버에 요청하여 토큰 생성하는 함수
  const getToken = async (roomId) => {
    console.log("세션에 연결을 시도합니다.")
    console.log(player.current.nickName);
    let response;
    try{
      response = await axios.post(`/api/game/${roomId}/player`, player.current.nickName, {
        headers: { 'Content-Type': 'application/json;charset=utf-8', },
      });
    } catch(error) {
      console.log("서버와 연결이 원활하지 않습니다.", error);
      alert("서버와 연결이 원활하지 않습니다.");
      return null;
    }
    setPlayer([
      {key: 'playerId', value: response.data.playerId}, 
      {key: 'nickName', value: response.data.nickName},  
      {key: 'isHost', value: response.data.playerId === response.data.hostId},
      {key: 'isAlive', value: true}
    ]);
    // sessionStorage에 playerId 갱신
    console.log("sessionStorage에 playerId를 갱신합니다.")
    return response.data; // The token
  }


  return (
    <RoomContext.Provider value={{ roomSession, createGameRoom, getGameRoom,
      OV, initSession, connectSession, leaveSession, getToken,  checkGameRoom,
      player, setPlayer, players, setPlayers, forceUpdate }}>
      {children}
    </RoomContext.Provider>
  );
};

const useRoomContext = () => {
  const context = useContext(RoomContext);
  if (!context) {
    throw new Error('roomContext must be used within a RoomProvider');
  }
  return context;
};

export { RoomProvider, useRoomContext };