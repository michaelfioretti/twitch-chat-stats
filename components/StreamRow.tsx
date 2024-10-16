import React from 'react';
import { Text } from '@/components/ui/text'
import { HStack } from '@/components/ui/hstack';
import { Pressable } from 'react-native';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { TwitchStream } from '@/types/stream';
import { VStack } from '@/components/ui/vstack';
import { EyeIcon, Icon } from "@/components/ui/icon"
import { GridItem } from '@/components/ui/grid';
import { Image } from '@/components/ui/image'
import { router } from 'expo-router';
import { Box } from '@/components/ui/box';

interface StreamRowProps {
  stream: TwitchStream
}

const StreamRow: React.FC<StreamRowProps> = ({ stream }) => {
  return (
    <Pressable onPress={() => {
      router.push(`/streams/streaminfo/${stream.id}`)
    }}>
      <Box className="overflow-hidden rounded-md h-72">
        <Image
          source={stream.thumbnail_url}
          className={`w-full h-72 scale-100 opacity-100`}
          alt={stream.title}
        />
      </Box>
      <Box
        key={stream.id}
        className={`flex-1 my-2 lg:my-0 lg:ml-0"`}
      >
        <HStack className="justify-between py-2 items-start">
          <VStack space="sm" className="flex-1">
            <HStack>
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
              <Text
                size="sm"
                className="font-semibold text-typography-900"
              >
                {new Intl.NumberFormat().format(stream.viewer_count)}
              </Text>
              <Text size="sm" className="pl-1 text-typography-900">
                viewers
              </Text>
            </HStack>
          </VStack>
        </HStack>
      </Box>
      {/* <GridItem
        _extra={{
          className: "col-span-12 sm:col-span-6 lg:col-span-4",
        }}
      >
        <HStack
          space="md"
          className="border border-border-300 rounded-lg p-4 items-center justify-between"
        >
          <HStack space="xl" className="items-center">
            <Avatar>
              <AvatarImage
                source={{
                  uri: stream.profileImage,
                }}
              />
            </Avatar>
            <VStack>
              <Text className="font-semibold text-typography-900 line-clamp-1">
                {stream.streamerName}
              </Text>
              <HStack className='items-start'>
                <Icon as={EyeIcon} className="text-typography-500 m-2 w-4 h-4" />
                <Text className="line-clamp-1">
                  {new Intl.NumberFormat().format(stream.viewer_count)}
                </Text>
              </HStack>
            </VStack>
          </HStack>
        </HStack>
      </GridItem> */}
    </Pressable>
  );
};

export default StreamRow;
