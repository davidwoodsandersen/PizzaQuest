Rails.application.routes.draw do


#this will be removed, it's just part of the exercise
  # get '/users/demo' => "users#demo"

  namespace :api do
      resources :visits, except: [:new, :edit]
      resources :comments, except: [:new, :edit]
  end

  get '/users/dashboard' => 'users#dashboard', as: :dashboard
  get '/users/profile' => 'users#profile', as: :profile
  get '/users/log_in' => 'users#log_in', as: :log_in
  resources :users, only: [:new, :create, :show, :edit, :update]


  post '/sessions' => 'sessions#create'
  delete '/sessions' => 'sessions#destroy'

  # resources :sessions, only: [:create, :destroy]
                              #Log In   #Log out


  get 'welcome/index'


  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  root 'welcome#index'
  # post '/search' => 'welcome#search'


  get '/map' => 'welcome#map'
  get '/leaderboard' => 'welcome#leaderboard'
  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
