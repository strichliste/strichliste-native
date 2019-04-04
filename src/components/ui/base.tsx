import React from "react";
import { ActivityIndicator, View } from "react-native";
import { getTheme } from "./theme";

export const Loader = () => {
  const theme = getTheme();
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" color={theme.primary} />
    </View>
  );
};
