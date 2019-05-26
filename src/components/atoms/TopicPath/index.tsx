import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import * as styles from './style.css'
const { topicPathWrapper, directoryNameStyle, branchNameStyle } = styles

interface Props {
  directoryName: string
  branchName: string
}

const TopicPath: React.FC<Props> = ({ directoryName, branchName }) => (
  <div className={topicPathWrapper}>
    <span className={directoryNameStyle}>{directoryName}</span>
    <FontAwesomeIcon icon={faChevronRight} />
    <span className={branchNameStyle}>{branchName}</span>
  </div>
)

export default TopicPath
