import Alert from 'react-s-alert'
import { db } from '../utils/firebase'
import { ThunkAction } from 'redux-thunk'
import { RawDraftContentBlock } from 'draft-js'
import { convertToText } from '../common/functions'
import { actionTypes } from '../common/constants/action-types'
import { CommitDocumentData } from '../common/static-types/document-data'
import { BaseAction, FirebaseAPIAction, FirebaseAPIFailure } from '../common/static-types/actions'
import { Values } from '../components/molecules/Forms/CommitForm'

// -------------------------------------------------------------------------
// Commits
// -------------------------------------------------------------------------
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
        createdAt: Date.now(),
      })
      .then(newDocRef => {
        newDocRef
          .get()
          .then(snapShot => {
            dispatch({
              type: actionTypes.COMMIT__ADD,
              payload: { newCommit: snapShot },
            })
          })
          .then(() => Alert.info('Successfully committed!'))

        currentBranchDocRef.update({ body: commitText, updatedAt: Date.now() })
      })
      .catch(error => dispatch(commitFirebaseFailure(error.message)))
  }
}

// -------------------------------------------------------------------------
// fetchLatestCommitBody
// -------------------------------------------------------------------------
export const fetchLatestCommitBody = (
  currentUserUid: string,
  directoryId: string,
  branchId: string
) => {
  return async () => {
    return db
      .collection('users')
      .doc(currentUserUid)
      .collection('directories')
      .doc(directoryId)
      .collection('branches')
      .doc(branchId)
      .collection('commits')
      .get()
      .then(querySnapshot => {
        // Firebaseのデータは取得時順番がランダムなので作成順にソートする
        const latestCommit = querySnapshot.docs.sort((doc1, doc2) => {
          return (
            (doc2.data() as CommitDocumentData).createdAt -
            (doc1.data() as CommitDocumentData).createdAt
          )
        })[0]

        return (latestCommit.data() as CommitDocumentData).body
      })
  }
}
