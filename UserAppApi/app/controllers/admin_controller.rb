class AdminController < ApplicationController
  before_action :authenticate_admin!


  def totalUsersCount
    render json: {totalUsersCount: User.count}
  end

  def adminUsersCount
    render json: {adminUsersCount: User.where(role: :ADMIN).count}
  end

  def noAdminUsersCount
    render json: {noAdminUsersCount: User.where(role: :NO_ADMIN).count}
  end

  def recoverUsers
    users = User.all
    render json: {users: users}
  end

  def toggleUserRole
    user = User.find(params[:user_id])
    if(user.ADMIN?)
      user.role = :NO_ADMIN
    else
      user.role = :ADMIN
    end
    user.save
  end

  def deleteUser
    user = User.find(params[:user_id])
    user.destroy
    render json: {user: user}
  end

end
