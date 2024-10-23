import React, { createContext, ReactNode, useEffect, useState } from 'react';
import TwitchManager from "../managers/TwitchManager"
import { TwitchStream } from '@/types/stream';
import { updateThumbnailSize } from '@/app/helpers/Twitch';

interface TwitchProviderProps {
  children: ReactNode;
}

interface TwitchContextProps {
  streams: TwitchStream[];
  loadingStreams: boolean;
  fetchStreams: () => Promise<void>;
  searchForStreams: (query: string) => Promise<TwitchStream[]>;
}

export const TwitchContext = createContext<TwitchContextProps | undefined>(undefined);

const TwitchProvider: React.FC<TwitchProviderProps> = ({ children }) => {
  const twitchManager = new TwitchManager();
  const [loadingStreams, setLoadingStreams] = useState(false);
  const [streams, setStreams] = useState<TwitchStream[]>([]);

  useEffect(() => {
    fetchStreams()
  }, []);

  const fetchStreams = async () => {
    setLoadingStreams(true)
    const livestreams = await twitchManager.GetTop100TwitchLiveStreams()
    const updatedLivestreams = updateThumbnailSize(livestreams)

    setStreams(updatedLivestreams)
    setLoadingStreams(false)
  }

  const searchForStreams = async (query: string): Promise<TwitchStream[]> => {
    const queryResults = await twitchManager.SearchForTwitchStreams(query);
    const updatedLivestreams = updateThumbnailSize(queryResults)
    return updatedLivestreams
  }

  return (
    <TwitchContext.Provider value={{ streams, loadingStreams, fetchStreams, searchForStreams }}>
      {children}
    </TwitchContext.Provider>
  );
};

export default TwitchProvider;
