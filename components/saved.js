import Plot from './plot';
import Snackbar from 'react-native-snackbar';
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
  RefreshControl,
  Dimensions

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
            lol:false,
            pressed:false,
            title:[]
        }
        this.onRefresh = this.onRefresh.bind(this);
        this.remove = this.remove.bind(this)
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
          } catch (error) {
            Snackbar.show({
              text: 'Collection couldnot be retrieved',
              duration: 2000,
              backgroundColor:'#f03269'
            });
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
    
    async remove(key) {
      try {
          await AsyncStorage.removeItem(key).then(
            () => this.setState({titleData:[]})
          ).then(
            () => this.refresh()
          )
          Snackbar.show({
            text: `${key} removed from collection`,
            duration: 3000,
            backgroundColor:'#f03269'
          });

      }
      catch(exception) {
          return false;
      }
  }
  renderComponent(){
    return(
      <TouchableOpacity style = {{backgroundColor:'white'}} onPress = {() => this.setState({pressed:!this.state.pressed})}>
      <Icon name = 'ios-arrow-back' style = {{marginLeft:20,marginTop:20,fontSize:40}}/>
      </TouchableOpacity>
    )
  }

    render(){if(!this.state.pressed){if(this.state.titleData.length>0)
        return(
            <View style = {{flex:1,marginLeft:10}}>
        <FlatList refreshControl={
          <RefreshControl
            refreshing={this.state.refresh}
            onRefresh={this.onRefresh}
          />
        }
        data={this.state.titleData}
                  keyExtractor={item => item.title}
                  renderItem={({ item }) => {return(<TouchableOpacity onPress = {() => this.setState({pressed:!this.state.pressed,title:item.title})}>
                                                          <ListItem title={<><Text style = {{fontSize:26,color:'#fff'}}>{item.title}</Text></>}
                                                                    containerStyle={styles.list}
                                                                    chevron
                                                                    rightElement={<TouchableOpacity onPress = {()=>this.remove(item.title)}><Icon name = 'ios-close-circle'/></TouchableOpacity>}
                                                          />
                                                       </TouchableOpacity>

                                                    )
                                              }
                               }
          />
          <Text style = {{textAlign:'center',opacity:0.4,marginBottom:20}}>Try refreshing to get the whole collection</Text>
            </View>
        )
        else return(<ScrollView refreshControl={
          <RefreshControl 
            refreshing={this.state.refresh}
            onRefresh={this.onRefresh}
          />
        }><Text style = {{textAlign:'center',opacity:0.4,marginTop:20}}>No Collection</Text>
        <Text style = {{textAlign:'center',opacity:0.4,marginTop:20}}>Press   <Icon name='add'/>   to add to collection</Text>
        <Text style = {{textAlign:'center',opacity:0.4,marginBottom:20,marginTop:20}}>Try refreshing to get the whole collection</Text>
        </ScrollView>)
    }
    else return(<>
    <ScrollView stickyHeaderIndices={[0]} scrollEnabled= {true}>
      {this.renderComponent()}
      <Plot title = {this.state.title}/>
    </ScrollView>
    
      </>
    )}
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