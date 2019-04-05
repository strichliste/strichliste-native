import React, { useState } from "react";
import { User } from "../../store/reducers";
import { View } from "react-native";

export const SendMoney = () => {
  const [user, setUser] = useState<User | null>(null);

  return <View />;
};
