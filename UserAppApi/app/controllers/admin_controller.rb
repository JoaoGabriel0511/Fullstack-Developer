class AdminController < ApplicationController
  before_action :authenticate_admin!


  def totalUsersCount
    render json: {totalUsersCount: User.count}
  end

  def adminUsersCount
    render json: {adminUsersCount: User.where(role: :ADMIN).count}
  end

  def noAdminUsersCount
    render json: {adminUsersCount: User.where(role: :NO_ADMIN).count}
  end

  def recoverUsers
    users = User.all
    render json: {users: users}
  end

end
