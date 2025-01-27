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
            width: table.seatsNumber.width, 
            length: table.seatsNumber.length,
          }));

      const circularTables = tablesResponse.data
        .filter((table: any) => table.shape == 'circular')
        .map((table: any) => ({
            id: table.id,
            name: table.name,
            x: table.x,
            y: table.y,
            guests: tableGuests[table.id] || [],
            seats: table.seatsNumber,
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