import { TrackReferenceOrPlaceholder } from "@livekit/components-react";
import { User } from "@supabase/supabase-js";
import { StaticImageData } from "next/image";
import { Tables } from "@/types/supabase";

export interface MafiaRoom {
  room: string;
  userInfo: User | undefined | null;
}

// 미디어 상태 객체의 구조를 정의
export interface MediaStatus {
  [userId: string]: { camera: boolean; mike: boolean };
}

// socket 이벤트 핸들러 인터페이스 정의
export interface SocketEventHandler {
  [eventName: string]: (...args: any[]) => void;
}

export interface Role {
  [job: string]: string[];
}

export interface VoteResult {
  user_id: string;
  user_nickname: string;
  voted_count: number;
}

export interface Participants {
  tracks: TrackReferenceOrPlaceholder[];
}

export interface playerMedia {
  userId: string;
  camera: boolean;
  mike: boolean;
}

export interface OverlayState {
  activePlayerId: string | null;
  playersReady: RemoteReadyStates;
  isLocalOverlay: boolean;
  isRemoteOverlay: boolean;
  inSelect: string;
  imageState: StaticImageData | null;

  actions: {
    setReadyPlayers: (userId: string, isReady: boolean) => void;
    setActiveParticipant: (playerId: string | null) => void;
    setIsOverlay: (newIsOverlay: boolean) => void;
    setIsRemoteOverlay: (newIsOverlay: boolean) => void;
    setImageState: (newImage: StaticImageData | null) => void;
    setInSelect: (newSelect: string) => void;
    setOverlayReset: () => void;
  };
}

export interface ImageState {
  imageState: StaticImageData | null;
  setImageState: (newImage: StaticImageData | null) => void;
  setImageReset: () => void;
}

export interface GameState {
  presentRoomId: string;
  updateRoomInfo: { chief: string; roomId: string };
  diedPlayerId: string[];
  isGameState: string;
  isDay: string;
  victoryPlayersId: string[];
  actions: {
    setPresentRoomId: (newRoomId: string) => void;
    setChiefPlayerId: (newChief: { chief: string; roomId: string }) => void;
    setDiedPlayer: (playerId: string) => void;
    setIsGameState: (isGame: string) => void;
    setIsDay: (newIsDay: string) => void;
    setVictoryPlayersId: (newPlayerId: string) => void;
    setGameReset: () => void;
  };
}

export interface GamePlayerInfo {
  playerName: string | undefined;
  playerJoinAt: Date | undefined;
  playerNumber: number;
}

export interface ConnectState {
  join: boolean;
  nickname: string;
  userId: string;
  roomId: string;
  rooms: Tables<"room_table">[] | null;
  actions: {
    setJoinStatus: (status: boolean) => void;
    setRoomId: (id: string) => void;
    setUserId: (id: string) => void;
    setUserNickname: (nickname: string) => void;
    setRooms: (status: Tables<"room_table">[]) => void;
  };
}

export interface RemoteReadyStates {
  [key: string]: boolean;
}

export interface ExitState {
  isEntry: boolean;
  actions: {
    setIsEntry: (newToggle: boolean) => void;
  };
}

export interface ReadyState {
  isReady: boolean;
  setIsReady: (newReady: boolean) => void;
}

export interface CreateState {
  isCreate: boolean;
  actions: {
    setIsCreate: (newReady: boolean) => void;
  };
}

export interface ShowModalState {
  isOpen: boolean;
  currentModal: string;
  title: string;
  timer: number;
  role: Role;
  voteResult: VoteResult[];
  yesOrNoResult: YesOrNoResults;
  actions: {
    setIsOpen: (newIsOpen: boolean) => void;
    setCurrentModal: (newCurrentModal: string) => void;
    setTimer: (newTimer: number) => void;
    setTitle: (newTitle: string) => void;
    setRole: (newRole: Role) => void;
    setVoteResult: (newVote: VoteResult[]) => void;
    setYesOrNoVoteResult: (newVote: YesOrNoResults) => void;
    setModalReset: () => void;
  };
}

export interface VoteData {
  userId: string;
  nickname: string;
}

export interface VoteResults {
  [nickname: string]: number;
}

export interface YesOrNoResults {
  detail: { noCount: number; yesCount: number };
  result: boolean;
}

export interface totalTimeState {
  timer: number;
  isTimer: boolean;
  actions: {
    setTimer: (newTimer: number) => void;
    setIsTimer: (newTimer: boolean) => void;
  };
}

export interface MainVisualProps {
  gameStartHandler: () => void;
}

export interface playersInfo {
  user_id: string;
  user_nickname: string;
  is_ready: boolean;
}

export interface FormSearchProps {
  placeholder: string;
}

export interface RoomListItemProps {
  item: Tables<"room_table">;
}

export interface CreateRooms {
  room_id: string;
}

export interface LoadingState {
  loading: boolean;
  actions: {
    setLoading: (loading: boolean) => void;
  };
}

export interface Ranking {
  email: string;
  mafia_score: number;
  music_score: number;
  nickname: string | null;
  total_score: number;
  user_id: string;
  ranking?: number;
}

export interface MyLankingProps {
  rankingList: Ranking[];
}

export interface PageNationProps {
  rankingList: Ranking[];
}

export interface CurrentItemsProps {
  currentItems: Ranking[];
}

export interface PaginatedItemsProps {
  items: Ranking[];
  itemsPerPage: number;
}

export interface ParallaxProps {
  children: string;
  baseVelocity: number;
}

export interface CreateRoomModalProps {
  setIsCreate: React.Dispatch<React.SetStateAction<boolean>>;
  closeModal: (e: React.MouseEvent<HTMLDivElement | HTMLButtonElement, MouseEvent>) => void;
}
