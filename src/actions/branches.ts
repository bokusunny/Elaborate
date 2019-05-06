import { db, FirebaseSnapShot } from '../utils/firebase'
import { ThunkDispatch } from 'redux-thunk'
import { actionTypes } from '../constants'
import { ReduxAPIStruct } from '../reducers/static-types'
import { BaseAction, FirebaseAPIRequest, FirebaseAPIFailure } from './static-types'
import { Values } from '../components/molecules/Forms/BranchForm'

// -------------------------------------------------------------------------
// Branches
// -------------------------------------------------------------------------
const branchFirebaseFailure = (message: string) => ({
  type: actionTypes.BRANCH__FIREBASE_REQUEST_FAILURE,
  payload: { statusCode: 500, message },
})

interface CreateBranchAction extends BaseAction {
  type: string
  payload: { newBranch: ReduxAPIStruct<FirebaseSnapShot> }
}

export type BranchesAction = FirebaseAPIRequest | FirebaseAPIFailure | CreateBranchAction

export const fetchBranches = (currentUserUid: string, directoryId: string) => {
  return (dispatch: ThunkDispatch<{}, {}, Exclude<BranchesAction, CreateBranchAction>>) => {
    dispatch({ type: actionTypes.BRANCH__FIREBASE_REQUEST })
    db.collection('users')
      .doc(currentUserUid)
      .collection('directories')
      .doc(directoryId)
      .collection('branches')
      .get()
      .then(querySnapshot => {
        // Firebaseのデータは取得時順番がランダムなので作成順にソートする
        const orderedBranches = querySnapshot.docs.sort((doc1, doc2) => {
          return doc1.data().createdAt - doc2.data().createdAt
        })
        dispatch({
          type: actionTypes.BRANCH__SET,
          payload: { branches: orderedBranches },
        })
      })
      .catch(error => dispatch(branchFirebaseFailure(error.message)))
  }
}

export const createBranch = (values: Values, currentUserUid: string, directoryId: string) => {
  return async (dispatch: ThunkDispatch<{}, {}, BranchesAction>) => {
    dispatch({ type: actionTypes.BRANCH__FIREBASE_REQUEST })
    db.collection('users')
      .doc(currentUserUid)
      .collection('directories')
      .doc(directoryId)
      .collection('branches')
      .add({
        name: values.branchName,
        state: 'open',
        createdAt: Date.now(),
        updatedAt: Date.now(),
      })
      .then(newDocRef => {
        newDocRef.get().then(snapShot => {
          dispatch({
            type: actionTypes.BRANCH__ADD,
            payload: { newBranch: snapShot },
          })
        })
      })
      .catch(error => dispatch(branchFirebaseFailure(error.message)))
  }
}

// -------------------------------------------------------------------------
// IsInvalidBranch
// -------------------------------------------------------------------------
const isValidBranchFirebaseFailure = (message: string) => ({
  type: actionTypes.BRANCH_IS_VALID__FIREBASE_REQUEST_FAILURE,
  payload: { statusCode: 500, message },
})

interface CheckBranchIdAction extends BaseAction {
  type: string
  payload: { isValidBranchId: ReduxAPIStruct<boolean> }
}

export type IsInvalidBranchAction = FirebaseAPIRequest | FirebaseAPIFailure | CheckBranchIdAction

export const checkBranchId = (currentUserUid: string, directoryId: string, branchId: string) => {
  return (dispatch: ThunkDispatch<{}, {}, IsInvalidBranchAction>) => {
    dispatch({ type: actionTypes.BRANCH_IS_VALID__FIREBASE_REQUEST })
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
            type: actionTypes.BRANCH__CHECK_ID,
            payload: { isValidBranchId: true },
          })
        } else {
          dispatch({
            type: actionTypes.BRANCH__CHECK_ID,
            payload: { isValidBranchId: false },
          })
        }
      })
      .catch(error => isValidBranchFirebaseFailure(error.message))
  }
}
