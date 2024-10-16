import { TwitchStream } from "@/types/stream";

export function updateThumbnailSize(streams: TwitchStream[]): TwitchStream[] {
  for (const stream of streams) {
    stream.thumbnail_url = replaceThumbnailSize(stream.thumbnail_url, 400, 200)
  }

  return streams
}

export function replaceThumbnailSize(
  thumbnailUrl: string,
  width: number,
  height: number
): string {
  return thumbnailUrl
    .replace("{width}", width.toString())
    .replace("{height}", height.toString());
}
