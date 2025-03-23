desc 'Drops the DB, creates DB, migrates DB, and populates sample data'
task setup: [:environment] do
  if Rails.env.production?
    puts "Skipping db:drop and db:create in production"
    Rake::Task['db:migrate'].invoke  # Just migrate the database
  else
    Rake::Task['db:drop'].invoke
    Rake::Task['db:create'].invoke
    Rake::Task['db:migrate'].invoke
  end

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

  create_organization!(name: 'Tech Corp')
  create_organization!(name: 'BigBinary Corporation')
  create_organization!(name: 'Awesome Inc')
  
end

def create_organization!(options = {})
  Organization.create!(options)
end
