# TEAM : 어디로든문

# 프로젝트 주제 : 삵음삵음 (화상 마피아 게임)

---
---

### 프로젝트 기간 : 2023.07.04 ~ 2023.08.18

### 팀원 구성

| FE | BE |
|:---:|:---:|
|이예슬, 임혜진 | 김동겸, 김민식, 박시원, 박현철 |

---

## 프로젝트 개요

### 1️⃣ 주제 선정

1. ‘온택트 시대’, 온라인 소통의 증가
2. 포스트 코로나, 변화하는 게임 트렌드

### 2️⃣ 타겟 사용자

- 화상 모임에 익숙하고 온라인 마피아 게임을 즐겨하며 혼자가 편한 20.30 세대

### 3️⃣ 기획 의도

1. 멀리 사는 친구들과 함께하는 게임
2. 다양한 직업들의 재미요소
3. 타겟 사용자의 경험과 관심사를 고려한 온라인 화상 마피아게임

### 4️⃣ 사용자 가치

1. 관계 지속을 위한 기능적 가치
2. 스트레스 해소, 재미를 위한 유희적 가치

### 5️⃣  기존 마피아 게임과의 차별점

1. 화상 채팅 기능
2. 다양한 특수 직업 추가
3. 귀여운 캐릭터와 깔끔한 UI

---

## 기술 스택

### Front-end

- IDE : Visual Studio Code v1.81.1
- Front-end Framework : react v18.2.0
- Web Server : nginx/1.18.0 (Ubuntu)

### Back-end

- IDE : STS v4.19.1, IntelliJ 2023.1.4
- JVM : JavaSE-17
- Back-end Framework : Spring Boot v3.1.1
- Database : MySql v8.0.34

### 3rd Party Library

- 화상통화 서비스 : openvidu/openvidu-dev:2.28.0
- Message Broker : redis v6.2.4
- MediaPipe : @mediapipe/task-vision v0.10.3
- FACE-API : face-api.js v0.22.2

![Untitled](%E1%84%85%E1%85%B5%E1%84%83%E1%85%B3%E1%84%86%E1%85%B5%20f781f652e85f4b11bf877814f0c2089a/Untitled.png)

- ERD

![Untitled](%E1%84%85%E1%85%B5%E1%84%83%E1%85%B3%E1%84%86%E1%85%B5%20f781f652e85f4b11bf877814f0c2089a/Untitled%201.png)

---

# 주요 기능

<details>
<summary>
    <b>확인하기</b>
</summary>

## 1. 게임시작 화면

![Untitled](%E1%84%85%E1%85%B5%E1%84%83%E1%85%B3%E1%84%86%E1%85%B5%20f781f652e85f4b11bf877814f0c2089a/Untitled%202.png)

A. ‘게임시작’ 버튼을 클릭하여 사용자 설정 페이지로 이동합니다.

## 2. 사용자 설정 및 게임방 접속

![Untitled](%E1%84%85%E1%85%B5%E1%84%83%E1%85%B3%E1%84%86%E1%85%B5%20f781f652e85f4b11bf877814f0c2089a/Untitled%203.png)

A. 카메라와 마이크 권한을 허용하여 게임을 준비합니다. (브라우저 팝업)

<aside>
⚠️ 카메라와 마이크가 정상적으로 연결이 되지 않았다면 게임방 접속이 되지 않습니다.

</aside>

B. 본인의 닉네임을 설정합니다. (최대 6자)

C. 게임방 접속 시 카메라, 마이크 상태를 설정합니다.

![Untitled](%E1%84%85%E1%85%B5%E1%84%83%E1%85%B3%E1%84%86%E1%85%B5%20f781f652e85f4b11bf877814f0c2089a/Untitled%204.png)

D. ‘게임 설명’ 버튼을 클릭하면, 게임 배경과 게임 방법을 볼 수 있습니다.

E-1. ‘방만들기’ 버튼을 클릭하면 게임방이 생성되고, 게임방 로비 페이지로 이동합니다.

E-2. 만약 게임방이 이미 생성된 상태라면, ‘방만들기’ 버튼 대신에 ‘입장하기’ 버튼이 시현됩니다.

## 3. 게임방 로비 화면

![asdfasdf.PNG](%E1%84%85%E1%85%B5%E1%84%83%E1%85%B3%E1%84%86%E1%85%B5%20f781f652e85f4b11bf877814f0c2089a/asdfasdf.png)

A. 화면의 왼쪽은 게임에 입장한 플레이어의 화상과 닉네임이 표시되고, 오른쪽 화면은 플레이 할 게임의 옵션을 설정할 수 있습니다.

B. ‘초대하기’ 버튼을 클릭하면 링크가 자동으로 복사됩니다. 링크를 공유하여 다른 플레이어를 게임에 초대합니다.

![invite.PNG](./%E1%84%85%E1%85%B5%E1%84%83%E1%85%B3%E1%84%86%E1%85%B5%20f781f652e85f4b11bf877814f0c2089a/invite.png)

C. 게임 설정 미니 직업카드에 마우스를 올리면 각 직업에 대한 자세한 설명을 볼 수 있습니다.

D. 플레이할 직업의 종류와 수, 회의시간을 설정하고 ‘게임시작’ 버튼을 클릭하여 게임을 시작합니다. 게임 시작을 위해선 아래 조건을 모두 만족해야하고, 만족하지 않을 시, 안내문이 팝업됩니다.

- 플레이어 수와 직업의 전체 수가 같아야 합니다.
- 삵이 2명 이상일 경우에만 탐정 직업을 추가할 수 있습니다.
- 삵의 수보다 시민의 수가 많아야 합니다.

## 4. 게임화면 [첫째 낮]

![Untitled](%E1%84%85%E1%85%B5%E1%84%83%E1%85%B3%E1%84%86%E1%85%B5%20f781f652e85f4b11bf877814f0c2089a/Untitled%205.png)

A. 게임이 시작되면, 본인 직업 카드가 슬라이드 되어 시현되고, 어떤 곳이든 클릭하여 없앨 수 있습니다.

B. 게임은 [낮] - [저녁] - [밤] 페이즈로 구성되고, 왼쪽 상단에는 현재 페이즈의 남은 시간이 표시됩니다.

![Untitled](%E1%84%85%E1%85%B5%E1%84%83%E1%85%B3%E1%84%86%E1%85%B5%20f781f652e85f4b11bf877814f0c2089a/Untitled%206.png)

C. 남은 시간 밑에는 차례대로 본인의 카메라 On/Off 설정 버튼, 마이크 On/Off 설정 버튼, 그리고 게임 로그 버튼이 있습니다. 

게임 로그 버튼을 클릭하면 알림 메시지의 기록을 확인할 수 있습니다.

D. 첫째 낮에는 투표가 불가능하여 ‘스킵하기’ 버튼을 통해, 모두가 동의할 경우 남은 시간과 상관없이 다음 페이즈로 넘어갈 수 있습니다.

## 5. 게임화면 [밤]

A. 밤 페이즈는 30초 간 진행됩니다. 밤 페이즈 동안에 각 직업들은 본인 능력을 사용할 수 있습니다.

B. 선택된 대상을 다시 선택 시 선택이 취소되고, ‘투표확정’ 또는 ‘스킵하기’ 버튼을 클릭할 경우 대상 선택이 확정됩니다. 대상 선택을 확정하지 않아도 모든 직업 공통적으로 마지막 선택 대상에게 능력이 발동합니다.

![IMG_8189.jpg](%E1%84%85%E1%85%B5%E1%84%83%E1%85%B3%E1%84%86%E1%85%B5%20f781f652e85f4b11bf877814f0c2089a/IMG_8189.jpg)

[삵] 서로의 화면을 보며 협의를 통해 사냥 대상을 선택합니다. 지목 대상은 다음날 낮에 사망합니다.

![Untitled](%E1%84%85%E1%85%B5%E1%84%83%E1%85%B3%E1%84%86%E1%85%B5%20f781f652e85f4b11bf877814f0c2089a/Untitled%207.png)

[경찰] 원하는 대상을 선택하여 다음날 낮에 삵 여부를 알 수 있습니다.

[탐정] 음성변조된 삵의 대화를 들을 수 있습니다.

[수의사] 선택된 대상이 삵의 목표였다면, 삵의 사냥이 실패합니다.

[냥아치] 선택된 대상을 다음날 낮 동안 음소거 시킵니다.

[심리학자] 선택된 대상을 다음날 낮 동안 감정 분석하여 실시간으로 확인합니다.

## 6. 게임화면 [낮 - 추방자 투표]

![Untitled](%E1%84%85%E1%85%B5%E1%84%83%E1%85%B3%E1%84%86%E1%85%B5%20f781f652e85f4b11bf877814f0c2089a/Untitled%208.png)

A. 이튿날 부터 카메라 화면 클릭을 통해 투표가 가능하고, 클릭된 대상의 투표수는 실시간으로 공유됩니다.

B. 공유된 투표 현황은 확정이 아니며, ‘투표확정’ 클릭 시 실제 투표수에 반영됩니다.

C. 스킵을 포함하여 모두가 투표를 확정하거나 시간이 종료되면, 결과에 따라 [저녁] 또는 [밤] 페이즈로 이동합니다. (최대 투표수가 1명일 경우 추방 대상 선정)

## 7. 게임화면 [낮 - 사냥당함]

![Untitled](%E1%84%85%E1%85%B5%E1%84%83%E1%85%B3%E1%84%86%E1%85%B5%20f781f652e85f4b11bf877814f0c2089a/Untitled%209.png)

A. 삵에게 지정된 대상은 [관전자]가 되고, 화면에서 제거됩니다. 

    관전자는 우측 하단 버튼을 통해 관전자 채팅이 가능합니다.

![Untitled](%E1%84%85%E1%85%B5%E1%84%83%E1%85%B3%E1%84%86%E1%85%B5%20f781f652e85f4b11bf877814f0c2089a/Untitled%2010.png)

## 8. 게임화면 [낮 - 히든미션]

![Untitled](%E1%84%85%E1%85%B5%E1%84%83%E1%85%B3%E1%84%86%E1%85%B5%20f781f652e85f4b11bf877814f0c2089a/Untitled%2011.png)

A. 삵에게 히든미션이 부과되면 직업 카드 하단에 손동작이 제시됩니다.

![Untitled](%E1%84%85%E1%85%B5%E1%84%83%E1%85%B3%E1%84%86%E1%85%B5%20f781f652e85f4b11bf877814f0c2089a/Untitled%2012.png)

B. 제시된 히든 미션을 낮 페이즈 동안 성공하지 못하면, 밤에 사냥을 할 수 없고, 히든 미션에 성공하면, 모두에게 히든 미션 성공 알림이 보내집니다.

## 9. 게임화면 [저녁 - 추방자 투표]

![123123.jpg](%E1%84%85%E1%85%B5%E1%84%83%E1%85%B3%E1%84%86%E1%85%B5%20f781f652e85f4b11bf877814f0c2089a/123123.jpg)

A. 추방 대상자는 화면 중앙으로 이동되고, 플레이어는 찬성/반대를 선택합니다.

B. 찬성 과반수의 경우 대상자는 추방되고, 그렇지 않을 경우 아무 일도 일어나지 않습니다.

## 10. 게임결과 화면

![image (11).png](%E1%84%85%E1%85%B5%E1%84%83%E1%85%B3%E1%84%86%E1%85%B5%20f781f652e85f4b11bf877814f0c2089a/image_(11).png)

A. 삵이 모두 추방될 경우 고양이팀의 승리, 고양이가 추방당하거나 사냥당해, 삵의 수와 같거나 적을 경우 삵의 승리가 되며 게임결과 화면이 시현됩니다.

B. ‘다시하기’ 버튼을 클릭하여 게임방 로비로 돌아가거나, ‘나가기’ 버튼을 통해 게임시작 화면으로 돌아갑니다.
</div>
</details>


---

### 삵음삵음 (화상 마피아 게임)

이상입니다.
