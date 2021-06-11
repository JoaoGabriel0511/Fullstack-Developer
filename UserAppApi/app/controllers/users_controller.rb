class UsersController < ApplicationController
  before_action :authenticate_user!

  def show
  end

  def update
    if current_user.update(user_params)
      render :show
    else
      render json: { errors: current_user.errors }, status: :unprocessable_entity
    end
  end

  def destroy
    current_user.destroy
    render :show
  end

  private
    def user_params
      params.require(:user).permit(:full_name, :email, :password, :role)
    end
end