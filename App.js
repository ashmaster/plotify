import MetroTabs from './components/metro'
import Main from './components/main'
import Saved from './components/saved'
import React from 'react'
import {StatusBar,ImageBackground} from 'react-native'
import {Header } from 'react-native-elements'

export default class App extends React.Component{
    render(){
        return(<>
            <Header statusBarProps={{ barStyle: 'dark-content',backgroundColor:'#f03269' }}
                  centerComponent={{ text: 'Plotify', style: {fontWeight:'bold', fontSize:28,color:'#fff'} }}
                  placement='left'
                  containerStyle={{
                                   backgroundColor: '#f03269',
                                   justifyContent: 'center',
                                   height:StatusBar.currentHeight,
                                   padding:StatusBar.currentHeight-10
                                 }}
           />
           
            <MetroTabs
            screens={[
              { key: "1", title: "Search", screen: <Main /> },
              { key: "2", title: "Saved", screen: <Saved /> }
    
            ]}
          />  
          </>
        )
    }
}