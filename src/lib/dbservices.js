import axios from "axios";

const baseurl = process.env.NEXTAUTH_URL;

export async function fetchPosts() {
    try {
      const response = await axios.get(`api/post`);
      return response.data.result;
    } catch (error) {
      console.error("Error fetching posts:", error.message);
      return [];
    }
  }