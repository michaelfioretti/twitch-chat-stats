import { Streamer, TwitchStream } from "@/types/stream";

/**
 * Loops through all passed in Twitch streams and updates their thumbnail size/url
 *
 * @param   {TwitchStream[]}  streams An array of Twitch streams
 * @return  {TwitchStream[]}          The updated Twitch streams
 */
export function updateThumbnailSize(streams: TwitchStream[]): TwitchStream[] {
  for (const stream of streams) {
    stream.thumbnail_url = replaceThumbnailSize(stream.thumbnail_url, 400, 200)
  }

  return streams
}

/**
 * Updates default thumbnail size pulled from Twitch
 *
 * @return  {string}  The updated thumbnail URL with the passed in dimensions
 */
export function replaceThumbnailSize(
  thumbnailUrl: string,
  width: number,
  height: number
): string {
  return thumbnailUrl
    .replace("{width}", width.toString())
    .replace("{height}", height.toString());
}

// Match streamers and streams by user_id to build proper streamer data
export function addStreamersToStream(streams: TwitchStream[], streamers: Streamer[]): TwitchStream[] {
  return streams.map((stream) => {
    const streamer = streamers.find(s => s.id === stream.user_id);
    return {
      ...stream,
      streamerName: streamer?.display_name,
      profileImage: streamer?.profile_image_url,
    };
  })
}
