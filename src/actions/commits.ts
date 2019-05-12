import { db, FirebaseSnapShot } from '../utils/firebase'
import { ThunkDispatch } from 'redux-thunk'
import { RawDraftContentBlock } from 'draft-js'
import { convertToText } from '../common/functions'
import { actionTypes } from '../common/constants/action-types'
import { BaseAction, FirebaseAPIRequest, FirebaseAPIFailure } from '../common/static-types/actions'
import { ReduxAPIStruct } from '../common/static-types/api-struct'
import { Values } from '../components/molecules/Forms/CommitForm'

// -------------------------------------------------------------------------
// Commits
// ------------------------------------------------------------------------
const commitFirebaseFailure = (message: string) => ({
  type: actionTypes.COMMIT__FIREBASE_REQUEST_FAILURE,
  payload: { statusCode: 500, message },
})

interface CreateCommitAction extends BaseAction {
  type: string
  payload: { newCommit: ReduxAPIStruct<FirebaseSnapShot> }
}

export type CommitsAction = FirebaseAPIRequest | FirebaseAPIFailure | CreateCommitAction

export const createCommit = (
  values: Values,
  currentUserUid: string,
  directoryId: string,
  branchId: string,
  rawContentBlocks: RawDraftContentBlock[]
) => {
  return async (dispatch: ThunkDispatch<{}, {}, CommitsAction>) => {
    const commitText = convertToText(rawContentBlocks)
    dispatch({ type: actionTypes.COMMIT__FIREBASE_REQUEST })
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

// -------------------------------------------------------------------------
// latestCommitBody
// -------------------------------------------------------------------------
// const latestCommitBodyFirebaseFailure = (message: string) => ({
//   type: actionTypes.LATEST_COMMIT_BODY__FIREBASE_REQUEST_FAILURE,
//   payload: { statusCode: 500, message },
// })

export type LatestCommitBodyAction = FirebaseAPIRequest | FirebaseAPIFailure

export const fetchLatestCommitBody = (
  currentUserUid: string,
  directoryId: string,
  branchId: string
) => {
  return async () => {
    // TODO: 今後できればcatchを追記
    return db
      .collection('users')
      .doc(currentUserUid)
      .collection('directories')
      .doc(directoryId)
      .collection('branches')
      .doc(branchId)
      .get()
      .then(doc => {
        const docData = doc.data()
        if (docData === undefined || typeof docData.body !== 'string') return null

        return docData.body
      })
  }
}
