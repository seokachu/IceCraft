import { SocketEventHandler } from "@/types";
import { socket } from "@/utils/socket/socket";
import { useEffect } from "react";

const useSocketOn = (handlers: SocketEventHandler) => {
  useEffect(() => {
    const sockets = Object.entries(handlers);

    // [key, value] 형식의 튜플로써 첫 번째 요소는 키의 타입이 되고 두 번째 요소는 값의 타입
    sockets.forEach(([eventName, handler]) => {
      socket.on(eventName, handler);
    });

    return () => {
      sockets.forEach(([eventName]) => {
        socket.off(eventName);
      });
    };
  }, []);
};

export default useSocketOn;
