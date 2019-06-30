import axios from 'axios'
import { ThunkAction } from 'redux-thunk'
import { rootURL } from '../common/constants/url'

export const createUser = (): ThunkAction<Promise<void>, {}, {}, any> => {
  return dispatch => {
    return axios({
      method: 'post',
      url: rootURL,
      headers: { Authorization: `Bearer ${localStorage.getItem('elaborate-jwt')}` },
      data: {
        name: 'Sunny',
        email: 'bokusunny@example.com',
      },
    })
      .then(res => {
        dispatch({ type: 'hoge', newUser: res.data })
      })
      .catch(e => console.error(e))
  }
}
