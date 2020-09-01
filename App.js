import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import DisplayList from './src/DisplayList';
import FetchList from './src/FetchList';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="FetchList" headerMode="none">
        <Stack.Screen name="FetchList" component={FetchList} />
        <Stack.Screen name="DisplayList" component={DisplayList} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
