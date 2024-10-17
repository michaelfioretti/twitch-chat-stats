import { TwitchStream } from '@/types/stream';
import axios from 'axios';

const TWITCH_BASE_URL = 'https://api.twitch.tv/helix';

class TwitchManager {
  async SearchForTwitchChannel(query: string) {
    const token = await this.GetTwitchToken();
    const searchUrl = 'https://api.twitch.tv/helix/search/channels';

    try {
      const response = await axios.get(searchUrl, {
        headers: {
          'Client-ID': process.env.EXPO_PUBLIC_TWITCH_CLIENT_ID,
          Authorization: `Bearer ${token}`,
        },
        params: {
          query: query,
        },
      });

      return response.data.data;
    } catch (error) {
      console.error('Error searching for channels:', error);
      throw error;
    }
  }

  async GetStreamerInfoFromStreams(oauthToken: string, streams: TwitchStream[]) {
    const userIds = streams.map((stream: TwitchStream) => stream.user_id);
    const streamersResponse = await axios.get(`${TWITCH_BASE_URL}/users`, {
      params: { id: userIds },
      headers: {
        'Client-ID': process.env.EXPO_PUBLIC_TWITCH_CLIENT_ID,
        Authorization: `Bearer ${oauthToken}`,
      },
    });

    return streamersResponse.data.data

  }

  async GetTwitchToken(): Promise<string> {
    const response = await axios.post(`https://id.twitch.tv/oauth2/token`, {
      client_id: process.env.EXPO_PUBLIC_TWITCH_CLIENT_ID,
      client_secret: process.env.EXPO_PUBLIC_TWITCH_CLIENT_SECRET,
      grant_type: 'client_credentials',
    })

    return response.data.access_token;
  };

  async GetTop100TwitchLiveStreams(oauthToken: string): Promise<TwitchStream[]> {
    const streamsResponse = await axios.get(`${TWITCH_BASE_URL}/streams`, {
      params: { 'first': 100 },
      headers: {
        'Client-ID': process.env.EXPO_PUBLIC_TWITCH_CLIENT_ID,
        'Authorization': `Bearer ${oauthToken}`,
      },
    });

    return streamsResponse.data.data;
  }
}

export default TwitchManager
