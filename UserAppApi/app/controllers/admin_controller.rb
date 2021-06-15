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
    users = User.where.not(id: current_user.id)
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

  def editUser
    user = User.find(params[:user_id])
    if user.update(user_params)
      render json: {user: user}
    else
      render json: { errors: user.errors }, status: :unprocessable_entity
    end
  end

  def recoverUser
    user = User.find(params[:user_id])
    render json: {user: user}
  end

  private
    def user_params
      params.require(:user).permit(:full_name, :email, :image)
    end

end
