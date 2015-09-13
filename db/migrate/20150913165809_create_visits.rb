class CreateVisits < ActiveRecord::Migration
  def change
    create_table :visits do |t|
      t.string :review
      t.integer :restaurant_id


      t.timestamps null: false
    end
  end
end
