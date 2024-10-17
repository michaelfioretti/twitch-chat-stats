import React, { createContext, ReactNode, useEffect, useState } from 'react';
import TwitchManager from "../managers/TwitchManager"
import { TwitchStream } from '@/types/stream';
import { updateThumbnailSize } from '../helpers/Twitch';

interface TwitchProviderProps {
  children: ReactNode;
}

interface Streamer {
  id: string;
  display_name: string;
  profile_image_url: string;
  description: string;
}

interface TwitchContextProps {
  streams: TwitchStream[];
  streamers: Streamer[];
  fetchStreams: () => Promise<void>;
  searchForStreamer: (query: string) => Promise<void>;
}

export const TwitchContext = createContext<TwitchContextProps | undefined>(undefined);

const TwitchProvider: React.FC<TwitchProviderProps> = ({ children }) => {
  const twitchManager = new TwitchManager();
  const [streams, setStreams] = useState<TwitchStream[]>([]);
  const [streamers, setStreamers] = useState<Streamer[]>([]);

  useEffect(() => {
    fetchStreams()
  }, []);

  const fetchStreams = async () => {
    const oauthToken = await twitchManager.GetTwitchToken()

    if (!oauthToken) {
      throw new Error("No oauth token provided")
    }

    const livestreams = await twitchManager.GetTop100TwitchLiveStreams(oauthToken)

    if (!livestreams || !livestreams.length) {
      throw new Error("No livestreams")
    }

    const updatedLivestreams = updateThumbnailSize(livestreams)

    setStreams(updatedLivestreams)

    const streamerInfo = await twitchManager.GetStreamerInfoFromStreams(oauthToken, livestreams)

    if (!streamerInfo) {
      throw new Error("Unable to process streamer information")
    }

    setStreamers(streamerInfo)
  }

  const searchForStreamer = async (query: string) => {
    const queryResults = await twitchManager.SearchForTwitchChannel(query);
    console.log('here are the query results')
    console.log(queryResults)
  }

  return (
    <TwitchContext.Provider value={{ streams, streamers, fetchStreams, searchForStreamer }}>
      {children}
    </TwitchContext.Provider>
  );
};

export default TwitchProvider;
