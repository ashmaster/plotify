import Plot from './plot';
import React from 'react';
import Snackbar from 'react-native-snackbar';
import AsyncStorage from '@react-native-community/async-storage';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Button, 
  View,
  Text,
  StatusBar,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  ImageBackground,
  RefreshControl,
  Vibration,
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
  Subtitle,
} from 'native-base'



export default class Main extends React.Component {
  constructor(props){
    super(props);

    
    this.state = {
      newContact: '',
      search:'',
      titleData:[],
      pressed: false,
      title: 'Vandanam',
      isloading: false,
      saved: [],
      current:[],
      test:false
    };
    this.handleSearch = this.handleSearch.bind(this);
    this.press = this.press.bind(this)
  }

 
  async componentDidMount(){
    try {
        await AsyncStorage.getAllKeys().then(async keys => {
           this.setState({
             saved:keys
           })
        });
      } catch (error) {
        Snackbar.show({
          text: 'Collection couldnot be retrieved',
          duration: 2000,
          backgroundColor:'#f03269'
        });
      } 
}
  


 handleSearch(){this.setState({isloading:!this.state.isloading})
     fetch(`https://en.wikipedia.org/w/api.php?action=query&srlimit=max&format=json&list=search&srsearch=intitle:${this.state.search}`, {
         method: 'GET'
      })
      .then((response) => response.json())
      .then((responseJson) => {
         this.setState({
            titleData: responseJson.query.search,
            isloading: !this.state.isloading
         })
         
      })
      
      .catch((error) => {
        Snackbar.show({
          text: 'Error Getting Data (Check your Internet Connection)',
          duration: 2000,
          backgroundColor:'#f03269'
        });
        this.setState({
          isloading:!this.state.isloading
        })
      });
  }

  longpress = async(key,item) => {
    try {
      if(!this.state.saved.includes(key)){
      await AsyncStorage.setItem(key, JSON.stringify(item));
      this.setState({
        test:!this.state.test
      })
      Vibration.vibrate(500)
      Snackbar.show({
        text: 'Added to collection',
        duration: 2000,
        backgroundColor:'#f03269'
      });}
      else{
        Snackbar.show({
          text: 'Already added to collection',
          duration: 2000,
          backgroundColor:'#f03269'
        });
      }
    } catch (e) {
      Snackbar.show({
        text: 'Error Adding',
        duration: 2000,
        backgroundColor:'#f03269'
      });
    }
  }
  


 press = () => {
   this.setState({
     pressed: !this.state.pressed,
   })
 }

 renderComponent(){
   return(
  <SearchBar
  searchIcon = {<TouchableOpacity onPress ={() => this.setState({pressed:!this.state.pressed})} ><Icon name = 'ios-arrow-back' style = {{fontSize:40}}/></TouchableOpacity>} 
onSubmitEditing= {()=>this.setState({pressed:!this.state.pressed},this.handleSearch())} 
placeholder='Search for another Movie' 
onChangeText = {(text) => this.setState({search:text}) } 
value={this.state.search}
containerStyle = {{backgroundColor: '#fff'}}
inputContainerStyle = {{backgroundColor:'#fff'}}
inputStyle = {{color:'#000000'}}
lightTheme = {true}
/>)
 }

  render(){
    
    if(!this.state.isloading){ if(!this.state.pressed)  
  {return (
        <Container style = {styles.container}>

          <SearchBar 
          onSubmitEditing= {this.handleSearch} 
          placeholder='Search for Movies & TV Series' 
          onChangeText = {(text) => this.setState({search:text}) } 
          value={this.state.search}
          containerStyle = {{backgroundColor: '#fff'}}
          inputContainerStyle = {{backgroundColor:'#fff'}}
          inputStyle = {{color:'#000000'}}
          lightTheme = {true}
           /> 
           <ImageBackground source = {require('./bg.jpg')} imageStyle={{opacity: 0.4}} style = {{flex:1,resizeMode:'cover',backgroundColor:'white'}}>
           <View style = {{backgroundColor:'#fff',borderBottomLeftRadius:20,borderBottomRightRadius:20}}>
           <Text style = {{color:'black',textAlign:'center',fontStyle:'italic',marginBottom:2,opacity:0.4}}>
           Tip: Try giving the correct spelling
           </Text>
           </View>
          <FlatList data={this.state.titleData}
                    keyExtractor={item => item.title}
                    renderItem={({ item }) => {
                                               if ((item.snippet.toLowerCase().includes('film') || item.snippet.toLowerCase().includes('television series') ||  item.snippet.toLowerCase().includes('starring'))  && !item.title.toLowerCase().includes('(actress)') && !item.title.toLowerCase().includes('novel') && !item.title.toLowerCase().includes('(actor)') && !item.title.toLowerCase().includes('list of') && !item.snippet.toLowerCase().includes('character') && !item.title.toLowerCase().includes('soundtrack') && !item.title.toLowerCase().includes('music from the') && !item.title.toLowerCase().includes('disambiguation'))
                                                   {return(<><TouchableOpacity onPress = {() => this.setState({pressed: !this.state.pressed,title:item.title,search:'',current:item})}
                                                  >
                                                              
                                                               <ListItem title={<Text style = {styles.text}>{item.title}</Text> }
                                                                         containerStyle={styles.list}
                                                                         subtitle={<Text style={{color:'white'}}>{item.snippet.replace(/<[^>]*>/g,'').replace(/&quot/g,'')} ....</Text>}
                                                                         chevron
                                                                         rightElement={<TouchableOpacity onPress = {()=>this.longpress(item.title,item)}><Icon name = 'add'/></TouchableOpacity>}
                                                                         
                                                                 />
                                                                
                                                              </TouchableOpacity> 
                                                                  
                                                           </>

                                                    )
                                                  }
                                               else return null
                                             }
                    }
          />
          </ImageBackground>
        </Container>
  )
  } 
  else return(
            <View style = {styles.container}>
                 <ScrollView style = {{flex:1}}scrollEnabled= {true} stickyHeaderIndices = {[0]} > 
                   {this.renderComponent()}
                   <Plot title = {this.state.title} pageid= {this.state.pageid}/>
                 </ScrollView>
             </View>
  )
  }
else return(
  <View style = {styles.container}>

<SearchBar 
          onSubmitEditing= {this.handleSearch} 
          placeholder='Search for Movies & TV Series' 
          onChangeText = {(text) => this.setState({search:text}) } 
          value={this.state.search}
          containerStyle = {{backgroundColor: '#fff'}}
          inputContainerStyle = {{backgroundColor:'#fff'}}
          inputStyle = {{color:'#000000'}}
          lightTheme = {true}
           />
          <View style = {{flex:1,justifyContent:'center'}}>
          <ImageBackground source = {require('./bg.jpg')} imageStyle={{opacity: 0.4}} style = {{flex:1,resizeMode:'cover',backgroundColor:'white'}}>
          <ActivityIndicator size='large' color = '#f03269'/>
          <Text style = {{textAlign:'center',color:'white'}}>Searching for {this.state.search}</Text>
          </ImageBackground>
          </View>
  </View>
)}
};

const styles = StyleSheet.create({
  container:{

    flex:1,
    backgroundColor:'#fff',
    
    
  },
  text:{
    fontSize:22,
    fontWeight:'bold',
    textAlign: 'left',
    color:'#fff',
    opacity:1,
  },
  list:{
    borderBottomWidth: 0,
    padding:20, 
    borderRadius:20,
    borderWidth:0.8,
    opacity:1,
    marginHorizontal:10,
    marginVertical:5,
    backgroundColor:'#f03269'


  },

});

