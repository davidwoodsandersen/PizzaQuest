class Api::VisitsController < ApplicationController



 #    api_visits GET    /api/visits(.:format)     api/visits#index
 def index
    #  if env['HTTP_TOKEN']
     user = User.find_by({token: env['HTTP_TOKEN']})
     render json: user.visits
 end



 #           POST   /api/visits(.:format)     api/visits#create
 def create

      user = User.find_by({token: env['HTTP_TOKEN']})

     visit = user.visits.create(visit_params)
     puts visit
     render json: visit
 end


 # api_visit GET    /api/visits/:id(.:format) api/visits#show
 def show
     user = User.find_by({token: env['HTTP_TOKEN']})
     render json: user.visits.find(params[:id])
 end

 #           PATCH  /api/visits/:id(.:format) api/visits#update
 #           PUT    /api/visits/:id(.:format) api/visits#update
 def update
     user = User.find_by({token: env['HTTP_TOKEN']})
     visit = user.visits.find(params[:id])
     visit.update(visit_params)
     render json: visit
 end



 #           DELETE /api/visits/:id(.:format) api/visits#destroy
 def destroy
     user = User.find_by({token: env['HTTP_TOKEN']})
     user.visits.destroy(params[:id])
     render json: {status: 202, message: 'visit deleted'}
 end
 #
 # def post
 # end

 private

 def visit_params

     params.require(:visit).permit(:review, :restaurant_name, :restaurant_id)

 end

 # def params
 #   params.require(:visit).permit(:review)
 # end

end
