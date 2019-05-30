import { db } from '../utils/firebase'
import { ThunkAction } from 'redux-thunk'
import { actionTypes } from '../common/constants/action-types'
import { BranchDocumentData } from '../common/static-types/document-data'
import { BaseAction, FirebaseAPIAction, FirebaseAPIFailure } from '../common/static-types/actions'

// -------------------------------------------------------------------------
// Diff Fetch Default Files Body
// -------------------------------------------------------------------------
interface SetLeftDiffFileAction extends BaseAction {
  type: string
  payload: {
    leftFileBody: string | null
    leftFileName: string | null
  }
}

interface SetRightDiffFileAction extends BaseAction {
  type: string
  payload: {
    rightFileBody: string | null
    rightFileName: string | null
  }
}

export interface LeftFile {
  leftFileBody: string | null
  leftFileName: string | null
}

export interface RightFile {
  rightFileBody: string | null
  rightFileName: string | null
}

const diffFirebaseFailure = (message: string): FirebaseAPIFailure => ({
  type: actionTypes.DIFF__FIREBASE_REQUEST_FAILURE,
  payload: { statusCode: 500, message },
})

export type DiffFilesAction = FirebaseAPIAction | SetLeftDiffFileAction | SetRightDiffFileAction

export const fetchLeftFile = (
  currentUserUid: string,
  directoryId: string,
  branchId: string
): ThunkAction<void, {}, {}, FirebaseAPIAction | SetLeftDiffFileAction> => {
  return dispatch => {
    dispatch({ type: actionTypes.DIFF__FIREBASE_REQUEST, payload: null })
    db.collection('users')
      .doc(currentUserUid)
      .collection('directories')
      .doc(directoryId)
      .collection('branches')
      .doc(branchId)
      .get()
      .then(snapShot => {
        if (snapShot.exists) {
          dispatch({
            type: actionTypes.DIFF__LEFT_FILE_SET,
            payload: {
              leftFileBody: (snapShot.data() as BranchDocumentData).body,
              leftFileName: (snapShot.data() as BranchDocumentData).name,
            },
          })
        } else {
          dispatch({
            type: actionTypes.DIFF__LEFT_FILE_SET,
            payload: {
              leftFileBody: null,
              leftFileName: null,
            },
          })
        }
      })
      .catch(error => dispatch(diffFirebaseFailure(error.message)))
  }
}

export const fetchRightFile = (
  currentUserUid: string,
  directoryId: string,
  branchId: string
): ThunkAction<void, {}, {}, FirebaseAPIAction | SetRightDiffFileAction> => {
  return dispatch => {
    dispatch({ type: actionTypes.DIFF__FIREBASE_REQUEST, payload: null })
    db.collection('users')
      .doc(currentUserUid)
      .collection('directories')
      .doc(directoryId)
      .collection('branches')
      .doc(branchId)
      .get()
      .then(snapShot => {
        if (snapShot.exists) {
          dispatch({
            type: actionTypes.DIFF__RIGHT_FILE_SET,
            // snapShotが存在することはsnapShot.data()がundefinedではないことを保証
            payload: {
              rightFileBody: (snapShot.data() as BranchDocumentData).body,
              rightFileName: (snapShot.data() as BranchDocumentData).name,
            },
          })
        } else {
          dispatch({
            type: actionTypes.DIFF__RIGHT_FILE_SET,
            payload: {
              rightFileBody: null,
              rightFileName: null,
            },
          })
        }
      })
      .catch(error => dispatch(diffFirebaseFailure(error.message)))
  }
}
