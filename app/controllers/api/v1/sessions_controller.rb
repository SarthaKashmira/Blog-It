# frozen_string_literal: true

class Api::V1::SessionsController < ApplicationController
  skip_before_action :authenticate_user_using_x_auth_token, only: :create
  def create
    @user = User.find_by!(email: login_params[:email].downcase)
    Rails.logger.info(@user)
    unless @user.authenticate(login_params[:password])
      render_error(t("session.incorrect_credentials"), :unauthorized)
    end
  end

  def destroy
    Rails.logger.info("Hello and bigBinary")
    @current_user = nil
  end

  private

    def login_params
      params.require(:login).permit(:email, :password)
    end
end
