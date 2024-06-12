import { useCountDown } from "@/hooks/useCountDown";
import {
  useGroupModalIsOpen,
  useModalActions,
  useModalIsOpen,
  useModalTimer,
  useVoteResultElement,
  useYesOrNoResultElement
} from "@/store/show-modal-store";

import S from "@/style/modal/modal.module.css";
import { useEffect, useState } from "react";

const LastVoteResultModal = () => {
  const isModal = useModalIsOpen();
  const isGroupModal = useGroupModalIsOpen();
  const timer = useModalTimer();
  const yesOrNoResults = useYesOrNoResultElement();

  const [count, setCount] = useState(timer * 10);
  const { setIsOpen, setGroupIsOpen } = useModalActions();

  //NOTE - 타이머 기능
  useCountDown(() => setCount((prevCount) => prevCount - 1), 100, isGroupModal);

  // 모달창 종료
  useEffect(() => {
    if (count <= 0 && isGroupModal) {
      setGroupIsOpen(false);
    }
  }, [count]);

  return (
    <>
      <div className={S.modalWrap}>
        <div className={S.modal}>
          <div>
            <h1>최종 투표 결과</h1>
            <div>
              찬성: <span>{yesOrNoResults}</span> 반대: {yesOrNoResults}
            </div>
            <progress className={S.progress} value={(timer * 10 - count) * (100 / (timer * 10))} max={100}></progress>
          </div>
        </div>
      </div>
    </>
  );
};

export default LastVoteResultModal;
