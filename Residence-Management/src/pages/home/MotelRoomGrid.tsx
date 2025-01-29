import { Badge, Card, Col, Row } from "antd";
import { MotelRoom } from "../RoomManager/type";

interface RoomGridProps {
  rooms: MotelRoom[]; 
}

const MotelRoomGrid: React.FC<RoomGridProps> = ({ rooms }) => {
  return (
    <>
      <Row gutter={[20/*khoang cach giua 2 cot*/, 20/*khoang cach giua 2 hang*/]} justify={"center"}>
        {rooms.map((item) => (
          <Col span={10} key={item.id}>
            <Badge.Ribbon
              text={!item.inhabited ? "Còn phòng" : "Hết phòng"}
              color={!item.inhabited ? "green" : "gray"}
            >
              
              <Card title={item.name}>
                <p>
                  Số giường: <strong>{item.bed_quantity}</strong>
                </p>
                <p>
                  Số người: <strong>{item.max_guests}</strong>
                </p>
              </Card>
            </Badge.Ribbon>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default MotelRoomGrid;
