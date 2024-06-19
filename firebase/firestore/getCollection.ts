import firebase_app from "../config";
import { getDocs, getFirestore, collection } from "firebase/firestore";

const db = getFirestore(firebase_app);
export default async function getCollection(id: string) {
  let result: any = null;
  let error = null;

  try {
    await getDocs(collection(db, id)).then((querySnapshot) => {
      const data = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      result = data;
    });
  } catch (e) {
    error = e;
  }

  return { result, error };
}
