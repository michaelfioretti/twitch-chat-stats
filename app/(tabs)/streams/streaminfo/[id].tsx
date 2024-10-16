import React, { useContext } from 'react';

import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from '@/components/ui/text';
import { useLocalSearchParams } from 'expo-router';
import { TwitchContext } from '@/app/managers/TwitchManager';
import { Spinner } from '@/components/ui/spinner';
import { Box } from '@/components/ui/box';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { TwitchStream } from '@/types/stream';
import { Divider } from '@/components/ui/divider';

const StreamInfo = () => {
  const { id } = useLocalSearchParams();
  const twitchContext = useContext(TwitchContext);

  if (!twitchContext) {
    return <Spinner size="large" />;
  }

  const { streams, streamers } = twitchContext;
  const activeStream: TwitchStream = streams.filter((stream) => stream.id == id)[0]

  if (!activeStream) {
    return
  }

  return (
    <SafeAreaView>
      <Box>
        <VStack>

          {/* Stream Title */}
          <Text>
            {activeStream.title}
          </Text>

          {/* Streamer Information */}
          <HStack className='items-center'>
            {/* <Image source={{
              uri: activeStream.thumbnail_url,
            }} /> */}
            <Text>
              {activeStream.streamerName}
            </Text>
            <Divider />
            <Text>
              {activeStream.viewer_count} viewers
            </Text>
          </HStack>

          {/* Stream Category */}
          <Text>
            {activeStream.game_name}
          </Text>

          {/* Stream Preview Image */}
          {/* <Image
            source={{ uri: 'https://example.com/stream-preview.jpg' }} // Replace with actual preview URL
            alt="Stream Preview"
            height={200}
            borderRadius={12}
          /> */}

        </VStack>
      </Box>
    </SafeAreaView>
  );
};

export default StreamInfo;
