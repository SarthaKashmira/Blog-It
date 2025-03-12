# frozen_string_literal: true

json.user do
  json.extract! @user,
    :id,
    :name,
    :authentication_token
end
