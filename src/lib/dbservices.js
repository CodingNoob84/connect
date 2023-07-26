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

  export async function getPosts(page) {
    try {
      const response = await axios.get(`api/post?page=${page}`);
      return response.data.result;
    } catch (error) {
      console.error("Error fetching posts:", error.message);
      return [];
    }
  }

  export async function createPost(data){
    try{
      const response = await axios.post('api/post', data);
      return response.data;
    }
    catch (error) {
      console.error("Error fetching posts:", error.message);
      return [];
  }
}

export async function createComment(data){
  try{
    const response = await axios.post('api/comment', data);
    return response.data;
  }
  catch (error) {
    console.error("Error fetching posts:", error.message);
    return [];
}
}

export async function crudLikes(data){
  try{
    const response = await axios.post('api/like', data);
    return response.data;
  }
  catch (error) {
    console.error("Error fetching posts:", error.message);
    return [];
}
}

export async function getComments(id){
  try{
    if(id){
      const response = await axios.get(`api/post/${id}/comments`);
      return response.data;
    }else{
      return []
    }
    
  }
  catch (error) {
    console.error("Error fetching posts:", error.message);
    return [];
}
}

export async function getLikes(id){
  try{
    if(id){
      //console.log(id)
      const response = await axios.get(`api/post/${id}/likes`);
      //console.log(response)
      return response.data;
    }else{
      return []
    }
    
  }
  catch (error) {
    console.error("Error fetching posts:", error.message);
    return [];
}
}