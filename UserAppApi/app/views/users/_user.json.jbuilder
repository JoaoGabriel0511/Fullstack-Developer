json.(user, :id, :email, :full_name, :role)
json.token user.generate_jwt