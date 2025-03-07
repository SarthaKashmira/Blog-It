# frozen_string_literal: true

class Api::V1::PostsController < ApplicationController
  def index
    posts = current_user.organization.posts
    Rails.logger.info(posts)
    render status: :ok,
      json: {
        posts: posts.as_json(
          include: {
            user: { only: [ :name, :email] }, organization: { only: [:name] },
            categories: { only: [:name] }
          })
      }
  end

  def create
    Rails.logger.info(post_params)
    post = Post.new(post_params)
    post.save!
    render_notice(t("successfully_created", entity: "Post"))
  end

  def show
    post = Post.find_by!(slug: params[:slug])
    render_json(
      {
        post: post.as_json(
          include: {
            user: { only: [ :name, :email] }, organization: { only: [:name] },
            categories: { only: [:name] }
          })
      })
  end

  private

    def post_params
      params.require(:post).permit(:title, :description, :is_bloggable, :user_id, category_ids: [])
    end
end
