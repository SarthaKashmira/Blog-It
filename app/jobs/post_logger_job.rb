# frozen_string_literal: true

class PostLoggerJob
  include Sidekiq::Job
  def perform
    puts "PostLoggerJob is performed"
  end
end
