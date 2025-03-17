# frozen_string_literal: true

require "test_helper"

class OrganizationsControllerTest < ActionDispatch::IntegrationTestn
  # Didn't write the code in Organization controllers yet and therefore commenting the test cases
  # def setup
  #   @creator = create(:user)
  #   @organization = create(:organization)
  #   @headers = headers(@creator)
  # end

  # def test_should_create_organization_for_valid_request
  #   name = "BigBinary"
  #   post api_v1_organization_path, params: { organization: { name: } }, headers: @headers
  #   assert_response :success
  # end

  # def test_shouldnt_create_organization_without_name
  #   post api_v1_organization_path, params: { organization: { name: "" } }, headers: @headers
  #   assert_response :unprocessable_entity
  #   response_json = response.parsed_body
  #   assert_equal "Name can't be blank", response_json["error"]
  # end

  # def test_should_add_organization_to_database
  #   assert_difference "Organization.count", 1 do
  #     post api_v1_organization_path, params: { organization: { name: "BigBinary" } }, headers: @headers
  #   end
  # end
end
