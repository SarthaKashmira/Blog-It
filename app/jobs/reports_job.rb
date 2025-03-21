# frozen_string_literal: true

class ReportsJob
  include Sidekiq::Job

  def perform(post_slug, report_path)
    post = Post.find_by!(slug: post_slug) # Fetch the post using post_id

    content = ApplicationController.render(
      assigns: {
        post: post
      },
      template: "posts/report/download",
      layout: "pdf"
    )

    pdf_blob = WickedPdf.new.pdf_from_string(content)
    if post.report.attached?
      post.report.purge_later
    end
    post.report.attach(
      io: StringIO.new(pdf_blob), filename: "report.pdf",
      content_type: "application/pdf"
    )
    post.save!
    # FileUtils.mkdir_p(File.dirname(report_path)) unless File.directory?(File.dirname(report_path))
    # File.open(report_path, "wb") do |f|
    #   f.write(pdf_blob)
    # end
  end
end
