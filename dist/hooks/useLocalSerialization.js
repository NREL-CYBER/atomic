import { Plugins } from '@capacitor/core';
import create from 'zustand';
const {
  Storage
} = Plugins;

/**
 * Observe a collection save into local storage on change
 */
function composeLocalStorage() {
  const partialKey = "-partial-instance";
  return create((set, localStorage) => ({
    async synchronize(namespace, store) {
      const {
        value
      } = await Storage.get({
        key: store().collection
      });
      const partialItem = await Storage.get({
        key: store().collection + partialKey
      });
      const collectionInfo = value && JSON.parse(value) || [];

      for (const dataItem of collectionInfo) {
        const unsafeDataItem = dataItem;

        if (unsafeDataItem && unsafeDataItem.hasOwnProperty("id")) {
          store().insert(dataItem, unsafeDataItem["id"]);
        } else if (unsafeDataItem && unsafeDataItem.hasOwnProperty("uuid")) {
          store().insert(dataItem, unsafeDataItem["uuid"]);
        } else {
          store().insert(dataItem);
        }
      }

      const partialValue = partialItem && partialItem.value && JSON.parse(partialItem.value);
      partialValue && store().setPartial(partialDraft => {
        Object.keys(partialValue).forEach(key => {
          partialDraft[key] = partialValue[key];
        });
      });
      store().addListener((id, document) => {
        if (id === "partial") {
          Storage.set({
            key: namespace + store().collection + partialKey,
            value: JSON.stringify(document)
          });
        } else {
          Storage.set({
            key: namespace + store().collection,
            value: store().export()
          });
        }
      });
    }

  }));
}

const useLocalSerialization = composeLocalStorage();
export default useLocalSerialization;