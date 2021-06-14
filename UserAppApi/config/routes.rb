Rails.application.routes.draw do
  scope :api, defaults: { format: :json } do
    devise_for :users, controllers: { sessions: :sessions },
               path_names: { sign_in: :login }

    resource :user, only: [:show, :update, :destroy]
    get '/admin/totalUsersCount', to: 'admin#totalUsersCount'
    get '/admin/adminUsersCount', to: 'admin#adminUsersCount'
    get '/admin/noAdminUsersCount', to: 'admin#noAdminUsersCount'
    get '/admin/recoverUsers', to: 'admin#recoverUsers'
    put '/admin/toggleUserRole/:user_id', to: 'admin#toggleUserRole'
    delete '/admin/deleteUser/:user_id', to: 'admin#deleteUser'
  end
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
