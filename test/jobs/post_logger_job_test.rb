# frozen_string_literal: true

require "test_helper"
require "sidekiq/testing"
class PostLoggerJobTest < ActiveSupport::TestCase
  def test_logger_runs_once_after_creating_a_task
    Sidekiq::Testing.fake! do
      assert_difference -> { TaskLoggerJob.jobs.size }, 1 do
        TaskLoggerJob.perform_async(@task.id)
      end
    end
  end
end
