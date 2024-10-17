import { useContext, useState } from 'react';
import { StyleSheet, Image, Platform, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Input, InputField, InputIcon } from '@/components/ui/input';
import { Pressable } from '@/components/ui/pressable'
import { SearchIcon } from '@/components/ui/icon';
import { FormControl } from '@/components/ui/form-control';
import { TwitchContext } from '@/app/providers/TwitchProvider';
import { Streamer, TwitchStream } from '@/types/stream';
import StreamList from '@/components/StreamList';
import { Box } from '@/components/ui/box';
import { HStack } from '@/components/ui/hstack';
import StreamRow from '@/components/StreamRow';
import { isWeb } from '@gluestack-ui/nativewind-utils/IsWeb';
import { Spinner } from '@/components/ui/spinner';
import { addStreamersToStream } from '@/app/helpers/Twitch';
import ChannelRow from '@/components/ChannelRow';

export default function SearchScreen() {
  // const { colorMode } = useContext(ThemeContext);
  const twitchContext = useContext(TwitchContext);
  const [searching, setSearching] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<TwitchStream[]>([]);

  if (!twitchContext) {
    return <Spinner size="large" />;
  }

  const { streamers } = twitchContext;

  // Searches Twitch for livestreams by the channel provided
  const searchForStreamers = async () => {
    setSearching(true)
    const twitchStreamerResults = await twitchContext.searchForStreamers(searchQuery)

    // Match streamers and streams by user_id to build proper streamer data
    const results = addStreamersToStream(twitchStreamerResults, streamers)
    console.log('results length...: ', results.length, typeof results)

    setSearchResults(results)
    console.log('\n\n\nwe now have this...: ', searchResults)
    setSearching(false)
  }

  return (
    <SafeAreaView>
      <FormControl className="my-4">
        <Input variant="underlined" size="sm" className="mx-6 my-2">
          <InputField
            placeholder="Search for live Twitch channels..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            onSubmitEditing={() => searchForStreamers()}
          />
          <Pressable onPress={() => searchForStreamers()} disabled={searching}>
            <InputIcon as={SearchIcon} className="cursor-pointer h-3 w-3" />
          </Pressable>
        </Input>
      </FormControl>
      {
        searching ? <Spinner size="large" /> : <></>
      }
      {
        !searching || !searchResults.length && <></>
      }
      <ScrollView>
        {
          searchResults.map((stream, index) => {
            return <StreamRow stream={stream} key={index} />
          })
        }
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
