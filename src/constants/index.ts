import keyMirror from 'keymirror'

export const actionTypes = keyMirror({
  // Directory
  DIRECTORY_FIREBASE_REQUEST: null,
  DIRECTORY_FIREBASE_REQUEST_FAILURE: null,
  DIRECTORY_SET: null,
  DIRECTORY_ADD: null,

  // Modal
  MODAL_AUTHENTICATION_OPEN: null,
  MODAL_AUTHENTICATION_CLOSE: null,
})
