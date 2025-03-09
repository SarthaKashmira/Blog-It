# frozen_string_literal: true

# frozen_string_literal: true**

FactoryBot.define do
  factory :post do
    title { Faker::Book.title }
    description { Faker::Lorem.paragraph }
    is_bloggable { false }
    slug { title.parameterize }

    association :organization
    association :user
  end
end
