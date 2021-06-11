require 'rails_helper'

RSpec.describe "Sessions", type: :request do
  describe "Post /create" do

    before do
      User.create(full_name: "jhon", email: "jhon@email.com", password: "12345678", password_confirmation: "12345678")
    end

    it "returns http success with the user attributes and a token when a existing user logs in" do
      post '/api/users/login', params: { user: { email: 'jhon@email.com', password: '12345678'}}
      data = JSON.parse(response.body)
      expect(response).to have_http_status(:success)
      expect(data["user"]["full_name"]).to eq 'jhon'
      expect(data["user"]["email"]).to eq 'jhon@email.com'
      expect(data["user"]["role"]).to eq 'NO_ADMIN'
    end

    it "return http unprocessable_entity with the validation errors when creating an invalid user" do
      post '/api/users/login', params: { user: { email: 'maria@email.com', password: '12345679' }}
      errors = JSON.parse(response.body)["errors"]
      expect(response).to have_http_status(:unprocessable_entity)
      expect(errors["email or password"]).to eq ["is invalid"]
    end

  end
end

