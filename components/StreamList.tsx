import React, { useContext } from 'react';
import { FlatList, ScrollView } from 'react-native';
import StreamRow from "@/components/StreamRow";
import { SafeAreaView } from 'react-native-safe-area-context';
import { TwitchContext } from '@/app/managers/TwitchManager';
import { Spinner } from "@/components/ui/spinner";
import { Box } from './ui/box';
import { isWeb } from '@gluestack-ui/nativewind-utils/IsWeb';
import { VStack } from '@/components/ui/vstack';
import { Grid } from '@/components/ui/grid';

// Main component to list streamers
const StreamList = () => {
  const twitchContext = useContext(TwitchContext);

  if (!twitchContext) {
    return <Spinner size="large" />;
  }

  const { streams, streamers } = twitchContext;

  // Match streamers and streams by user_id to build proper streamer data
  const combinedData = streams.map(stream => {
    const streamer = streamers.find(s => s.id === stream.user_id);
    return {
      ...stream,
      streamerName: streamer?.display_name,
      profileImage: streamer?.profile_image_url,
    };
  });

  return (
    <SafeAreaView>
      <Box className="flex-1 ">
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: isWeb ? 0 : 100,
            flexGrow: 1,
          }}
          className="flex-1 mb-20 md:mb-2"
        >
          <VStack className="p-4 pb-0 md:px-10 md:pt-6  w-full" space="2xl">
            {
              combinedData.map((item, index) => {
                return <StreamRow stream={item} key={index} />
              })
            }
          </VStack>
        </ScrollView>
      </Box>
    </SafeAreaView>
  );
};

export default StreamList;
