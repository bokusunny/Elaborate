import { db, FirebaseSnapShot } from '../utils/firebase'
import { ThunkDispatch } from 'redux-thunk'
import { actionTypes } from '../constants'
import { ReduxAPIStruct, ReduxAPIError } from '../reducers/static-types'
import { BaseAction } from './static-types'

interface DirectoryFirebaseRequestAction extends BaseAction {
  type: string
}

interface SetDirectoriesAction extends BaseAction {
  type: string
  payload: { directories: ReduxAPIStruct<FirebaseSnapShot[]> }
}

interface UserAPIFailure extends BaseAction {
  type: string
  payload: { error: ReduxAPIError }
}

export type DirectoriesAction =
  | DirectoryFirebaseRequestAction
  | SetDirectoriesAction
  | UserAPIFailure

const userAPIFailure = (error: ReduxAPIError) => ({
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
      DirectoryFirebaseRequestAction | SetDirectoriesAction | UserAPIFailure
    >
  ) => {
    dispatch({ type: actionTypes.DIRECTORY_FIREBASE_REQUEST })
    db.collection('directories')
      .get()
      .then(querySnapshot => {
        // Firebaseのデータは順番がランダムなので作成順にソートする
        const orderedDocs = querySnapshot.docs.sort((doc1, doc2) => {
          if (doc1.data().createdAt === undefined || doc2.data().createdAt === undefined) {
            return 0 // dataを上手くとってこれなかった場合sortしない
          }
          return doc1.data().createdAt.seconds - doc2.data().createdAt.seconds
        })

        dispatch({
          type: actionTypes.DIRECTORY_SET,
          payload: { directories: orderedDocs },
        })
      })
      .catch(error => {
        dispatch(userAPIFailure({ statusCode: 500, message: error }))
      })
  }
}
