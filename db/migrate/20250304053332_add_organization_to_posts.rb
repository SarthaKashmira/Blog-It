# frozen_string_literal: true

class AddOrganizationToPosts < ActiveRecord::Migration[7.1]
  def change
    add_reference :posts, :organization, foreign_key: true
  end
end
