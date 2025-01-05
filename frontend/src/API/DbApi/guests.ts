import api from "./axiosInstance";
import { Guest, Tag, Invitation } from "../../types";


export const getGuests = async () => {
  try {
    const response = await api.get("/guests/");
    console.log("List of guests downloaded successfully.");
    return response.data;
  } catch (error) {
    console.error("There was an error fetching the guests:", error);
  }
};

export const getGuestsInfo = async () => {
  try {
    const [guestsResponse, tagsResponse, invitationsResponse] = await Promise.all([
      api.get("/guests/user-guests/",  { withCredentials: true }),
      api.get("/guests/user-tags/",  { withCredentials: true }),
      api.get("/guests/user-invitations/",  { withCredentials: true })
    ]);

    const guests: Guest[] = guestsResponse.data.guests.map((guest: any) => ({
      id: guest.id,
      name: guest.name,
      decision: guest.decision,
      tags: guest.tags,
      invitationId: guest.invitation?.id || null,
      hasPlusOne: guest.plus_one
    }));

    const tags: Tag[] = tagsResponse.data.tags.map((tag: any) => ({
      id: tag.id,
      name: tag.name,
      rank: tag.rank
    }));

    const invitations: Invitation[] = invitationsResponse.data.invitations.map((invitation: any) => ({
      id: invitation.id,
      handedOut: invitation.handed_out
    }));

    return {
      guests,
      tags,
      invitations
    };
  } catch (error) {
    console.error("Error fetching guests information:", error);
    throw error;
  }
};

export const addTag = async (name: string, rank: number) => {
  const newTag = {
    name,
    rank,
  };

  try {
    const response = await api.post("/tags/add_tag/", newTag, { withCredentials: true });
    return response.data.id;
  } catch (error) {
    console.error("There was an error creating the tag:", error);
  }
};

export const addGuest = async (guestName: string, groupNumbers: Number[], plusOne: boolean) => {
  const newGuest = {
    name: guestName,
    groupNumbers,
    invitation: null,
    confirmation: "unknown",
    plusOne
  };

  try {
    await api.post("/guests/add_guest/", newGuest, { withCredentials: true });
  } catch (error) {
    console.error("There was an error creating the guest:", error);
  }
};


export const removeGuest = async (id: Number) => {
  try {
    const response = await api.delete(`/guests/guests/${id}/`);
    console.log(`Guest with ID ${id} has been removed.`);
    return response.data;
  } catch (error) {
    console.error("There was an error removing the guest:", error);
  }
};

export const updateGuestTags = async (
  guestId: number,
  updatedGroupsId: number[]
) => {
  try {
    const guestResponse = await api.get(`/guests/guests/${guestId}/`);
    const guest = guestResponse.data;

    const updatedGuestData = {
      ...guest,
      group_numbers: updatedGroupsId,
    };

    const response = await api.patch(`/guests/guests/${guestId}/`, updatedGuestData);
    console.log("Guest updated:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      `Error updating guest groups for guest ID ${guestId}:`,
      error
    );
    throw error;
  }
};

export const updateGroupRank = async (groupId: number, newRank: number) => {
  try {
    const groupResponse = await api.get(`/groups/${groupId}/`);
    const group = groupResponse.data;

    const updatedGroupData = {
      ...group,
      rank: newRank,
    };

    const response = await api.patch(`/groups/${groupId}/`, updatedGroupData);
    console.log("Group rank updated:", response.data);
    return response.data;
  } catch (error) {
    console.error(`Error updating rank for group ID ${groupId}:`, error);
    throw error;
  }
};

export const updateGuestConfirmation = async (
  guestId: number,
  confirmation: boolean
) => {
  try {
    const guestResponse = await api.get(`/guests/${guestId}/`);
    const guest = guestResponse.data;

    const updatedGuestData = {
      ...guest,
      confirmation: confirmation ? "yes" : "no",
    };
    const response = await api.patch(`/guests/${guestId}/`, updatedGuestData);
    console.log("Guest confirmation updated:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      `Error updating confirmation for guest ID ${guestId}:`,
      error
    );
    throw error;
  }
};

export const handOutInvitation = async (invitationId: number) => {
  try {
    const invitationResponse = await api.get(`/invitations/${invitationId}/`);
    const invitation = invitationResponse.data;

    const updatedInvitationData = {
      ...invitation,
      handed_out: true,
    };

    const response = await api.patch(
      `/invitations/${invitationId}/`,
      updatedInvitationData
    );
    console.log("Invitation handed out:", response.data);
    return response.data;
  } catch (error) {
    console.error(`Error handing out invitation ID ${invitationId}:`, error);
    throw error;
  }
};
