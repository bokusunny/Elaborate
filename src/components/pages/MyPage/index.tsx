import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { fetchDirectories } from '../../../actions/directories'
import MyPageTemplate from '../../templates/MyPageTemplate'

// TODO: useEffectでcurrentUserに所属するdirectoriesをfetchする
interface Props {
  fetchDirectories: Function
  directories: Record<string, any>
}

const MyPage: React.FC<Props> = ({ fetchDirectories, directories }) => {
  useEffect(() => fetchDirectories(), [])

  return <MyPageTemplate directories={directories} />
}

export default connect(
  ({ directories }: any) => ({ directories }),
  { fetchDirectories }
)(MyPage)
