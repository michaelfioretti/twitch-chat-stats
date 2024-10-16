import React, { useState, useEffect, createContext, ReactNode } from 'react';
import axios from 'axios';
import { TwitchStream } from '@/types/stream';

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
}

const TwitchContext = createContext<TwitchContextProps | undefined>(undefined);

const TWITCH_BASE_URL = 'https://api.twitch.tv/helix';

// Manager to fetch top 100 livestreams and associated streamer info
const TwitchManager = () => {
  const [streams, setStreams] = useState<TwitchStream[]>([]);
  const [streamers, setStreamers] = useState<Streamer[]>([]);

  const fetchStreams = async () => {
    try {
      // Step 1: Get Twitch OAuth Token
      const token = await getTwitchToken();

      // Step 2: Get the top 100 live streams
      const streamsResponse = await axios.get(`${TWITCH_BASE_URL}/streams`, {
        params: { 'first': 100 },
        headers: {
          'Client-ID': process.env.EXPO_PUBLIC_TWITCH_CLIENT_ID,
          'Authorization': `Bearer ${token}`,
        },
      });

      const streamData = streamsResponse.data.data;

      streamData.forEach((stream: TwitchStream) => stream.thumbnail_url = replaceThumbnailSize(stream.thumbnail_url, 400, 200))
      setStreams(streamData);

      // Step 3: Fetch Streamer Info
      const userIds = streamData.map((stream: TwitchStream) => stream.user_id);
      const streamersResponse = await axios.get(`${TWITCH_BASE_URL}/users`, {
        params: { id: userIds },
        headers: {
          'Client-ID': process.env.EXPO_PUBLIC_TWITCH_CLIENT_ID,
          Authorization: `Bearer ${token}`,
        },
      });

      setStreamers(streamersResponse.data.data);

      console.info('data from Twitch has been loaded!!!',)
    } catch (error) {
      console.error('Error fetching Twitch streams:', error);
    }
  };

  useEffect(() => {
    fetchStreams();
  }, []);

  return { streams, streamers, fetchStreams };
};

const getTwitchToken = async () => {
  const response = await axios.post(`https://id.twitch.tv/oauth2/token`, {
    client_id: process.env.EXPO_PUBLIC_TWITCH_CLIENT_ID,
    client_secret: process.env.EXPO_PUBLIC_TWITCH_CLIENT_SECRET,
    grant_type: 'client_credentials',
  })

  return response.data.access_token;
};

function replaceThumbnailSize(
  thumbnailUrl: string,
  width: number,
  height: number
): string {
  return thumbnailUrl
    .replace("{width}", width.toString())
    .replace("{height}", height.toString());
}


export { TwitchManager, TwitchContext };
