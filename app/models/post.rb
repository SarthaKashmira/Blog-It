# frozen_string_literal: true

class Post < ApplicationRecord
  MAX_TITLE_LENGTH = 125
  MAX_DESCRIPTION_LENGTH = 10000
  enum :status, { publish: "publish", draft: "draft" }, default: :publish
  belongs_to :user
  belongs_to :organization
  has_many :post_votes, dependent: :destroy
  has_and_belongs_to_many :categories

  validates :title, presence: true, length: { maximum: MAX_TITLE_LENGTH }
  validates :description, presence: true, length: { maximum: MAX_DESCRIPTION_LENGTH }
  validates_inclusion_of :is_bloggable, in: [true, false]
  validates :slug, uniqueness: true
  validates :organization_id, presence: true
  validates :user_id, presence: true
  validate :slug_not_changed

  before_create :set_slug
  before_validation :set_user_organization, on: :create
  before_save :update_bloggable_status, if: -> { upvotes_changed? || downvotes_changed? }

  def update_bloggable_status
    threshold = Constants::VOTE_THRESHOLD # Fetch threshold from constants
    new_status = net_votes >= threshold
    self.is_bloggable = new_status if is_bloggable != new_status
  end

  def net_votes
    upvotes - downvotes
  end

  private

    def set_slug
      title_slug = title.parameterize
      regex_pattern = "slug #{Constants::DB_REGEX_OPERATOR} ?"
      latest_task_slug = Post.where(
        regex_pattern,
        "^#{title_slug}$|^#{title_slug}-[0-9]+$"
      ).order("LENGTH(slug) DESC", slug: :desc).first&.slug
      slug_count = 0
      if latest_task_slug.present?
        slug_count = latest_task_slug.split("-").last.to_i
        only_one_slug_exists = slug_count == 0
        slug_count = 1 if only_one_slug_exists
      end
      slug_candidate = slug_count.positive? ? "#{title_slug}-#{slug_count + 1}" : title_slug
      self.slug = slug_candidate
    end

    def slug_not_changed
      if will_save_change_to_slug? && self.persisted?
        errors.add(:slug, i18n.t("post.slug.immutable"))
      end
    end

    def set_user_organization
      self.organization_id ||= 4
    end
end
