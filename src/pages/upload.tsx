import { useState, useEffect } from "react";
import Image from "next/image";
import { trpc } from "../utils/trpc";
import Axios from "axios";

const Upload = () => {
  // form state
  const [image, setImage] = useState<File>();
  const [description, setDescription] = useState<string>();
  const [location, setLocation] = useState<string>();
  const [preview, setPreview] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const fileTypes = ["image/png", "image/jpeg"];

  // action state

  const uploadImage = async () => {
    if (!image) return;
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "recur_storage");
    const api = `https://api.cloudinary.com/v1_1/dtvnjz5xc/image/upload`;
    const res = await fetch(api, {
      method: "POST",
      body: formData,
    });
    const json = await res.json();
    return json;
  };

  const { mutateAsync } = trpc.spot.create.useMutation();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!image || !description || !location) return;
    try {
      // upload image
      const {url, public_id} = await uploadImage();
      if (!url) return;
      await mutateAsync({
        description: description,
        image_url: url,
        location: location,
        image_public_id:public_id
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
