import React from 'react';
import Snackbar from 'react-native-snackbar';
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
  ImageBackground,
  Dimensions
} from 'react-native' ;

export default class App extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            data:'',
            poster:'',
            isloading: false,
        }
    }
    componentDidMount(){this.setState({isloading:!this.state.isloading})
        const title = this.props.title.replace('film','').replace('TV series','').replace(/[0-9]/g, '').replace('()', '');
        Promise.all([fetch(`https://en.wikipedia.org/w/api.php?format=json&action=parse&prop=text&page=${this.props.title}&section=1`, {
         method: 'GET'
      }),fetch(`https://api.themoviedb.org/3/search/movie?api_key=15d2ea6d0dc1d476efbca3eba2b9bbfb&query=${title}`, {
        method: 'GET'
     })])
      .then(([res1,res2]) => {return Promise.all([res1.json(),res2.json()])})
      .then(([res1,res2]) => {
         this.setState({
             data:res1.parse.text['*'],
             poster:res2.results,
             isloading:false
         },()=>console.log(this.state))
         
      })
      
      .catch((error) => {
        Snackbar.show({
            text: 'Network Error',
            duration: 2000,
            backgroundColor:'#f03269'
          });
          this.setState({isloading:false})
      });
    }

    render(){let image = this.state.poster.length>0 ? { uri: `http://image.tmdb.org/t/p/original/${this.state.poster[0].poster_path}` } : { uri: `http://image.tmdb.org/t/p/w500/nmDqvEL5tqbjhbUEFSCQlZnXock.jpg` }  ;
        if(!this.state.isloading){if(this.state.data.toLowerCase().includes('plot')||this.state.data.toLowerCase().includes('synopsis')||this.state.data.toLowerCase().includes('premise')||this.state.data.toLowerCase().includes('overview')||this.state.data.toLowerCase().includes('story'))
        return(<>
        <ImageBackground source = {image} imageStyle={{opacity: 0.4}} style = {{flex:0,resizeMode:'cover',backgroundColor:'#000'}}>
            <View style = {styles.plot}>
            {this.state.poster.length===0 ?
            <Text style = {{textAlign:'center',fontSize:28,color:'white',backgroundColor:'#f03269'}}>
           {this.props.title}
           </Text> : <Text style = {{textAlign:'center',fontSize:28,color:'white',backgroundColor:'#f03269'}}>
           {this.props.title}{'\n'}<Text style = {{fontSize:12 ,color:'#00f0e8'}}>TMDB Rating: {this.state.poster[0].vote_average}</Text>
           </Text>
            }
            <Text style = {{fontSize:16,color:'white'}}>
            {this.state.data.replace(/<[^>]*>/g,'').replace(/&.*;/g,'').replace(/{.*}/g,'').replace(/^.*./g,'')}
            </Text>
            </View>
        </ImageBackground>
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
        borderColor:'#633d48',
        borderRadius:10,
        margin:10,
    }
})