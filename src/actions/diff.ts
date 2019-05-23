import { db } from '../utils/firebase'
import { ThunkAction } from 'redux-thunk'
import { actionTypes } from '../common/constants/action-types'
import { BaseAction, FirebaseAPIAction, FirebaseAPIFailure } from '../common/static-types/actions'

// -------------------------------------------------------------------------
// Diff Fetch Default Files Body
// -------------------------------------------------------------------------
interface SetLeftDiffFileAction extends BaseAction {
  type: string
  payload: { leftBranchBody: string | null }
}

interface SetRightDiffFileAction extends BaseAction {
  type: string
  payload: { rightBranchBody: string | null }
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
            payload: { leftBranchBody: (snapShot.data() as firebase.firestore.DocumentData).body },
          })
        } else {
          dispatch({
            type: actionTypes.DIFF__LEFT_FILE_SET,
            payload: { leftBranchBody: null },
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
        const documentSnapShotData = snapShot.data()
        if (snapShot.exists && documentSnapShotData) {
          dispatch({
            type: actionTypes.DIFF__RIGHT_FILE_SET,
            payload: { rightBranchBody: documentSnapShotData.body },
          })
        } else {
          dispatch({
            type: actionTypes.DIFF__RIGHT_FILE_SET,
            payload: { rightBranchBody: null },
          })
        }
      })
      .catch(error => dispatch(diffFirebaseFailure(error.message)))
  }
}
