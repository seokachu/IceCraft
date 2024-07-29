import useSocketOn from "@/hooks/useSocketOn";
import { useCurrentModal, useModalActions, useModalIsOpen } from "@/store/show-modal-store";
import { Role, VoteResult, YesOrNoResults } from "@/types";
import CheckModal from "../modal/CheckModal";
import GroupMafiaModal from "@/components/modal/GroupMafiaModal";
import LastVoteResultModal from "@/components/modal/LastVoteResultModal";
import UserRoleModal from "@/components/modal/UserRoleModal";
import VictoryModal from "@/components/modal/VictoryModal";
import VoteResultModal from "@/components/modal/VoteResultModal";

const MafiaModals = () => {
  const isOpen = useModalIsOpen();
  const currentModal = useCurrentModal();
  const { setYesOrNoVoteResult, setCurrentModal, setIsOpen, setTimer, setTitle, setRole, setVoteResult } =
    useModalActions();

  const sockets = {
    showModal: (title: string, timer: number) => {
      //NOTE -  CheckModal(찬성/반대) 투표 모달창 요소
      if (title.includes("찬성/반대 투표")) {
        setCurrentModal("CheckModal");
        setIsOpen(true);
        setTitle(title);
        setTimer(timer);
        return;
      }

      //NOTE - GroupModal 모달창 요소
      setCurrentModal("GroupMafiaModal");
      setIsOpen(true);
      setTitle(title);
      setTimer(timer);
    },

    //NOTE - UserRoleModal 모달창 요소
    showAllPlayerRole: (role: Role, timer: number) => {
      setCurrentModal("UserRoleModal");
      setIsOpen(true);
      setRole(role);
      setTimer(timer);
    },
    //NOTE - 투표 결과 모달창 요소
    showVoteResult: (voteResult: VoteResult[], timer: number) => {
      setCurrentModal("VoteResultModal");
      setIsOpen(true);
      setVoteResult(voteResult);
      setTimer(timer);
    },
    //NOTE - 찬성/반대 투표 결과 모달창 요소
    showVoteDeadOrLive: (voteResult: YesOrNoResults, timer: number) => {
      setCurrentModal("LastVoteResultModal");
      setIsOpen(true);
      setYesOrNoVoteResult(voteResult);
      setTimer(timer);
    },
    //NOTE - 승리한 팀 모달창 요소
    victoryPlayer: (victoryTeam: string, timer: number) => {
      setCurrentModal("VictoryModal");
      setIsOpen(true);
      setTitle(victoryTeam);
      setTimer(timer);
    }
  };

  //NOTE - socket On, Off 담당
  useSocketOn(sockets);

  if (!isOpen) return null;

  //NOTE - 모달창 리스트
  /*
    GroupMafiaModal - 마피아 공용 모달창
    UserRoleModal - 직업 카드 모달창
    CheckModal - 찬반 투표 모달창 (yes or no)
    VoteResultModal - 찬반 투표 결과 모달창
    LastVoteResultModal - 최종 투표 결과 모달창
    VictoryModal - 승리 결과 모달창
  */

  switch (currentModal) {
    case "GroupMafiaModal":
      return <GroupMafiaModal />;
    case "UserRoleModal":
      return <UserRoleModal />;
    case "CheckModal":
      return <CheckModal />;
    case "VoteResultModal":
      return <VoteResultModal />;
    case "LastVoteResultModal":
      return <LastVoteResultModal />;
    case "VictoryModal":
      return <VictoryModal />;
    default:
      return null;
  }
};

export default MafiaModals;
