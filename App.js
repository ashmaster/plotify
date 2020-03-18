/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import Plot from './components/plot';
import React from 'react';
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
import {
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';


export default class App extends React.Component {
  constructor(props){
    super(props);

    
    this.state = {
      newContact: '',
      search:'',
      titleData:[],
      pressed: false,
      title: 'Vandanam',
      isloading: false,
    };
    this.handleSearch = this.handleSearch.bind(this);
    this.press = this.press.bind(this)
  }
  
 handleSearch(){this.setState({isloading:!this.state.isloading})
     fetch(`https://en.wikipedia.org/w/api.php?action=query&srlimit=max&format=json&list=search&srsearch=intitle:${this.state.search}`, {
         method: 'GET'
      })
      .then((response) => response.json())
      .then((responseJson) => {
         console.log(responseJson);
         this.setState({
            titleData: responseJson.query.search,
            isloading: !this.state.isloading
         })
         console.log(this.state.titleData)
         
      })
      
      .catch((error) => {
         console.error(error);
      });
  }
 press = () => {
   this.setState({
     pressed: !this.state.pressed
   })
 }
  render(){if(!this.state.isloading){ if(this.state.pressed) 
  {return (
        <Container style = {styles.container}>
          <Header statusBarProps={{ barStyle: 'dark-content',backgroundColor:'#704213' }}
                  centerComponent={{ text: 'Plotify', style: {fontWeight:'bold', fontSize:22} }}
                  placement='left'
                  containerStyle={{
                                   backgroundColor: '#ff8f2e',
                                   justifyContent: 'center',
                                   height:StatusBar.currentHeight,
                                   padding:StatusBar.currentHeight-10
                                 }}
           />

          <SearchBar onSubmitEditing= {this.handleSearch} placeholder='Search for Movies & TV Series' onChangeText = {(text) => this.setState({search:text}) } value={this.state.search} /> 
          <FlatList data={this.state.titleData}
                    renderItem={({ item }) => {
                                               if ((item.snippet.toLowerCase().includes('film') || item.snippet.toLowerCase().includes('series') ||  item.snippet.toLowerCase().includes('starring'))  && !item.title.toLowerCase().includes('(actress)') && !item.title.toLowerCase().includes('novel') && !item.title.toLowerCase().includes('(actor)') && !item.title.toLowerCase().includes('list of') && !item.snippet.toLowerCase().includes('character') && !item.title.toLowerCase().includes('soundtrack') && !item.title.toLowerCase().includes('music from the') && !item.title.toLowerCase().includes('disambiguation'))
                                                   {return(<><TouchableOpacity onPress = {() => this.setState({pressed: !this.state.pressed,title:item.title})}>
                                                               <ListItem title={<><Text style = {styles.text}>{item.title}</Text></>}
                                                                         containerStyle={{ borderBottomWidth: 0, padding:30, backgroundColor:'#f2ede6'}}
                                                                         subtitle={<Text>{item.snippet.replace(/<[^>]*>/g,'').replace(/&quot/g,'')} ....</Text>}
                                                                         chevron
                                                                 />
                                                              </TouchableOpacity>      
                                                           </>

                                                    )
                                                  }
                                               else return null
                                             }
                    }
          />
        </Container>
  )
  } 
  else return(
            <Container style = {styles.container}>
                <Header statusBarProps={{ barStyle: 'dark-content',backgroundColor:'#704213' }}
                                          leftComponent={<Item><TouchableOpacity style = {{height:20, }} underlayColor='#ff8f2e' onPress= {this.press}><Icon name = "md-arrow-round-back" /></TouchableOpacity></Item>}
                                          centerComponent={{ text: 'Plotify', style: {fontWeight:'bold', fontSize:22,marginTop:0} }}
                                          placement='left'
                                          containerStyle={{
                                                      backgroundColor: '#ff8f2e',
                                                   // justifyContent: 'center',
                                                   // height:StatusBar.currentHeight,
                                                      paddingBottom:StatusBar.currentHeight-10
                                          }}
                 />
                 <Item><ScrollView scrollEnabled= {true}>
                    
                        <Plot title = {this.state.title} pageid= {this.state.pageid}/>
                    </ScrollView>
                 </Item>
             </Container>
  )
  }
else return(
  <View style = {styles.container}>
          <Header statusBarProps={{ barStyle: 'dark-content',backgroundColor:'#704213' }}
                  centerComponent={{ text: 'Plotify', style: {fontWeight:'bold', fontSize:22} }}
                  placement='left'
                  containerStyle={{
                                   backgroundColor: '#ff8f2e',
                                   justifyContent: 'center',
                                   height:StatusBar.currentHeight,
                                   padding:StatusBar.currentHeight-10
                                 }}
           />

          <SearchBar onSubmitEditing= {this.handleSearch} placeholder='Search for Movies & TV Series' onChangeText = {(text) => this.setState({search:text}) } value={this.state.search} /> 
          <Text style = {{alignItems: 'center'}}>Loading....</Text>
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
    textAlign: 'center'
  },
});

