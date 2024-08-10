import React, { useEffect, useState } from "react";
import CreateRoomModal from "./CreateRoomModal";
import S from "@/style/mainpage/main.module.css";

const MainCreateRoom = () => {
  const [isCreate, setIsCreate] = useState(false);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    document.body.classList.toggle(S.active, isActive);
  }, [isActive]);

  const createRoomModalHandler = () => {
    setIsCreate(true);
    setIsActive(true);
  };

  const closeModalHandler = (e: React.MouseEvent<HTMLDivElement | HTMLButtonElement, MouseEvent>) => {
    if (e.target === e.currentTarget) {
      setIsCreate(false);
      setIsActive(false);
    }
  };

  return (
    <>
      <div className={S.makeRoomButton}>
        <button onClick={() => createRoomModalHandler()} className={`${S.makeRoom} ${isActive ? S.active : ""}`}>
          방 만들기
        </button>
      </div>
      {isCreate && <CreateRoomModal setIsCreate={setIsCreate} closeModal={closeModalHandler} />}
    </>
  );
};

export default MainCreateRoom;
