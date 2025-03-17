# frozen_string_literal: true

class PostsFilterService
  attr_reader :posts, :params, :user # Define readable attributes

  def initialize(posts, params, user)
    @posts = posts
    @params = params
    @user = user
  end

  def call
    filter_by_query
    filter_by_title
    filter_by_categories
    filter_by_status
    posts # Return filtered posts (using attr_reader)
  end

  private

    def filter_by_title
      return if params[:title].blank?

      @posts = posts.where("LOWER(title) LIKE ?", "%#{params[:title].downcase}%")
      puts "Filtered by title"
      puts @posts.count
    end

    def filter_by_categories
      return if params[:categories].blank?

      @posts = posts.joins(:categories).where(categories: { id: params[:categories] })
      puts "Filtered by categories"
      puts @posts
    end

    def filter_by_status
      return if params[:status].blank?

      @posts = posts.where(status: params[:status])
      puts "Filtered by status"
      puts @posts
    end

    def filter_by_query
      return if params[:query].blank?

      @posts = user.posts
    end
end
