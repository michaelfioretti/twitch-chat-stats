import React from 'react';
import { Text } from '@/components/ui/text'
import { HStack } from '@/components/ui/hstack';
import { Pressable } from 'react-native';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { TwitchStream } from '@/types/stream';
import { VStack } from '@/components/ui/vstack';
import { EyeIcon, Icon } from "@/components/ui/icon"
import { Image } from '@/components/ui/image'
import { router } from 'expo-router';
import { Box } from '@/components/ui/box';
import { Badge, BadgeText } from '@/components/ui/badge';

interface StreamRowProps {
  stream: TwitchStream
}

const StreamRow: React.FC<StreamRowProps> = ({ stream }) => {
  return (
    <Pressable onPress={() => {
      router.push({ pathname: `/streams/streaminfo/[userName]`, params: { userName: stream.user_name } })
    }}>
      <Box className="rounded-md">
        <Image
          source={stream.thumbnail_url}
          className={`w-full h-72 scale-100 opacity-100`}
          alt={stream.title}
        />
      </Box>
      <HStack className="justify-between py-2 items-start">
        <VStack space="md" className="flex-1">
          <HStack space='sm'>
            <Avatar size="sm">
              <AvatarImage
                source={{
                  uri: stream.profileImage,
                }}
              />
            </Avatar>
            <Text className="font-semibold text-typography-900">
              {stream.streamerName}
            </Text>
          </HStack>
          <Text size="sm" className="text-typography-500">
            {stream.title}
          </Text>
          <HStack>
            {stream.viewer_count && <>
              <Text
                size="sm"
                className="font-semibold text-typography-900"
              >
                {new Intl.NumberFormat().format(stream.viewer_count)}
              </Text>
              <Text size="sm" className="pl-1 text-typography-900">
                viewers
              </Text>
            </>}
          </HStack>
          <HStack space='sm'>
            {
              stream.tags.map((tag, index) => {
                return <Badge size="sm" variant="outline" action="info" key={index}>
                  <BadgeText>{tag}</BadgeText>
                </Badge>
              })
            }
          </HStack>
        </VStack>
      </HStack>
    </Pressable>
  );
};

export default StreamRow;
