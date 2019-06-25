import axios from 'axios'
import { ThunkAction } from 'redux-thunk'
import { rootURL } from '../common/constants/url'

export const createUser = (): ThunkAction<Promise<void>, {}, {}, any> => {
  return dispatch => {
    return axios
      .post(rootURL)
      .then(res => {
        dispatch({ type: 'hoge', statusCode: res.status })
      })
      .catch(e => console.error(e))
  }
}
