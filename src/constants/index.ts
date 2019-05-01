import keyMirror from 'keymirror'

export const actionTypes = keyMirror({
  // Directory
  DIRECTORY_FIREBASE_REQUEST: null,
  DIRECTORY_FIREBASE_REQUEST_FAILURE: null,
  DIRECTORY_SET: null,
  DIRECTORY_ADD: null,

  // Authenticate
  AUTHENTICATION_SET_IS_MODAL_OPEN: null,
  AUTHENTICATION_OPENED_MODAL_TYPE: null,
})
