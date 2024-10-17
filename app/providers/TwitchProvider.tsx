import React, { createContext, ReactNode, useEffect, useState } from 'react';
import TwitchManager from "../managers/TwitchManager"
import { Streamer, TwitchChannel, TwitchStream } from '@/types/stream';
import { updateThumbnailSize } from '../helpers/Twitch';

interface TwitchProviderProps {
  children: ReactNode;
}

interface TwitchContextProps {
  streams: TwitchStream[];
  streamers: Streamer[];
  fetchStreams: () => Promise<void>;
  searchForStreamers: (query: string) => Promise<TwitchStream[]>;
  searchForSpecificLiveStreams: (channels: TwitchChannel[]) => Promise<TwitchStream[]>;
}

export const TwitchContext = createContext<TwitchContextProps | undefined>(undefined);

const TwitchProvider: React.FC<TwitchProviderProps> = ({ children }) => {
  const twitchManager = new TwitchManager();
  // "streams" are a list of Twitch Livestreams, while "streamers" are the
  // associated streamers for each live stream and their metadata (profile picture, etc)
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

  const searchForStreamers = async (query: string): Promise<TwitchStream[]> => {
    // First, we will get all of the channels from the user's query. Then, we will
    // grab the associated livestreams for each of these channels
    const queryResults = await twitchManager.SearchForTwitchChannel(query);
    const livestreamsForChannels = await twitchManager.GetSpecificTwitchLiveStreams(queryResults)

    return livestreamsForChannels
  }

  const searchForSpecificLiveStreams = async (channels: TwitchChannel[]) => {
    const results = await twitchManager.GetSpecificTwitchLiveStreams(channels)
    return results
  }

  return (
    <TwitchContext.Provider value={{ streams, streamers, fetchStreams, searchForStreamers, searchForSpecificLiveStreams }}>
      {children}
    </TwitchContext.Provider>
  );
};

export default TwitchProvider;
