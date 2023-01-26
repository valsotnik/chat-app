// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  firebase: {
    projectId: 'getstreamio-cmval',
    appId: '1:162375529037:web:7b4fb94d55189120702204',
    storageBucket: 'getstreamio-cmval.appspot.com',
    apiKey: 'AIzaSyAufmvr2AN4BEoAVtQvu9R_fcLkoP57Ca0',
    authDomain: 'getstreamio-cmval.firebaseapp.com',
    messagingSenderId: '162375529037',
    measurementId: 'G-BWHSXL9Y0V',
  },
  production: false,
  apiURL: 'https://us-central1-getstreamio-cmval.cloudfunctions.net',
  stream: {
    key: 'kgtfk55urnqb'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
