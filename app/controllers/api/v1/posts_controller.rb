# frozen_string_literal: true

class Api::V1::PostsController < ApplicationController
  before_action :load_task!, only: %i[show update destroy vote]
  def index
    @posts = policy_scope(Post).includes(:post_votes)
    @user = current_user
    @posts = PostsFilterService.new(@posts, params, @user).call
    render
  end

  def create
    post = Post.new(post_params)
    puts post.slug
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

  def vote
    post_vote = @post.post_votes.find_or_initialize_by(user: current_user)
    new_vote_type = params[:vote_type].to_i

    if post_vote.persisted? && post_vote.vote_type == new_vote_type
      post_vote.destroy # Remove vote if clicking the same button again
    else
      post_vote.update(vote_type: new_vote_type)
    end

    render json: {
      upvotes: @post.upvotes,
      downvotes: @post.downvotes,
      net_votes: @post.net_votes,
      vote_type: post_vote.vote_type
    }
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
