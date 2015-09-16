class AddPointsTotalToUsers < ActiveRecord::Migration
  def change
    add_column :users, :points_total, :integer
  end
end
