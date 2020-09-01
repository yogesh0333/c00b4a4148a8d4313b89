import React, { Component } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { styles } from './style';
export default class index extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.data}>{JSON.stringify(this.props.route.params.data)} </Text>
        <View style={styles.goBack}>
          <Button
            onPress={() => {
              this.props.navigation.goBack();
            }}
            title={'Back'}
          />
        </View>
      </View>
    );
  }
}
