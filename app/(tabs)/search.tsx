import { useContext, useState } from 'react';
import { StyleSheet, Image, Platform, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Input, InputField, InputIcon } from '@/components/ui/input';
import { Pressable } from '@/components/ui/pressable'
import { InfoIcon, SearchIcon } from '@/components/ui/icon';
import { FormControl } from '@/components/ui/form-control';
import { TwitchContext } from '@/app/providers/TwitchProvider';
import { TwitchStream } from '@/types/stream';
import StreamRow from '@/components/StreamRow';
import { Spinner } from '@/components/ui/spinner';
import { Alert, AlertIcon, AlertText } from '@/components/ui/alert';
import { Box } from '@/components/ui/box';

export default function SearchScreen() {
  // const { colorMode } = useContext(ThemeContext);
  const twitchContext = useContext(TwitchContext);
  const [searching, setSearching] = useState(false)
  const [searchError, setSearchError] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<TwitchStream[]>([]);

  if (!twitchContext) {
    return <Spinner size="large" />;
  }

  // Searches Twitch for livestreams by the channel provided
  const searchForStreams = async () => {
    setSearchError(false)
    setSearching(true)

    try {
      const twitchStreamerResults = await twitchContext.searchForStreams(searchQuery)
      setSearchResults(twitchStreamerResults)
    } catch (e) {
      setSearchError(true)
    }

    setSearching(false)
  }

  return (
    <SafeAreaView>
      <FormControl className="my-4">
        <Input variant="underlined" size="sm" className="mx-6 my-2">
          <InputField
            placeholder="Search for live Twitch channels..."
            value={searchQuery}
            onChangeText={(text) => {
              // Clear out current results once the user starts typing again
              setSearchResults([])
              setSearchQuery(text)
            }}
            onSubmitEditing={() => searchForStreams()}
          />
          <Pressable onPress={() => searchForStreams()} disabled={searching}>
            <InputIcon as={SearchIcon} className="cursor-pointer h-3 w-3" />
          </Pressable>
        </Input>
      </FormControl>
      {
        searching ? <Spinner size="large" /> : <></>
      }
      {
        searchError ? <Box>
          <Alert action="error" variant="solid">
            <AlertIcon as={InfoIcon} />
            <AlertText>Description of alert!</AlertText>
          </Alert>
        </Box> : <></>
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
