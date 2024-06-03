import useConnectStore from "@/store/connect-store";
import S from "@/style/livekit/livekit.module.css";
import { allAudioSetting } from "@/utils/participantCamSettings/camSetting";
import BeforeUnloadHandler from "@/utils/reload/beforeUnloadHandler";
import { socket } from "@/utils/socket/socket";

import GroupMafiaModal from "@/components/modal/GroupMafiaModal";
import useMediaSocket from "@/hooks/useMediaSocket";
import useModalSocket from "@/hooks/useModalSocket";
import { useInSelect, useOverLayActions } from "@/store/overlay-store";
import {
  useCheckModalIsOpen,
  useGroupModalIsOpen,
  useRoleModalElement,
  useRoleModalIsOpen,
  useVoteModalIsOpen
} from "@/store/show-modal-store";
import { DisconnectButton, useTracks } from "@livekit/components-react";
import { Track } from "livekit-client";
import CheckModal from "../modal/CheckModal";
import UserRoleModal from "../modal/UserRoleModal";
import VoteResultModal from "../modal/VoteResultModal";
import LocalParticipant from "./LocalParticipant";
import MafiaToolTip from "./MafiaToolTip";
import RemoteParticipant from "./RemoteParticipant";
import { useJobImageAction } from "@/store/image-store";

const MafiaPlayRooms = () => {
  const { userId, roomId } = useConnectStore();
  const setImageState = useJobImageAction();
  const role = useRoleModalElement();
  //NOTE - 임시: 각 모달창 별로 On, Off
  const isGroupModal = useGroupModalIsOpen();
  const isRoleModal = useRoleModalIsOpen();
  const isVoteModal = useVoteModalIsOpen();
  const isCheckModal = useCheckModalIsOpen();

  //NOTE - 캠 클릭 이벤트의 구성요소
  const { setActiveParticipant, setIsOverlay } = useOverLayActions();
  //NOTE - 투표시간, 마피아시간, 의사시간, 경찰시간 구성요소
  const inSelect = useInSelect();

  //NOTE -  전체 데이터
  const tracks = useTracks(
    [
      { source: Track.Source.Camera, withPlaceholder: true },
      { source: Track.Source.Microphone, withPlaceholder: true }
    ],
    { onlySubscribed: false } // 구독 여부 상관없이 실행
  );

  //"socket 실행"
  useMediaSocket();
  useModalSocket();

  //NOTE - 캠 클릭 이벤트 헨들러
  const checkClickHandle = (event: React.MouseEvent<HTMLElement>, playerId: string) => {
    event.stopPropagation();
    console.log("checkClickHandle PlayerId", playerId);

    if (inSelect.includes("vote")) {
      socket.emit("voteTo", playerId);
    }

    if (inSelect.includes("mafia")) {
      console.log("inSelect", inSelect);
      socket.emit("voteTo", playerId);
    }

    if (inSelect.includes("doctor")) {
      console.log("inSelect", inSelect);
      socket.emit("selectPlayer", playerId);
    }

    if (inSelect.includes("police")) {
      //NOTE - role 구조: {jobName: string, userList: []}
      const jobNameList = Object.keys(role);

      //NOTE - 해당 player의 직업
      jobNameList.find((job) => {
        //NOTE - 직업별 해당 userId[]
        const jobPlayerList = role[job];

        //NOTE - 직업이 존재하지 않을 경우(경찰, 의사)
        if (!jobPlayerList) {
          return;
        }

        const isPlayerJob = jobPlayerList.find((userId: string) => playerId === userId);

        if (isPlayerJob) {
          return job;
        }
      });

      console.log("role", role);
      console.log("inSelect", inSelect);
    }

    // 클릭 이벤트를 한 번만 수행
    setIsOverlay(false);

    // 캠 클릭시 클릭한 위치에 이미지 띄우기
    setActiveParticipant(playerId);
  };

  //NOTE - 방 나가기 이벤트 헨들러
  const leaveRoom = () => {
    socket.emit("exitRoom", roomId, userId);
  };

  BeforeUnloadHandler();

  return (
    <section className={S.section}>
      <LocalParticipant tracks={tracks} checkClickHandle={checkClickHandle} />
      <RemoteParticipant tracks={tracks} checkClickHandle={checkClickHandle} />
      <div className={S.goToMainPage}>
        <button
          onClick={() => {
            allAudioSetting(tracks, false);
          }}
          style={{ background: "red" }}
        >
          전체 소리 끄기
        </button>
        <DisconnectButton onClick={leaveRoom}>나가기</DisconnectButton>
      </div>
      <MafiaToolTip />

      {/* isOpen: 모달창 띄우기 */}
      {isGroupModal && <GroupMafiaModal />}
      {isRoleModal && <UserRoleModal />}
      {isVoteModal && <VoteResultModal />}
      {isCheckModal && <CheckModal />}
    </section>
  );
};

export default MafiaPlayRooms;
