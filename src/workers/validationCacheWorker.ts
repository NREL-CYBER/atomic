/* eslint-disable no-restricted-globals */
export const validationCacheWorker = new Worker('./assets/workers/validationWorker.js', {type:"classic"})