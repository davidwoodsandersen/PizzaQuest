class UsersController < ApplicationController

    include SessionsHelper

# #this will be removed, it's just for demo
#     def demo
#         binding.pry
#     end


    def show
      @user = User.find(params[:id])
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
    end

    # get '/users/profile' => 'users#profile', as: :profile
    def profile
        authenticate!
        @user = current_user
    end

    # get '/users/log_in' => 'users#log_in', as: :log_in
    def log_in
    end

    #update user profile info





    private

    def user_params
        params.require(:user).permit(:username, :password, :image, :tagline)
    end



end
