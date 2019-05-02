import { db, FirebaseSnapShot } from '../utils/firebase'
import { ThunkDispatch } from 'redux-thunk'
import { actionTypes } from '../constants'
import { ReduxAPIStruct } from '../reducers/static-types'
import { BaseAction, FirebaseAPIRequest, FirebaseAPIFailure } from './static-types'
import { Values } from '../components/molecules/Forms/DirectoryForm'

const directoryFirebaseFailure = (message: string) => ({
  type: actionTypes.DIRECTORY_FIREBASE_REQUEST_FAILURE,
  payload: { statusCode: 500, message },
})

//-------------------------------------------------------------------------
// Directories
// ------------------------------------------------------------------------
interface SetDirectoriesAction extends BaseAction {
  type: string
  payload: { directories: ReduxAPIStruct<FirebaseSnapShot[]> }
}

interface AddDirectoryAction extends BaseAction {
  type: string
  payload: { newDir: ReduxAPIStruct<FirebaseSnapShot> }
}

export type DirectoriesAction =
  | FirebaseAPIRequest
  | SetDirectoriesAction
  | AddDirectoryAction
  | FirebaseAPIFailure

// NOTE: Firebaseはクライアント側のネットワーク不良などでデータのfetchに失敗してもerrorを吐かず、
//       空配列を返してくる... :anger_jenkins:
export const fetchDirectories = (currentUserUid: string | null) => {
  return (dispatch: ThunkDispatch<{}, {}, Exclude<DirectoriesAction, AddDirectoryAction>>) => {
    if (currentUserUid) {
      dispatch({ type: actionTypes.DIRECTORY_FIREBASE_REQUEST })
      db.collection('users')
        .doc(currentUserUid)
        .collection('directories')
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
        .catch(error => dispatch(directoryFirebaseFailure(error.message)))
    }
  }
}

export const createDirectory = (values: Values, currentUserUid: string) => {
  return async (
    dispatch: ThunkDispatch<{}, {}, Exclude<DirectoriesAction, SetDirectoriesAction>>
  ) => {
    dispatch({ type: actionTypes.DIRECTORY_FIREBASE_REQUEST })
    db.collection('users')
      .doc(currentUserUid)
      .collection('directories')
      .add({
        name: values.directoryName,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      })
      .then(newDoc => {
        // newDirectoryをstoreへ保存
        newDoc
          .get()
          .then(snapShot => {
            dispatch({
              type: actionTypes.DIRECTORY_ADD,
              payload: { newDir: snapShot },
            })
          })
          .catch(error => dispatch(directoryFirebaseFailure(error.message)))
        // newDirectory配下にmaster branchを追加
        newDoc
          .collection('branches')
          .add({
            name: 'master',
            createdAt: Date.now(),
            updatedAt: Date.now(),
          })
          .catch(error => dispatch(directoryFirebaseFailure(error.message)))
      })
      .catch(error => dispatch(directoryFirebaseFailure(error.message)))
  }
}
