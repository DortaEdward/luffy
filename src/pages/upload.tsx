import { useState, useEffect } from "react";
import { storage } from "../firebase/config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Image from "next/image";
import { trpc } from "../utils/trpc";
const Upload = () => {
  const [image, setImage] = useState<File>();
  const [preview, setPreview] = useState<string>();
  const [error, setError] = useState<string | null>(null);

  const [description, setDescription] = useState<string>();
  const [location, setLocation] = useState<string>();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string>();
  const fileTypes = ["image/png", "image/jpeg"];

  const { mutateAsync } = trpc.spot.create.useMutation();

  function imageUpload(image: File): void {
    console.log("Starting firebase");
    const storageRef = ref(storage, `${image.name}`);
    setIsLoading(true);
    uploadBytes(storageRef, image).then(() => {
      getDownloadURL(storageRef).then((url) => {
        setIsLoading(false);
        setImageUrl(url);
      });
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log("Starting");
    if (!image || !description || !location) return;
    console.log("After check");
    try {
      await imageUpload(image);
      if (!imageUrl) return;
      console.log({
        description: description,
        image_url: imageUrl,
        location: location,
      });
      await mutateAsync({
        description: description,
        image_url: imageUrl,
        location: location,
      });
      console.log("Created");
    } catch (error: any) {
      setError(error.message);
    }
  }

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>): void {
    setError("");
    if (!e.target.files) return;
    const selectedImage = e.target.files[0];
    if (!selectedImage || !fileTypes.includes(selectedImage.type))
      return setError("Please select an approriate image file (.png or .jpeg)");
    setImage(selectedImage);
  }

  useEffect(() => {
    if (image) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result !== "string") return;
        setPreview(reader.result);
      };
      reader.readAsDataURL(image);
    } else {
      return;
    }
  }, [image]);

  return (
    <div>
      <h1>Upload</h1>
      {preview && (
        <Image
          width={324}
          height={226}
          className="h-[226px] w-[324px] object-cover"
          src={preview}
          alt="image user is uploading"
        />
      )}
      {isLoading ? (
        <>Loading...</>
      ) : (
        <form onSubmit={(e) => handleSubmit(e)}>
          {error && <p>{error}</p>}
          <input
            onChange={handleImageChange}
            type="file"
            name="image"
            id="image__upload"
          />
          <textarea
            name="description"
            id="spot__description"
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            type="text"
            name="location"
            id="spot__location"
            placeholder="Enter Location"
            onChange={(e) => setLocation(e.target.value)}
          />
          <button type="submit">Upload</button>
        </form>
      )}
    </div>
  );
};

export default Upload;
