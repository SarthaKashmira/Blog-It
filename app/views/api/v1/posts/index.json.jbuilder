json.posts @posts do |post|
  json.extract! post, :id, :title, :description, :is_bloggable, :slug, :created_at, :updated_at, :status, :upvotes, :downvotes

  json.vote_type post.post_votes.find_by(user_id: @user.id)&.vote_type

  json.user do
    if post.user.present?
      json.extract! post.user, :name, :email
    else
      json.null!
    end
  end

  json.organization do
    if post.organization.present?
      json.extract! post.organization, :name
    else
      json.null!
    end
  end

  json.categories post.categories do |category|
    json.name category.name
  end
end
