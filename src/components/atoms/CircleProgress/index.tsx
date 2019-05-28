import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import * as styles from './style.css'
const { progress } = styles

const CircleProgress: React.FC<{}> = () => <CircularProgress className={progress} size={60} />

export default CircleProgress
