class AddRestaurantNameToVisits < ActiveRecord::Migration
  def change
    add_column :visits, :restaurant_name, :string
  end
end
