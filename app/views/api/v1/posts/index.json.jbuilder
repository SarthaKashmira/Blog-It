json.posts @posts do |post|
  json.extract! post, :id, :title, :description, :is_bloggable, :slug, :created_at, :updated_at, :status

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

json.user_posts @user_posts do |post|
  json.title post.title
  json.updated_at post.updated_at
  json.status post.status
  json.slug post.slug

  json.categories post.categories do |category|
    json.name category.name
  end
end
