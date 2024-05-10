import { useState } from "react";

interface SocialApi {
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
}

type SocialNetwork = "facebook" | "instagram" | "tiktok";

const useSocialHook = (network: SocialNetwork): SocialApi => {
  const [connected, setConnected] = useState(false);

  const connect = async () => {
    setConnected(true);
  };

  const disconnect = async () => {
    setConnected(false);
  };

  return { connect, disconnect };
};

export default useSocialHook;
