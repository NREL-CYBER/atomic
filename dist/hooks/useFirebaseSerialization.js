import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore';
import create from "zustand";

/**
 * Observe an Entity collection in cloud storage
 */
function useFirebaseSerialization(cloud) {
  if (!cloud.provider.firebase) {
    throw Error("Only firebase support for now, if another cloud provider is needed, implement it here");
  }

  firebase.apps.length === 0 && firebase.initializeApp(cloud.provider.firebase);
  return create((set, cloudStorage) => ({
    authenticate: (email, password, action, onLoginSuccess, onLoginFail) => {
      action === "login" && firebase.auth().signInWithEmailAndPassword(email, password).then(userCredential => {
        console.log(userCredential); // Signed in

        var user = userCredential.user; // ...

        user && console.log(user.uid);
        user ? onLoginSuccess(user.uid) : onLoginFail();
      }).catch(error => {
        // var errorCode = error.code;
        // var errorMessage = error.message;
        // notify({ id: errorCode, message: errorMessage, color: "danger" })
        var errorMessage = error.message;
        console.log(errorMessage);
        onLoginFail();
      });
      action === "create" && firebase.auth().createUserWithEmailAndPassword(email, password).then(userCredential => {
        // Signed in
        var user = userCredential.user;
        user && console.log(user.uid);
        user ? onLoginSuccess(user.uid) : onLoginFail(); // ...
      }).catch(error => {
        // var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage); // notify({ id: errorCode, message: errorMessage, color: "danger" })
        // ..

        onLoginFail();
      });
    },

    synchronize(store, uid) {
      const db = firebase.firestore();
      db.collection("data").doc(uid).collection(store().collection).get().then(serverCollection => {
        serverCollection.docs.forEach(doc => {
          if (doc.id === "workspace") {
            store().setWorkspace(workspaceDraft => {
              Object.entries(doc.data()).forEach(([key, value]) => {
                workspaceDraft[key] = value;
              });
            });
          } else {
            store().insert(doc.data(), doc.id);
          }
        });
      });
      store().addListener((index, data, status) => {
        console.log("listener active", index, data, status);

        switch (status) {
          case "workspace-update":
            cloudStorage().insertDocument(store, data, index, uid);
            break;

          case "inserting":
            cloudStorage().insertDocument(store, data, index, uid);
            break;

          case "removing":
            cloudStorage().removeDocument(store, index, uid);
            break;
        }
      });
    },

    insertDocument(store, document, itemIndex, uid) {
      const db = firebase.firestore();

      if (!itemIndex) {
        throw new Error("bad Item index in insert document");
      }

      Object.keys(document).forEach(key => document[key] === undefined || document[key] === [] && delete document[key]);
      db.collection("data").doc(uid).collection(store().collection).doc(itemIndex).set(document);
    },

    removeDocument(store, itemIndex, uid) {
      const db = firebase.firestore();
      console.log("Delete Cloud Document");

      if (!itemIndex) {
        throw new Error("Bad Item index in remove document");
      }

      db.collection("data").doc(uid).collection(store().collection).doc(itemIndex).delete();
    }

  }));
}

export default useFirebaseSerialization;