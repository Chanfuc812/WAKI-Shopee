import React, { FC, Suspense } from "react";
import { Section } from "components/section";
import { useRecoilValue } from "recoil";
import { productListProductsState } from "state";
import { Box } from "zmp-ui";
import { ProductItem } from "components/product/item";
import { ProductItemSkeleton } from "components/skeletons";

export const ProductListContent: FC = () => {
  const productList = useRecoilValue(productListProductsState);

  return (
    <Section title="GỢI Ý CHO BẠN💡">
      <Box className="grid grid-cols-2 gap-4">
        {productList.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </Box>
    </Section>
  );
};

export const ProductListFallback: FC = () => {
  const products = [...new Array(12)];

  return (
    <Section title="GỢI Ý CHO BẠN💡">
      <Box className="grid grid-cols-2 gap-4">
        {products.map((_, i) => (
          <ProductItemSkeleton key={i} />
        ))}
      </Box>
    </Section>
  );
};

export const ProductList: FC = () => {
  return (
    <Suspense fallback={<ProductListFallback />}>
      <ProductListContent />
    </Suspense>
  );
};
