class UsersController < ApplicationController

    include SessionsHelper

#users POST /users(.:format) users#create
    def create
        User.create(user_params)
        redirect_to log_in_path
    end


#new_user GET /users/new(.:format) users#new
    def new
        @user = User.new
    end

    # get '/users/profile' => 'users#profile', as: :profile
    def profile
        authenticate!
        @user = current_user

    end




    # get '/users/log_in' => 'users#log_in', as: :log_in
    def log_in
    end


    private

    def user_params
        params.require(:user).permit(:username, :password)
    end



end
