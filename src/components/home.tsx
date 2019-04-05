import React, { useState } from "react";
import { View } from "react-native";
import {
  createStackNavigator,
  createAppContainer,
  NavigationScreenProps
} from "react-navigation";
import { Users as UserList } from "./user";
import { getTheme } from "./ui/theme";
import { UserDetails } from "./user/user-details";
import { FAB } from "./ui/form";
import { AddUserForm } from "./user/add-user-form";
import { BaseWrapper, FabBottomRight, FabBottomLeft } from "./ui/base";
import { SelectUserModal } from "./user/select-user-modal";

const theme = getTheme();

const Users: React.FC<NavigationScreenProps> = props => {
  const [selectUserModal, setSelectUserModal] = useState(false);
  return (
    <BaseWrapper>
      <UserList
        onSelect={user => {
          props.navigation.navigate("UserDetails", { id: user.id });
        }}
      />
      <FabBottomRight>
        <FAB
          elevation={3}
          isHighlight
          icon="plus"
          onPress={() => props.navigation.navigate("AddUser")}
        />
      </FabBottomRight>

      <SelectUserModal
        setIsVisible={setSelectUserModal}
        isVisible={selectUserModal}
        onSelect={user => {
          props.navigation.navigate("UserDetails", { id: user.id });
        }}
      />
      <FabBottomLeft>
        <FAB
          elevation={3}
          isPrimary
          icon="search"
          onPress={() => setSelectUserModal(true)}
        />
      </FabBottomLeft>
    </BaseWrapper>
  );
};

const AddUser: React.FC<NavigationScreenProps> = ({ navigation }) => (
  <BaseWrapper>
    <AddUserForm
      userId="12"
      onSave={user => navigation.replace("UserDetails", { id: user.id })}
      onCancel={() => navigation.navigate("Users")}
    />
  </BaseWrapper>
);
//@ts-ignore
AddUser.navigationOptions = {
  title: "Add new User"
};

const UserDetailsView: React.FC<NavigationScreenProps> = ({ navigation }) => {
  const id = navigation.getParam("id");

  return (
    <BaseWrapper>
      <UserDetails
        gotoUser={user => navigation.replace("UserDetails", { id: user.id })}
        id={id}
      />
    </BaseWrapper>
  );
};

const TabNavigator = createStackNavigator(
  {
    Users: { screen: Users },
    AddUser: { screen: AddUser },
    UserDetails: { screen: UserDetailsView }
  },
  {
    defaultNavigationOptions: {
      title: "STRICHLISTE",
      headerTintColor: theme.text,
      headerStyle: {
        backgroundColor: theme.headerBackground
      }
    },
    navigationOptions: {
      tabBarLabel: "Home!"
    }
  }
);

export const Home = createAppContainer(TabNavigator);
