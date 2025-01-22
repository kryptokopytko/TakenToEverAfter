import { Image } from "../../types";
import api from "./axiosInstance";

export const addPhoto = async (
  photo: Image
) => {
  try {
    const response = await api.post("/photos/to-accept-photos/", photo, { withCredentials: true });
    console.log("New photo added:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error adding photo:", error);
    throw error;
  }
};

export const addPhotoByGuest = async (
  photo: Image,
  uniqueUrl: string
) => {
  try {
    const response = await api.post("/photos/add-photo-to-accept/", { photo, uniqueUrl});
    console.log("New photo added:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error adding photo:", error);
    throw error;
  }
};

export const removePhoto = async (photoId: number) => {
  try {
    const response = await api.delete(`/photos/to-accept-photos/${photoId}/`, { withCredentials: true });
    console.log(`Photo with ID ${photoId} has been deleted.`);
    return response.data;
  } catch (error) {
    console.error("Error removing photo:", error);
    throw error;
  }
};

export const acceptPhoto = async (photoId: number) => {
  try {
    const toAcceptResponse = await api.get(`/photos/to-accept-photos/${photoId}/`, { withCredentials: true });
    const photoData = toAcceptResponse.data;

    const acceptedPhotoData = {
      account: photoData.account,
      link: photoData.link,
      description: photoData.description,
      favourite: false,
      uploader: photoData.uploader,
      isVertical: photoData.isVertical
    };

    const acceptedPhotoResponse = await api.post(
      "/photos/accepted-photos/",
      acceptedPhotoData, { withCredentials: true }
    );

    await api.delete(`/photos/to-accept-photos/${photoId}/`, { withCredentials: true });

    console.log(
      "Photo has been accepted and moved to the Accepted collection:",
      acceptedPhotoResponse.data
    );
    return acceptedPhotoResponse.data;
  } catch (error) {
    console.error("Error accepting photo:", error);
    throw error;
  }
};

export const discardPhoto = async (photoId: number) => {
  try {
    const acceptedResponse = await api.get(`/photos/accepted-photos/${photoId}/`, { withCredentials: true });
    const photoData = acceptedResponse.data;

    const acceptedPhotoData = {
      account: photoData.account,
      link: photoData.link,
      description: photoData.description,
      favourite: false,
      uploader: photoData.uploader,
      isVertical: photoData.isVertical
    };

    const toAcceptPhotoResponse = await api.post(
      "/photos/to-accept-photos/",
      acceptedPhotoData, { withCredentials: true }
    );

    await api.delete(`/photos/accepted-photos/${photoId}/`, { withCredentials: true });

    console.log(
      "Photo has been discarded and moved to the ToAccept collection:",
      toAcceptPhotoResponse.data
    );
    return toAcceptPhotoResponse.data;
  } catch (error) {
    console.error("Error discarding photo:", error);
    throw error;
  }
};

export const updateFavourite = async (
  photoId: number,
  isFavourite: boolean
) => {
  try {
    const photoResponse = await api.get(`/photos/accepted-photos/${photoId}/`, { withCredentials: true });
    const photo = photoResponse.data;

    const updatedPhotoData = {
      ...photo,
      favourite: isFavourite,
    };

    const response = await api.patch(
      `/photos/accepted-photos/${photoId}/`,
      updatedPhotoData, { withCredentials: true }
    );
    console.log("Updated photo favourite status:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error updating photo favourite status:", error);
    throw error;
  }
};

export const getPhotos = async () => {
  try {
    const photoResponse = await api.get('/photos/accepted-photos/', { withCredentials: true });
    const toAcceptPhotoResponse = await api.get('/photos/to-accept-photos/', { withCredentials: true });

    const acceptedPhotos = photoResponse.data.map((photo: any) => ({
      id: photo.id,
      name: photo.description || undefined,
      link: photo.link,
      isFavorite: photo.favourite,
      author: photo.uploader || undefined,
      isVertical: photo.is_vertical,
      isApproved: true,
    }));

    const toAcceptPhotos = toAcceptPhotoResponse.data.map((photo: any) => ({
      id: photo.id,
      name: photo.description || undefined,
      link: photo.link,
      isFavorite: false,
      author: photo.uploader || undefined,
      isVertical: photo.is_vertical,
      isApproved: false,
    }));

    return [...acceptedPhotos, ...toAcceptPhotos];
  } catch (error) {
    console.error("Error fetching photos:", error);
    throw error;
  }
};
