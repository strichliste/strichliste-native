import React, { useState } from "react";
import { Modal } from "react-native";
import { FilterList, FAB } from "../ui/form";
import { FabBottomRight } from "../ui/base";
import { store } from "../../store";
import { User } from "../../store/reducers";

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
      <FilterList
        items={users}
        onSelect={item => {
          onSelect(item);
          setIsVisible(false);
        }}
      />
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
