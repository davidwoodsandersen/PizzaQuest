class WelcomeController < ApplicationController
  # ...
  def index
  end

  def map
  end

  def leaderboard
    @users = User.all
  end
end
