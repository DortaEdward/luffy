import { useState, useEffect } from "react";
import { storage } from '../firebase/config';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const useStorage = (file:File | undefined, isReady: boolean) => {
  // create state
  const [progress, setProgress] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [url, setUrl] = useState<string | null>(null);

  useEffect(()=>{
    // references
    if(!file || !isReady) return;
    const storageRef = ref(storage,file.name);
    const uploadImage = uploadBytesResumable(storageRef,file);
    uploadImage.on('state_changed',(snapshot) => {
      const percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      setProgress(percentage);
    }, (err) => {
      setError(err.message);
    }, async () => {
      const url = await getDownloadURL(storageRef);
      setUrl(url);
    })
  },[file])

  return{
    progress,
    url,
    error
  }


};

export default useStorage;