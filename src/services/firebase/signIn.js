import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const signIn = (email, password, resolve, reject) => {
  const auth = getAuth();

  signInWithEmailAndPassword(auth, email, password)
    .then(resolve)
    .catch(reject);
};

export default signIn;
