import Alert from 'react-s-alert'
import { db, FirebaseSnapShot } from '../utils/firebase'
import { ThunkAction } from 'redux-thunk'
import { actionTypes } from '../common/constants/action-types'
import { BaseAction, FirebaseAPIAction, FirebaseAPIFailure } from '../common/static-types/actions'
import { Values } from '../components/molecules/Forms/BranchForm'

// -------------------------------------------------------------------------
// Branches
// -------------------------------------------------------------------------
const branchFirebaseFailure = (message: string): FirebaseAPIFailure => ({
  type: actionTypes.BRANCH__FIREBASE_REQUEST_FAILURE,
  payload: { statusCode: 500, message },
})

export interface FetchBranchesAction extends BaseAction {
  type: string
  payload: { branches: FirebaseSnapShot[] }
}

interface CreateBranchAction extends BaseAction {
  type: string
  payload: { newBranch: FirebaseSnapShot }
}

interface MergeCloseBranchAction extends BaseAction {
  type: string
  payload: { branchId: string }
}

export type BranchesAction =
  | FirebaseAPIAction
  | FetchBranchesAction
  | CreateBranchAction
  | MergeCloseBranchAction

export const fetchBranches = (
  currentUserUid: string,
  directoryId: string
): ThunkAction<void, {}, {}, FirebaseAPIAction | FetchBranchesAction> => {
  return dispatch => {
    dispatch({ type: actionTypes.BRANCH__FIREBASE_REQUEST, payload: null })
    db.collection('users')
      .doc(currentUserUid)
      .collection('directories')
      .doc(directoryId)
      .collection('branches')
      .where('state', '==', 'open')
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

export const createBranch = (
  values: Values,
  currentUserUid: string,
  directoryId: string
): ThunkAction<Promise<void>, {}, {}, FirebaseAPIAction | CreateBranchAction> => {
  return async dispatch => {
    dispatch({ type: actionTypes.BRANCH__FIREBASE_REQUEST, payload: null })

    const baseBranchBody = await db
      .collection('users')
      .doc(currentUserUid)
      .collection('directories')
      .doc(directoryId)
      .collection('branches')
      .doc(values.baseBranchId)
      .get()
      .then(snapShot => (snapShot.data() as firebase.firestore.DocumentData).body as string)

    db.collection('users')
      .doc(currentUserUid)
      .collection('directories')
      .doc(directoryId)
      .collection('branches')
      .add({
        name: values.newBranchName,
        baseBranchId: values.baseBranchId,
        state: 'open',
        body: baseBranchBody,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      })
      .then(newDocRef => {
        newDocRef.get().then(snapShot => {
          dispatch({
            type: actionTypes.BRANCH__ADD,
            // TODO:
            // 現状QueryDocumentSnapshotとDocumentSnapshotが混在していてエラーを出すべきところをasで無理やり
            // 通している。後でFix。
            // c.f) https://stackoverflow.com/questions/49859954/firestore-difference-between-documentsnapshot-and-querydocumentsnapshot
            payload: { newBranch: snapShot as FirebaseSnapShot },
          })
          Alert.info('Successfully created!')
        })

        newDocRef.collection('commits').add({
          name: 'initial commit',
          body: '',
          createdAt: Date.now(),
        })
      })
      .catch(error => dispatch(branchFirebaseFailure(error.message)))
  }
}

export const mergeBranch = (
  currentUserUid: string,
  directoryId: string,
  branchId: string
): ThunkAction<Promise<void>, {}, {}, FirebaseAPIAction | MergeCloseBranchAction> => {
  return async dispatch => {
    dispatch({ type: actionTypes.BRANCH__FIREBASE_REQUEST, payload: null })
    const currentBranchDocRef = db
      .collection('users')
      .doc(currentUserUid)
      .collection('directories')
      .doc(directoryId)
      .collection('branches')
      .doc(branchId)

    currentBranchDocRef
      .get()
      .then(doc => {
        const baseBranchDocRef = db
          .collection('users')
          .doc(currentUserUid)
          .collection('directories')
          .doc(directoryId)
          .collection('branches')
          .doc((doc.data() as firebase.firestore.DocumentData).baseBranchId as string)

        currentBranchDocRef
          .collection('commits')
          .get()
          .then(querySnapshot => {
            const addCommitPromises = querySnapshot.docs.map(doc => {
              return baseBranchDocRef.collection('commits').add(doc.data())
            })

            Promise.all(addCommitPromises)
              .then(() => {
                currentBranchDocRef
                  .update({ state: 'merged' })
                  .then(() => {
                    dispatch({
                      type: actionTypes.BRANCH__MERGE_OR_CLOSE,
                      payload: { branchId },
                    })
                    Alert.info('Successfully merged!')
                  })
                  .catch(error => dispatch(branchFirebaseFailure(error.message)))

                currentBranchDocRef.get().then(snapShot => {
                  baseBranchDocRef.update({
                    // snapShotが存在することはsnapShot.data()がundefinedではないことを保証
                    body: (snapShot.data() as firebase.firestore.DocumentData).body,
                  })
                })
              })
              .catch(error => dispatch(branchFirebaseFailure(error.message)))
          })
          .catch(error => dispatch(branchFirebaseFailure(error.message)))
      })
      .catch(error => dispatch(branchFirebaseFailure(error.message)))
  }
}

export const closeBranch = (
  currentUserUid: string,
  directoryId: string,
  branchId: string
): ThunkAction<void, {}, {}, FirebaseAPIAction | MergeCloseBranchAction> => {
  return dispatch => {
    dispatch({ type: actionTypes.BRANCH__FIREBASE_REQUEST, payload: null })
    db.collection('users')
      .doc(currentUserUid)
      .collection('directories')
      .doc(directoryId)
      .collection('branches')
      .doc(branchId)
      .update({ state: 'closed' })
      .then(() => {
        // TODO: ここで'Successfully closed!'みたいなフラッシュを出せると良いかも
        dispatch({
          type: actionTypes.BRANCH__MERGE_OR_CLOSE,
          payload: { branchId },
        })
      })
      .catch(error => dispatch(branchFirebaseFailure(error.message)))
  }
}

// -------------------------------------------------------------------------
// currentBranch
// -------------------------------------------------------------------------
const currentBranchFirebaseFailure = (message: string): FirebaseAPIFailure => ({
  type: actionTypes.CURRENT_BRANCH_DATA__FIREBASE_REQUEST_FAILURE,
  payload: { statusCode: 500, message },
})

export interface BranchData {
  isValidBranch: boolean
  type?: 'master' | 'normal'
  id?: string
  name?: string
  body?: string
  baseBranchId?: string
}

interface CheckBranchDataAction extends BaseAction {
  type: string
  payload: { branchData: BranchData }
}

export type FetchCurrentBranchAction = FirebaseAPIAction | CheckBranchDataAction

export const fetchCurrentBranch = (
  currentUserUid: string,
  directoryId: string,
  branchId: string
): ThunkAction<void, {}, {}, FetchCurrentBranchAction> => {
  return dispatch => {
    dispatch({ type: actionTypes.CURRENT_BRANCH_DATA__FIREBASE_REQUEST, payload: null })
    db.collection('users')
      .doc(currentUserUid)
      .collection('directories')
      .doc(directoryId)
      .collection('branches')
      .doc(branchId)
      .get()
      .then(snapShot => {
        if (snapShot.exists) {
          // snapShotが存在することはsnapShot.data()がundefinedではないことを保証
          const { name, body, baseBranchId } = snapShot.data() as firebase.firestore.DocumentData
          if (name === 'master') {
            dispatch({
              type: actionTypes.CURRENT_BRANCH_DATA__CHECK,
              payload: {
                branchData: {
                  isValidBranch: true,
                  type: 'master',
                  id: branchId,
                  name,
                  body,
                  baseBranchId,
                },
              },
            })
          } else {
            dispatch({
              type: actionTypes.CURRENT_BRANCH_DATA__CHECK,
              payload: {
                branchData: {
                  isValidBranch: true,
                  type: 'normal',
                  id: branchId,
                  name,
                  body,
                  baseBranchId,
                },
              },
            })
          }
        } else {
          dispatch({
            type: actionTypes.CURRENT_BRANCH_DATA__CHECK,
            payload: { branchData: { isValidBranch: false } },
          })
        }
      })
      .catch(error => currentBranchFirebaseFailure(error.message))
  }
}
