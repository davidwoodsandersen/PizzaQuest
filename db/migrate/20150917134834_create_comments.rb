class CreateComments < ActiveRecord::Migration
  def change
    create_table :comments do |t|
      t.string :text
      t.string :name
      t.integer :user_id

      t.timestamps null: false
    end
  end
end
