import React from 'react'
import Background from '../components/Backgorund'
import Button from '../components/Button'
import Header from '../components/Header'
import Paragraph from '../components/Paragraph'

const StartScreen = ({ navigation }) => {
  return (
    <Background>
      <Header>Island Wellness</Header>
      <Paragraph>
        The easiest way to start with your amazing application.
      </Paragraph>
      <Button
        mode="contained"
        onPress={() => navigation.navigate('LoginScreen')}
      >
        Login
      </Button>
      <Button
        mode="outlined"
        // onPress={() => navigation.navigate('RegisterScreen')}
      >
        Sign Up
      </Button>
    </Background>
  )
};

export default StartScreen;

