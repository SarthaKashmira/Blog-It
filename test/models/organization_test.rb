# frozen_string_literal: true

require "test_helper"

class OrganizationTest < ActiveSupport::TestCase
  def setup
    @category = create(:category)
  end

  def test_category_should_not_be_saved_without_name
    @organization.name = nil
    assert_not @organization.valid?
    assert_includes @organization.errors.full_messages, "Organization name can't be blank"
  end
end
