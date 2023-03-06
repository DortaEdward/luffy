const UploadTextarea = ({setDescription} :any) => {
  return (
    <textarea
      name="description"
      id="spot__description"
      className="h-full w-full resize-none p-2 text-neutral-900 outline-none"
      placeholder="Enter Description"
      onChange={(e) => setDescription(e.target.value)}
    />
  );
};
export default UploadTextarea;
