import axios from "axios";
import { useState, useEffect } from "react";

interface Profile {
  email: string;
  username: string;
  first_name: string;
  last_name: string;
  location: string;
  phone: string;
  image: string;
  role: string;
  bio: string;
}

export default function useEditProfile() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState<Profile | null>(null);
  const [editError, setEditError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const authToken = localStorage.getItem("access_token");
      if (authToken) {
        try {
          const headers = {
            Authorization: `Bearer ${authToken}`,
          };
          const response = await axios.get(
            "http://127.0.0.1:5000/users/update-info",
            {
              headers,
            }
          );
          setProfile(response.data);
        } catch (error) {
          console.error(error);
        }
      }
    };

    fetchProfile();
  }, []);

  return {
    profile,
    error,
    loading,
    editing,
    editedProfile,
    editError,
  };
}