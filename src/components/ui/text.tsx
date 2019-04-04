import React from "react";
import { Text, StyleSheet } from "react-native";

import { getTheme } from "./theme";

const theme = getTheme();

export const formatCurrency = (value: number) => {
  return `${value / 100} €`;
};

export const Currency: React.FC<{ value: number; size?: number }> = ({
  value,
  size
}) => {
  return (
    <Text
      style={{
        fontSize: size,
        color: value < 0 ? theme.redText : theme.greenText
      }}
    >
      {formatCurrency(value)}
    </Text>
  );
};

export const TextStyle = StyleSheet.create({
  base: {
    color: theme.text
  },
  red: { color: theme.redText }
});
