import React from "react";
import { ActivityIndicator, View } from "react-native";
import { getTheme } from "./theme";

const theme = getTheme();

export const Loader = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" color={theme.primary} />
    </View>
  );
};

export const BaseWrapper: React.FC = props => (
  <View
    style={{
      flex: 1,
      flexDirection: "column",
      backgroundColor: theme.mainBackground
    }}
  >
    {props.children}
  </View>
);
