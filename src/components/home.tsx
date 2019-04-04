import React from "react";
import { View, Text, Button } from "react-native";
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

const theme = getTheme();

const Users: React.FC<NavigationScreenProps> = props => (
  <View
    style={{
      flex: 1,
      flexDirection: "column",
      backgroundColor: theme.mainBackground
    }}
  >
    <UserList
      onSelect={user => {
        props.navigation.navigate("UserDetails", { id: user.id });
      }}
    />
    <View style={{ position: "absolute", bottom: 16, right: 16 }}>
      <FAB
        elevation={3}
        isHighlight
        icon="plus"
        onPress={() => props.navigation.navigate("AddUser")}
      />
    </View>
  </View>
);

const AddUser: React.FC<NavigationScreenProps> = ({ navigation }) => (
  <View>
    <AddUserForm
      userId="12"
      onSave={user => navigation.replace("UserDetails", { id: user.id })}
      onCancel={() => navigation.navigate("Users")}
    />
  </View>
);
//@ts-ignore
AddUser.navigationOptions = {
  title: "Add new User"
};

const UserDetailsView: React.FC<NavigationScreenProps> = ({ navigation }) => {
  const id = navigation.getParam("id");

  return (
    <View>
      <UserDetails id={id} />
    </View>
  );
};
//@ts-ignore
UserDetailsView.navigationOptions = {
  title: "Add new User"
};

const Articles = () => (
  <View>
    <Text>Articles</Text>
  </View>
);

const TabNavigator = createStackNavigator(
  {
    Users: { screen: Users },
    AddUser: { screen: AddUser },
    UserDetails: { screen: UserDetailsView },
    Articles: { screen: Articles }
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
