# frozen_string_literal: true

require "test_helper"

class PostsControllerTest < ActionDispatch::IntegrationTest
  def setup
    @user = create(:user)
    @organization = create(:organization)
    @category = create(:category)
    @post = create(:post, user: @user, organization: @organization)
    @headers = headers(@user)
  end
end
