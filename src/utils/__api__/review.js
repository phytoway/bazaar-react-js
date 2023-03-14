import axios from "axios";

const getReview = async (search) => {
  try {
    console.log(search);
    const params = search ? search : null;
    const response = await axios.get('http://127.0.0.1:7071/api/review', {
      params
    });
    //const response = await axios.get('http://127.0.0.1:7071/api/review?product_id=1');
    console.log(response.data);
    return response.data;
  } catch (err) {
    console.error(err);
  }
};

export default {
  getReview,
};