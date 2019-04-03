import React from "react";
import { View, Text, Button } from "react-native";
import {
  createStackNavigator,
  createAppContainer,
  NavigationScreenProps
} from "react-navigation";
import { Users as UserList } from "./user";
import { getTheme } from "./ui/theme";

const theme = getTheme();

const Users: React.FC<NavigationScreenProps> = props => (
  <View
    style={{
      flex: 1,
      flexDirection: "column",
      backgroundColor: theme.mainBackground
    }}
  >
    <UserList />
    <View>
      <Button onPress={() => props.navigation.navigate("AddUser")} title="+" />
    </View>
  </View>
);
//@ts-ignore
Users.navigationOptions = {
  title: "Home"
};

const AddUser: React.FC<NavigationScreenProps> = props => (
  <View>
    <Text>Add User</Text>
  </View>
);
//@ts-ignore
AddUser.navigationOptions = {
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
    Articles: { screen: Articles }
  },
  {
    defaultNavigationOptions: {
      title: "test",
      headerTintColor: "#fff",
      headerStyle: {
        backgroundColor: "#000"
      }
    },
    navigationOptions: {
      tabBarLabel: "Home!"
    }
  }
);

export const Home = createAppContainer(TabNavigator);
