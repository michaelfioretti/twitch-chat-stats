import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Image, Platform } from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Box } from '@/components/ui/box';
import { Input, InputField, InputIcon, InputSlot } from '@/components/ui/input';
import { SearchIcon } from '@/components/ui/icon';
import { useContext } from 'react';

export default function TabTwoScreen() {
  // const { colorMode } = useContext(ThemeContext);

  return (
    <SafeAreaView>
      <Box className="p-5 md:hidden w-full">
        <Input variant="rounded" size="sm" className="w-full h-10">
          <InputField placeholder="Anywhere • Any week • Add guests" />
          <InputSlot className="bg-primary-500 rounded-full h-6 w-6 m-1.5">
            <InputIcon
              as={SearchIcon}
              // color={colorMode === "light" ? "#FEFEFF" : "#171717"}
              color="#171717"
            />
          </InputSlot>
        </Input>
      </Box>

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
