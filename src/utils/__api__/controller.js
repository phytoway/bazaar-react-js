import axios from "axios";


const getSlugs = async () => {
  const response = await axios.get("/api/products/slug-list");
  return response.data;
};

const getData = async (object_name, search) => {
  try {
    console.log(search);
    const params = search ? search : null;
    const response = await axios.get('http://127.0.0.1:7071/api/' + object_name, {
      params
    });
    console.log(response);
    return response;
  } catch (err) {
    console.error(err);
  }
};

export default {
  getSlugs,
  getData,
};