class AddPointsTotalToUsers < ActiveRecord::Migration
  def change
    remove_column :users, :points_total, :integer
  end
end
