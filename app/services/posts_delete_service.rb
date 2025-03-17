# frozen_string_literal: true

class PostsDeleteService
  attr_reader :params

  def initialize(params)
    @params = params
  end

  def call
    return { success: false, message: "No valid deletion params provided" } unless valid_params?

    if params[:query] == "delete_all" && params[:selectedKeys].present?
      deleted_count = Post.where(slug: params[:selectedKeys]).destroy_all.size
      return { success: true, message: "#{deleted_count} posts deleted" }
    elsif params[:slug].present?
      post = Post.find_by(slug: params[:slug])
      return { success: false, message: "Post not found" } unless post

      post.destroy
      return { success: true, message: "Post deleted successfully" }
    end

    { success: false, message: "Invalid parameters" }
  end

  private

    def valid_params?
      params[:slug].present? || (params[:query] == "delete_all" && params[:selectedKeys].is_a?(Array))
    end
end
