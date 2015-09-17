class Api::CommentsController < ApplicationController

  #    api_comments GET    /api/comments(.:format)     api/comments#index
  def index
     #  if env['HTTP_TOKEN']
      user = User.find_by({token: env['HTTP_TOKEN']})
      render json: user.comments
  end



  #           POST   /api/comments(.:format)     api/comments#create
  def create
      user = User.find_by({token: env['HTTP_TOKEN']})
      comment = user.comments.create(comment_params)
      puts comment
      render json: comment
  end


  # api_comment GET    /api/comments/:id(.:format) api/comments#show
  def show
      user = User.find_by({token: env['HTTP_TOKEN']})
      render json: user.comments.find(params[:id])
  end

  #           PATCH  /api/comments/:id(.:format) api/comments#update
  #           PUT    /api/comments/:id(.:format) api/comments#update
  def update
      user = User.find_by({token: env['HTTP_TOKEN']})
      comment = user.comments.find(params[:id])
      comment.update(comment_params)
      render json: comment
  end



  #           DELETE /api/comments/:id(.:format) api/comments#destroy
  def destroy
      user = User.find_by({token: env['HTTP_TOKEN']})
      user.comments.destroy(params[:id])
      render json: {status: 202, message: 'comment deleted'}
  end
  #
  # def post
  # end

  private

  def comment_params

      params.require(:comment).permit(:text, :name, :user_id)

  end

  # def params
  #   params.require(:comment).permit(:review)
  # end


end
