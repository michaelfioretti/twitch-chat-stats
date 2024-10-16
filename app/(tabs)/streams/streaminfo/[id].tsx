import React, { useContext, useEffect, useRef, useState } from 'react';

import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from '@/components/ui/text';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { TwitchContext } from '@/app/providers/TwitchProvider';
import { Spinner } from '@/components/ui/spinner';
import { Box } from '@/components/ui/box';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { TwitchStream } from '@/types/stream';
import { Divider } from '@/components/ui/divider';
import { View, StyleSheet, Button, Dimensions } from 'react-native';
import { WebView } from 'react-native-webview';
import Constants from 'expo-constants';

const StreamInfo = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const twitchContext = useContext(TwitchContext);

  useEffect(() => {
    router.setParams({ title: activeStream.user_name })
  }, [])

  if (!twitchContext) {
    return <Spinner size="large" />;
  }

  const { streams } = twitchContext;
  const activeStream: TwitchStream = streams.filter((stream) => stream.id == id)[0]

  if (!activeStream) {
    return
  }

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <WebView
        source={{ uri: `https://player.twitch.tv/?channel=${activeStream.user_name}&parent=localhost` }}
        javaScriptEnabled={true}
        allowsInlineMediaPlayback={true}
        startInLoadingState={true}
        allowsFullscreenVideo={true}
      />
    </SafeAreaView>
  );
};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeAreaView: {
    width: width,
    height: height,
  },
});


export default StreamInfo;
