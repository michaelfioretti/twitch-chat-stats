import React, { useCallback, useContext, useState } from 'react';
import { RefreshControl, ScrollView } from 'react-native';
import StreamRow from "@/components/StreamRow";
import { TwitchContext } from '@/app/providers/TwitchProvider';
import { Spinner } from "@/components/ui/spinner";
import { Box } from '@/components/ui/box';
import { isWeb } from '@gluestack-ui/nativewind-utils/IsWeb';
import { VStack } from '@/components/ui/vstack';

const StreamList = () => {
  const [refreshing, setRefreshing] = useState(false);
  const twitchContext = useContext(TwitchContext);

  const onRefresh = useCallback(async () => {
    if (!twitchContext) {
      return
    }

    setRefreshing(true);
    await twitchContext.fetchStreams()
    setRefreshing(false);
  }, []);

  if (!twitchContext) {
    console.log('got here...')
    return <Spinner size="large" />;
  }

  const { streams } = twitchContext;

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        paddingBottom: isWeb ? 0 : 100,
        flexGrow: 1,
      }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} title='Pull to refresh' />
      }>
      <VStack className="p-4 pb-0 md:px-10 md:pt-6  w-full" space="2xl">
        {
          streams.map((item, index) => {
            return <StreamRow stream={item} key={index} />
          })
        }
      </VStack>
    </ScrollView>
  );
};

export default StreamList;
