# frozen_string_literal: true

require "test_helper"

class PostTest < ActiveSupport::TestCase
  def setup
    @organization = create(:organization)
    @user = create(:user)
    @post = create(:post, user: @user, organization: @organization)
  end

  def test_post_should_not_be_valid_and_saved_without_title
    @post.title = ""
    assert_not @post.valid?
    assert_includes @post.errors.full_messages, "Title can't be blank"
  end

  def test_title_should_be_of_valid_length
    @post.title = "a" * (Post::MAX_TITLE_LENGTH + 1)
    assert @post.invalid?
  end

  def test_description_should_be_of_valid_length
    @post.description = "a" * (Post::MAX_DESCRIPTION_LENGTH + 1)
    assert @post.invalid?
  end

  def test_post_should_not_be_saved_without_is_bloggable
    @post.is_bloggable = nil
    assert_not @post.valid?
    assert_includes @post.errors.full_messages, "Is bloggable can't be blank"
  end

  def test_should_be_valid_with_user_and_organization
    assert @post.valid?
  end

  def test_should_be_invalid_without_user_id
    @post.user_id = nil
    assert_not @post.valid?
    assert_includes @post.errors.full_messages, "User must exist"
  end

  def test_should_be_invalid_without_organization_id
    @post.organization_id = nil
    assert_not @post.valid?
    assert_includes @post.errors.full_messages, "Organization must exist"
  end

  def test_should_not_save_post_with_non_existent_user
    @post.user_id = 99999 # Assuming this user doesn't exist
    assert_not @post.valid?
  end

  def test_should_not_save_post_with_non_existent_organization
    @post.organization_id = 99999 # Assuming this organization doesn't exist
    assert_not @post.valid?
  end
end
