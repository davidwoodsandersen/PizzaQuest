class AddPointsTotalToUsers < ActiveRecord::Migration
  def change
      change_column :users, :points_total, :integer
  end
end
