import admin from 'firebase-admin';

const keyString = process.env.FB_ADMIN_PRIVATE_KEY ?? '{"privateKey": ""}';

const { privateKey } = JSON.parse(keyString);

if (privateKey === '') {
  console.log('FIREBASE_PRIVATE_KEY is not set');
}

if (admin.apps.length === 0)
  admin.initializeApp({
    credential: admin.credential.cert({
      clientEmail: process.env.FB_ADMIN_CLIENT_EMAIL,
      privateKey: privateKey,
      projectId: process.env.FB_ADMIN_PROJECT_ID,
    }),
    databaseURL: process.env.NEXT_PUBLIC_FB_DATABASE_URL,
  });

const app = admin.app();
const auth = admin.auth(app);
const store = admin.firestore(app);
const db = admin.database(app);

export { auth, store, db };
