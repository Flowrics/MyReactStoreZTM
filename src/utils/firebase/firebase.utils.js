import { initializeApp } from "firebase/app";

import {
getAuth,
signInWithPopup,
GoogleAuthProvider,
createUserWithEmailAndPassword,
signInWithEmailAndPassword,
signOut,
onAuthStateChanged } from 'firebase/auth';

import {getFirestore,
doc,
getDoc,
setDoc,
collection,
writeBatch,
query,
getDocs} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAhSc_Qcus96ROWmm7A776yCGBdxOTAQo8",
  authDomain: "flrcs-store.firebaseapp.com",
  projectId: "flrcs-store",
  storageBucket: "flrcs-store.appspot.com",
  messagingSenderId: "439444189104",
  appId: "1:439444189104:web:6449469812ee3727323075"
};

const app = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account"
})

export const db = getFirestore();

export const addCollectionAndDocuments = async (collectionKey, ObjectToAdd) => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  ObjectToAdd.forEach(object => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  });

  await batch.commit();
  console.log("Done!");
}

export const getCollectionAndDocuments = async () => {
  const collectionRef = collection(db, 'categories');
  const q = query(collectionRef);

  const querySnapShot = await getDocs(q);
  const categoryMap = querySnapShot.docs.reduce((acc, docSnapShot) => {
    const {title, items} = docSnapShot.data();
    acc[title.toLowerCase()] = items;
    return acc;
  }, {});

  return categoryMap;
}

export const creatUserDocumentFromAuth = async (userAuth, additionalinfo={}) => {
  const userDocRef = doc(db, 'users', userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);
  if(!userSnapshot.exists()){
    const {displayName, email} = userAuth;
    const craetedAt = new Date();

    try{
      await setDoc(userDocRef, {
        displayName,
        email,
        craetedAt,
        ...additionalinfo
      });
    } catch(error){
      console.log('error creating user', error.message);
    }
  }
}

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if(!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
}

export const signInUserWithEmailAndPassword = async (email, password) => {
  if(!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
}

export const SignOutUser = async () => await signOut(auth);

export const OnAuthStateChangedListener = (callback) => {
  onAuthStateChanged(auth, callback);
}