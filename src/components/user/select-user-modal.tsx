import React, { useState } from "react";
import { Modal, View } from "react-native";
import { FilterList, FAB, Button } from "../ui/form";
import { FabBottomRight, BaseWrapper } from "../ui/base";
import { store } from "../../store";
import { User, user } from "../../store/reducers";
import { EditUserForm } from "./add-user-form";

export const SelectUserModal: React.FC<{
  isVisible: boolean;
  setIsVisible(isVisible: boolean): void;
  onSelect(user: User): void;
}> = ({ isVisible, setIsVisible, onSelect }) => {
  const users = Object.values(store.getState().user);
  return (
    <Modal
      animationType="slide"
      visible={isVisible}
      onRequestClose={() => setIsVisible(false)}
    >
      <View style={{ marginTop: 32 }}>
        <FilterList
          items={users}
          onSelect={item => {
            onSelect(item);
            setIsVisible(false);
          }}
        />
      </View>
      <FabBottomRight>
        <FAB
          elevation={2}
          icon="times"
          isRed
          onPress={() => setIsVisible(false)}
        />
      </FabBottomRight>
    </Modal>
  );
};

export const EditUserModal: React.FC<{ user: User }> = props => {
  const [isVisible, setIsVisible] = useState(false);
  const close = () => setIsVisible(false);
  return (
    <>
      <Button isPrimary title="EDIT USER" onPress={() => setIsVisible(true)} />
      <Modal
        animationType="slide"
        visible={isVisible}
        onRequestClose={() => setIsVisible(false)}
      >
        <BaseWrapper>
          <EditUserForm
            onSave={_user => close()}
            user={props.user}
            onCancel={close}
          />
        </BaseWrapper>
      </Modal>
    </>
  );
};
