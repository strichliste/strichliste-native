import React, { useEffect, useState, useMemo } from "react";
import { FlatList, View, Dimensions } from "react-native";
import Ripple from "react-native-material-ripple";

import { store } from "../store";
import { startLoadingUsers, UsersState, User } from "../store/reducers";
import { Card } from "./ui/card";
import { Currency } from "./ui/text";
import { Button } from "./ui/form";
import { Text } from "./ui/base";

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
  const getCount = (width: number) => Math.floor(width / (CARD_WIDTH + 16));

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

export const Users: React.FC<{ onSelect(user: User): void }> = ({
  onSelect
}) => {
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
      <View
        style={{
          flexDirection: "row",
          margin: 16,
          marginTop: 32
        }}
      >
        <View style={{ marginRight: 16 }}>
          <Button
            isPrimary={isActive}
            title="ACTIVE USERS"
            onPress={() => setIsActive(true)}
          />
        </View>
        <Button
          title="INACTIVE USERS"
          isPrimary={!isActive}
          onPress={() => setIsActive(false)}
        />
      </View>
      <FlatList
        key={`${count}-${isActive}`}
        data={users}
        keyExtractor={user => user.id.toString()}
        numColumns={count}
        renderItem={({ item }) => (
          <View style={{ marginLeft: 16, marginBottom: 16 }}>
            <UserCard onPress={onSelect} user={item} />
          </View>
        )}
      />
    </View>
  );
};

export const UserName: React.FC<{ name: string; size?: number }> = ({
  name,
  size
}) => (
  <Text
    style={{ fontWeight: "bold", fontSize: size }}
    numberOfLines={1}
    ellipsizeMode="tail"
  >
    {name}
  </Text>
);

const UserCard: React.FC<{ user: User; onPress(user: User): void }> = ({
  user,
  onPress
}) => {
  return (
    <Ripple onPress={() => onPress(user)}>
      <Card width={CARD_WIDTH} height={75}>
        <UserName name={user.name} />
        <Currency value={user.balance} />
      </Card>
    </Ripple>
  );
};
