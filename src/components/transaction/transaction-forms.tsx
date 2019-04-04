import React from "react";
import { View, Text } from "react-native";

import { Card } from "../ui/card";
import { store } from "../../store";
import { startCreatingTransaction } from "../../store/reducers";
import { Button } from "../ui/form";
import { useTransactionValidator } from "./validator";
import { formatCurrency } from "../ui/text";

export interface PaymentButtonListProps {
  steps: number[];
  userId: string;
  isDeposit: boolean;
}

interface Props {
  userId: string;
}

export function Payment(props: Props): JSX.Element {
  const payment = store.getState().settings.payment;
  return (
    <Card>
      {payment.deposit.enabled && (
        <PaymentButtonList
          isDeposit={true}
          steps={payment.deposit.steps}
          userId={props.userId}
        />
      )}
      <View>
        <Text>Test</Text>
      </View>
      {payment.dispense.enabled && (
        <PaymentButtonList
          isDeposit={false}
          steps={payment.dispense.steps}
          userId={props.userId}
        />
      )}
    </Card>
  );
}

const chunk = (arr: any[], chunkSize: number) => {
  return arr
    .slice(0, ((arr.length + chunkSize - 1) / chunkSize) | 0)
    .map(function(c, i) {
      return arr.slice(chunkSize * i, chunkSize * i + chunkSize);
    });
};

export function PaymentButtonList(props: PaymentButtonListProps): JSX.Element {
  const multiplier = props.isDeposit ? 1 : -1;
  const stepGroups = chunk(props.steps, 3);
  return (
    <View>
      {stepGroups.map((steps, index) => (
        <View
          key={index}
          style={{
            flexDirection: "row",
            marginBottom: 8
          }}
        >
          {steps.map(step => (
            <View style={{ minWidth: 75, marginRight: 8, flex: 1 }} key={step}>
              <TransactionButton
                isDeposit={props.isDeposit}
                userId={props.userId}
                value={step * multiplier}
              />
            </View>
          ))}
        </View>
      ))}
    </View>
  );
}

interface TransactionButtonProps {
  userId: string;
  value: number;
  isDeposit?: boolean;
}

export function TransactionButton(props: TransactionButtonProps): JSX.Element {
  const isValid = useTransactionValidator(
    props.value,
    props.userId,
    props.isDeposit
  );

  return (
    <Button
      onPress={() =>
        startCreatingTransaction(store.dispatch, props.userId, {
          amount: props.value
        })
      }
      isGreen={props.isDeposit}
      isRed={!props.isDeposit}
      isDisabled={!isValid}
      title={formatCurrency(props.value)}
    />
  );
}
