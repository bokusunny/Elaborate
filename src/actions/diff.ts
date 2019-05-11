import { db } from '../utils/firebase'
import { ThunkDispatch } from 'redux-thunk'
import { actionTypes } from '../common/constants/action-types'
import { BaseAction, FirebaseAPIRequest, FirebaseAPIFailure } from '../common/static-types/actions'

// -------------------------------------------------------------------------
// Diff Fetch Default Files Body
// -------------------------------------------------------------------------

interface SetDiffFileAction extends BaseAction {
  type: string
  payload: string
}

const diffFirebaseFailure = (message: string) => ({
  type: actionTypes.DIFF__FIREBASE_REQUEST_FAILURE,
  payload: { statusCode: 500, message },
})

export type DiffFilesAction = FirebaseAPIRequest | FirebaseAPIFailure | SetDiffFileAction

export const fetchLeftFile = (currentUserUid: string, directoryId: string) => {
  return (dispatch: ThunkDispatch<{}, {}, DiffFilesAction>) => {
    dispatch({ type: actionTypes.DIFF__FIREBASE_REQUEST })
    db.collection('users')
      .doc(currentUserUid)
      .collection('directories')
      .doc(directoryId)
      .collection('branches')
      // 早めにURLから取ってくように変更する
      .where('name', '==', 'master')
      .get()
      .then(querySnapShot => {
        const leftBranchDocRef = querySnapShot.docs[0].data().body
        dispatch({
          type: actionTypes.DIFF__LEFT_FILE_SET,
          payload: leftBranchDocRef,
        })
      })
      .catch(error => dispatch(diffFirebaseFailure(error.message)))
  }
}

export const fetchRightFile = (currentUserUid: string, directoryId: string, branchId: string) => {
  return (dispatch: ThunkDispatch<{}, {}, DiffFilesAction>) => {
    dispatch({ type: actionTypes.DIFF__FIREBASE_REQUEST })
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
            payload: documentSnapShotData.body,
          })
        } else {
          dispatch({
            type: actionTypes.DIFF__RIGHT_FILE_SET,
            payload: null,
          })
        }
      })
      .catch(error => dispatch(diffFirebaseFailure(error.message)))
  }
}
