import { db, FirebaseSnapShot } from '../utils/firebase'
import { ThunkDispatch } from 'redux-thunk'
import { actionTypes } from '../constants'
import { ReduxAPIStruct } from '../reducers/static-types'
import { BaseAction, FirebaseAPIRequest, FirebaseAPIFailure } from './static-types'
import { Values } from '../components/molecules/Forms/BranchForm'

const branchFirebaseFailure = (message: string) => ({
  type: actionTypes.BRANCH__FIREBASE_REQUEST_FAILURE,
  payload: { statusCode: 500, message },
})

// -------------------------------------------------------------------------
// Branches
// -------------------------------------------------------------------------
interface CreateBranchAction extends BaseAction {
  type: string
  payload: { newBranch: ReduxAPIStruct<FirebaseSnapShot> }
}

export type BranchesAction = FirebaseAPIRequest | FirebaseAPIFailure | CreateBranchAction

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
