export interface TwitchStream {
  game_id: string,
  game_name: string,
  id: string,
  is_mature: boolean,
  language: string,
  profileImage: string | undefined,
  started_at: string,
  streamerName: string | undefined,
  tag_ids: string[],
  tags: string[],
  thumbnail_url: string,
  title: string,
  type: string,
  user_id: string,
  user_login: string,
  user_name: string,
  viewer_count: number
}
