import React, { useState, useRef } from "react";
import { View, TextInput } from "react-native";

import { startUpdateUser, User, startCreatingUser } from "../../store/reducers";
import { store } from "../../store";
import { InputStyle, FieldSet, FormFooter } from "../ui/form";

interface AddUserProps {
  userId: string;
  onSave(user: User): void;
  onCancel(): void;
}

export const AddUserForm = (props: AddUserProps) => {
  const [name, setName] = useState("");
  const [nameIsValid, updateNameIsValid] = useState<string | undefined>();
  const submit = async (): Promise<void> => {
    if (name.length === 0) {
      updateNameIsValid("Name is required");
      return;
    }

    updateNameIsValid(undefined);
    const user = await startCreatingUser(store.dispatch, name);

    if (user && user.id) {
      props.onSave(user);
    }
  };
  return (
    <View style={{ margin: 16 }}>
      <FieldSet label="Your name" message={nameIsValid}>
        <TextInput
          autoFocus
          placeholder="your name*"
          style={InputStyle.input}
          onChangeText={name => setName(name)}
          onSubmitEditing={submit}
          value={name}
        />
      </FieldSet>
      <FormFooter onCancel={props.onCancel} submit={submit} />
    </View>
  );
};

interface EditUserProps extends AddUserProps {
  onDisabled(user: User): void;
}

export const EditUserForm = (props: EditUserProps) => {
  const emailRef: any = useRef();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isDisabled, setDisabled] = useState(false);
  const submit = async (): Promise<void> => {
    const user = await startUpdateUser(store.dispatch, props.userId, {
      name,
      email,
      isDisabled
    });
    if (user && user.isDisabled) {
      props.onDisabled(user);
      return;
    }
    if (user && user.id) {
      props.onSave(user);
    }
  };

  return (
    <View style={{ margin: 16 }}>
      <FieldSet label="Your name" message="test">
        <TextInput
          autoFocus
          placeholder="your name*"
          style={InputStyle.input}
          onChangeText={name => setName(name)}
          onSubmitEditing={() => {
            if (emailRef && emailRef.current) {
              emailRef.current.focus();
            }
          }}
          value={name}
        />
      </FieldSet>
      <TextInput
        ref={emailRef}
        placeholder="your email"
        keyboardType="email-address"
        style={InputStyle.input}
        onChangeText={email => setEmail(email)}
        onSubmitEditing={submit}
        value={email}
      />
      <FormFooter onCancel={props.onCancel} submit={submit} />
    </View>
  );
};
