import React from 'react'
import MyPageTemplate from '../../templates/MyPageTemplate'

// TODO: useEffectでcurrentUserに所属するdirectoriesをfetchする
const directoryNameArray = ['Dir1', 'Dir2', 'Dir3']

const MyPage: React.FC<{}> = () => <MyPageTemplate directoryNameArray={directoryNameArray} />

export default MyPage
