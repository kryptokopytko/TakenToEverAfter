import { RectangularTable, RoundTable } from "../../types";
import api from "./axiosInstance";

export const getTables = async () => {
    try {
      const [ tablesResponse, seatsResponse ] = await Promise.all([
        api.get("/seating/tables/",  { withCredentials: true }),
        api.get("/seating/seats/",  { withCredentials: true }),
      ]);
  
      const tableGuests: { [tableId: number]: string[] } = {};
      
      seatsResponse.data.forEach((seat: any) => {
        const tableId = seat.table.id;
        const guestName = seat.guest.name;
        const seatNumber = seat.seatNumber;
  
        if (!tableGuests[tableId]) {
          tableGuests[tableId] = [];
        }
      
        tableGuests[tableId][seatNumber - 1] = guestName;
      });
  
  
      const rectangularTables = tablesResponse.data
        .filter((table: any) => table.shape == 'rectangular')
        .map((table: any) => ({
            id: table.id,
            name: table.name,
            x: table.x,
            y: table.y,
            guests: tableGuests[table.id] || [],
            width: table.width, 
            length: table.length,
          }));

      const circularTables = tablesResponse.data
        .filter((table: any) => table.shape == 'circular')
        .map((table: any) => ({
            id: table.id,
            name: table.name,
            x: table.x,
            y: table.y,
            guests: tableGuests[table.id] || [],
            seats: table.width,
          }));
    
  
      return {
        rectangularTables,
        circularTables
      };
    } catch (error) {
      console.error("Error fetching guests information:", error);
      throw error;
    }
  };

  export const addTable = async (
    name = "",
    x: number,
    y: number,
    seatsNumber: number | { length: number; width: number },
    shape: "circular" | "rectangular"
  ) => {
    try {
      const tableData = {
        name,
        x: x,
        y: y,
        width: shape === "circular"? seatsNumber : (seatsNumber as { length: number; width: number }).width, 
        ...(shape === "rectangular" && { length: (seatsNumber as { length: number; width: number }).length }),
        shape,
      };

      console.log(tableData);
      const response = await api.post("/seating/tables/", tableData, { withCredentials: true });
      return response.data;
    } catch (error) {
      console.error("Error adding table:", error);
      throw error;
    }
  };
  
  export const updateTable = async (
    tableId: number, 
    shape: "circular" | "rectangular", 
    updatedData: RoundTable | RectangularTable
  ) => {
    try {
      const tableData = {
        name: updatedData.name,
        x: Math.round(updatedData.x),
        y: Math.round(updatedData.y),
        width: shape === "circular"? (updatedData as RoundTable).seats : (updatedData as RectangularTable).width, 
        ...(shape === "rectangular" && { length: (updatedData as RectangularTable).length}),
        shape,
      };
      console.log(tableId, tableData);
      const response = await api.put(`/seating/tables/${tableId}/`, tableData, { withCredentials: true });
      return response.data;
    } catch (error) {
      console.error("Error updating table:", error);
      throw error;
    }
  };
  
  export const deleteTable = async (tableId: number) => {
    try {
      await api.delete(`/seating/tables/${tableId}/`, { withCredentials: true });
      return { success: true };
    } catch (error) {
      console.error("Error deleting table:", error);
      throw error;
    }
  };
  
  export const updateRoomDimensions = async (roomWidth: number, roomLength: number) => {
    try {
      const response = await api.post(
        "/accounts/update-room-dismensions/",
        { roomWidth, roomLength },
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      console.error("Error updating room dimensions:", error);
      throw error;
    }
  };

  export const assignPeopleToTables = async () => {
    try {
      const response = await api.get(
        "/seating/assign-guests/",
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      console.error("Error assigning people:", error);
      throw error;
    }
  }