/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/emin93/react-native-template-typescript
 *
 * @format
 */

import React, { Component } from "react";
import { Home } from "./src/components/home";
import { store } from "./src/store";
import { startLoadingSettings } from "./src/store/reducers";

interface Props {}
export default class App extends Component<Props> {
  componentDidMount() {
    startLoadingSettings(store.dispatch);
  }

  render() {
    return <Home />;
  }
}
