class ChangeUsernameColumnName < ActiveRecord::Migration[6.1]
  def change
    rename_column :users, :username, :full_name
  end
end
