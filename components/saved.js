
import Plot from './plot';
import AsyncStorage from '@react-native-community/async-storage';
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Alert,
  Button, 
  View,
  Text,
  StatusBar,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  ImageBackground,
  RefreshControl

} from 'react-native';
import { ListItem,   Header,Card,SearchBar } from "react-native-elements";
import {
  Container,
  Content,
  Form,Icon,
  Input,
  Item,
  Label,
  List,
  Title,
  Subtitle
} from 'native-base'

export default class Saved extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            titleData: [],
            refresh: false,
            lol:0,
        }
        this._onRefresh = this.onRefresh.bind(this)
    }

    clearAsyncStorage = async() => {
        AsyncStorage.clear();
    }
  async  componentDidMount(){
        try {
            await AsyncStorage.getAllKeys().then(async keys => {
              await AsyncStorage.multiGet(keys).then(key => {
                key.forEach(data => {
                  this.setState({
                      titleData:this.state.titleData.concat(JSON.parse(data[1]))
                  }); //values
                });
              });
            });
            console.log(this.state.titleData)
          } catch (error) {
            Alert.alert("Couldn't load data", error);
          } 
    }

   async refresh(){
    try {
        await AsyncStorage.getAllKeys().then(async keys => {
          await AsyncStorage.multiGet(keys).then(key => {
            key.forEach(data => {
              this.setState({
                  titleData:this.state.titleData.concat(JSON.parse(data[1]))
              }); //values
            });
          });
        });
        console.log(this.state.titleData)
      } catch (error) {
        Alert.alert("Couldn't load data", error);
      }  
   }
   onRefresh = () => {
       this.setState({
           refresh:true,
           titleData:[]
       })   
       this.refresh().then(()=> this.setState({refresh:false}))
    }

    render(){
        return(
            <View style = {{flex:1,marginLeft:10}}>
            <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={this.state.refresh}
            onRefresh={this.onRefresh}
          />
        }>
            <FlatList data={this.state.titleData}
            keyExtractor={item => item.title}
            renderItem={({ item }) => {return(<><TouchableOpacity onPress = {() =>this.clearAsyncStorage()}>
                                                       <ListItem title={<><Text style = {{fontSize:26,color:'#fff'}}>{item.title}</Text></>}
                                                                 containerStyle={styles.list}
                                                                 chevron
                                                                 
                                                         />
                                                      </TouchableOpacity>      
                                                   </>

                                            )
                                     }
            }
            />
            </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    list:{
        borderBottomWidth: 0,
        padding:20, 
        borderRadius:4,
        borderWidth:0.8,
        opacity:1,
        marginHorizontal:10,
        marginTop:10,
        backgroundColor:'#f03269'
    
    
      },
})