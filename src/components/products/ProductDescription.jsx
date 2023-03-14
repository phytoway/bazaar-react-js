import { Box } from "@mui/material";
import { H3 } from "components/Typography";

// ======================================================

// ======================================================



const ProductDescription = ({
  productsData
}) => {
  return <Box>
      <Box dangerouslySetInnerHTML={{ __html: productsData.detail_description }} />
    </Box>;
};
export default ProductDescription;