import { useState, ChangeEvent } from "react";
import supabase from "../../app/supabase";
import useFetchProfile from "../../hooks/useFetchProfile";
import axios from "axios";

interface Profile {
  image: string;
}

const useUploadComponent = () => {
  const [file, setFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const { profile, refetchProfile } = useFetchProfile();
  const [changeImage, setChangeImage] = useState<boolean>(false);

  const fetchUserImage = async (updatedImage: string) => {
    const authToken = localStorage.getItem("access_token");
    if (authToken) {
      try {
        const headers = {
          Authorization: `Bearer ${authToken}`,
        };
        const response = await axios.put(
          "http://127.0.0.1:5000/users/update-image",
          { image: updatedImage },
          { headers }
        );

        setChangeImage(true);
      } catch (error) {
        console.error("Error fetching profile:", error);
        setChangeImage(false);
      }
    }
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
      setImageUrl(URL.createObjectURL(event.target.files[0]));
    }
  };

  const handleUpload = async () => {
    if (file && profile) {
      const timestamp = Date.now();
      const fileName = `${timestamp}-${file.name}`;

      const pathInStorage = `images/profiles/${profile.username}/${fileName}`;
      try {
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from("user_image")
          .upload(pathInStorage, file);

        if (uploadError) {
          console.error("Error uploading file:", uploadError.message);
          return;
        }

        const imageUrl =
          `https://lwgscyxqeipmjzaxphkv.supabase.co/storage/v1/object/public/user_image/${uploadData?.path} ` ??
          "";

        await fetchUserImage(imageUrl);

        // console.log("File uploaded successfully:", uploadData);
        refetchProfile();
      } catch (error) {
        console.error("Error uploading or updating profile:", error);
      }
    }
  };

  return {
    file,
    imageUrl,
    changeImage,
    handleFileChange,
    handleUpload,
  };
};

export default useUploadComponent;
