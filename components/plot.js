import React from 'react';
import { Icon } from 'react-native-elements'
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
  Dimensions
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

    render(){if(!this.state.isloading){if(this.state.data.toLowerCase().includes('plot')||this.state.data.toLowerCase().includes('synopsis'))
        return(<>
            <View style = {styles.plot}>
            <Text style = {{textAlign:'center',fontSize:28}}>
           {this.props.title}
           </Text>
            <Text style = {{fontSize:16}}>
            {this.state.data.replace(/<[^>]*>/g,'').replace(/&.*;/g,'').replace(/{.*}/g,'').replace(/^.*./g,'')}
            </Text>
            </View>
        </>)
        else return(<>
            <Text style = {{textAlign:"center",fontWeight:'bold',fontSize:30}}>Plot not found</Text>
            <Icon name='error' />
  </>
        )}
        else return(
            <ActivityIndicator size = 'large' color = '#f03269'/>
        )
    }
}
const styles= StyleSheet.create({
    plot:{
        padding:10,
        flex:1,
        borderColor:'#633d48',
        borderRadius:10,
        borderWidth:0.8,
        margin:10,
        backgroundColor:'white'
    }
})