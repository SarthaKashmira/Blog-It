# frozen_string_literal: true

require "test_helper"

class UserTest < ActiveSupport::TestCase
  def setup
    @user = User.new(
      name: "Sam Smith",
      email: "sam@example.com",
      password: "welcome",
      password_confirmation: "welcome")
  end

  # embed new test cases here...
end
