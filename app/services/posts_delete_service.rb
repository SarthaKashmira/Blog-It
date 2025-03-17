# frozen_string_literal: true

class PostsDeleteService
  def initialize(params)
    @slugs = params[:slugs]
  end

  def call
    return { message: "No valid deletion params provided", status: :unprocessable_entity } unless @slugs.present?

    deleted_count = Post.where(slug: @slugs).destroy_all.size
    { message: I18n.t("successfully_deleted", entity: "#{deleted_count} posts"), status: :ok }
  end
end
