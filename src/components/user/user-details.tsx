import React, { useState, useEffect } from "react";
import { User, getUser } from "../../store/reducers";
import { store } from "../../store";
import { View, ScrollView } from "react-native";
import { UserName } from "../user";
import { Loader } from "../ui/base";
import { getTheme } from "../ui/theme";
import { Currency } from "../ui/text";
import { Payment } from "../transaction/transaction-forms";

const theme = getTheme();

const useUserDetails = (id: string) => {
  const [user, setUser] = useState<User | undefined>(
    getUser(store.getState(), id)
  );

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      setUser(getUser(store.getState(), id));
    });

    return unsubscribe;
  }, [id]);

  return user;
};

export const UserDetails: React.FC<{ id: string }> = ({ id }) => {
  const user = useUserDetails(id);

  if (!user) {
    return <Loader />;
  }

  return (
    <ScrollView style={{ margin: theme.base }}>
      <View
        style={{
          margin: theme.base * 2,
          justifyContent: "space-evenly",
          flexDirection: "row"
        }}
      >
        <UserName size={theme.base * 1.5} name={user.name} />
        <Currency size={theme.base * 1.5} value={user.balance} />
      </View>
      <Payment userId={user.id} />
    </ScrollView>
  );
};
