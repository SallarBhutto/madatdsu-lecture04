import React, {Component} from 'react';
import {View, Text, TextInput, Button} from 'react-native';

const baseUrl = 'http://172.24.224.1:3000';

class App extends Component {
  state = {
    username: '',
    password: '',
    user: null,
  };

  usernameHandler = text => {
    this.setState({username: text});
  };

  passwordHandler = text => {
    this.setState({password: text});
  };

  loginHandler = async () => {
    const {username, password} = this.state;
    try {
      const payload = {username, password};
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
        alert(resJson.error);
      } else if (res.status === 404) {
        alert('User not found');
      }
    } catch (err) {
      console.log('err: ', err);
    }
  };

  render() {
    const {username, password} = this.state;
    return (
      <View style={MyStyles.mainView}>
        <TextInput
          style={MyStyles.textInputView}
          placeholder={'Enter username here...'}
          onChangeText={this.usernameHandler}
        />
        <TextInput
          style={MyStyles.textInputView}
          placeholder={'Enter password here...'}
          onChangeText={this.passwordHandler}
        />
        <View style={MyStyles.sallar}>
          <Button onPress={this.loginHandler} title="LOGIN" />
        </View>
        {/* <Text>{username}</Text>
        <Text>{password}</Text> */}
      </View>
    );
  }
}

const MyStyles = {
  mainView: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  textInputView: {
    marginTop: 10,
    backgroundColor: '#ddd',
    borderRadius: 5,
    width: '80%',
  },
  sallar: {
    marginTop: 10,
    width: '80%',
  },
};

export default App;
