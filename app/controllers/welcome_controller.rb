class WelcomeController < ApplicationController
  # ...

  include SessionsHelper

  def index
    @user = User.new
  end

  def map
  end

  def leaderboard
    @users = User.all
    @user = current_user
  end
end
