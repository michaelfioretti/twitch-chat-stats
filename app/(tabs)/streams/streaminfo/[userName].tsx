import React, { useContext, useEffect } from 'react';

import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { TwitchContext } from '@/app/providers/TwitchProvider';
import { Spinner } from '@/components/ui/spinner';
import { Box } from '@/components/ui/box';
import { VStack } from '@/components/ui/vstack';
import { StyleSheet, Dimensions } from 'react-native';
import { WebView } from 'react-native-webview';

const StreamInfo = () => {
  const { userName } = useLocalSearchParams();
  const router = useRouter();
  const twitchContext = useContext(TwitchContext);

  useEffect(() => {
    router.setParams({ title: userName })
  }, [])

  if (!twitchContext) {
    return <Spinner size="large" />;
  }

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <VStack>
        <Box style={styles.streamContainer}>
          <WebView
            source={{ uri: `https://player.twitch.tv/?channel=${userName}&parent=localhost` }}
            javaScriptEnabled={true}
            allowsInlineMediaPlayback={true}
            startInLoadingState={true}
            style={styles.stream}
          />
        </Box>

        <Box style={styles.chatContainer}>
          <WebView
            source={{ uri: `https://www.twitch.tv/embed/${userName}/chat?parent=localhost` }}
            style={styles.chat}
          />
        </Box>
      </VStack>
      {/* <WebView
        source={{ uri: `https://player.twitch.tv/?channel=${activeStream.user_name}&parent=localhost` }}
        javaScriptEnabled={true}
        allowsInlineMediaPlayback={true}
        startInLoadingState={true}
        allowsFullscreenVideo={true}
      /> */}
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
  streamContainer: {
    height: 300, // Adjust height based on your needs
  },
  stream: {
    flex: 1,
  },
  chatContainer: {
    height: 400, // Adjust height based on your needs
    marginTop: 10,
  },
  chat: {
    flex: 1,
  },
});


export default StreamInfo;
