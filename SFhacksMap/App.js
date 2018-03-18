import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Button} from 'react-native';
import {StackNavigator,} from 'react-navigation';
class Home extends React.Component {
  constructor(props) {
  	super(props);
  	this.state = {clocation: ''};
  	this.state = {destination: ''};
  }
  
  onFocus() {
  	(text) => this.setState({text})
  }
  sendData() {
  	const {clocation} = this.state;
  	const {destination} = this.state;
  	fetch('', {
  	method: 'POST',
  	headers: {
    	'Accept': 'application/json',
    	'Content-Type': 'application/json',
  	},
  	body: JSON.stringify({
    	clocation: clocation,
    	destination: destination,
 	 }),
	}).then(res => res.json())
	.then(() => this.props.navigation.navigate('locationlist'))
	.catch(error => console.error('Error:',error))

  }
  render() {
    return (
      <View style={{flex: 1}}>
      	<View style ={styles.container}>
      	<Text>Welcome to</Text>
        <Text>foodstop</Text>
        </View>
        <View style ={styles.blue}>
        	<TextInput
        		style={{padding: 10, fontSize: 42, margin: 100}}
        		
				placeholder="Current Location"
				
        		onChangeText={(clocation) => this.setState({clocation})}
        	/>
        	<TextInput
        		style={{padding: 10, fontSize: 42, margin: 100}}      	
				placeholder="Destination"
        		onChangeText={(destination) => this.setState({destination})}
        	/>
        	<Text style={{padding: 5, fontSize: 8}}>
          		{this.state.clocation}
        	</Text>
        	<Text style={{padding: 5, fontSize: 8}}>
          		{this.state.destination}
        	</Text>
        	
        </View>
        <TouchableOpacity
         	style={styles.button}
         	onPress={this.sendData}
       	>
         <Text style={{fontSize:42, padding: 50}}> Grab Locations </Text>
       </TouchableOpacity>
      </View>
    );
  }//

}
class locationlist extends React.Component {
 	constructor(props) {
  	super(props);
  	this.state = {clocation: ''};
  	this.state = {destination: ''};
  	this.state = {name: ''};
  	this.state = {address: ''};
  	}
  	render() {
  		return(
  			<View style ={styles.container}>
  			<Text> Next </Text>
  			</View>
  		)
  	}


 }
const RootStack = StackNavigator({
	Home: {
		screen: Home,
	},
	locationlist: {
		screen: locationlist,
	},
});
export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}

const styles = StyleSheet.create({
  container: {
  	justifyContent: 'center',
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  blue: {
  	flex:8,
  	justifyContent: 'center',
  	backgroundColor: 'lightblue',
  },
  button: {
  	flex:2,
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10
  },
});

