import SuperAgent from 'superagent';
import firebase from 'firebase';

const config = {
  apiKey: SuperAgent.get(process.env.REACT_APP_API_KEY).url,
  authDomain: SuperAgent.get(process.env.REACT_APP_AUTH_DOMAIN).url,
  databaseURL: SuperAgent.get(process.env.REACT_APP_DATABASE_URL).url,
  projectId: SuperAgent.get(process.env.REACT_APP_PROJECT_ID).url,
  messagingSenderId: SuperAgent.get(process.env.REACT_APP_MESSAGING_SENDER_ID).url,
};

firebase.initializeApp(config);

export const ref = firebase.database().ref();
