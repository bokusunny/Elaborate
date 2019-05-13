import { db } from '../utils/firebase'
import { ThunkDispatch } from 'redux-thunk'
import { actionTypes } from '../common/constants/action-types'
import { BaseAction, FirebaseAPIRequest, FirebaseAPIFailure } from '../common/static-types/actions'

// -------------------------------------------------------------------------
// Diff Fetch Default Files Body
// -------------------------------------------------------------------------

interface SetLeftDiffFileAction extends BaseAction {
  type: string
  payload: { leftBranchBody: string | null }
}

interface SetRishtDiffFileAction extends BaseAction {
  type: string
  payload: { rightBranchBody: string | null }
}

const diffFirebaseFailure = (message: string) => ({
  type: actionTypes.DIFF__FIREBASE_REQUEST_FAILURE,
  payload: { statusCode: 500, message },
})

export type DiffFilesAction =
  | FirebaseAPIRequest
  | FirebaseAPIFailure
  | SetLeftDiffFileAction
  | SetRishtDiffFileAction

export const fetchLeftFile = (currentUserUid: string, directoryId: string) => {
  // TODO: Dispatchの型付け
  return (dispatch: ThunkDispatch<{}, {}, any>) => {
    dispatch({ type: actionTypes.DIFF__FIREBASE_REQUEST, payload: null })
    db.collection('users')
      .doc(currentUserUid)
      .collection('directories')
      .doc(directoryId)
      .collection('branches')
      // 早めにURLから取ってくように変更する
      .where('name', '==', 'master')
      .get()
      .then(querySnapShot => {
        const leftBranchBody = querySnapShot.docs[0].data().body
        dispatch({
          type: actionTypes.DIFF__LEFT_FILE_SET,
          payload: { leftBranchBody },
        })
      })
      .catch(error => dispatch(diffFirebaseFailure(error.message)))
  }
}

export const fetchRightFile = (currentUserUid: string, directoryId: string, branchId: string) => {
  // TODO: Dispatchの型付け
  return (dispatch: ThunkDispatch<{}, {}, any>) => {
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
