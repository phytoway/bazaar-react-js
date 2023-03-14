
import { useCallback, useEffect, useState } from "react";
import { Apps, FilterList, ViewList } from "@mui/icons-material";
import { Box, Card, Container, Grid, IconButton, MenuItem, TextField } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import Sidenav from "components/Sidenav";
import { FlexBox } from "components/flex-box";
import { H5, Paragraph } from "components/Typography";
import ShopLayout1 from "components/layouts/ShopLayout1";
import ProductCard1List from "components/products/ProductCard1List";
import ProductCard9List from "components/products/ProductCard9List";
import ProductFilterCard from "components/products/ProductFilterCard";
import api from "utils/__api__/controller";


import { Checkbox, Divider, FormControlLabel, Rating, } from "@mui/material";
import { H6, Span } from "components/Typography";

const ProductSearchResult = (props) => {
  const {
    category,
    search
  } = props;

  const [view, setView] = useState("grid");
  const downMd = useMediaQuery((theme) => theme.breakpoints.down("md"));
  const toggleView = useCallback((v) => () => setView(v), []);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [ableFilters, setAbleFilters] = useState([]);
  const [product, setProductList] = useState([]);

  const handleFilterChange = (event) => {
    const { name, checked } = event.target;
    if (checked) {
      // 선택된 필터 정보를 추가합니다.
      setSelectedFilters((prevSelectedFilters) => [...prevSelectedFilters, name]);
    } else {
      // 선택된 필터 정보를 제거합니다.
      setSelectedFilters((prevSelectedFilters) => prevSelectedFilters.filter((filter) => filter !== name));
    }
  };

  useEffect(() => {
    // 선택된 필터 정보를 바탕으로 상품 리스트를 요청합니다.
    const filterString = selectedFilters.join(',');
    api.getData('category', {
      object: 'product',
      where: filterString,
      search: search
    })
      .then((response) => {
        setProductList(response.data.data);
        setAbleFilters(response.data.data2.map((item) => item.name)); //json 배열을 값만 있는 배열로 변환
      })
      .catch((error) => {
        console.error(error);
      });
  }, [selectedFilters]);
  


  if (!product) {
    return <div>Loading...</div>;
  }

  return <ShopLayout1>
      <Container sx={{
      mt: 4,
      mb: 6
    }}>
        {/* TOP BAR AREA*/} 
        <Card elevation={1} sx={{
        mb: "55px",
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "space-between",
        p: {
          sm: "1rem 1.25rem",
          md: "0.5rem 1.25rem",
          xs: "1.25rem 1.25rem 0.25rem"
        }
      }}>
          <Box>
            <H5>Searching for “ {search ? search : '전체'} ”</H5>
            <Paragraph color="grey.600">{product.length} results found</Paragraph>
          </Box>

          <FlexBox alignItems="center" columnGap={4} flexWrap="wrap" my="0.5rem">
            <FlexBox alignItems="center" gap={1} flex="1 1 0">
              <Paragraph color="grey.600" whiteSpace="pre">
                Short by:
              </Paragraph>

              <TextField select fullWidth size="small" variant="outlined" placeholder="Short by" defaultValue={sortOptions[0].value} sx={{
              flex: "1 1 0",
              minWidth: "150px"
            }}>
                {sortOptions.map(item => <MenuItem value={item.value} key={item.value}>
                    {item.label}
                  </MenuItem>)}
              </TextField>
            </FlexBox>

            <FlexBox alignItems="center" my="0.25rem">
              <Paragraph color="grey.600" mr={1}>
                View:
              </Paragraph>

              <IconButton onClick={toggleView("grid")}>
                <Apps color={view === "grid" ? "primary" : "inherit"} fontSize="small" />
              </IconButton>

              <IconButton onClick={toggleView("list")}>
                <ViewList color={view === "list" ? "primary" : "inherit"} fontSize="small" />
              </IconButton>

              {/* SHOW IN THE SMALL DEVICE */}
              {downMd && <Sidenav handle={<IconButton>
                      <FilterList fontSize="small" />
                    </IconButton>}>
                    <ProductFilterCard
                      category={category.data}
                      selectedFilters={selectedFilters} 
                      ableFilters={ableFilters} 
                      onChange={handleFilterChange}
                    />
                </Sidenav>}
            </FlexBox>
          </FlexBox>
        </Card>

        <Grid container spacing={3}>
          {/* PRODUCT FILTER SIDEBAR AREA */}
          <Grid item md={3} sx={{
            display: {
              md: "block",
              xs: "none"
            }
          }}>
            <ProductFilterCard
              category={category.data}
              selectedFilters={selectedFilters} 
              ableFilters={ableFilters} 
              onChange={handleFilterChange}
            />
          </Grid>

          {/* PRODUCT VIEW AREA */}
          <Grid item md={9} xs={12}>
            {view === "grid" ? <ProductCard1List products={product} /> : <ProductCard9List products={productDatabase.slice(95, 104)} />}
          </Grid>
        </Grid>
      </Container>
    </ShopLayout1>;
};
const sortOptions = [{
  label: "Relevance",
  value: "Relevance"
}, {
  label: "Date",
  value: "Date"
}, {
  label: "Price Low to High",
  value: "Price Low to High"
}, {
  label: "Price High to Low",
  value: "Price High to Low"
}];

export const getStaticPaths = async () => {
  const paths = await api.getSlugs();
  return {
    paths: paths,
    //indicates that no page needs be created at build time
    fallback: "blocking" //indicates the type of fallback
  };
};

export const getStaticProps = async ({ params }) => {
  console.log(params);
  const category = await api.getData('category', {object: 'group'});
  return {
    props: { 
      category : category.data,
      search : params.slug ? params.slug : null
    }
  };
};

export default ProductSearchResult;

/*

// pages/index.js
import { useState, useEffect } from 'react';
import api from "utils/__api__/controller";
import { Box, Card, Checkbox, Divider, FormControlLabel, Rating, TextField } from "@mui/material";
import Accordion from "components/accordion/Accordion";
import { FlexBetween, FlexBox } from "components/flex-box";
import { H5, H6, Paragraph, Span } from "components/Typography";

const ProductSearchResult = (props) => {
  const {
    category
  } = props;

  const [selectedFilters, setSelectedFilters] = useState([]);
  const [productList, setProductList] = useState([]);

  const handleFilterChange = (event) => {
    const { name, checked } = event.target;
    if (checked) {
      // 선택된 필터 정보를 추가합니다.
      setSelectedFilters((prevSelectedFilters) => [...prevSelectedFilters, name]);
    } else {
      // 선택된 필터 정보를 제거합니다.
      setSelectedFilters((prevSelectedFilters) => prevSelectedFilters.filter((filter) => filter !== name));
    }
  };

  useEffect(() => {
    // 선택된 필터 정보를 바탕으로 상품 리스트를 요청합니다.
    const filterString = selectedFilters.join(',');
    api.getData('category', {
      object: 'product',
      where: filterString
    })
      .then((response) => {
        console.log(response.data);
        setProductList(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [selectedFilters]);
  

  return (
    <div>
      <h1>Product List</h1>
      <ul>
        {productList.map((product) => (
          <li key={product.id}>{product.name}</li>
        ))}
      </ul>

      <h2>Filters</h2>
      

<Card sx={{
    p: "18px 27px",
    overflow: "auto"
  }} elevation={1}>
      {category.data.map(group => (
        <div>
        <H6 mb={2}>{group.group}</H6>
        {group.category.map(category => 
          <FormControlLabel
          key={category.id}
          sx={{ display: "flex" }}
          label={<Span color="inherit">{category.name}</Span>}
          control={
            <Checkbox
              size="small"
              color="secondary"
              name={category.name}
              checked={selectedFilters.includes(category.name)}
              onChange={handleFilterChange} 
            />
          }
        />)}
        <Divider sx={{my: 3}} />
        </div>
      ))}
    </Card>;

    </div>
  );
}

export const getStaticPaths = async () => {
  const paths = await api.getSlugs();
  return {
    paths: paths,
    //indicates that no page needs be created at build time
    fallback: "blocking" //indicates the type of fallback
  };
};

export const getStaticProps = async ({ params }) => {
  const category = await api.getData('category', {object: 'group'});
  return {
    props: { 
      category
    }
  };
};
export default ProductSearchResult;
*/