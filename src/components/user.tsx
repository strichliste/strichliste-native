import React, { useEffect, useState, useMemo } from "react";
import {
  FlatList,
  StyleSheet,
  View,
  Button,
  Text,
  Dimensions
} from "react-native";

import { store } from "../store";
import { startLoadingUsers, UsersState, User } from "../store/reducers";
import { Card } from "./ui/card";

const CARD_WIDTH = 150;

export const useUser = (isActive: boolean) => {
  const [state, setState] = useState<UsersState>(store.getState().user);

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      setState(store.getState().user);
    });

    return unsubscribe;
  }, []);

  const data = useMemo(() => {
    return Object.values(state).filter(
      user => user.isActive === isActive && !user.isDisabled
    );
  }, [state, isActive]);

  return data;
};

const useCardCount = () => {
  const getCount = (width: number) => Math.floor(width / CARD_WIDTH);

  const { width } = Dimensions.get("window");
  const [count, setCount] = useState(getCount(width));
  useEffect(() => {
    const updateCount = () => {
      setCount(getCount(Dimensions.get("window").width));
    };
    Dimensions.addEventListener("change", updateCount);
    return () => Dimensions.removeEventListener("change", updateCount);
  });
  return count;
};

export const Users = () => {
  const [isActive, setIsActive] = useState(true);
  const count = useCardCount();
  const users = useUser(isActive);

  useEffect(() => {
    startLoadingUsers(store.dispatch);
  }, []);

  return (
    <View
      style={{
        flex: 1,
        flexDirection: "column"
      }}
    >
      <View style={{ flexDirection: "row", margin: 16 }}>
        <View style={{ marginRight: 16 }}>
          <Button title="active" onPress={() => setIsActive(true)} />
        </View>
        <Button title="inactive" onPress={() => setIsActive(false)} />
      </View>
      <FlatList
        key={`${count}-${isActive}`}
        data={users}
        keyExtractor={user => user.id.toString()}
        numColumns={count}
        renderItem={({ item }) => <UserCard user={item} />}
      />
    </View>
  );
};

const UserCard: React.FC<{ user: User }> = ({ user }) => {
  return (
    <Card minWidth={CARD_WIDTH} height={75} margin={16}>
      <Text>{user.name}</Text>
      <Text>{user.balance}</Text>
    </Card>
  );
};
