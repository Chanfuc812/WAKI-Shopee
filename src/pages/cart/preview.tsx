import { DisplayPrice } from "components/display/price";
import { useRecoilState, useRecoilValue } from "recoil";
import { totalPriceState, totalQuantityState, cartState } from "state";
import { Box, Button, Text } from "zmp-ui";
import React, { FC} from "react";
import firebase from "firebase";
import { useNavigate } from "react-router-dom";
import { CartItem, OrderDetail } from "types/cart";


export const CartPreview: FC = ({
  formSubmit,
  isFullNameFilled,
  isPhoneNumberValid,
}: any) => {
  const quantity = useRecoilValue(totalQuantityState);
  const totalPrice = useRecoilValue(totalPriceState);
  const [cart, setCart] = useRecoilState(cartState);
  const navigate = useNavigate(); // Lấy hàm navigate từ hook

  const handleCheckout = async () => {
    if (!isFullNameFilled) {
      alert("Vui lòng cho chúng tôi biết Tên của bạn!");
      return;
    }

    if (!isPhoneNumberValid) {
      alert("Số điện thoại của bạn không đúng, vui lòng thử lại!");
      return;
    }

    const confirmationMessage =
      "Bạn có đồng ý đặt hàng?\nChúng tôi sẽ sớm liên hệ đến bạn.";

    const userConfirmed = confirm(confirmationMessage);
    if (userConfirmed) {
      setCart([]);
      navigate("/");
      
    // Gửi dữ liệu lên Firestore
    const db = firebase.firestore();

    try {
      // Lấy ngày, tháng và năm hiện tại
      
      const currentDate = new Date();
      // Định dạng thành chuỗi ngày/tháng/năm
      
      const productList: OrderDetail[] = [];
      cart.forEach((item: CartItem) => {
        let detail: OrderDetail = {
          Sản_phẩm: item.product.name,
          Số_lượng: item.quantity,
          Ảnh_SP: item.product.image,
        };
        productList.push(detail);
      });
      console.log("orderDetail", productList);
      // Thêm dữ liệu vào Firestore với trường ngày/tháng/năm
      await db.collection("orders").add({
        Tổng_số_lượng: quantity,
        Tổng_tiền: totalPrice,
        Thông_tin_Khách_hàng: formSubmit,
        Ngày_đặt_hàng: currentDate.toLocaleString(),
        Danh_sách_Sản_phẩm: productList,
      });

      console.log("Dữ liệu đã được lưu tại Firestore");

    //Xuất dữ liệu cho Manager  
    await db.collection("orders").orderBy("Ngày_đặt_hàng", "asc").get().then(snapshot => {
      snapshot.forEach(doc => {
          console.log(doc.id, '=>', doc.data().Ngày_đặt_hàng,
          );
      });
      console.log("end")
  })
  .catch(err => {
      console.log('Error getting documents', err);
  });

    } catch (error) {
      console.error("Lỗi khi gửi dữ liệu lên Firestore:", error);
    }
  }
  };

  return (
    <Box flex className="sticky bottom-0 bg-background p-4 space-x-4">
      <Box
        flex
        flexDirection="column"
        justifyContent="space-between"
        className="min-w-[120px] flex-none"
      >
        <Text className="text-gray" size="xSmall">
          {quantity} sản phẩm
        </Text>
        <Text.Title size="large">
          <DisplayPrice>{totalPrice}</DisplayPrice>
        </Text.Title>
      </Box>
      <Button
        type="highlight"
        disabled={!quantity}
        fullWidth
        onClick={handleCheckout}
      >
        Đặt hàng
      </Button>
    </Box>
  );
};



