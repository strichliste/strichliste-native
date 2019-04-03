import React from "react";
import { View } from "react-native";
import { getTheme } from "./theme";

export const Card: React.FC<{
  margin?: number;
  width?: number;
  minWidth?: number;
  height?: number;
}> = ({ margin = 0, width, minWidth, height, children }) => {
  const theme = getTheme();

  return (
    <View
      style={{
        padding: theme.base,
        margin,
        backgroundColor: theme.componentBackgroundLight,
        borderRadius: theme.borderRadius,
        borderWidth: 1,
        borderColor: theme.border,
        width,
        minWidth,
        height
      }}
    >
      {children}
    </View>
  );
};
