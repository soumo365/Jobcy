// export const uploadFileToCloudinary = async (file: File) => {
//   const cloudName = "dkhoy557v";
//   const uploadPreset = "jobcy2025";

import { supabase } from "../supabase/config";

//   const formData = new FormData();
//   formData.append("file", file);
//   formData.append("upload_preset", uploadPreset);

//   // Detect type:
//   const type = file.type.includes("pdf") ? "raw" : "auto";

//   const response = await fetch(
//     `https://api.cloudinary.com/v1_1/${cloudName}/${type}/upload`,
//     {
//       method: "POST",
//       body: formData,
//     }
//   );

//   const data = await response.json();
//   console.log("CLOUDINARY RESPONSE:", data);

//   return data.secure_url;
// };

  const BUCKET_NAME = "files"; // must exist in Supabase

  export  const uploadToSupabase = async (file: File, folder: string) => {
  const filePath = `${folder}/${Date.now()}-${file.name}`;

  const { error } = await supabase.storage
    .from(BUCKET_NAME)
    .upload(filePath, file, {
      upsert: true,
      contentType: file.type,
    });

  if (error) throw error;

  const { data } = supabase.storage
    .from(BUCKET_NAME)
    .getPublicUrl(filePath);

  return data.publicUrl;



};

