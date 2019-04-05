import React from "react";
import { View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

import {
  User,
  Article,
  getTransaction,
  startDeletingTransaction
} from "../../store/reducers";
import { store } from "../../store";
import { Currency } from "../ui/text";
import { getTheme } from "../ui/theme";
import { ListItem, Text } from "../ui/base";
import { Button } from "../ui/form";

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
    <ListItem>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between"
        }}
      >
        <Currency value={transaction.amount} />
        {transaction.isDeleted && <Text>is deleted</Text>}

        {transaction.isDeletable ? (
          <TransactionUndoButton
            transactionId={transaction.id}
            userId={transaction.user.id}
          />
        ) : (
          <Text numberOfLines={1} ellipsizeMode="tail">
            {transaction.created}
          </Text>
        )}
      </View>
      <ListItemDescription
        gotoUser={gotoUser}
        article={transaction.article}
        isSender={!!transaction.sender}
        comment={transaction.comment}
        user={transaction.sender || transaction.recipient}
      />
    </ListItem>
  );
}

interface TransactionUndoButtonProps {
  userId?: string;
  transactionId: number;
  onSuccess?(): void;
}

const TransactionUndoButton = (props: TransactionUndoButtonProps) => {
  return (
    <Button
      onPress={() => {
        if (typeof props.onSuccess === "function") {
          props.onSuccess();
        }
        startDeletingTransaction(
          store.dispatch,
          props.userId || "",
          props.transactionId
        );
      }}
      title="UNDO"
    />
  );
};
