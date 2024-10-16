import React from "react";
import { Stack, useRouter } from "expo-router";

export default function StackLayout() {
  const router = useRouter();

  return (
    <Stack>
      <Stack.Screen
        name="topstreams"
        options={{
          title: "Top 100 Twitch Streams"
        }}
      />
      <Stack.Screen
        name="streaminfo/[id]"
        options={{
          title: "Stream Info"
        }}
      />
    </Stack>
  );
}
