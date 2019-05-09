import React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import DiffTemplate from '../../templates/DiffTemplate'

const DiffPage: React.FC<RouteComponentProps> = ({ history }) => <DiffTemplate history={history} />

export default DiffPage
