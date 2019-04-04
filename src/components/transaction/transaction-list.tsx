import React from "react";
import { Text, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

import { User, Article, getTransaction } from "../../store/reducers";
import { store } from "../../store";
import { Currency } from "../ui/text";
import { getTheme } from "../ui/theme";

const theme = getTheme();

interface ListItemProps {
  user?: User;
  article?: Article;
  isSender: boolean;
  comment?: string;
  gotoUser(user: User): void;
}

const ListItemDescription = ({
  user,
  article,
  isSender,
  comment,
  gotoUser
}: ListItemProps) => {
  const composedComment = (user && comment ? ":" : "") + (comment || "");
  return (
    <Text numberOfLines={1} ellipsizeMode="tail">
      {user && (
        <Text onPress={() => gotoUser(user)}>
          {isSender ? <>&#8592;</> : <>&#8594;</>} {user.name}
        </Text>
      )}
      {article && (
        <>
          <Icon name="shopping-cart" />
          <Text>{article.name}</Text>
        </>
      )}
      <Text>{composedComment}</Text>
    </Text>
  );
};

interface Props {
  id: number | string;
  gotoUser(user: User): void;
}

export function TransactionListItem({
  id,
  gotoUser
}: Props): JSX.Element | null {
  const transaction = getTransaction(store.getState(), Number(id));

  if (!transaction) {
    return null;
  }

  return (
    <View
      style={{
        borderBottomColor: theme.border,
        borderBottomWidth: 1,
        paddingBottom: 8,
        paddingTop: 8
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between"
        }}
      >
        <Currency value={transaction.amount} />
        <Text numberOfLines={1} ellipsizeMode="tail">
          {transaction.created}
        </Text>
      </View>
      <ListItemDescription
        gotoUser={gotoUser}
        article={transaction.article}
        isSender={!!transaction.sender}
        comment={transaction.comment}
        user={transaction.sender || transaction.recipient}
      />
    </View>
  );
}
