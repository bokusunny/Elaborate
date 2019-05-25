import React from 'react'

interface Props {
  directoryName: string
  branchName: string
}

const TopicPath: React.FC<Props> = ({ directoryName, branchName }) => (
  <div>{`${directoryName} > ${branchName}`}</div>
)

export default TopicPath
