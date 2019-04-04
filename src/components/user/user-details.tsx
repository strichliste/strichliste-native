import React, { useState, useEffect } from "react";
import { User, getUser } from "../../store/reducers";
import { store } from "../../store";
import { View } from "react-native";
import { UserName } from "../user";
import { Loader } from "../ui/base";
import { getTheme } from "../ui/theme";
import { Currency } from "../ui/text";

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
    <View style={{ margin: theme.base }}>
      <View style={{ justifyContent: "space-evenly", flexDirection: "row" }}>
        <UserName name={user.name} />
        <Currency value={user.balance} />
      </View>
    </View>
  );
};
