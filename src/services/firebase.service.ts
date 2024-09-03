import { initializeApp as initializeAdminApp, cert, deleteApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { Timeline } from './openai.service';

export const FirebaseService = {
    getTimeline: async (id: string) => {
        const serviceAccount = JSON.parse(
            process.env.GOOGLE_APPLICATION_CREDENTIALS as string
        );

        const AdminFirebase = initializeAdminApp({
            credential: cert(serviceAccount),
        });

        try {
            const db = getFirestore(AdminFirebase);
            const doc = await db.collection('timeline').doc(id).get();
            return doc.data() as Timeline;
        } catch (error: any) {
            return undefined;
        } finally {
            deleteApp(AdminFirebase);
        }
    }
};

export default FirebaseService;