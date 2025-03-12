# frozen_string_literal: true

json.post do
  json.extract! @post, :id, :title, :description, :is_bloggable, :slug, :created_at, :updated_at, :status  # Add post attributes as needed

  json.user do
    json.extract! @post.user, :name, :email, :id
  end

  json.organization do
    json.extract! @post.organization, :name, :id
  end

  json.categories @post.categories, :name, :id
end
