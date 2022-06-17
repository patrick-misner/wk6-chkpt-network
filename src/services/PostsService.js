import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class PostsService {
  async getPosts(){
    const res = await api.get('api/posts')
    // logger.log('posts service get posts', res.data.posts)
    AppState.posts = res.data.posts
  }
  async createPost(post){
    logger.log('create post service', post)
    const res = await api.post('api/posts', post)
    logger.log('post res.data', res.data)
    AppState.posts.unshift(res.data)
  }
  async deletePost(id){
    logger.log('delete post service', id)
    const res = await api.delete('api/posts/' + id)
    logger.log('post deleted', res.data)
    AppState.posts = AppState.posts.filter(p => p.id !=id)
  }
  async getProfilePosts(profileId){
  const res = await api.get(`api/profiles/${profileId}/posts`)
  logger.log('getprofileposts', res.data.posts)
  AppState.posts = res.data.posts
  logger.log('what is this?', AppState.posts)

}
}

export const postsService = new PostsService()