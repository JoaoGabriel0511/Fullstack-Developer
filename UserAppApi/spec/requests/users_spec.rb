require 'rails_helper'

RSpec.describe "Users", type: :request do

  before do
    post '/api/users', params: { user: { full_name: 'jhon', email: 'jhon@email.com', password: '12345678', password_confirmation: '12345678' }}
    @token = JSON.parse(response.body)["user"]["token"]
  end

  describe "Put /edit" do

    it "returns a http susses with the updated user attributes when updating an existing user with valid data" do
      put '/api/user', params: { user: { full_name: 'joe', email: 'joe@email.com'}}, headers: {"Authorization"  => "Token " + @token}
      data = JSON.parse(response.body)
      user = User.find(data["user"]["id"])
      expect(data["user"]["full_name"]).to eq("joe")
      expect(user.full_name).to eq("joe")
      expect(data["user"]["email"]).to eq("joe@email.com")
      expect(user.email).to eq("joe@email.com")
    end

    it "returns a http unprocessable_entity with the validation errors when updating the user with invalid data" do
      put '/api/user', params: { user: { full_name: 'joe', email: 'joeemail.com'}}, headers: {"Authorization"  => "Token " + @token}
      errors = JSON.parse(response.body)["errors"]
      expect(response).to have_http_status(:unprocessable_entity)
      expect(errors["email"]).to eq ["is invalid"]
    end

    it "returns a http unauthorized when the user is not authenticated" do
      put '/api/user', params: { user: { full_name: 'joe', email: 'joeemail.com'}}
      expect(response).to have_http_status(401)
    end

  end

  describe "Get /show" do
    it "should recover the current user" do
      get '/api/user', headers: {"Authorization"  => "Token " + @token}
      data = JSON.parse(response.body)
      expect(data["user"]["full_name"]).to eq("jhon")
      expect(data["user"]["email"]).to eq("jhon@email.com")
    end

    it "returns a http unauthorized when the user is not authenticated" do
      get '/api/user'
      expect(response).to have_http_status(401)
    end
  end

  describe "Delete /destroy" do

    it "delete a user" do
      delete '/api/user', headers: {"Authorization"  => "Token " + @token}
      data = JSON.parse(response.body)
      expect(data["user"]["full_name"]).to eq("jhon")
      expect(data["user"]["email"]).to eq("jhon@email.com")
      expect{User.find(data["user"]["id"])}.to raise_error(ActiveRecord::RecordNotFound)
    end

    it "returns a http unauthorized when the user is not authenticated" do
      delete '/api/user'
      expect(response).to have_http_status(401)
    end

  end
end
