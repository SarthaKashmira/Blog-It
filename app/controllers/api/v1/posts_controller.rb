# frozen_string_literal: true

class Api::V1::PostsController < ApplicationController
  before_action :load_task!, only: %i[show update destroy]
  def index
    @posts = policy_scope(Post)
    user = current_user
    @posts = PostsFilterService.new(@posts, params, user).call
    render
  end

  def create
    post = Post.new(post_params)
    post.save!
    render_notice(t("successfully_created", entity: "Post"))
  end

  def show
    render
  end

  def update
    authorize @post
    @post.update!(post_params)
    render_notice(t("successfully_updated", entity: "Post"))
  end

  def destroy
    authorize @post
    @post.destroy!
    render_notice(t("successfully_deleted", entity: "Post"))
  end

  def bulk_delete
    result = PostsDeleteService.new(params).call
    render_notice(result[:message], result[:status])
  end

  def bulk_update
    result = PostsUpdateService.new(params).call
    render_notice(result[:message], result[:status])
  end

  private

    def load_task!
      @post = Post.find_by!(slug: params[:slug])
    end

    def post_params
      params.require(:post).permit(:title, :description, :is_bloggable, :user_id, :status, category_ids: [])
    end
end
