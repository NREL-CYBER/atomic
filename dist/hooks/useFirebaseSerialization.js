const useFirebaseSerialization = () => ({
  synchronize: (...args) => {
    console.log("disabled");
  }
});

export default useFirebaseSerialization; // import firebase from 'firebase';
// import 'firebase/auth';
// import 'firebase/firestore';
// import create from "zustand";
// import { Store } from 'store';
// import { AppCloudConfig } from '../util/AppConfig';
// // Uncomment this to activate cloud serialization
// //
// export type cloudSynchronizationContext = {
//     authenticate(email: string, password: string, action: "login" | "create", onLoginSuccess: (uid: string) => void, onLoginFail: () => void): void;
//     synchronize<T>(store: () => Store<T>, uid: string): void;
//     insertDocument<T>(store: () => Store<T>, document: T, itemIndex: string, uid: string): void
//     removeDocument<T>(store: () => Store<T>, itemIndex: string, uid: string): void
// }
// /**
//  * Observe an Entity collection in cloud storage
//  */
// function useFirebaseSerialization(cloud: AppCloudConfig) {
//     if (!cloud.provider.firebase) {
//         throw Error("Only firebase support for now, if another cloud provider is needed, implement it here");
//     }
//     firebase.apps.length === 0 && firebase.initializeApp(cloud.provider.firebase);
//     return create<cloudSynchronizationContext>((set, cloudStorage) => ({
//         authenticate: (email, password, action, onLoginSuccess, onLoginFail) => {
//             action === "login" && firebase.auth().signInWithEmailAndPassword(email, password)
//                 .then((userCredential) => {
//                     console.log(userCredential);
//                     // Signed in
//                     var user = userCredential.user;
//                     // ...
//                     user && console.log(user.uid);
//                     user ? onLoginSuccess(user.uid) : onLoginFail();
//                 })
//                 .catch((error) => {
//                     // var errorCode = error.code;
//                     // var errorMessage = error.message;
//                     // notify({ id: errorCode, message: errorMessage, color: "danger" })
//                     var errorMessage = error.message;
//                     console.log(errorMessage);
//                     onLoginFail()
//                 });
//             action === "create" && firebase.auth().createUserWithEmailAndPassword(email, password)
//                 .then((userCredential) => {
//                     // Signed in
//                     var user = userCredential.user;
//                     user && console.log(user.uid);
//                     user ? onLoginSuccess(user.uid) : onLoginFail();
//                     // ...
//                 })
//                 .catch((error) => {
//                     // var errorCode = error.code;
//                     var errorMessage = error.message;
//                     console.log(errorMessage);
//                     // notify({ id: errorCode, message: errorMessage, color: "danger" })
//                     // ..
//                     onLoginFail()
//                 });
//         },
//         synchronize<T>(store: () => Store<T>, uid: string) {
//             const db = firebase.firestore();
//             db.collection("data").doc(uid).collection(store().collection).get().then((serverCollection) => {
//                 serverCollection.docs.forEach((doc) => {
//                     if (doc.id === "workspace") {
//                         store().setWorkspace((workspaceDraft) => {
//                             Object.entries(doc.data()).forEach(([key, value]) => {
//                                 (workspaceDraft as any)[key] = value;
//                             })
//                         });
//                     } else {
//                         store().insert(doc.data() as T, doc.id);
//                     }
//                 })
//             })
//             store().addListener((index, data, status) => {
//                 console.log("listener active", index, data, status);
//                 switch (status) {
//                     case "workspacing":
//                         cloudStorage().insertDocument(store, data as T, index, uid);
//                         break;
//                     case "inserting":
//                         cloudStorage().insertDocument(store, data as T, index, uid);
//                         break;
//                     case "removing":
//                         cloudStorage().removeDocument(store, index, uid);
//                         break;
//                 }
//             })
//         },
//         insertDocument<T>(store: () => Store<T>, document: T, itemIndex: string, uid: string) {
//             const db = firebase.firestore();
//             if (!itemIndex) {
//                 throw new Error("bad Item index in insert document")
//             }
//             Object.keys(document).forEach(key => (document as any)[key] === undefined || ((document as any)[key] === [] && delete (document as any)[key]))
//             db.collection("data").doc(uid).collection(store().collection).doc(itemIndex).set(document);
//         },
//         removeDocument<T>(store: () => Store<T>, itemIndex: string, uid: string) {
//             const db = firebase.firestore();
//             console.log("Delete Cloud Document");
//             if (!itemIndex) {
//                 throw new Error("Bad Item index in remove document");
//             }
//             db.collection("data").doc(uid).collection(store().collection).doc(itemIndex).delete();
//         }
//     }))
// }
// export default useFirebaseSerialization;