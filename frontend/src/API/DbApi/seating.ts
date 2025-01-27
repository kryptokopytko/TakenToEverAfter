import { RectangularTable, RoundTable } from "../../types";
import api from "./axiosInstance";

export const getTables = async () => {
    try {
      const [ tablesResponse, seatsResponse ] = await Promise.all([
        api.get("/seating/tables/",  { withCredentials: true }),
        api.get("/seating/seats/",  { withCredentials: true }),
      ]);
  
      const tableGuests = seatsResponse.data.reduce((acc: any, seat: any) => {
        const { table, guest } = seat;
        if (!acc[table]) {
          acc[table] = [];
        }
        if (guest) {
          acc[table].push(guest);
        }
        return acc;
      }, {});
  
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
        ...updatedData,
        position_x: updatedData.x,
        position_y: updatedData.y,
        seatsNumber: shape == "circular" ? (updatedData as RoundTable).seats : 
        { length: (updatedData as RectangularTable).width, width: (updatedData as RectangularTable).length },
      };

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