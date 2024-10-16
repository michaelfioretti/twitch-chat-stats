import React, { useContext } from 'react';
import { ScrollView } from 'react-native';

// UI
import { SafeAreaView } from 'react-native-safe-area-context';
import StreamList from '@/components/StreamList';

const TopStreams = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <StreamList />
      </ScrollView>
    </SafeAreaView>
  );
};

export default TopStreams;
