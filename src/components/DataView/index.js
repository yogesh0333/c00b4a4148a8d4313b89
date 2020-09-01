import React, { Component } from 'react';
import { Card, CardItem, Text, View } from 'native-base';
export default class CardItemBordered extends Component {
  render() {
    return (
      <View>
        <Card>
          <CardItem header bordered>
            <Text>{this.props.title}</Text>
          </CardItem>
          <CardItem bordered>
            <Text>{this.props.URL}</Text>
          </CardItem>
          <CardItem bordered>
            <Text>{this.props.created_at}</Text>
          </CardItem>
          <CardItem footer bordered>
            <Text>{this.props.author}</Text>
          </CardItem>
        </Card>
      </View>
    );
  }
}
