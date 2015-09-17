class UsersController < ApplicationController

    include SessionsHelper

# #this will be removed, it's just for demo
#     def demo
#         binding.pry
#     end


    def show
      @users = User.all
      @user = User.find(params[:id])
      @user_points = @user.visits.length * 100
      respond_to do |format|
        format.html # show.html.erb
        format.json { render json: @user }
      end
    end


#users POST /users(.:format) users#create
    def create
        User.create(user_params)
        redirect_to log_in_path
    end


#new_user GET /users/new(.:format) users#new
    def new
        @user = User.new
    end


    def dashboard
        authenticate!
        @user = current_user
        @user_points = @user.visits.length * 100
        @users = User.all
    end

    # get '/users/profile' => 'users#profile', as: :profile
    def profile
        authenticate!

        @user = current_user
        @user_points = @user.visits.length * 100
        @users = User.all
    end

    # get '/users/log_in' => 'users#log_in', as: :log_in
    def log_in
    end


    # edit_user GET    /users/:id/edit(.:format)  users#edit
    def edit
        authenticate!
        @user = current_user
        # @user = User.find(params[:id])
        @user_points = @user.visits.length * 100
        @users = User.all
    end

    #           PATCH  /users/:id(.:format)       users#update
    #           PUT    /users/:id(.:format)       users#update
    def update
        user = User.find(params[:id])
        user.update(user_params)
        redirect_to "/users/profile"
        # redirect_to user_path(user)
    end




    private

    def user_params
        params.require(:user).permit(:username, :password, :image, :tagline)
    end



end
