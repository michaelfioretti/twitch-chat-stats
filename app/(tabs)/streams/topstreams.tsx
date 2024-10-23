import React, { useCallback, useContext, useState } from 'react';
import { ScrollView, RefreshControl } from 'react-native';

// UI
import { SafeAreaView } from 'react-native-safe-area-context';
import StreamList from '@/components/StreamList';
import { Heading } from '@/components/ui/heading';
import { VStack } from '@/components/ui/vstack';
import { Text } from '@/components/ui/text';
import { Center } from '@/components/ui/center';

const TopStreams = () => {
  return (
    <SafeAreaView>
      <Center>
        <VStack
          className="p-4 pb-0 self-center md:mb-2"
          space="2xl"
        >
          <Heading size="2xl" className='font-roboto'>
            Top 100 Livestreams
          </Heading>
          <Text size="lg">
            The top 100 livestreams on Twitch by viewer count.
          </Text>
        </VStack>
      </Center>
      <StreamList />
    </SafeAreaView >
  );
};

export default TopStreams;
