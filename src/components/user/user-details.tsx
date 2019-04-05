import React, { useState, useEffect } from "react";
import { User, getUser, startLoadingTransactions } from "../../store/reducers";
import { store } from "../../store";
import { View, ScrollView, Text } from "react-native";
import { UserName } from "../user";
import { Loader } from "../ui/base";
import { getTheme } from "../ui/theme";
import { Currency } from "../ui/text";
import { Payment } from "../transaction/transaction-forms";
import { TransactionListItem } from "../transaction/transaction-list";
import { Card } from "../ui/card";
import { BuyArticleModal } from "../article/article-modals";
import { EditUserModal } from "./select-user-modal";

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

export const UserDetails: React.FC<{
  id: string;
  gotoUser(user: User): void;
}> = ({ id, gotoUser }) => {
  const user = useUserDetails(id);

  useEffect(() => {
    startLoadingTransactions(store.dispatch, id);
  }, [id]);

  if (!user) {
    return <Loader />;
  }

  const transactions = user.transactions
    ? Object.keys(user.transactions)
        .map(a => Number(a))
        .sort((a, b) => b - a)
        .slice(0, 10)
    : [];

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
      <View
        style={{
          marginBottom: theme.base,
          justifyContent: "space-evenly",
          flexDirection: "row"
        }}
      >
        <BuyArticleModal userId={user.id} />
        <EditUserModal user={user} />
      </View>
      <Payment userId={user.id} />
      <View style={{ marginTop: 16 }}>
        <Card>
          <Text style={{ fontSize: theme.base * 1.3 }}>Transactions:</Text>
          {transactions.map(transactionId => (
            <TransactionListItem
              key={transactionId}
              gotoUser={gotoUser}
              id={transactionId}
            />
          ))}
        </Card>
      </View>
    </ScrollView>
  );
};
