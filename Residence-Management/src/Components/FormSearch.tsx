import { Button, Col, Form, InputNumber, Row, Card, Space, Typography } from "antd";
import { useState } from "react";
import { UpCircleFilled,DownCircleFilled} from "@ant-design/icons";

const { Text } = Typography;

interface FormSearchInput {
  person_quantity_from: number;
  person_quantity_to: number;
  cost_from: number;
  cost_to: number;
  area_from: number;
  area_to: number;
  bed_from: number;
  bed_to: number;
}

const FormSearch = () => {
  const [form] = Form.useForm<FormSearchInput>();
  const [isextend, setIsExtend] = useState<boolean>(false);

  const handleSubmit = (values: FormSearchInput) => {
    if (!values.person_quantity_from) values.person_quantity_from = 0;
    if (!values.person_quantity_to) values.person_quantity_to = 99999999;
    if (!values.cost_from) values.cost_from = 0;
    if (!values.cost_to) values.cost_to = 99999999;
    if (!values.area_from) values.area_from = 10;
    if (!values.area_to) values.area_to = 99999999;
    if (!values.bed_from) values.bed_from = 10;
    if (!values.bed_to) values.bed_to = 99999999;

    console.log(values);
  };

  return isextend ? (
    <Card title="Tìm kiếm phòng" style={{ maxWidth: 800, margin: "0 auto" }}>
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Space direction="vertical" size="middle" style={{ width: "100%" }}>
          {/* Số người ở */}
          <Text strong style={{ fontSize: 16 }}>Số người</Text>
          <Row gutter={16} align="middle">
            <Col span={11}>
              <Form.Item name="person_quantity_from">
                <InputNumber placeholder="Tối thiểu" style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Col span={2} style={{ textAlign: "center" }}>
              <strong>—</strong>
            </Col>
            <Col span={11}>
              <Form.Item name="person_quantity_to">
                <InputNumber placeholder="Tối đa" style={{ width: "100%" }} />
              </Form.Item>
            </Col>
          </Row>

          {/* Giá */}
          <Text strong style={{ fontSize: 16 }}>Giá</Text>
          <Row gutter={16} align="middle">
            <Col span={11}>
              <Form.Item name="cost_from">
                <InputNumber placeholder="Tối thiểu" style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Col span={2} style={{ textAlign: "center" }}>
              <strong>—</strong>
            </Col>
            <Col span={11}>
              <Form.Item name="cost_to">
                <InputNumber placeholder="Tối đa" style={{ width: "100%" }} />
              </Form.Item>
            </Col>
          </Row>

          {/* Diện tích */}
          <Text strong style={{ fontSize: 16 }}>Diện tích</Text>
          <Row gutter={16} align="middle">
            <Col span={11}>
              <Form.Item name="area_from">
                <InputNumber placeholder="Tối thiểu" style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Col span={2} style={{ textAlign: "center" }}>
              <strong>—</strong>
            </Col>
            <Col span={11}>
              <Form.Item name="area_to">
                <InputNumber placeholder="Tối đa" style={{ width: "100%" }} />
              </Form.Item>
            </Col>
          </Row>

          {/* Số giường */}
          <Text strong style={{ fontSize: 16 }}>Số giường</Text>
          <Row gutter={16} align="middle">
            <Col span={11}>
              <Form.Item name="bed_from">
                <InputNumber placeholder="Tối thiểu" style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Col span={2} style={{ textAlign: "center" }}>
              <strong>—</strong>
            </Col>
            <Col span={11}>
              <Form.Item name="bed_to">
                <InputNumber placeholder="Tối đa" style={{ width: "100%" }} />
              </Form.Item>
            </Col>
          </Row>

          {/* Nút Tìm kiếm */}
          <Form.Item style={{ textAlign: "center", marginTop: 16 }}>
            <Button type="primary" htmlType="submit" size="large">
              Tìm kiếm
            </Button>
          </Form.Item>
        </Space>
      </Form>

      {/* Icon UpCircle để đóng form */}
      <Row align="middle" justify="center" style={{ marginTop: 16 }}>
        <UpCircleFilled
          onClick={() => setIsExtend(!isextend)}
          style={{ fontSize: 40, color: "#1890ff", cursor: "pointer" }} // 👈 Tăng kích thước & căn giữa
        />
      </Row>
    </Card>
  ) : (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100px",
        //width: "150px", // Tăng chiều rộng để chứa cả chữ và icon
        cursor: "pointer",
        fontSize: "18px",
        fontWeight: "bold",
        color: "#1890ff",
      }}
      onClick={() => setIsExtend(!isextend)}
    >
      <u>Bộ lọc</u>
      <DownCircleFilled style={{ marginLeft: 8, fontSize: 20 }} />
    </div>
  );
};

export default FormSearch;
