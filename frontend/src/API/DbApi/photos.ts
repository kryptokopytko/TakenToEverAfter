import api from "./axiosInstance";


export const updateFavoriteStatus = async (
  imageId: number,
  isFavorite: boolean
) => {};
export const updateApprovedStatus = (
  imageId: number,
  isApproved: boolean
) => {};
export const addPhotoToApi = async (photo: Image) => {};

export const addPhoto = async (
  accountId: number,
  link: string,
  description: string | null = null,
  uploader: string | null = null
) => {
  try {
    const newPhoto = {
      account: accountId,
      link,
      description,
      uploader,
    };

    const response = await api.post("/to_accept_photos/", newPhoto);
    console.log("New photo added:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error adding photo:", error);
    throw error;
  }
};

export const removePhoto = async (photoId: number) => {
  try {
    const response = await api.delete(`/accepted_photos/${photoId}/`);
    console.log(`Photo with ID ${photoId} has been deleted.`);
    return response.data;
  } catch (error) {
    console.error("Error removing photo:", error);
    throw error;
  }
};

export const discardPhoto = async (photoId: number) => {
  try {
    const response = await api.delete(`/to_accept_photos/${photoId}/`);
    console.log(`Photo with ID ${photoId} has been discarded.`);
    return response.data;
  } catch (error) {
    console.error("Error discarding photo:", error);
    throw error;
  }
};

export const acceptPhoto = async (photoId: number) => {
  try {
    const toAcceptResponse = await api.get(`/to_accept_photos/${photoId}/`);
    const photoData = toAcceptResponse.data;
    await api.delete(`/to_accept_photos/${photoId}/`);

    const acceptedPhotoData = {
      account: photoData.account,
      link: photoData.link,
      description: photoData.description,
      favourite: false,
      uploader: photoData.uploader,
    };

    const acceptedPhotoResponse = await api.post(
      "/accepted_photos/",
      acceptedPhotoData
    );
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

export const updateFavourite = async (
  photoId: number,
  isFavourite: boolean
) => {
  try {
    const photoResponse = await api.get(`/accepted_photos/${photoId}/`);
    const photo = photoResponse.data;

    const updatedPhotoData = {
      ...photo,
      favourite: isFavourite,
    };

    const response = await api.patch(
      `/accepted_photos/${photoId}/`,
      updatedPhotoData
    );
    console.log("Updated photo favourite status:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error updating photo favourite status:", error);
    throw error;
  }
};