import { Timeline } from './openai.service';
import { firestore } from './firebase';

export const FirebaseService = {
    getTimeline: async (id: string) => {
        try {
            const doc = await firestore.collection('timeline').doc(id).get();
            return doc.data() as Timeline;
        } catch (error: any) {
            return undefined;
        }
    }
};

export default FirebaseService;