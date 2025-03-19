# frozen_string_literal: true

class PostVote < ApplicationRecord
  enum vote_type: { downvote: -1, upvote: 1 } # Define enum for better readability
  belongs_to :user
  belongs_to :post

  validates :vote_type, presence: true, inclusion: { in: vote_types.keys }

  after_save :update_post_votes
  after_destroy :update_post_votes # Ensure counts update when a vote is removed

  private

    def update_post_votes
      post.update(
        upvotes: post.post_votes.upvote.count,
        downvotes: post.post_votes.downvote.count
      )
      post.update_bloggable_status
    end
end
