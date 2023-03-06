import { useState, useEffect } from "react";
import Image from "next/image";
import { trpc } from "../utils/trpc";

const Upload = () => {
  // form state
  const [image, setImage] = useState<File>();
  const [description, setDescription] = useState<string>();
  const [location, setLocation] = useState<string>();
  const [preview, setPreview] = useState<string>();
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
      const { url, public_id } = await uploadImage();
      if (!url) return;
      await mutateAsync({
        description: description,
        image_url: url,
        location: location,
        image_public_id: public_id,
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
    <div className="flex w-full h-full flex-col items-center justify-center gap-4 text-gray-200 outline">
      <h1 className="text-4xl">Upload</h1>
      <div className="flex gap-2 flex-col md:flex-row">
        {preview ? (
          <Image
            width={340}
            height={340}
            className="h-[340px] w-[340px] object-cover"
            src={preview}
            alt="image user is uploading"
          />
        ) : (
          <div className="h-[350px] w-[350px] border">Image Placeholder</div>
        )}
        <form onSubmit={(e) => handleSubmit(e)} className="flex flex-col gap-2">
          {error && <p>{error}</p>}
          <input
            onChange={handleImageChange}
            type="file"
            name="image"
            id="image__upload"
            className={image ? `select-none` : "flex"}
            required
          />
          <div className="h-36 md:h-48 w-full">
            <textarea
              name="description"
              id="spot__description"
              className="h-full w-full resize-none p-2 text-neutral-900 outline-none"
              placeholder="Enter Description"
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <input
            type="text"
            name="location"
            id="spot__location"
            placeholder="Enter Location"
            className="p-2 outline-none"
            onChange={(e) => setLocation(e.target.value)}
            required
          />
          <button type="submit" className="bg-sky-600 py-1">
            Upload
          </button>
        </form>
      </div>
    </div>
  );
};

export default Upload;
