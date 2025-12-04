import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase/config";

// Upload any file (image, pdf, resume, etc.)
export const uploadFile = async (file: File, folder: string) => {
  try {
    // 1. Create a unique file path
    const fileRef = ref(storage, `${folder}/${Date.now()}-${file.name}`);

    // 2. Upload file to Firebase Storage
    await uploadBytes(fileRef, file);

    // 3. Get downloadable link
    const downloadURL = await getDownloadURL(fileRef);

    return downloadURL; // return the uploaded file URL
  } catch (error) {
    console.error("File Upload Error:", error);
    throw error;
  }
};
