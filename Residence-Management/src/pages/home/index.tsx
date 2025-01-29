import { useEffect, useState } from "react";
import { MotelRoom } from "../RoomManager/type";
import { MotelRoomService } from "../../services/roomManagerService";
import MotelRoomGrid from "./MotelRoomGrid";


const Home:React.FC=()=>{
    
  const [rooms, setRooms] = useState<MotelRoom[]>([]);

  // Hàm fetch dữ liệu
  const fetchApi = async () => {
    const response = await MotelRoomService.getAllMotelRoom();
    setRooms(response.reverse()); // Cập nhật state với danh sách phòng
    console.log(response);
  };

  useEffect(() => {
    fetchApi();
  }, []);


  return (
    <>
      <MotelRoomGrid rooms={rooms} />
    </>
  );
}


export default Home;