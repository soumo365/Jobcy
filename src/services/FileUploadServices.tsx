export const uploadFileToCloudinary = async (file: File) => {
  const cloudName = "dkhoy557v";
  const uploadPreset = "jobcy2025";

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);

  // Detect type:
  const type = file.type.includes("pdf") ? "raw" : "auto";

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/${type}/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await response.json();
  console.log("CLOUDINARY RESPONSE:", data);

  return data.secure_url;
};
