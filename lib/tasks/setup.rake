desc 'Drops the DB, creates DB, migrates DB, and populates sample data'
task setup: [:environment, 'db:drop', 'db:create', 'db:migrate'] do
  Rake::Task['populate_with_sample_data'].invoke if Rails.env.development?
end

task populate_with_sample_data: [:environment] do
  if Rails.env.production?
    puts "Skipping deleting and populating sample data in production"
  else
    create_sample_data!
    puts "Sample data has been added."
  end
end

def create_sample_data!
  puts 'Seeding with sample data...'

  organization = create_organization!(name: 'Tech Corp')
  create_organization!(name: 'BigBinary Corporation')
  puts "Created Organization: #{organization.name}"

  create_user!(email: 'oliver@example.com', name: 'Oliver', organization: organization)
  create_user!(email: 'sam@example.com', name: 'Sam', organization: organization)

  puts 'Done! Now you can login with either "oliver@example.com" or "sam@example.com", using password "welcome"'
end

def create_organization!(options = {})
  Organization.create!(options)
end

def create_user!(options = {})
  user_attributes = { password: 'welcome', password_confirmation: 'welcome' }
  attributes = user_attributes.merge(options)
  User.create!(attributes)
end
