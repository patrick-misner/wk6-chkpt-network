import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class PostsService {
  async setActive(post){
    AppState.activePost = post
    logger.log('the active post', AppState.activePost)
  }
  async getPosts(){
    const res = await api.get('api/posts')
    logger.log('posts service get posts', res.data)
    AppState.posts = res.data.posts
    AppState.nextPage = res.data.older
    AppState.previousPage = res.data.newer
    logger.log('previospage', AppState.nextPage)
  }

  async searchPosts(query){
    logger.log('search query', query)
    const res = await api.get('api/posts?query=' + query)
    logger.log('search query res', res.data)
    AppState.posts = res.data.posts
    AppState.nextPage = res.data.older
    AppState.previousPage = res.data.newer
  }
  async createPost(post){
    logger.log('create post service', post)
    const res = await api.post('api/posts', post)
    logger.log('post res.data', res.data)
    AppState.posts.unshift(res.data)
  }
  async editPost(post){
    logger.log('edit post service', post)
    const res = await api.put('api/posts/' + post.id, post)
    logger.log('edited', res.data)
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
  AppState.nextPage = res.data.older
  AppState.previousPage = res.data.newer
  logger.log('what is this?', AppState.posts)

}
  async changePage(url){
    const res = await api.get(url)
    // logger.log(res.data)
    AppState.posts = res.data.posts
    AppState.nextPage = res.data.older
    AppState.previousPage = res.data.newer
  }
  async likePost(postId){
    const res = await api.post('api/posts/' + postId + '/like')
    // logger.log('like post service', res.data)
    let original = AppState.posts.find(p => p.id == postId)
    // logger.log('original post', original.likes)
    original.likes = res.data.likes
  }
}

export const postsService = new PostsService()