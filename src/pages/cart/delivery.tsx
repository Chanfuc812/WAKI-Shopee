import { ElasticTextarea } from "components/elastic-textarea";
import { Box, Text } from "zmp-ui";
import React, { FC, useState } from "react";
import { CartPreview } from "./preview";
import { useVirtualKeyboardVisible } from "hooks";


type formSubmit= {
  name:string,
  phoneNumber: string,
  note:string,
}


export const Delivery: FC = ({orderDetail}:any) => {
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [note, setNote] = useState("");
  const keyboardVisible = useVirtualKeyboardVisible();
  const [isFullNameFilled, setIsFullNameFilled] = useState(false);
  const [isPhoneNumberValid, setIsPhoneNumberValid] = useState(false);
  const formSubmited : formSubmit  = {
    name:fullName,
    phoneNumber:phoneNumber,
    note: note
  }
  const handleFullNameChange = (event: any) => {
    const fullNameValue = event.target.value;
    setFullName(fullNameValue);
    setIsFullNameFilled(fullNameValue.trim() !== ""); // Kiểm tra xem trường Họ và Tên có giá trị không trống
  };

 
  const handlePhoneNumberChangeForTextarea = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const phoneNumberValue = event.target.value;
    // Loại bỏ tất cả các ký tự không phải số từ chuỗi số điện thoại
    const numericValue = phoneNumberValue.replace(/\D/g, "");
    setPhoneNumber(numericValue);
    setIsPhoneNumberValid(numericValue.length === 10); // Kiểm tra xem có 10 chữ số hay không
  };
  
  // Tạo một hàm để định dạng số điện thoại thành dạng có dấu "_"
  const formatPhoneNumber = (value: string) => {
    const phoneNumberDigits = value.replace(/\D/g, "");
    const formattedPhoneNumber = phoneNumberDigits
      .substr(0, 10)
      .replace(/(\d{4})(\d{3})(\d{3})/, "$1_$2_$3");
    return formattedPhoneNumber;
  };

  const deliveryItems = [
    {
      title: "*Họ và Tên:",
      content: (
        <ElasticTextarea
          placeholder="Vui lòng nhập Họ tên..."
          className="border rounded p-2 w-full focus:outline-none"
          maxRows={4}
          value={fullName}
          onChange={handleFullNameChange}
        />
      ),
    },
    {
      title: "*Số điện thoại:",
      content: (
        <ElasticTextarea
          placeholder="Vui lòng nhập số điện thoại..."
          className="border rounded p-2 w-full focus:outline-none"
          maxRows={4}
          value={formatPhoneNumber(phoneNumber)}
          onChange={handlePhoneNumberChangeForTextarea}
        />
      ),
    },
  
    {
      title: "Ghi chú:",
      content: (
        <ElasticTextarea
          placeholder="Vui lòng nhập ghi chú... (không bắt buộc)"
          className="border rounded p-2 w-full focus:outline-none"
          maxRows={4}
          value={note}
          onChange={(event:any) => setNote(event.target.value)}
        />
      ),
    },
  ];
  


  return (
    <Box className="space-y-6 p-4 bg-gray-100 rounded">
      <div className="text-center mb-4">
        <Text.Header className="text-2xl font-bold">THÔNG TIN NHẬN HÀNG</Text.Header>
      </div>
      {deliveryItems.map((item, index) => (
        <Box key={index} className="mb-4">
          <Text className="text-lg font-semibold mb-2">{item.title}</Text>
          <Box>{item.content}</Box>
        </Box>
      ))}
           <div style={{ marginLeft: "-16px", marginRight: "-13px" }}>
   
  </div>
        {!keyboardVisible && <CartPreview formSubmit={formSubmited} isFullNameFilled={isFullNameFilled} isPhoneNumberValid={isPhoneNumberValid}/>}
    </Box>
  );
};


