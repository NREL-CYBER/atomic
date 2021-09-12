import { Store } from "store";
import { StoreListener } from "store/dist/store";

const firebase: any = {};
const firebaseConfig: any = {};

export const connect = () => {
    return new Promise<string>((resolve, reject) => {
        firebase.apps.length === 0 && firebase.initializeApp(firebaseConfig)
        if (firebase.apps.length > 0) {
            resolve("connected")
        } else {
            reject("app not found")
        }
    })
}
export const listener: (namespace: string, collection: string) => StoreListener<any> = (namespace, collection) => {
    const db = firebase.firestore();
    const namespaced_collection = namespace + "-" + collection;
    return (index, item, status) => {
        return new Promise<string>((resolve, reject) => {
            switch (status) {
                case "workspacing":
                    if (item && typeof item === "object") {
                        db.collection(namespaced_collection + "-workspace").doc("instance").set(item).then(() => {
                            resolve(index);
                        }).catch(reject);
                    }
                    break;
                case "inserting":
                    db.collection(namespaced_collection).doc(index).set(item).then(() => {
                        resolve(index);
                    }).catch(reject);
                    break;
                default:
                    break;
            }

        })
    }
}
export const preload: (namespace: string, StoreApi: () => Store<any>) => Promise<string> = (namespace, store) => {
    return new Promise<string>((resolve) => {
        const db = firebase.firestore();
        const namespaced_collection = namespace + "-" + store().collection;
        let firstRun = true;
        db.collection(namespaced_collection).onSnapshot((snapShot: any) => {
            const cloudRecords = snapShot.docs.map((doc: any) => ({
                [doc.id]: doc.data()
            })).reduce(
                (a: any, b: any) =>
                    ({ ...a, ...b }), {});
            store().import({
                ...store().records,
                ...cloudRecords
            }, false, false).then(() => {
                if (firstRun) {
                    resolve("pre-loaded")
                    firstRun = false;
                }
            })
        })

        db.collection(namespaced_collection + "-workspace").doc("instance").onSnapshot((doc) => {
            store().setWorkspaceInstance(doc.data())
        })

    })

}