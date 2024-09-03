
import { initializeApp, getApp, getApps, App, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

const serviceAccount = JSON.parse(
    process.env.GOOGLE_APPLICATION_CREDENTIALS as string
);

export const app: App = getApps().length ? getApp() : initializeApp({ credential: cert(serviceAccount) });
export const firestore = getFirestore(app);