import { getApp, getApps, initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAgrI_LeUMRyAVJwlyjQyt8zT_Qooz5-LU",
  authDomain: "blogging-website-version-2.firebaseapp.com",
  projectId: "blogging-website-version-2",
  storageBucket: "blogging-website-version-2.appspot.com",
  messagingSenderId: "296726342117",
  appId: "1:296726342117:web:8707d2e76daaaebb01a70c",
  measurementId: "G-RN5WJ6E861",
};

const app = getApps > 0 ? getApp : initializeApp(firebaseConfig);
const storage = getStorage(app);
export { app, storage };
