import { db } from '../utils/firebase'
import { ThunkAction } from 'redux-thunk'
import { RawDraftContentBlock } from 'draft-js'
import { convertToText } from '../common/functions'
import { actionTypes } from '../common/constants/action-types'
import { BaseAction, FirebaseAPIAction, FirebaseAPIFailure } from '../common/static-types/actions'
import { Values } from '../components/molecules/Forms/CommitForm'

// -------------------------------------------------------------------------
// Commits
// ------------------------------------------------------------------------
const commitFirebaseFailure = (message: string): FirebaseAPIFailure => ({
  type: actionTypes.COMMIT__FIREBASE_REQUEST_FAILURE,
  payload: { statusCode: 500, message },
})

interface CreateCommitAction extends BaseAction {
  type: string
  payload: { newCommit: firebase.firestore.DocumentSnapshot }
}

export type CommitsAction = FirebaseAPIAction | CreateCommitAction

export const createCommit = (
  values: Values,
  currentUserUid: string,
  directoryId: string,
  branchId: string,
  rawContentBlocks: RawDraftContentBlock[]
): ThunkAction<Promise<void>, {}, {}, CommitsAction> => {
  return async dispatch => {
    const commitText = convertToText(rawContentBlocks)
    dispatch({ type: actionTypes.COMMIT__FIREBASE_REQUEST, payload: null })
    const currentBranchDocRef = db
      .collection('users')
      .doc(currentUserUid)
      .collection('directories')
      .doc(directoryId)
      .collection('branches')
      .doc(branchId)

    currentBranchDocRef
      .collection('commits')
      .add({
        name: values.commitName,
        body: commitText,
        cratedAt: Date.now(),
      })
      .then(newDocRef => {
        newDocRef.get().then(snapShot => {
          dispatch({
            type: actionTypes.COMMIT__ADD,
            payload: { newCommit: snapShot },
          })
        })

        currentBranchDocRef.update({ body: commitText })
      })
      .catch(error => dispatch(commitFirebaseFailure(error.message)))
  }
}
