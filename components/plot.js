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
} from 'react-native' ;

export default class App extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            data:'',
            isloading: false,
        }
    }
    componentDidMount(){this.setState({isloading:!this.state.isloading})
        fetch(`https://en.wikipedia.org/w/api.php?format=json&action=parse&prop=text&page=${this.props.title}&section=1`, {
         method: 'GET'
      })
      .then((response) => response.json())
      .then((responseJson) => {
         console.log(responseJson);
         this.setState({
            data: responseJson.parse.text['*'],
            isloading:!this.state.isloading
         })
         console.log(this.state.titleData)
         
      }) 
      
      .catch((error) => {
         console.error(error);
      });
    }

    render(){if(!this.state.isloading){if(this.state.data.toLowerCase().includes('plot'))
        return(
            <Text style = {{padding:10 ,fontSize:16}}>{this.state.data.replace(/<[^>]*>/g,'').replace(/&.*;/g,'').replace(/{.*}/g,'').replace(/^.*./g,'')}</Text>
        )
        else return(
            <Text>Plot not found</Text>
        )}
        else return(
            <Text>Loading...</Text>
        )
    }
}