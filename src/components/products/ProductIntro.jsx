import Link from "next/link";
import { useState } from "react";
import { Add, Remove } from "@mui/icons-material";
import { Avatar, Box, Button, Chip, Grid } from "@mui/material";
import LazyImage from "components/LazyImage";
import BazaarRating from "components/BazaarRating";
import { H1, H2, H3, H6 } from "components/Typography";
import { useAppContext } from "contexts/AppContext";
import { FlexBox, FlexRowCenter } from "../flex-box";
import { currency } from "lib";
import productVariants from "data/product-variants";

// ================================================================

// ================================================================

const ProductIntro = ({
  product, review
}) => {
  const {
    id,
    sale_price,
    original_price,
    discount,
    name,
    images,
    slug,
    thumbnail,
    view_option,
    main_option_id,
  } = product;
  const {
    state,
    dispatch
  } = useAppContext();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedOption, setSelectedOption] = useState(main_option_id);
  const [originalPrice, setOriginalPrice] = useState(original_price);
  const [salePrice, setSalePrice] = useState(sale_price);
  
  // HANDLE CHAMGE TYPE AND OPTIONS
  /*
  const handleChangeVariant = (value) => () => {
    setSelectedOption(state => ({
      ...state, value
    }));
  };
  */

  // CHECK PRODUCT EXIST OR NOT IN THE CART
  const cartItem = state.cart.find(item => item.id === id);

  // HANDLE SELECT IMAGE
  //const handleOptionClick = idx => () => setSelectedOption(idx);
  const handleOptionClick = (option) => () => {
    setSelectedOption(option.id);
    setOriginalPrice(option.original_price);
    setSalePrice(option.sale_price);
  };

  // HANDLE SELECT IMAGE
  const handleImageClick = ind => () => setSelectedImage(ind);


  // HANDLE CHANGE CART
  const handleCartAmountChange = amount => () => {
    dispatch({
      type: "CHANGE_CART_AMOUNT",
      payload: {
        sale_price,
        qty: amount,
        name: title,
        imgUrl: thumbnail,
        id,
        slug
      }
    });
  };

  

  return <Box width="100%">
      <Grid container spacing={3} justifyContent="space-around">
        <Grid item md={6} xs={12} alignItems="center">
          <FlexBox justifyContent="center" mb={6}>
            <LazyImage alt={name} width={500} height={500} loading="eager" objectFit="contain" src={images[selectedImage]} />
          </FlexBox>

          <FlexBox overflow="auto">
            {images.map((url, ind) => <FlexRowCenter key={ind} width={64} height={64} minWidth={64} bgcolor="white" border="1px solid" borderRadius="10px" ml={ind === 0 ? "auto" : 0} style={{
            cursor: "pointer"
          }} onClick={handleImageClick(ind)} mr={ind === images.length - 1 ? "auto" : "10px"} borderColor={selectedImage === ind ? "primary.main" : "grey.400"}>
                <Avatar src={url} variant="square" sx={{
              height: 40
            }} />
              </FlexRowCenter>)}
          </FlexBox>
        </Grid>

        <Grid item md={6} xs={12} alignItems="center">
          <H1 mb={1}>{name}</H1>

          

          <FlexBox alignItems="center" mb={2}>
            <Box lineHeight="1">Rated:</Box>
            <Box mx={1} lineHeight="1">
              <BazaarRating color="warn" fontSize="1.25rem" value={review.rating_avg} precision={0.5} readOnly />
            </Box>
            <H6 lineHeight="1">({review.total_count})</H6>
          </FlexBox>

          {view_option.map(view_option => <Box key={view_option.id} mb={2}>
              

              <Chip key={view_option.id} label={'[' + view_option.discount + '%할인] ' + view_option.name + ' ' + currency(view_option.sale_price)} onClick={handleOptionClick(view_option)} sx={{
                borderRadius: "4px",
                mr: 1,
                cursor: "pointer"
              }} color={selectedOption === view_option.id ? "primary" : "default"} />
              


            </Box>)}

          <Box pt={1} mb={3}>
            <H2 color="primary.main" mb={0.5} lineHeight="1">
              {currency(originalPrice)}
            </H2>
            <H2 color="primary.main" mb={0.5} lineHeight="1">
              {currency(salePrice)} 
            </H2>
            <H2 color="primary.main" mb={0.5} lineHeight="1">
              {discount}% 할인
            </H2>
            
          </Box>

          {!cartItem?.qty ? <Button color="primary" variant="contained" onClick={handleCartAmountChange(1)} sx={{
          mb: 4.5,
          px: "1.75rem",
          height: 40
        }}>
              Add to Cart
            </Button> : <FlexBox alignItems="center" mb={4.5}>
              <Button size="small" sx={{
            p: 1
          }} color="primary" variant="outlined" onClick={handleCartAmountChange(cartItem?.qty - 1)}>
                <Remove fontSize="small" />
              </Button>

              <H3 fontWeight="600" mx={2.5}>
                {cartItem?.qty.toString().padStart(2, "0")}
              </H3>

              <Button size="small" sx={{
            p: 1
          }} color="primary" variant="outlined" onClick={handleCartAmountChange(cartItem?.qty + 1)}>
                <Add fontSize="small" />
              </Button>
            </FlexBox>}

          
        </Grid>
      </Grid>
    </Box>;
};
export default ProductIntro;