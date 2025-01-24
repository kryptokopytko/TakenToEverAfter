import api from "./axiosInstance";
import { Guest, Tag, Invitation, Couple } from "../../types";

export const getGuestsInfo = async () => {
  try {
    const [ guestsResponse, tagsResponse, invitationsResponse, couplesResponse ] = await Promise.all([
      api.get("/guests/guests/",  { withCredentials: true }),
      api.get("/guests/tags/",  { withCredentials: true }),
      api.get("/guests/invitations/",  { withCredentials: true }),
      api.get("/guests/couples/",  { withCredentials: true })
    ]);

    const guests: Guest[] = guestsResponse.data.map((guest: any) => ({
      id: guest.id,
      name: guest.name,
      decision: guest.decision,
      tags: guest.tags,
      invitationId: guest.invitationId,
      hasPlusOne: guest.hasPlusOne
    }));

    const tags: Tag[] = tagsResponse.data.map((tag: any) => ({
      id: tag.id,
      name: tag.name,
      rank: tag.rank
    }));

    const invitations: Invitation[] = invitationsResponse.data.map((invitation: any) => ({
      id: invitation.id,
      handedOut: invitation.handedOut,
      confirmationUrl: invitation.confirmationUrl
    }));

    const couples: Couple[] = couplesResponse.data.map((couple: any) => ({
      id: couple.id,
      guest1: couple.guest1,
      guest2: couple.guest2
    }));

    return {
      guests,
      tags,
      invitations,
      couples
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
    const response = await api.post("/guests/tags/", newTag, { withCredentials: true });
    return response.data.id;
  } catch (error) {
    console.error("There was an error creating the tag:", error);
  }
};

export const addGuest = async (guestName: string, groupNumbers: Number[], plusOne: boolean, invitationId: number) => {
  const newGuest = {
    name: guestName,
    tags: groupNumbers,
    invitationId: invitationId,
    confirmation: "unknown",
    hasPlusOne: plusOne
  };

  try {
    const response = await api.post("/guests/guests/", newGuest, { withCredentials: true });
    return response.data.id;
  } catch (error) {
    console.error("There was an error creating the guest:", error);
    return -1;
  }
};

export const addCouple = async (guestId: number, partnerId: number) => {
  try {
    const newCouple = {
      guest1: guestId,
      guest2: partnerId,
    };
    const response = await api.post("/guests/couples/", newCouple, { withCredentials: true });
    return response.data.id;
  } catch (error) {
    console.error("There was an error creating the couple:", error);
    return -1;
  }
}

export const removeGuest = async (id: Number) => {
  try {
    const response = await api.delete(`/guests/guests/${id}/`, { withCredentials: true });
    console.log(`Guest with ID ${id} has been removed.`);
    return response.data;
  } catch (error) {
    console.error("There was an error removing the guest:", error);
  }
};

export const updateGuest = async (
  updatedGuest: Guest
) => {
  try {
    const response = await api.put(`/guests/guests/${updatedGuest.id}/`, updatedGuest, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.error("There was an error updating the guest:", error);
    return null;
  }
};

export const updateGuestTags = async (
  guestId: number,
  updatedGroupsId: number[]
) => {
  try {
    const guestResponse = await api.get(`/guests/guests/${guestId}/`, { withCredentials: true });
    const guest = guestResponse.data;

    const updatedGuestData = {
      ...guest,
      tags: updatedGroupsId,
    };

    const response = await api.patch(`/guests/guests/${guestId}/`, updatedGuestData, { withCredentials: true });
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
    const groupResponse = await api.get(`/groups/${groupId}/`, { withCredentials: true });
    const group = groupResponse.data;

    const updatedGroupData = {
      ...group,
      rank: newRank,
    };

    const response = await api.patch(`/groups/${groupId}/`, updatedGroupData, { withCredentials: true });
    console.log("Group rank updated:", response.data);
    return response.data;
  } catch (error) {
    console.error(`Error updating rank for group ID ${groupId}:`, error);
    throw error;
  }
};

export const newInvitation = async () => {
  try {
    const response = await api.post("/guests/invitations/", {}, { withCredentials: true });
    return response.data.id;
  } catch (error) {
    console.error("There was an error creating the invitation:", error);
    return -1;
  }
}

export const changeInvitationStatus = async (invitationId: number, handedOut: boolean) => {
  try {
    const invitationResponse = await api.get(`/guests/invitations/${invitationId}/`, { withCredentials: true });
    const invitation = invitationResponse.data;

    const updatedInvitationData = {
      ...invitation,
      handedOut: handedOut,
    };

    const response = await api.patch(
      `/guests/invitations/${invitationId}/`,
      updatedInvitationData,
      { withCredentials: true }
    );
    console.log("Invitation handed out:", response.data);
    return response.data;
  } catch (error) {
    console.error(`Error handing out invitation ID ${invitationId}:`, error);
    throw error;
  }
};

export const getInvitationDetailsByConfirmationUrl = async (confirmationUrl: string) => {
  try {
    const response = await api.post(
      '/guests/get-invitation-details-by-url/', 
      { confirmationUrl: confirmationUrl },
      {withCredentials: true}
    );

    return response.data;  
  } catch (error) {
    console.error("Error during fetching invitation details:", error);
    throw error;
  }
};

export const updateGuestConfirmation = async (
  guestId: number,
  decision: "yes" | "no"
) => {
  try {
    const response = await api.post("/guests/set-guest-decision/", 
      {guestId, decision}, { withCredentials: true });
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

export const updatePlusOne = async (
  guestId: number,
  hasPlusOne: boolean,
  partner: string | undefined
) => {
  try {
    const payload = {
      guestId,
      hasPlusOne,
      partnerName: partner || null,
    };

    await api.post("/guests/update-plus-one/", payload, {
      withCredentials: true,
    });  
  } catch (error) {
    console.error(
      `Error updating plus one status for guest ID ${guestId}:`,
      error
    );
    throw error;
  }
};