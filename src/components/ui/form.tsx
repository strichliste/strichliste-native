import React from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import Ripple from "react-native-material-ripple";

import { getTheme } from "./theme";
import { StyleSheet, Text, View } from "react-native";
import { TextStyle } from "./text";

const theme = getTheme();

const buttonStyles = StyleSheet.create({
  base: {
    padding: theme.base * 0.5,
    borderWidth: 0,
    borderRadius: theme.borderRadius
  },
  fab: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
    width: theme.base * 3,
    height: theme.base * 3
  },
  disabled: {
    borderWidth: 2,
    padding: theme.base * 0.5 - 2,
    backgroundColor: "transparent",
    borderColor: theme.buttonDisabled,
    color: theme.buttonDisabled
  },
  primary: {
    backgroundColor: theme.componentBackgroundLight
  },
  greenBG: {
    backgroundColor: theme.buttonGreenBackground
  },
  greenText: {
    color: theme.buttonGreenFont
  },
  redBG: {
    backgroundColor: theme.buttonRedBackground
  },
  redText: {
    color: theme.buttonRedFont
  },
  highlightBG: {
    backgroundColor: theme.buttonHighlightBackground
  },
  highlightText: {
    color: theme.buttonHighlightFont
  }
});

export const Button: React.FC<any> = ({
  isDisabled,
  isPrimary,
  isRed,
  isGreen,
  title,
  ...props
}) => {
  return (
    <Ripple
      {...props}
      disabled={isDisabled}
      style={[
        buttonStyles.base,
        isPrimary ? buttonStyles.primary : undefined,
        isGreen ? buttonStyles.greenBG : undefined,
        isRed ? buttonStyles.redBG : undefined,
        isDisabled ? buttonStyles.disabled : undefined
      ]}
      children={
        <Text
          style={[
            isDisabled ? { color: theme.buttonDisabled } : undefined,
            isGreen ? buttonStyles.greenText : undefined,
            isRed ? buttonStyles.redText : undefined
          ]}
        >
          {title}
        </Text>
      }
    />
  );
};

export const FAB = ({
  isRed,
  isGreen,
  isPrimary,
  isDisabled,
  isHighlight,
  icon = "",
  elevation = 0,
  ...props
}: any) => {
  return (
    <Ripple
      {...props}
      elevation={elevation}
      disabled={isDisabled}
      rippleContainerBorderRadius={100}
      style={[
        buttonStyles.fab,
        isPrimary ? buttonStyles.primary : undefined,
        isGreen ? buttonStyles.greenBG : undefined,
        isRed ? buttonStyles.redBG : undefined,
        isHighlight ? buttonStyles.highlightBG : undefined,
        isDisabled ? buttonStyles.disabled : undefined
      ]}
    >
      <Icon
        size={16}
        color={
          isDisabled
            ? theme.buttonDisabled
            : isGreen
            ? theme.buttonGreenFont
            : isRed
            ? theme.buttonRedFont
            : isHighlight
            ? theme.buttonHighlightFont
            : undefined
        }
        name={icon}
      />
    </Ripple>
  );
};

export const InputStyle = StyleSheet.create({
  input: {
    backgroundColor: theme.componentBackgroundDark,
    borderWidth: 1,
    borderRadius: theme.borderRadius,
    padding: theme.base * 0.5
  },
  fieldset: {
    marginBottom: theme.base
  },
  footer: { flexDirection: "row", justifyContent: "space-between" }
});

export const FieldSet: React.FC<{
  message?: string;
  label?: string;
}> = props => {
  return (
    <View style={InputStyle.fieldset}>
      {props.label && <Text style={TextStyle.base}>{props.label + ":"}</Text>}
      {props.children}
      {props.message && <Text style={TextStyle.red}>{props.message}</Text>}
    </View>
  );
};

export const FormFooter: React.FC<{
  submit(): any;
  onCancel(): void;
}> = props => {
  return (
    <View style={InputStyle.footer}>
      <FAB onPress={props.submit} isHighlight icon="check" />
      <FAB onPress={props.onCancel} isRed icon="times" />
    </View>
  );
};
