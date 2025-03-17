# frozen_string_literal: true

class PostsUpdateService
  def initialize(params)
    @updates = params[:updates]
  end

  def call
    return { message: "No updates provided", status: :unprocessable_entity } unless @updates.present?

    updates = @updates.map { |update_params| update_params.permit(:slug, :status) }

    updates.each do |update_params|
      post = Post.find_by(slug: update_params[:slug])
      post.update(update_params.except(:slug)) if post
    end

    { message: I18n.t("successfully_updated", entity: "Posts"), status: :ok }
  end
end
