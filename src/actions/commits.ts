import { db, FirebaseSnapShot } from '../utils/firebase'
import { ThunkDispatch } from 'redux-thunk'
import { RawDraftContentBlock } from 'draft-js'
import { actionTypes } from '../constants'
import { BaseAction, FirebaseAPIRequest, FirebaseAPIFailure } from './static-types'
import { ReduxAPIStruct } from '../reducers/static-types'
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

const convertToText = (rawContentBlocks: RawDraftContentBlock[]) => {
  let commitBody = ''
  for (const block of rawContentBlocks) {
    let inlineStyledBlockText = block.text
    block.inlineStyleRanges.forEach((inlineStyle, index) => {
      let start = inlineStyle.offset
      const length = inlineStyle.length
      const insertInlineChar = (text: string, char: string) => {
        start += index * 2 // 前回までのループで加算されたcharの数を加味
        const end = start + length
        return text.slice(0, start) + char + text.slice(start, end) + char + text.slice(end)
      }

      switch (inlineStyle.style) {
        case 'BOLD':
          inlineStyledBlockText = insertInlineChar(inlineStyledBlockText, '*')
          break

        case 'ITALIC':
          inlineStyledBlockText = insertInlineChar(inlineStyledBlockText, '_')
          break
      }
    })

    switch (block.type) {
      case 'unstyled':
        commitBody += `${inlineStyledBlockText}\n`
        break

      case 'header-one':
        commitBody += `# ${inlineStyledBlockText}\n`
        break

      case 'header-two':
        commitBody += `## ${inlineStyledBlockText}\n`
        break

      case 'blockquote':
        commitBody += `> ${inlineStyledBlockText}\n`
        break

      case 'unordered-list-item':
        commitBody += `- ${inlineStyledBlockText}\n`
        break
    }
  }

  return commitBody
}

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
    db.collection('users')
      .doc(currentUserUid)
      .collection('directories')
      .doc(directoryId)
      .collection('branches')
      .doc(branchId)
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
      })
      .catch(error => dispatch(commitFirebaseFailure(error.message)))
  }
}
