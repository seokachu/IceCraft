"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import VisitEmptyImage from "@/assets/images/visit_empty.svg";
import S from "@/style/mainpage/main.module.css";
import { toast } from "react-toastify";
import GoTopButton from "@/utils/GoTopButton";
import { socket } from "@/utils/socket/socket";
import { getRoomsWithKeyword } from "@/utils/supabase/roomAPI";
import MainCreateRoom from "@/components/modal/CreateRoomModal";
import { useCreateStore } from "@/store/toggle-store";
import MainVisual from "@/components/main/MainVisual";
import RoomSearch from "@/utils/RoomSearch";
import RoomListItem from "@/components/main/RoomListItem";
import useGetRoomsSocket from "@/hooks/useGetRoomsSocket";
import MainSkeleton from "@/components/main/MainSkeleton";
import useJoinRoom from "@/hooks/useJoinRoom";

const Mainpage = () => {
  const { rooms, setRooms } = useGetRoomsSocket();
  const { isCreate, setIsCreate } = useCreateStore();
  const [search, setSearch] = useState("");
  const isGoInClick = useRef(false);
  const { joinRoomHandler, fastJoinRoomHandler, gameStartHandler } = useJoinRoom();

  console.log("메인페이지");
  useEffect(() => {
    socket.connect();
    socket.emit("enterMafia", 0, 20);

    // const checkUserInfo = async () => {
    //   const userInfo = await getUserInfo();

    //   // 세션 스토리지에 저장
    //   if (userInfo) {
    //     setUserId(crypto.randomUUID());
    //     setUserNickname(crypto.randomUUID());
    //     // setUserId(userInfo.id);
    //     // setUserNickname(userInfo.user_metadata.nickname);
    //   }
    // };
    // checkUserInfo();
  }, []);

  //NOTE - 방 목록 검색
  const searchHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!search.trim()) return;

    try {
      const rooms = await getRoomsWithKeyword(search);
      setRooms(rooms);
    } catch (error) {
      toast.error("검색 중 오류가 발생했습니다.");
    }
  };

  //NOTE - 방 목록 리스트 없을때 불러오는 로딩 모션
  if (!rooms) return <MainSkeleton />;

  return (
    <main className={S.main}>
      <section className={S.visualSection}>
        <MainVisual gameStartHandler={gameStartHandler} />
      </section>
      <div className={S.roomSectionWrap}>
        <section className={S.roomSection}>
          <div className={S.MainGnb}>
            <p>현재 활성화 되어있는 방</p>
            <div className={S.roomSearchAndButton}>
              <RoomSearch searchHandler={searchHandler} search={search} setSearch={setSearch} />
              <div className={S.gameGoButton}>
                <button disabled={isGoInClick.current} onClick={fastJoinRoomHandler}>
                  빠른입장
                </button>
                <div className={S.makeRoomButton}>
                  <button onClick={() => setIsCreate(true)} className={S.makeRoom}>
                    방 만들기
                  </button>
                </div>
                {isCreate ? <MainCreateRoom /> : null}
              </div>
            </div>
          </div>
          {rooms ? (
            <ul className={S.roomList}>
              {rooms.map((item) => (
                <RoomListItem key={item.room_id} item={item} joinRoomHandler={joinRoomHandler} />
              ))}
            </ul>
          ) : (
            <div className={S.roomVisitEmpty}>
              <Image src={VisitEmptyImage} alt="Room list empty" />
            </div>
          )}
        </section>
      </div>
      <GoTopButton />
    </main>
  );
};

export default Mainpage;
