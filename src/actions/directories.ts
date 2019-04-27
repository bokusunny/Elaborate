import { db } from '../utils/firebase'
import { ThunkDispatch } from 'redux-thunk'
import { actionTypes } from '../constants'

export const fetchDirectories = () => {
  return (dispatch: ThunkDispatch<{}, {}, any>) => {
    dispatch({ type: actionTypes.DIRECTORY_FIREBASE_REQUEST })
    db.collection('directories')
      .get()
      .then(querySnapshot => {
        // Firebaseのデータは順番がランダムなので作成順にソートする
        const orderedDocs = querySnapshot.docs.sort((doc1, doc2) => {
          if (doc1.data().createdAt === undefined || doc2.data().createdAt === undefined) {
            return 0 // dataを上手くとってこれなかった場合sortしない
          }
          return doc1.data().createdAt.seconds - doc2.data().createdAt.seconds
        })

        dispatch({
          type: actionTypes.DIRECTORY_SET,
          payload: { directories: orderedDocs },
        })
      })
      .catch(
        error => console.error('Error occured: ', error)
        // dispatch(
        //   directoryFirebaseAPIFailure({
        //     statuCode: 500,
        //     message: error,
        //   })
        // )
      )
  }
}
