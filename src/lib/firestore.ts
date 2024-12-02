import { 
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where
} from 'firebase/firestore';
import { db } from './firebase';
import { Video } from '../types';

const VIDEOS_COLLECTION = 'videos';

export const getVideos = async (userId: string): Promise<Video[]> => {
  try {
    const q = query(collection(db, VIDEOS_COLLECTION), where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      ...doc.data(),
      id: doc.id
    })) as Video[];
  } catch (error) {
    console.error('Error getting videos:', error);
    throw error;
  }
};

export const getVideo = async (videoId: string): Promise<Video | null> => {
  try {
    const docRef = doc(db, VIDEOS_COLLECTION, videoId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return {
        ...docSnap.data(),
        id: docSnap.id
      } as Video;
    }
    return null;
  } catch (error) {
    console.error('Error getting video:', error);
    throw error;
  }
};

export const addVideo = async (video: Omit<Video, 'id'>): Promise<string> => {
  try {
    const docRef = await addDoc(collection(db, VIDEOS_COLLECTION), video);
    return docRef.id;
  } catch (error) {
    console.error('Error adding video:', error);
    throw error;
  }
};

export const updateVideo = async (videoId: string, updates: Partial<Video>): Promise<void> => {
  try {
    const docRef = doc(db, VIDEOS_COLLECTION, videoId);
    await updateDoc(docRef, updates);
  } catch (error) {
    console.error('Error updating video:', error);
    throw error;
  }
};

export const deleteVideo = async (videoId: string): Promise<void> => {
  try {
    const docRef = doc(db, VIDEOS_COLLECTION, videoId);
    await deleteDoc(docRef);
  } catch (error) {
    console.error('Error deleting video:', error);
    throw error;
  }
};