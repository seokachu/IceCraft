import getPlayersNumber from "@/utils/mafia/getPlayersNumber";
import { useParticipants } from "@livekit/components-react";
import { useEffect, useState } from "react";

const usePlayerNumber = (userId: string, isGameState: string) => {
  const participants = useParticipants();
  const [playerNumber, setPlayerNumber] = useState<number | null>(null);

  useEffect(() => {
    if (!userId || !isGameState) {
      return;
    }

    if (isGameState === "gameStart") {
      const allPlayers = getPlayersNumber(participants);
      const playerNumber = allPlayers.find((player) => player.playerId === userId);

      if (playerNumber) {
        setPlayerNumber(playerNumber.number);
      }
    }
  }, [isGameState]);

  return playerNumber;
};

export default usePlayerNumber;
