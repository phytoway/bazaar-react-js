import axios from "axios";
// get all product slug
const getSlugs = async () => {
  const response = await axios.get("/api/products/slug-list");
  return response.data;
};

// get product based on slug
const getProduct = async slug => {
  
  console.log(slug);

  

  try {
    //const response = await axios.get("/api/products/slug", {
    const response = await axios.get("http://127.0.0.1:7071/api/product", {  
      params: {
        id:1
      }
    });
    console.log(response.data);
    
    return response.data;
  } catch (err) {
    console.error(err);
  }


/*
  const response = await axios.get("/api/products/slug", {
    params: {
      slug
    }
  });
  console.log(response.data);
  return response.data;
*/
};

// search profucts
const searchProducts = async (name, category) => {
  const response = await axios.get("/api/products/search", {
    params: {
      name,
      category
    }
  });
  return response.data;
};
export default {
  getSlugs,
  getProduct,
  searchProducts
};