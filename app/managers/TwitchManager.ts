import { TwitchStream } from '@/types/stream';
import axios from 'axios';

// Note: Would like this in an env variable even if it is public, but
// expo env variables are not working as expected at the moment
const API_URL = 'https://wthqeqkwrf.execute-api.us-east-1.amazonaws.com'

class TwitchManager {
  async GetTop100TwitchLiveStreams(): Promise<TwitchStream[]> {
    const streamsResponse = await axios.get(`${API_URL}/livestreams`)
    return streamsResponse.data.results
  }

  async SearchForTwitchStreams(query: string): Promise<TwitchStream[]> {
    try {
      const response = await axios.post(`${API_URL}/search`, { query });
      return response.data.results;
  } catch (error) {
      throw error;
    }
  }
}


export default TwitchManager
