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

interface EditUserProps {
  user: User;
  onSave(user?: User): void;
  onCancel(): void;
}

export const EditUserForm = (props: EditUserProps) => {
  const emailRef: any = useRef();
  const [name, setName] = useState(props.user.name);
  const [email, setEmail] = useState(props.user.email || "");
  const [isDisabled, setDisabled] = useState(props.user.isDisabled || false);

  const submit = async (): Promise<void> => {
    const user = await startUpdateUser(store.dispatch, props.user.id, {
      name,
      email,
      isDisabled
    });

    if (user && user.id) {
      props.onSave(user);
    }
  };

  return (
    <View style={{ margin: 16 }}>
      <FieldSet label="Your name">
        <TextInput
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
      <View style={{ marginTop: 32 }}>
        <FormFooter onCancel={props.onCancel} submit={submit} />
      </View>
    </View>
  );
};
