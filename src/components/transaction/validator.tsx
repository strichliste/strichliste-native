import { Boundary } from "../../store/reducers";
import { store } from "../../store";
import React from "react";

interface TransactionArguments {
  accountBoundary: Boundary;
  paymentBoundary: Boundary;
  isDeposit: boolean;
  balance: number | boolean;
  value: number;
}

interface CheckValidProps {
  accountBoundaryValue: number | boolean;
  paymentBoundaryValue: number | boolean;
  balance: number | boolean;
  value: number;
}

function checkDepositIsValid({
  accountBoundaryValue,
  paymentBoundaryValue,
  balance,
  value
}: CheckValidProps): boolean {
  if (
    typeof paymentBoundaryValue === "number" &&
    value > paymentBoundaryValue
  ) {
    return false;
  }

  if (
    typeof accountBoundaryValue === "boolean" ||
    typeof balance === "boolean"
  ) {
    return true;
  }
  return value + balance < accountBoundaryValue;
}

function checkDispenseIsValid({
  accountBoundaryValue,
  paymentBoundaryValue,
  balance,
  value
}: CheckValidProps): boolean {
  if (
    typeof paymentBoundaryValue === "number" &&
    value > paymentBoundaryValue * -1
  ) {
    return false;
  }

  if (
    typeof accountBoundaryValue === "boolean" ||
    typeof balance === "boolean"
  ) {
    return true;
  }
  return balance - value > accountBoundaryValue;
}

export const isTransactionValid = ({
  accountBoundary,
  paymentBoundary,
  isDeposit,
  balance,
  value
}: TransactionArguments): boolean => {
  if (value === 0) {
    return false;
  }
  if (isDeposit) {
    return checkDepositIsValid({
      accountBoundaryValue: accountBoundary.upper,
      paymentBoundaryValue: paymentBoundary.upper,
      value,
      balance
    });
  } else {
    return checkDispenseIsValid({
      accountBoundaryValue: accountBoundary.lower,
      paymentBoundaryValue: paymentBoundary.lower,
      value,
      balance
    });
  }
};

export function useTransactionValidator(
  value: number,
  userId: string,
  isDeposit: boolean = true
): boolean {
  const state = store.getState();
  const settings = state.settings;
  const user = state.user[userId];
  const balance = user ? user.balance : 0;

  return isTransactionValid({
    value,
    balance,
    isDeposit,
    accountBoundary: settings.account.boundary,
    paymentBoundary: settings.payment.boundary
  });
}

interface UserToUserValidatorProps {
  userId: string;
  targetUserId: string;
  value: number;
  render(isValid: boolean): JSX.Element;
}

export function UserToUserValidator(
  props: UserToUserValidatorProps
): JSX.Element | null {
  const userHasTheMoney = useTransactionValidator(
    props.value,
    props.userId,
    false
  );
  const receiverCanAcceptTheMoney = useTransactionValidator(
    props.value,
    props.targetUserId,
    true
  );
  return <>{props.render(userHasTheMoney && receiverCanAcceptTheMoney)} </>;
}
