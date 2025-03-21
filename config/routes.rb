# frozen_string_literal: true

Rails.application.routes.draw do
  constraints(lambda { |req| req.format == :json }) do
    namespace :api do
      namespace :v1 do
        resources :posts, only: %i[index create show update destroy], param: :slug do
          resource :report, only: %i[create], module: :posts do
            get :download, on: :collection
          end
          collection do
            delete :bulk_delete
            patch :bulk_update
          end
          member do
            post :vote
          end
        end
        resources :categories, only: %i[index create ]
        resources :users, only: %i[create]
        resource :sessions, only: %i[create destroy]
      end
    end
  end
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Defines the root path route ("/")
  # root "posts#index"
  root "home#index"
  get "*path", to: "home#index", via: :all
end
