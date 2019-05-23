import { db, FirebaseSnapShot } from '../utils/firebase'
import { ThunkAction } from 'redux-thunk'
import { actionTypes } from '../common/constants/action-types'
import { BaseAction, FirebaseAPIAction, FirebaseAPIFailure } from '../common/static-types/actions'
import { Values } from '../components/molecules/Forms/DirectoryForm'
import { FetchBranchesAction } from './branches'

// -------------------------------------------------------------------------
// Directories
// -------------------------------------------------------------------------
const directoryFirebaseFailure = (message: string): FirebaseAPIFailure => ({
  type: actionTypes.DIRECTORY__FIREBASE_REQUEST_FAILURE,
  payload: { statusCode: 500, message },
})

interface SetDirectoriesAction extends BaseAction {
  type: string
  payload: { directories: FirebaseSnapShot[] }
}

interface AddDirectoryAction extends BaseAction {
  type: string
  payload: { newDir: FirebaseSnapShot }
}

export type DirectoriesAction = FirebaseAPIAction | SetDirectoriesAction | AddDirectoryAction

// NOTE: Firebaseはクライアント側のネットワーク不良などでデータのfetchに失敗してもerrorを吐かず、
//       空配列を返してくる... :anger_jenkins:
export const fetchDirectories = (
  currentUserUid: string | null
): ThunkAction<void, {}, {}, FirebaseAPIAction | SetDirectoriesAction> => {
  return dispatch => {
    if (currentUserUid) {
      dispatch({ type: actionTypes.DIRECTORY__FIREBASE_REQUEST, payload: null })
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

export const createDirectory = (
  values: Values,
  currentUserUid: string
): ThunkAction<Promise<void>, {}, {}, FirebaseAPIAction | AddDirectoryAction> => {
  return async dispatch => {
    dispatch({ type: actionTypes.DIRECTORY__FIREBASE_REQUEST, payload: null })
    db.collection('users')
      .doc(currentUserUid)
      .collection('directories')
      .add({
        name: values.directoryName,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      })
      .then(newDirectoryDoc => {
        // newDirectoryをstoreへ保存
        newDirectoryDoc
          .get()
          .then(snapShot => {
            dispatch({
              type: actionTypes.DIRECTORY__ADD,
              // TODO:
              // 現状QueryDocumentSnapshotとDocumentSnapshotが混在していてエラーを出すべきところをasで無理やり
              // 通している。後でFix。
              // c.f) https://stackoverflow.com/questions/49859954/firestore-difference-between-documentsnapshot-and-querydocumentsnapshot
              payload: { newDir: snapShot as FirebaseSnapShot },
            })
          })
          .catch(error => dispatch(directoryFirebaseFailure(error.message)))
        // newDirectory配下にmaster branchを追加
        newDirectoryDoc
          .collection('branches')
          .add({
            name: 'master',
            baseBranchId: null,
            state: 'open',
            body: '',
            createdAt: Date.now(),
            updatedAt: Date.now(),
          })
          .then(newBranchDoc => {
            newBranchDoc.collection('commits').add({
              name: 'initial commit',
              body: '',
              createdAt: Date.now(),
            })
          })
          .catch(error => dispatch(directoryFirebaseFailure(error.message)))
      })
      .catch(error => dispatch(directoryFirebaseFailure(error.message)))
  }
}

// -------------------------------------------------------------------------
// IsInvalidDirectory
// -------------------------------------------------------------------------
const isValidDirectoryFirebaseFailure = (message: string): FirebaseAPIFailure => ({
  type: actionTypes.DIRECTORY_IS_VALID__FIREBASE_REQUEST_FAILURE,
  payload: { statusCode: 500, message },
})

interface CheckDirectoryIdAction extends BaseAction {
  type: string
  payload: { isValidDirectoryId: boolean }
}

export type IsInvalidDirectoryAction = FirebaseAPIAction | CheckDirectoryIdAction

export const checkDirectoryId = (
  currentUserUid: string,
  directoryId: string
): ThunkAction<void, {}, {}, IsInvalidDirectoryAction | FetchBranchesAction> => {
  return dispatch => {
    dispatch({ type: actionTypes.DIRECTORY_IS_VALID__FIREBASE_REQUEST, payload: null })
    const directoryDocRef = db
      .collection('users')
      .doc(currentUserUid)
      .collection('directories')
      .doc(directoryId)

    directoryDocRef
      .get()
      .then(doc => {
        if (doc.exists) {
          dispatch({ type: actionTypes.BRANCH__FIREBASE_REQUEST, payload: null })
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
            .catch(error => dispatch(isValidDirectoryFirebaseFailure(error.message)))
        } else {
          dispatch({
            type: actionTypes.DIRECTORY__CHECK_ID,
            payload: { isValidDirectoryId: false },
          })
        }
      })
      .catch(error => dispatch(isValidDirectoryFirebaseFailure(error.message)))
  }
}

// -------------------------------------------------------------------------
// DirectoriesStatus
// -------------------------------------------------------------------------
interface SetSelectedDirectoryAction extends BaseAction {
  type: string
  payload: { selectedDirectoryId: string }
}

export type DirectoriesStatusAction = SetSelectedDirectoryAction

export const setSelectedDirectory = (
  selectedDirectoryId: string
): ThunkAction<void, {}, {}, DirectoriesStatusAction> => {
  return dispatch => {
    dispatch({
      type: actionTypes.DIRECTORY__SET_SELECTED_DIRECTORY_ID,
      payload: { selectedDirectoryId },
    })
  }
}
