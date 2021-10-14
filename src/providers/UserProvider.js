import { getAuth, onAuthStateChanged } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react';
import Manager from '../services/firebase/Manager';

export const UserContext = createContext({
  user: 'loading',
  userData: 'loading',
  setUser: () => {}
});

const UserProvider = ({ children }) => {

  const [user, setUser] = useState('loading');
  const [userData, setUserData] = useState('loading');

  useEffect(() => {
    const auth = getAuth();

    let unsubscribe = onAuthStateChanged(auth, user => {
      setUser(user ? user : false);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    // if the user isn't sign in
    if (!user) {
      setUserData(false);
      return;
    }

    // cancel if the user is loading
    if (user === 'loading' || userData !== 'loading') return;

    let userManager = new Manager(`users/${user.uid}`);
    userManager.getAllOnce(snapshot => setUserData(snapshot.val()), error => console.log(error));
  }, [user, userData]);
  
  return (
    <UserContext.Provider value={{ user, userData, setUser }}>
      { children }
    </UserContext.Provider>
  );
};

export default UserProvider;
