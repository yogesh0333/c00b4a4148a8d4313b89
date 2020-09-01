import React, { Component } from 'react';
import { FlatList, View, ActivityIndicator, Text, TouchableOpacity, Button, TextInput } from 'react-native';
import { Header, Left, Body, Right, Title } from 'native-base';
import { styles } from './style';
import DataView from '../components/DataView';

export default class DisplayFetch extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      fetchedData: [],
      fetchingStatus: false,
      setOnLoad: false,
      text: '',
    };
    this.page = -1;
  }

  componentDidMount() {
    this.fetchData();
    this.fetchDataAfterPeriod = setInterval(() => {
      this.fetchData();
    }, 10000);
  }

  fetchData = () => {
    var that = this;
    that.page = that.page + 1;
    that.setState({
      fetching_Status: true,
    });
    fetch('https://hn.algolia.com/api/v1/search_by_date?tags=story&page=0' + that.page, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        that.setState({
          fetchedData: [...this.state.fetchedData, ...data.hits],
          isLoading: false,
          setOnLoad: true,
        });
      })
      .catch((error) => {
        console.error(error);
        that.setState({ setOnLoad: false, fetching_Status: false });
      });
  };
  footer = () => {
    return (
      <View style={styles.bottomLoader}>
        {this.state.fetchingStatus ? <ActivityIndicator size="large" color="purple" /> : null}
      </View>
    );
  };
  BottomView = () => {
    return (
      <View>
        {this.state.fetchingStatus ? <ActivityIndicator size="large" color="blue" style={{ marginLeft: 6 }} /> : null}
      </View>
    );
  };
  render() {
    return (
      <View style={styles.container}>
        {this.state.isLoading ? (
          <View style={styles.bottomLoader}>
            <ActivityIndicator size={100} color="blue" style={styles.loader} />
          </View>
        ) : (
          <View>
            <View style={{ marginBottom: '5%' }}>
              <Header>
                <Left />
                <Body>
                  <Title> 😎 Fetched Data</Title>
                </Body>
                <Right />
              </Header>
            </View>
            <View>
              <Text style={styles.enter}>Enter the value in textbox to filter the Data 😁</Text>
              <View style={styles.textInputContainer}>
                <TextInput
                  placeholder={'Enter text to filter 🤔🤔'}
                  style={styles.textInput}
                  value={this.state.text}
                  onChangeText={(text) => {
                    this.setState({
                      text: text,
                    });
                  }}
                />
              </View>
              <View style={styles.buttonContainer}>
                <Button
                  onPress={() => {
                    let FinalData = this.state.fetchedData.filter((item) => {
                      return item.title === this.state.text;
                    });
                    this.setState({ fetchedData: FinalData });
                  }}
                  title={'Title'}
                />
                <Button
                  onPress={() => {
                    let FinalData = this.state.fetchedData.filter((item) => {
                      return item.URL === this.state.text;
                    });
                    this.setState({ fetchedData: FinalData });
                  }}
                  title={'URL'}
                />
                <Button
                  onPress={() => {
                    let FinalData = this.state.fetchedData.filter((item) => {
                      return item.created_at === this.state.text;
                    });
                    this.setState({ fetchedData: FinalData });
                  }}
                  title={'Created At'}
                />
                <Button
                  onPress={() => {
                    let FinalData = this.state.fetchedData.filter((item) => {
                      return item.author === this.state.text;
                    });
                    this.setState({ fetchedData: FinalData });
                  }}
                  title={'Author'}
                />
              </View>
            </View>
            <FlatList
              style={styles.flatList}
              keyExtractor={(item, index) => index.toString()}
              data={this.state.fetchedData}
              initialNumToRender={4}
              maxToRenderPerBatch={1}
              onEndReachedThreshold={0.5}
              renderItem={({ item, index }) => (
                <View>
                  <TouchableOpacity
                    onPress={() => {
                      this.props.navigation.navigate('DisplayList', {
                        data: item,
                      });
                    }}>
                    <View style={styles.viewStyle}>
                      <DataView title={item.title} URL={item.url} created_at={item.created_at} author={item.author} />
                    </View>
                  </TouchableOpacity>
                </View>
              )}
              showsVerticalScrollIndicator={true}
              ListFooterComponent={this.BottomView}
            />
          </View>
        )}
      </View>
    );
  }
}
