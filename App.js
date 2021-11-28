import React, {Component} from 'react';
import {View, Text, TextInput, Button} from 'react-native';

const baseUrl = 'http://172.24.224.1:3000';

class App extends Component {
  state = {
    username: '',
    password: '',
    user: null,
  };

  usernameHandler = usernameText => {
    this.setState({username: usernameText});
  };

  passwordHandler = passwordText => {
    this.setState({password: passwordText});
  };

  buttonHandler = async () => {
    const {username, password} = this.state; //Object destructuring
    console.log('username:', username);
    console.log('password:', password);
    const payload = {username, password};

    //Using .then
    // fetch(`${baseUrl}/login`, {
    //   method: 'POST',
    //   body: JSON.stringify(payload),
    //   headers: {'Content-Type': 'application/json'},
    // })
    //   .then(res => res.json())
    //   .then(resJson => console.log('resJson: ', resJson));

    //Using Async await
    let res = await fetch(`${baseUrl}/login`, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {'Content-Type': 'application/json'},
    });
    let resJson = await res.json();
    if (res.status === 200) {
      console.log('resJson: ', resJson);
      this.setState({user: resJson.data});
    } else if (res.status === 401) {
      //error from server api
      alert(resJson.error);
    } else if (res.status === 404) {
      alert('User not found');
    }
  };

  render() {
    const {username, password} = this.state;
    return (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
        }}>
        <TextInput
          style={MyStyles.textInputView}
          placeholder="Enter username"
          onChangeText={this.usernameHandler}
        />
        <TextInput
          style={MyStyles.textInputView}
          placeholder={'Enter password'}
          onChangeText={this.passwordHandler}
        />
        <View style={{width: '80%', marginTop: 10}}>
          <Button title="LOGIN" onPress={this.buttonHandler} />
        </View>

        {/* <Text>{username}</Text>
        <Text>{password}</Text> */}
      </View>
    );
  }
}

const MyStyles = {
  textInputView: {
    backgroundColor: '#ddd',
    width: '80%',
    marginTop: 10,
  },
};

export default App;
