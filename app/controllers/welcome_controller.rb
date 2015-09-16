class WelcomeController < ApplicationController
  # ...
  def index
    @user = User.new
  end

  def map
  end

  def leaderboard
    @users = User.all
  end
end
