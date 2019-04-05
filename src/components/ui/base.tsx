import React from "react";
import {
  ActivityIndicator,
  View,
  Text as NativeText,
  TextProps
} from "react-native";
import { getTheme } from "./theme";
import { TextStyle } from "./text";

const theme = getTheme();

export const Text: React.FC<TextProps> = ({ style, ...props }) => (
  <NativeText style={[TextStyle.base, style]} {...props} />
);

export const FabBottomRight: React.FC = props => (
  <View style={{ position: "absolute", bottom: 16, right: 16 }}>
    {props.children}
  </View>
);

export const FabBottomLeft: React.FC = props => (
  <View style={{ position: "absolute", bottom: 16, left: 16 }}>
    {props.children}
  </View>
);

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

export const ListItem: React.FC = props => (
  <View
    style={{
      borderBottomColor: theme.border,
      borderBottomWidth: 1,
      paddingBottom: 8,
      paddingTop: 8
    }}
  >
    {props.children}
  </View>
);
