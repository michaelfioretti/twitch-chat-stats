import React, { createContext, ReactNode, useEffect, useState } from 'react';
import TwitchManager from "../managers/TwitchManager"
import { TwitchStream } from '@/types/stream';
import { updateThumbnailSize } from '@/app/helpers/Twitch';

interface TwitchProviderProps {
  children: ReactNode;
}

interface TwitchContextProps {
  streams: TwitchStream[];
  fetchStreams: () => Promise<void>;
  searchForStreams: (query: string) => Promise<void>;
}

export const TwitchContext = createContext<TwitchContextProps | undefined>(undefined);

const TwitchProvider: React.FC<TwitchProviderProps> = ({ children }) => {
  const twitchManager = new TwitchManager();
  const [streams, setStreams] = useState<TwitchStream[]>([]);

  useEffect(() => {
    fetchStreams()
  }, []);

  const fetchStreams = async () => {
    const livestreams = await twitchManager.GetTop100TwitchLiveStreams()
    const updatedLivestreams = updateThumbnailSize(livestreams)

    setStreams(updatedLivestreams)
  }

  const searchForStreams = async (query: string): Promise<void> => {
    // First, we will get all of the channels from the user's query. Then, we will
    // grab the associated livestreams for each of these channels. Finally, we
    // will grab associated channel metadata and merge into the streams pulled
    const queryResults = await twitchManager.SearchForTwitchChannel(query);

    // const updatedLivestreams = updateThumbnailSize(results)

    // return queryResults
  }

  return (
    <TwitchContext.Provider value={{ streams, fetchStreams, searchForStreams }}>
      {children}
    </TwitchContext.Provider>
  );
};

export default TwitchProvider;
