import React from "react";
import { Stack, useRouter } from "expo-router";

export default function StackLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="topstreams"
        options={{
          header: (() => null),
          title: "Streams"
        }}
      />
      <Stack.Screen
        name="streaminfo/[userName]"
        // Note: leaving as "any" for now since it gets pretty convoluted to extend this type
        options={(props: any) => ({
          title: props.route.params.userName,
        })}
      />
    </Stack>
  );
}
