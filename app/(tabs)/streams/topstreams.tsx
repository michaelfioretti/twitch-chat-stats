import React, { useContext } from 'react';
import { ScrollView } from 'react-native';

// UI
import { Box } from '@/components/ui/box';
import { Spinner } from '@/components/ui/spinner';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TwitchContext } from '@/app/managers/TwitchManager';
import StreamList from '@/components/StreamList';

const TopStreams = () => {
  const twitchContext = useContext(TwitchContext);

  if (!twitchContext) {
    return (
      <Box>
        <Spinner size="large" color="#9146FF" />
      </Box>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <StreamList />
      </ScrollView>
    </SafeAreaView>
  );
};

export default TopStreams;
