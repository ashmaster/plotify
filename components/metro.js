import React, { Component } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Dimensions, 
  TouchableOpacity,
  Animated,
  Easing,
  ImageBackground
} from "react-native";

export default class MetroTabs extends Component {
  WINDOW_WIDTH = Dimensions.get("window").width;
  HEADER_WIDTH = this.WINDOW_WIDTH / 1.7;

  state = {
    currentPage: "1",
    headerOffset: new Animated.Value(0)
  };

  render() {
    return (
      <View style={styles.container}>
       
        <FlatList
          contentContainerStyle={styles.screenList}
          ref={screenList => (this.screenList = screenList)}
          horizontal
          snapToAlignment={"center"} 
          decelerationRate={"fast"}
          snapToInterval={this.WINDOW_WIDTH}
          data={this.props.screens} 
          keyExtractor={item => item.title} 
          scrollEventThrottle={50}
          onScroll={this.handleScroll}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={styles.screenContainer}>{item.screen}</View>
          )}
          onViewableItemsChanged={this.onViewableItemsChanged}
        />
        <Animated.View
          style={[
            styles.tabContainer,
            { transform: [{ translateX: this.state.headerOffset }] }
          ]}
        >
          {this.props.screens.map(item => {
            return (
              <TouchableOpacity onPress={() => this.headerPress(item)} key={item.key.toString()}>
                <Text
                  style={[
                    styles.tabText,
                    { width: this.HEADER_WIDTH },
                    this.state.currentPage === item.key && styles.tabTextActive
                  ]}
                >
                  {item.title}
                </Text>
              </TouchableOpacity>
            );
          })}
        </Animated.View>
      </View>
    );
  }

  handleScroll = ({
    nativeEvent: {
      contentOffset: { x }
    }
  }) => {
    const { headerOffset } = this.state;
    const toValue = (x * this.HEADER_WIDTH) / -this.WINDOW_WIDTH;
    headerOffset.stopAnimation();
    Animated.timing(headerOffset, {
      toValue,
      duration: 100,
      easing: Easing.ease,
      useNativeDriver: true
    }).start();
  };

  onViewableItemsChanged = info => {
    if (info.viewableItems.length >= 1) {
      this.setState({ currentPage: info.viewableItems[0].key });
    }
  };

  headerPress = item => {
    this.setState({ currentPage: item.key });
    this.screenList.scrollToItem({ item: { key: item } });
  };
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    paddingTop: 60,
    backgroundColor: "white"
  },
  screenContainer: {
    width: Dimensions.get("window").width
  },
  screenList: {
    paddingEnd: 30
  },
  tabContainer: {
    position: "absolute",
    top: 0,
    flexDirection: "row",
    marginLeft:10
  },
  tabText: {
    padding: 20,
    fontSize: 30,
    opacity: 1,
    color:'#f03269'
  },
  tabTextActive: {
    marginLeft:10,
    opacity: 1,
    color:'#f03269'
  }
});