/**
 * Note: Expo router currently has a bug that doesn't allow it to navigate
 * to tbe appropriate route on load.
 *
 * See thread here: https://github.com/expo/router/issues/428
 */
import { Redirect } from "expo-router";

const Index = () => {
  return <Redirect href="/streams" />;
};
export default Index;
