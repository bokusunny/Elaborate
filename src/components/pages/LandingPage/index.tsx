import React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import LandingTemplate from '../../templates/LandindTemplate'

const LandingPage: React.FC<RouteComponentProps> = ({ history }) => (
  <LandingTemplate history={history} />
)

export default LandingPage
