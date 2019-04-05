import React, { useState } from "react";
import { Modal } from "react-native";
import { FilterList, FAB, Button } from "../ui/form";
import { FabBottomRight, BaseWrapper } from "../ui/base";
import { store } from "../../store";
import { User } from "../../store/reducers";
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
      <BaseWrapper>
        <FilterList
          items={users}
          onSelect={item => {
            onSelect(item);
            setIsVisible(false);
          }}
        />
      </BaseWrapper>
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
