import firebase from 'firebase/app'
import 'firebase/auth'

interface Config {
  apiKey: string
  authDomain: string
  databaseURL: string
  projectId: string
  storageBucket: string
  messagingSenderId: string
}

// TODO: Private repositoryなのでとりあえずベタがきだが、API_KEYとmessagingSenderIdはあとで環境変数に。
const config: Config = {
  apiKey: 'AIzaSyCHmBBP7yGae1865ft_OI6eTtEUJIcs3mE',
  authDomain: 'progate-mafia-tmp.firebaseapp.com',
  databaseURL: 'https://progate-mafia-tmp.firebaseio.com',
  projectId: 'progate-mafia-tmp',
  storageBucket: 'progate-mafia-tmp.appspot.com',
  messagingSenderId: '413747840801',
}

firebase.initializeApp(config)

export default firebase
