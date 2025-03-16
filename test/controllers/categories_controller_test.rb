# frozen_string_literal: true

require "test_helper"

class CategoriesControllerTest < ActionDispatch::IntegrationTest
  def setup
    @creator = create(:user)
    @category = create(:category)
    @headers = headers(@creator)
  end

  def test_should_create_category_for_valid_request
    name = "Technology"
    post api_v1_categories_path, params: { category: { name: } }, headers: @headers
    assert_response :success
  end

  def test_shouldnt_create_category_without_name
    post api_v1_categories_path, params: { category: { name: "" } }, headers: @headers
    assert_response :unprocessable_entity
    response_json = response.parsed_body
    assert_equal "Name can't be blank", response_json["error"]
  end

  def test_should_add_category_to_database
    assert_difference "Category.count", 1 do
      post api_v1_categories_path, params: { category: { name: "Technology" } }, headers: @headers
    end
  end
end
