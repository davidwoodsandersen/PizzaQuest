class ChangeColumnRestaurantId < ActiveRecord::Migration
  def change
    change_column :visits, :restaurant_id, :string
  end
end
