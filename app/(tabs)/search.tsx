import { useContext, useState } from 'react';
import { StyleSheet, Image, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Input, InputField, InputIcon, InputSlot } from '@/components/ui/input';
import { Pressable } from '@/components/ui/pressable'
import { SearchIcon } from '@/components/ui/icon';
import Ionicons from '@expo/vector-icons/Ionicons';
import { FormControl } from '@/components/ui/form-control';
import { TwitchContext } from '@/app/providers/TwitchProvider';

export default function TabTwoScreen() {
  // const { colorMode } = useContext(ThemeContext);
  const twitchContext = useContext(TwitchContext);
  const [searchQuery, setSearchQuery] = useState("")

  if (!twitchContext) {
    return
  }

  const searchForStreamer = async () => {
    console.log('going to search for this: ', searchQuery)
    const results = await twitchContext.searchForStreamer(searchQuery)
    console.log('here are the results: ', results)
  }

  return (
    <SafeAreaView>
      <FormControl className="my-4">
        <Input variant="underlined" size="sm" className="mx-6 my-2">
          <InputField
            placeholder="Search for a Twitch Streamer..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            onSubmitEditing={() => searchForStreamer()}
          />
          <Pressable onPress={() => searchForStreamer()}>
            <InputIcon as={SearchIcon} className="cursor-pointer h-3 w-3" />
          </Pressable>
        </Input>
      </FormControl>
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
