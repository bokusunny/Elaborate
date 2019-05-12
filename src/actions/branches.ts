import { db, FirebaseSnapShot } from '../utils/firebase'
import { ThunkDispatch } from 'redux-thunk'
import { actionTypes } from '../common/constants/action-types'
import { ReduxAPIStruct } from '../common/static-types/api-struct'
import { BaseAction, FirebaseAPIRequest, FirebaseAPIFailure } from '../common/static-types/actions'
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

interface MergeCloseBranchAction extends BaseAction {
  type: string
  payload: { branchId: string }
}

export type BranchesAction =
  | FirebaseAPIRequest
  | FirebaseAPIFailure
  | CreateBranchAction
  | MergeCloseBranchAction

export const fetchBranches = (currentUserUid: string, directoryId: string) => {
  return (dispatch: ThunkDispatch<{}, {}, Exclude<BranchesAction, CreateBranchAction>>) => {
    dispatch({ type: actionTypes.BRANCH__FIREBASE_REQUEST })
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

export const createBranch = (values: Values, currentUserUid: string, directoryId: string) => {
  return async (
    dispatch: ThunkDispatch<{}, {}, Exclude<BranchesAction, MergeCloseBranchAction>>
  ) => {
    dispatch({ type: actionTypes.BRANCH__FIREBASE_REQUEST })
    db.collection('users')
      .doc(currentUserUid)
      .collection('directories')
      .doc(directoryId)
      .collection('branches')
      .add({
        name: values.branchName,
        state: 'open',
        body: '',
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

        newDocRef.collection('commits').add({
          name: 'initial commit',
          body: '',
          createdAt: Date.now(),
        })
      })
      .catch(error => dispatch(branchFirebaseFailure(error.message)))
  }
}

export const mergeBranch = (currentUserUid: string, directoryId: string, branchId: string) => {
  return (dispatch: ThunkDispatch<{}, {}, Exclude<BranchesAction, CreateBranchAction>>) => {
    dispatch({ type: actionTypes.BRANCH__FIREBASE_REQUEST })
    const branchCollection = db
      .collection('users')
      .doc(currentUserUid)
      .collection('directories')
      .doc(directoryId)
      .collection('branches')

    branchCollection
      .where('name', '==', 'master')
      .get()
      .then(querySnapShot => {
        // バリデーションによりmasterブランチは各ディレクトリに1つしか存在しない
        const masterBranchDocRef = querySnapShot.docs[0].ref
        const currentBranchDocRef = branchCollection.doc(branchId)

        currentBranchDocRef
          .collection('commits')
          .get()
          .then(querySnapshot => {
            const addCommitPromises = querySnapshot.docs.map(doc => {
              return masterBranchDocRef.collection('commits').add(doc.data())
            })

            Promise.all(addCommitPromises)
              .then(() => {
                currentBranchDocRef
                  .update({ state: 'merged' })
                  .then(() => {
                    // TODO: ここで'Successfully merged!'みたいなフラッシュを出せると良いかも
                    dispatch({
                      type: actionTypes.BRANCH__MERGE_OR_CLOSE,
                      payload: { branchId },
                    })
                  })
                  .catch(error => dispatch(branchFirebaseFailure(error.message)))

                currentBranchDocRef.get().then(snapShot => {
                  const snapShotData = snapShot.data()
                  snapShotData && masterBranchDocRef.update({ body: snapShotData.body })
                })
              })
              .catch(error => dispatch(branchFirebaseFailure(error.message)))
          })
          .catch(error => dispatch(branchFirebaseFailure(error.message)))
      })
      .catch(error => dispatch(branchFirebaseFailure(error.message)))
  }
}

export const closeBranch = (currentUserUid: string, directoryId: string, branchId: string) => {
  return (dispatch: ThunkDispatch<{}, {}, Exclude<BranchesAction, CreateBranchAction>>) => {
    dispatch({ type: actionTypes.BRANCH__FIREBASE_REQUEST })
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
// currentBranchData
// -------------------------------------------------------------------------
const currentBranchDataFirebaseFailure = (message: string) => ({
  type: actionTypes.CURRENT_BRANCH_DATA__FIREBASE_REQUEST_FAILURE,
  payload: { statusCode: 500, message },
})

export interface BranchData {
  type?: 'master' | 'normal'
  isValidBranch: boolean
}

interface CheckBranchDataAction extends BaseAction {
  type: string
  payload: { branchData: BranchData }
}

export type IsInvalidBranchAction = FirebaseAPIRequest | FirebaseAPIFailure | CheckBranchDataAction

export const checkCurrentBranchData = (
  currentUserUid: string,
  directoryId: string,
  branchId: string
) => {
  return (dispatch: ThunkDispatch<{}, {}, IsInvalidBranchAction>) => {
    dispatch({ type: actionTypes.CURRENT_BRANCH_DATA__FIREBASE_REQUEST })
    db.collection('users')
      .doc(currentUserUid)
      .collection('directories')
      .doc(directoryId)
      .collection('branches')
      .doc(branchId)
      .get()
      .then(snapShot => {
        const snapShotData = snapShot.data()
        // snapShot.existsはsnapShot.data()がundefinedでない事を保証するが、tsのエラー回避のために明示
        if (snapShot.exists && snapShotData) {
          if (snapShotData.name === 'master') {
            dispatch({
              type: actionTypes.CURRENT_BRANCH_DATA__CHECK,
              payload: { branchData: { type: 'master', isValidBranch: true } },
            })
          } else {
            dispatch({
              type: actionTypes.CURRENT_BRANCH_DATA__CHECK,
              payload: { branchData: { type: 'normal', isValidBranch: true } },
            })
          }
        } else {
          dispatch({
            type: actionTypes.CURRENT_BRANCH_DATA__CHECK,
            payload: { branchData: { isValidBranch: false } },
          })
        }
      })
      .catch(error => currentBranchDataFirebaseFailure(error.message))
  }
}

// -------------------------------------------------------------------------
// currentBranchBody
// -------------------------------------------------------------------------
// checkBranchDataと一元化できるかも
export const fetchBranchBody = (currentUserUid: string, directoryId: string, branchId: string) => {
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
