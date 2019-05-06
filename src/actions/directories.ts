import { db, FirebaseSnapShot } from '../utils/firebase'
import { ThunkDispatch } from 'redux-thunk'
import { actionTypes } from '../constants'
import { ReduxAPIStruct } from '../reducers/static-types'
import { BaseAction, FirebaseAPIRequest, FirebaseAPIFailure } from './static-types'
import { Values } from '../components/molecules/Forms/DirectoryForm'

const directoryFirebaseFailure = (message: string) => ({
  type: actionTypes.DIRECTORY__FIREBASE_REQUEST_FAILURE,
  payload: { statusCode: 500, message },
})

// -------------------------------------------------------------------------
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
  | FirebaseAPIFailure
  | SetDirectoriesAction
  | AddDirectoryAction

// NOTE: Firebaseはクライアント側のネットワーク不良などでデータのfetchに失敗してもerrorを吐かず、
//       空配列を返してくる... :anger_jenkins:
export const fetchDirectories = (currentUserUid: string | null) => {
  return (dispatch: ThunkDispatch<{}, {}, Exclude<DirectoriesAction, AddDirectoryAction>>) => {
    if (currentUserUid) {
      dispatch({ type: actionTypes.DIRECTORY__FIREBASE_REQUEST })
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
            type: actionTypes.DIRECTORY__SET,
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
    dispatch({ type: actionTypes.DIRECTORY__FIREBASE_REQUEST })
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
              type: actionTypes.DIRECTORY__ADD,
              payload: { newDir: snapShot },
            })
          })
          .catch(error => dispatch(directoryFirebaseFailure(error.message)))
        // newDirectory配下にmaster branchを追加
        newDoc
          .collection('branches')
          .add({
            name: 'master',
            state: 'open',
            createdAt: Date.now(),
            updatedAt: Date.now(),
          })
          .catch(error => dispatch(directoryFirebaseFailure(error.message)))
      })
      .catch(error => dispatch(directoryFirebaseFailure(error.message)))
  }
}

// -------------------------------------------------------------------------
// IsInvalidDirectory
// -------------------------------------------------------------------------
interface CheckDirectoryIdAction extends BaseAction {
  type: string
  payload: { isValidDirectoryId: ReduxAPIStruct<boolean> }
}

export type IsInvalidDirectoryAction =
  | FirebaseAPIRequest
  | FirebaseAPIFailure
  | CheckDirectoryIdAction

export const checkDirectoryId = (currentUserUid: string, directoryId: string) => {
  return (dispatch: ThunkDispatch<{}, {}, IsInvalidDirectoryAction>) => {
    dispatch({ type: actionTypes.DIRECTORY_IS_INVALID__FIREBASE_REQUEST })
    const directoryDocRef = db
      .collection('users')
      .doc(currentUserUid)
      .collection('directories')
      .doc(directoryId)

    directoryDocRef
      .get()
      .then(doc => {
        if (doc.exists) {
          dispatch({ type: actionTypes.BRANCH__FIREBASE_REQUEST })
          directoryDocRef
            .collection('branches')
            .get()
            .then(querySnapshot => {
              // Firebaseのデータは取得時順番がランダムなので作成順にソートする
              const orderedDocs = querySnapshot.docs.sort((doc1, doc2) => {
                return doc1.data().createdAt - doc2.data().createdAt
              })

              dispatch({
                type: actionTypes.DIRECTORY__CHECK_ID,
                payload: { isValidDirectoryId: true },
              })
              dispatch({
                type: actionTypes.BRANCH__SET,
                payload: { branches: orderedDocs },
              })
            })
            .catch(error => dispatch(directoryFirebaseFailure(error.message)))
        } else {
          dispatch({
            type: actionTypes.DIRECTORY__CHECK_ID,
            payload: { isValidDirectoryId: false },
          })
        }
      })
      .catch(error => dispatch(directoryFirebaseFailure(error.message)))
  }
}

// -------------------------------------------------------------------------
// DirectoryStatus
// -------------------------------------------------------------------------

interface SetSelectedDirectoryAction extends BaseAction {
  type: string
  payload: { selectedDirectoryId: string }
}

export type DirectoriesStatusAction = SetSelectedDirectoryAction

export const setSelectedDirectory = (selectedDirectoryId: string) => {
  return (dispatch: ThunkDispatch<{}, {}, DirectoriesStatusAction>) => {
    dispatch({
      type: actionTypes.DIRECTORY__SET_SELECTED_DIRECTORY_ID,
      payload: { selectedDirectoryId },
    })
  }
}
