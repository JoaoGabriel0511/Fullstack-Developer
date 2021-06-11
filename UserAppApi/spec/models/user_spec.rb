require 'rails_helper'

RSpec.describe User, type: :model do

  it "is valid with valid attributes" do
    expect(User.new(full_name: "jhon", email: "jhon@email.com", password: "12345678", password_confirmation: "12345678")).to be_valid
  end

  it "is not valid without a full_name" do
    expect(User.new(email: "jhon@email.com", password: "12345678", password_confirmation: "12345678")).to_not be_valid
  end

  it "is not valid with invalid email" do
    expect(User.new(full_name: "jhon", email: "jhonemail.com", password: "12345678", password_confirmation: "12345678")).to_not be_valid
    expect(User.new(full_name: "jhon", password: "12345678", password_confirmation: "12345678")).to_not be_valid
  end

  it "is not valid without unique email" do
    User.create(full_name: "jhon", email: "jhon@email.com", password: "12345678", password_confirmation: "12345678")
    expect(User.new(full_name: "joe", email: "jhon@email.com", password: "12345678", password_confirmation: "12345678")).to_not be_valid
  end

  it "is not valid with invalid password" do
    expect(User.new(full_name: "jhon", email: "jhon@email.com")).to_not be_valid
    expect(User.new(full_name: "jhon", email: "jhon@email.com", password: "123", password_confirmation: "123")).to_not be_valid
    expect(User.new(full_name: "jhon", email: "jhon@email.com", password: "12345679", password_confirmation: "12345678")).to_not be_valid
  end

  it "has NO_ADMIN as its default value"  do
    user = User.new(full_name: "jhon", email: "jhon@email.com", password: "12345678", password_confirmation: "12345678")
    expect(user.NO_ADMIN?).to eq(true)
  end

end
