import { Avatar, Box } from "@mui/material";
import { FlexBox } from "components/flex-box";
import BazaarRating from "components/BazaarRating";
import { H5, H6, Paragraph, Span } from "components/Typography";
import { getDateDifference } from "lib";

// ===========================================================

// ===========================================================

const ProductComment = props => {
  const {
    user,
    bundle,
    images,
    rating,
    reg_datetime,
    comment
  } = props;
  return <Box mb={4} maxWidth="600px">
      <FlexBox alignItems="center" mb={2}>
        <Avatar src={null} sx={{
        width: 48,
        height: 48
      }} />
        <Box ml={2}>
          <H5 mb={0.5}>{user.name} (재구매 {user.order.length}회)</H5>
          <FlexBox alignItems="center">
            <BazaarRating value={rating} color="warn" readOnly />
            <H6 mx={1.25}>{rating}</H6>
            <Span>{getDateDifference(reg_datetime)}</Span>
          </FlexBox>
        </Box>
      </FlexBox>
      <FlexBox alignItems="center">
        <Span>{bundle.name}</Span>
      </FlexBox>
      <Paragraph color="grey.700" mt={1}>{comment}</Paragraph>
      <FlexBox alignItems="center" mt={1}>
        <Span>도움돼요</Span><Span>도움안돼요</Span>
      </FlexBox>
    </Box>;
};
export default ProductComment;