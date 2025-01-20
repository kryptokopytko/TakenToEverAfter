import { useUser } from "../../providers/UserContext";

export const useGuests = () => {
  const { guests, setGuests } = useUser();

  const handleDecision = (guestId: number, decision: "yes" | "no") => {
    setGuests(
        guests.map((guest) =>
          guest.id === guestId ? { ...guest, decision } : guest
        )
      );
    };

    const getAllSharedInviteNames = () => {
        return ["family"];
    };

  return {
    handleDecision,
    getAllSharedInviteNames
  };
};
