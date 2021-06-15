require 'rails_helper'

RSpec.describe "Admins", type: :request do

  before do
    @user1 = User.create(full_name: "jhon", email: "jhon@email.com", password: "12345678", password_confirmation: "12345678")
    @user2 = User.create(full_name: "joe", email: "joe@email.com", password: "12345678", password_confirmation: "12345678")
    @user3 = User.create(full_name: "mary", email: "mary@email.com", password: "12345678", password_confirmation: "12345678", role: :ADMIN)
    post '/api/users/login', params: { user: { email: 'mary@email.com', password: '12345678'}}
    @adminToken = JSON.parse(response.body)["user"]["token"]
    post '/api/users/login', params: { user: { email: 'jhon@email.com', password: '12345678'}}
    @noAdminToken = JSON.parse(response.body)["user"]["token"]
  end

  describe "GET /totalUsersCount" do

    it "should return the total number of user when current user is an admin" do
      get '/api/admin/totalUsersCount', headers: {"Authorization"  => "Token " + @adminToken}
      data = JSON.parse(response.body)
      expect(data["totalUsersCount"]).to eq(3)
    end

    it "should return http unauthorized when user is not admin" do
      get '/api/admin/totalUsersCount', headers: {"Authorization"  => "Token " + @noAdminToken}
      expect(response).to have_http_status(401)
    end

    it "should return http unauthorized when user is not authenticated" do
      get '/api/admin/totalUsersCount'
      expect(response).to have_http_status(401)
    end

  end

  describe "GET /adminUsersCount" do

    it "should return the number of admin user when current user is an admin" do
      get '/api/admin/adminUsersCount', headers: {"Authorization"  => "Token " + @adminToken}
      data = JSON.parse(response.body)
      expect(data["adminUsersCount"]).to eq(1)
    end

    it "should return http unauthorized when user is not admin" do
      get '/api/admin/totalUsersCount', headers: {"Authorization"  => "Token " + @noAdminToken}
      expect(response).to have_http_status(401)
    end

    it "should return http unauthorized when user is not authenticated" do
      get '/api/admin/adminUsersCount'
      expect(response).to have_http_status(401)
    end

  end

  describe "GET /noAdminUsersCount" do

    it "should return the total number of user when current user is an admin" do
      get '/api/admin/noAdminUsersCount', headers: {"Authorization"  => "Token " + @adminToken}
      data = JSON.parse(response.body)
      expect(data["noAdminUsersCount"]).to eq(2)
    end

    it "should return http unauthorized when user is not admin" do
      get '/api/admin/noAdminUsersCount', headers: {"Authorization"  => "Token " + @noAdminToken}
      expect(response).to have_http_status(401)
    end

    it "should return http unauthorized when user is not authenticated" do
      get '/api/admin/noAdminUsersCount'
      expect(response).to have_http_status(401)
    end

  end

  describe "GET /recoverUsers" do

    it "should return all of the other users when current user is an admin" do
      get '/api/admin/recoverUsers', headers: {"Authorization"  => "Token " + @adminToken}
      data = JSON.parse(response.body)
      expect(data["users"]).to have_attributes(size: 2)
      expect(data["users"].map{|it| it["id"]}).to contain_exactly(@user1.id, @user2.id)
    end

    it "should return http unauthorized when user is not admin" do
      get '/api/admin/recoverUsers', headers: {"Authorization"  => "Token " + @noAdminToken}
      expect(response).to have_http_status(401)
    end

    it "should return http unauthorized when user is not authenticated" do
      get '/api/admin/recoverUsers'
      expect(response).to have_http_status(401)
    end

  end

  describe "PUT /toggleUserRole" do

    it 'should toggle an user role when the current user is an admin' do
      put '/api/admin/toggleUserRole/' + @user1.id.to_s, headers: {"Authorization"  => "Token " + @adminToken}
      expect(response).to have_http_status(204)
      user = User.find(@user1.id)
      expect(user.ADMIN?).to be_truthy
    end

    it "should return http unauthorized when user is not admin" do
      put '/api/admin/toggleUserRole/' + @user1.id.to_s, headers: {"Authorization"  => "Token " + @noAdminToken}
      expect(response).to have_http_status(401)
    end

    it "should return http unauthorized when user is not authenticated" do
      put '/api/admin/toggleUserRole/' + @user1.id.to_s
      expect(response).to have_http_status(401)
    end

  end

  describe "DELETE /deleteUser" do

    it 'should delete an user role when the current user is an admin' do
      delete '/api/admin/deleteUser/' + @user1.id.to_s, headers: {"Authorization"  => "Token " + @adminToken}
      expect(response).to have_http_status(200)
      expect{User.find(@user1.id)}.to raise_error(ActiveRecord::RecordNotFound)
    end

    it "should return http unauthorized when user is not admin" do
      delete '/api/admin/deleteUser/' + @user1.id.to_s, headers: {"Authorization"  => "Token " + @noAdminToken}
      expect(response).to have_http_status(401)
    end

    it "should return http unauthorized when user is not authenticated" do
      delete '/api/admin/deleteUser/' + @user1.id.to_s
      expect(response).to have_http_status(401)
    end

  end

  describe "PUT /editUser" do

    it 'should edit an user role when the current user is an admin' do
      put '/api/admin/editUser/' + @user1.id.to_s, params: { user: { full_name: 'judy', email: 'judy@email.com', role: :ADMIN}}, headers: {"Authorization"  => "Token " + @adminToken}
      expect(response).to have_http_status(200)
      data = JSON.parse(response.body)
      user = User.find(@user1.id)
      expect(data["user"]["full_name"]).to eq("judy")
      expect(user.full_name).to eq("judy")
      expect(data["user"]["email"]).to eq("judy@email.com")
      expect(user.email).to eq("judy@email.com")
      expect(data["user"]["role"]).to eq("ADMIN")
      expect(user.role).to eq("ADMIN")
    end

    it "returns a http unprocessable_entity with the validation errors when updating the user with invalid data" do
      put '/api/admin/editUser/' + @user1.id.to_s, params: { user: { full_name: 'judy', email: 'joe@email.com'}}, headers: {"Authorization"  => "Token " + @adminToken}
      expect(response).to have_http_status(:unprocessable_entity)
      errors = JSON.parse(response.body)["errors"]
      expect(errors["email"]).to eq ["has already been taken"]
    end

    it "should return http unauthorized when user is not admin" do
      put '/api/admin/editUser/' + @user1.id.to_s, params: { user: { full_name: 'judy', email: 'judy@email.com', role: :ADMIN}}, headers: {"Authorization"  => "Token " + @noAdminToken}
      expect(response).to have_http_status(401)
    end

    it "should return http unauthorized when user is not authenticated" do
      put '/api/admin/editUser/' + @user1.id.to_s, params: { user: { full_name: 'judy', email: 'judy@email.com', role: :ADMIN}}
      expect(response).to have_http_status(401)
    end

  end

  describe "GET /recoverUser" do

    it 'should recover an user role when the current user is an admin' do
      get '/api/admin/recoverUser/' + @user1.id.to_s, headers: {"Authorization"  => "Token " + @adminToken}
      expect(response).to have_http_status(200)
      data = JSON.parse(response.body)
      expect(data["user"]["full_name"]).to eq(@user1.full_name)
      expect(data["user"]["email"]).to eq(@user1.email)
      expect(data["user"]["role"]).to eq(@user1.role)
    end

    it "should return http unauthorized when user is not admin" do
      get '/api/admin/recoverUser/' + @user1.id.to_s, params: { user: { full_name: 'judy', email: 'judy@email.com', role: :ADMIN}}, headers: {"Authorization"  => "Token " + @noAdminToken}
      expect(response).to have_http_status(401)
    end

    it "should return http unauthorized when user is not authenticated" do
      get '/api/admin/recoverUser/' + @user1.id.to_s, params: { user: { full_name: 'judy', email: 'judy@email.com', role: :ADMIN}}
      expect(response).to have_http_status(401)
    end

  end
end
