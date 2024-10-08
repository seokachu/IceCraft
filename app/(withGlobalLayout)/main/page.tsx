"use client";

import MainCreateRoom from "@/components/main/MainCreateRoom";
import MainVisual from "@/components/main/MainVisual";
import RoomList from "@/components/main/RoomList";
import useJoinRoom from "@/hooks/useJoinRoom";
import useJoinRoomSocket from "@/hooks/useJoinRoomSocket";
import S from "@/style/mainpage/main.module.css";
import CommonsLoading from "@/utils/CommonsLoading";
import FormSearch from "@/utils/FormSearch";
import GoTopButton from "@/utils/GoTopButton";
import InfoChat from "@/utils/InfoChat";
import Popup from "@/utils/Popup";
import { socket } from "@/utils/socket/socket";
import { useEffect, useRef } from "react";

const Mainpage = () => {
  const isGoInClick = useRef(false);
  const { fastJoinRoomHandler } = useJoinRoom();
  useJoinRoomSocket();

  //NOTE - 소켓 연결
  useEffect(() => {
    socket.connect();
    socket.emit("enterMafia");
  }, []);

  return (
    <main className={S.main}>
      <section className={S.visualSection}>
        <MainVisual />
      </section>
      <div className={S.roomSectionWrap}>
        <section className={S.roomSection}>
          <div className={S.MainGnb}>
            <p>현재 활성화 되어있는 방</p>
            <div className={S.roomSearchAndButton}>
              <FormSearch placeholder="방 이름을 입력해 주세요." />
              <div className={S.gameGoButton}>
                <button disabled={isGoInClick.current} onClick={fastJoinRoomHandler}>
                  빠른입장
                </button>
                <MainCreateRoom />
              </div>
            </div>
          </div>
          <RoomList />
          <CommonsLoading />
        </section>
      </div>
      <InfoChat />
      <GoTopButton />
      <Popup />
    </main>
  );
};

export default Mainpage;
