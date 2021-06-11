require 'rails_helper'

RSpec.describe "Users", type: :request do

  before do
    User.create(full_name: "jhon", email: "jhon@email.com", password: "12345678", password_confirmation: "12345678")
  end

  describe "Put /edit" do

    #it "returns a http susses with the updated user attributes when updating an existing user with valid data" do
    #  put '/api/users', params: { user: { full_name: 'joe', email: 'joe@email.com'}}, headers: {"Authorization"  => "Token " + "3245678yuhjnbvcf"}
    #  data = JSON.parse(response.body)
    #  user = User.find(data["user"]["id"])
    #  expect(data["user"]["full_name"]).to eq("joe")
    #  expect(user.full_name).to eq("joe")
    #  expect(data["user"]["email"]).to eq("joe@email.com")
    #  expect(user.email).to eq("joe@email.com")
    #end

  end

  describe "Get /show" do

  end
end
