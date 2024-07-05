import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { useConnectActions, useNickname, useRoomId, useUserId } from "@/store/connect-store";
import { socket } from "@/utils/socket/socket";
import { checkUserLogIn, getUserInfo } from "@/utils/supabase/authAPI";
import { Tables } from "@/types/supabase";
import useJoinRoomSocket from "./useJoinRoomSocket";
import { useRoomAction } from "@/store/room-store";
import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
import { useUserInfo } from "./useUserInfo";

const useJoinRoom = () => {
  const isGoInClick = useRef(false);
  const { setRoomId, setUserNickname, setUserId } = useConnectActions();
  const { setIsEntry } = useRoomAction();
  const userId = useUserId();
  const nickname = useNickname();
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useJoinRoomSocket();

  // const { data, isPending, error } = useUserInfo();

  // console.log(data);

  // NOTE - 사용자 로그인 여부
  //FIXME - 수정예정
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const loggedIn = await checkUserLogIn();
        setIsLoggedIn(true);

        if (loggedIn) {
          const userInfo = await getUserInfo();
          setUserId(userInfo!.id);
          setUserNickname(userInfo!.user_metadata.nickname);
        }
      } catch (error) {
        console.error("error:", error);
      }
    };
    fetchUserInfo();
  }, []);

  //NOTE - 클릭시 로그인 안한 유저 처리
  const loginErrorHandler = async (emitCallback: () => void) => {
    try {
      setLoading(true);
      const isLogin = await checkUserLogIn();

      if (!isLogin) {
        toast.info("로그인 후 입장가능합니다.");
        return;
      }
      if (!isGoInClick.current) {
        isGoInClick.current = true;
        emitCallback();
      }
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoading(false);
      isGoInClick.current = false;
    }
  };

  //NOTE - 방 리스트 입장하기
  const joinRoomHandler = async (item: Tables<"room_table">) => {
    await loginErrorHandler(() => {
      setRoomId(item.room_id);
      setIsEntry(true);
      socket.emit("joinRoom", userId, item.room_id, nickname);
    });
  };

  //NOTE - 메인페이지 visual에서 게임시작 버튼 클릭시(추후 마피아 & 노래맞추기 조건 추가)
  const gameStartHandler = () => {
    loginErrorHandler(() => {
      setIsEntry(true);
      socket.emit("fastJoinRoom", userId, nickname);
    });
  };

  //NOTE - 빠른 입장 (랜덤 방 입장)
  const fastJoinRoomHandler = () => {
    loginErrorHandler(() => {
      setIsEntry(true);
      socket.emit("fastJoinRoom", userId, nickname);
    });
  };

  return { joinRoomHandler, fastJoinRoomHandler, gameStartHandler, loading };
};

export default useJoinRoom;
