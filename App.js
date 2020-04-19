import Main from './components/main' 
import Saved from './components/saved'
import React from 'react'
import {StatusBar,ImageBackground,StyleSheet,View,Image, TouchableOpacity,Linking} from 'react-native'
import {Header,Overlay,Divider } from 'react-native-elements'
import { Container,Tab, Tabs, TabHeading,Icon,Text} from 'native-base'

export default class App extends React.Component{

  constructor(props){  
    super(props);  
    this.state={  
    isVisible : true,  
    press:false,
   }  
 }  
  Hide_Splash_Screen=()=>{  
   this.setState({   
     isVisible : false   
   });  
 }  

  componentDidMount(){  
    var that = this;  
    setTimeout(function(){  
      that.Hide_Splash_Screen();  
    }, 2000);  
   }  

    render(){
      let Splash_Screen = (  
        <View style={styles.SplashScreen_RootView}>  
        <StatusBar backgroundColor = '#f03269' barStyle = 'dark-content'/>
            <View style={styles.SplashScreen_ChildView}>  
                  <Image source={require('./components/ic_launcher.gif')}  
               style={{width:'30%', height: '30%', resizeMode: 'contain'}} />  
           </View>  
        </View> )  
        if (this.state.isVisible === true)
        return(Splash_Screen) 
        else {
        return(<>
            <StatusBar backgroundColor = '#f03269' barStyle = 'dark-content'/>
            <Header rightComponent = {<TouchableOpacity style = {{width:40,height:40}} onPress = {() => this.setState({press:true},console.log(this.state.press))}><Icon style = {{color:'green'}} name = 'ios-heart'/></TouchableOpacity>}
             centerComponent={<Image source = {require('./components/logo.png')} style = {{margin:10,height:35,width:90}}/> }
                  placement='left'
                  containerStyle={{
                                   backgroundColor: '#f03269',
                                   justifyContent: 'center',
                                   height:StatusBar.currentHeight,
                                   padding:StatusBar.currentHeight-10
                                 }}
           />
          <Overlay
              isVisible={this.state.press}
              windowBackgroundColor="rgba(0,0,0, .5)"
              onBackdropPress={() => this.setState({ press: false })}
              overlayBackgroundColor="#f03269"
              width="auto"
              height="auto"
              borderRadius = {20}
              overlayStyle = {{margin:20,paddingBottom:30}}
           ><>
              <Text style = {{marginVertical:20,fontSize:26,fontWeight:'bold',color:'#fff',marginHorizontal:120,textAlign:'center'}}>About</Text>
              <Text style = {{textAlign:'center',marginTop:20,fontSize:14,color:'#fff'}}>Plot</Text>
              <Text onPress = {()=> Linking.openURL('http://wikipedia.org')} style = {{textAlign:'center',marginVertical:10,fontSize:14,color:'blue'}}>Wikipedia.org</Text>
              <Text style = {{textAlign:'center',marginVertical:20,fontSize:14,color:'#fff'}}>Poster Image</Text>
              <Image onPress = {()=> Linking.openURL('http://wikipedia.org')} source = {require('./components/tmdb.png')} style = {{alignSelf:'center',marginBottom:10}}/>
              <Text style = {{textAlign:'center',marginTop:20,fontSize:14,color:'#fff',marginHorizontal:30}}>This product uses the TMDb API but is not endorsed or certified by TMDb.</Text>
              <Text style = {{textAlign:'center',marginVertical:20,fontSize:14,color:'#fff'}}>Made with <Icon style = {{color:'#01b4e4'}} name = 'ios-heart'/> using React Native</Text>
              </>
           </Overlay>
           <Container>
           <Tabs tabBarPosition = 'bottom' tabBarUnderlineStyle = {{backgroundColor:'#f03269'}}>
          <Tab heading={ <TabHeading style = {{backgroundColor:'#fff'}} ><Icon name = 'ios-search' style = {{color:'#f03269'}}/><Text style = {{color:'#f03269',fontSize:16}}>Search</Text></TabHeading>}>
            <Main />
          </Tab>
          <Tab heading={ <TabHeading style = {{backgroundColor:'#fff'}} ><Icon name = 'ios-folder' style = {{color:'#f03269'}}/><Text  style = {{color:'#f03269',fontSize:16}}>Collection</Text></TabHeading>}>
            <Saved />
          </Tab>
        </Tabs>
        </Container>  
          </>
        )}
    }
}

const styles = StyleSheet.create(  
  {  
      MainContainer:  
      {  
          flex: 1,  
          justifyContent: 'center',  
          alignItems: 'center', 
      },  
     
      SplashScreen_RootView:  
      {  
          justifyContent: 'center',  
          flex:1,  
          position: 'absolute',  
          width: '100%',  
          height: '100%',  
        },  
     
      SplashScreen_ChildView:  
      {  
          justifyContent: 'center',  
          alignItems: 'center',  
          backgroundColor: '#f03269',  
          flex:1,  
      },  
  });  