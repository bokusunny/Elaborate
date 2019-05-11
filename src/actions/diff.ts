import { db, FirebaseSnapShot } from '../utils/firebase'
import { ThunkDispatch } from 'redux-thunk'
import { actionTypes } from '../common/constants/action-types'
import { ReduxAPIStruct } from '../common/static-types/api-struct'
import { BaseAction, FirebaseAPIRequest, FirebaseAPIFailure } from '../common/static-types/actions'

// -------------------------------------------------------------------------
// Diff Fetch Default Files Body
// -------------------------------------------------------------------------

interface SetDiffFileAction extends BaseAction {
  type: string
  payload: ReduxAPIStruct<FirebaseSnapShot>
}

const diffFirebaseFailure = (message: string) => ({
  type: actionTypes.DIFF__FIREBASE_REQUEST_FAILURE,
  payload: { statusCode: 500, message },
})

export type DiffFilesAction = FirebaseAPIRequest | FirebaseAPIFailure | SetDiffFileAction

export const fetchLeftFile = (currentUserUid: string, directoryId: string) => {
  return async (dispatch: ThunkDispatch<{}, {}, DiffFilesAction>) => {
    dispatch({ type: actionTypes.DIFF__FIREBASE_REQUEST })
    db.collection('users')
      .doc(currentUserUid)
      .collection('directories')
      .doc(directoryId)
      .collection('branches')
      .where('name', '==', 'master')
      .get()
      .then(querySnapShot => {
        // 後でbodyを取ってくるように変更する
        const masterBranchDocRef = querySnapShot.docs[0].data().body
        dispatch({
          type: actionTypes.DIFF__LEFT_FILE_SET,
          payload: masterBranchDocRef,
        })
      })
      .catch(error => dispatch(diffFirebaseFailure(error.message)))
  }
}

export const fetchRightFile = (currentUserUid: string, directoryId: string, branchId: string) => {
  return async (dispatch: ThunkDispatch<{}, {}, DiffFilesAction>) => {
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
