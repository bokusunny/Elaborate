import React from 'react'
import { storiesOf } from '@storybook/react'
import SNSSignInButton from './index'

const onClick = () => console.log('Click!')

storiesOf('SNSSignInButton', module)
  .add('google', () => (
    <SNSSignInButton type="google" onClick={onClick}>
      Login with Google
    </SNSSignInButton>
  ))
  .add('twitter', () => (
    <SNSSignInButton type="twitter" onClick={onClick}>
      Login with Twitter
    </SNSSignInButton>
  ))
  .add('facebook', () => (
    <SNSSignInButton type="facebook" onClick={onClick}>
      Login with Facebook
    </SNSSignInButton>
  ))
