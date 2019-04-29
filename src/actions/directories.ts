import { db, FirebaseSnapShot } from '../utils/firebase'
import { ThunkDispatch } from 'redux-thunk'
import { actionTypes } from '../constants'
import { ReduxAPIStruct, ReduxAPIError } from '../reducers/static-types'
import { BaseAction } from './static-types'

interface DirectoryFirebaseRequest extends BaseAction {
  type: string
}

interface SetDirectoriesAction extends BaseAction {
  type: string
  payload: { directories: ReduxAPIStruct<FirebaseSnapShot[]> }
}

interface DirectoryFirebaseFailure extends BaseAction {
  type: string
  payload: { error: ReduxAPIError }
}

export type DirectoriesAction =
  | DirectoryFirebaseRequest
  | SetDirectoriesAction
  | DirectoryFirebaseFailure

const directoryFirebaseFailure = (error: ReduxAPIError) => ({
  type: actionTypes.DIRECTORY_FIREBASE_REQUEST_FAILURE,
  payload: { error },
})

// NOTE: Firebaseはクライアント側のネットワーク不良などでデータのfetchに失敗してもerrorを吐かず、
//       空配列を返してくる... :anger_jenkins:
export const fetchDirectories = () => {
  return (
    dispatch: ThunkDispatch<
      {},
      {},
      DirectoryFirebaseRequest | SetDirectoriesAction | DirectoryFirebaseFailure
    >
  ) => {
    dispatch({ type: actionTypes.DIRECTORY_FIREBASE_REQUEST })
    db.collection('directories')
      .get()
      .then(querySnapshot => {
        // Firebaseのデータは取得時順番がランダムなので作成順にソートする
        const orderedDocs = querySnapshot.docs.sort((doc1, doc2) => {
          return doc1.data().createdAt - doc2.data().createdAt
        })

        dispatch({
          type: actionTypes.DIRECTORY_SET,
          payload: { directories: orderedDocs },
        })
      })
      .catch(error => {
        dispatch(directoryFirebaseFailure({ statusCode: 500, message: error }))
      })
  }
}
