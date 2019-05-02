import React from 'react'
import { storiesOf } from '@storybook/react'
import SNSSignInButton from './index'

const onClick = () => alert('Clicked!')

storiesOf('SNSSignInButton', module)
  .add('google', () => (
    <SNSSignInButton type="google" onClick={onClick}>
      Login with
    </SNSSignInButton>
  ))
  .add('twitter', () => (
    <SNSSignInButton type="twitter" onClick={onClick}>
      Login with
    </SNSSignInButton>
  ))
  .add('facebook', () => (
    <SNSSignInButton type="facebook" onClick={onClick}>
      Login with
    </SNSSignInButton>
  ))
