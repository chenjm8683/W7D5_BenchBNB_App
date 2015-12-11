Rails.application.routes.draw do
  namespace :api do
    resources :benches, only: [:index, :create]
  end
end
