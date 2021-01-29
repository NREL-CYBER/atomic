import 'firebase/auth';
import 'firebase/firestore';
import { Store } from 'store';
import { AppCloudConfig } from '../util/AppConfig';
export declare type cloudSynchronizationContext = {
    authenticate(email: string, password: string, action: "login" | "create", onLoginSuccess: (uid: string) => void): void;
    synchronize<T>(store: () => Store<T>, uid: string): void;
    insertDocument<T>(store: () => Store<T>, document: T, itemIndex: string, uid: string): void;
    removeDocument<T>(store: () => Store<T>, itemIndex: string, uid: string): void;
};
/**
 * Observe an Entity collection in cloud storage
 */
declare function useFirebaseStorage(cloud: AppCloudConfig): import("zustand").UseStore<cloudSynchronizationContext>;
export default useFirebaseStorage;
