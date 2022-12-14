class PlaidController < ApplicationController
  configuration = Plaid::Configuration.new
  configuration.server_index = Plaid::Configuration::Environment["sandbox"]
  configuration.api_key['PLAID-CLIENT-ID'] = Rails.application.credentials.dig(:plaid, :client_id) 
  configuration.api_key['PLAID-SECRET'] = Rails.application.credentials.dig(:plaid, :sandbox_secret)
  
  api_client = Plaid::ApiClient.new(
    configuration
  )
  
  @@client = Plaid::PlaidApi.new(api_client)
  
  def create
    if current_user 
      client_user_id = current_user.id
      request = Plaid::LinkTokenCreateRequest.new(
        {
          user: { client_user_id: current_user.id.to_s },
          client_name: 'Spend Better',
          products: ['auth', 'transactions'],
          country_codes: ['US'],
          language: "en",
          redirect_uri: PLAID_REDIRECT_URI
        }
      )  
      response = @@client.link_token_create(request)
      render json: response, status: :ok
    else 
      render json: {errors: ["Unable to generate token. Please try again."]}, status: :unprocessable_entity
    end
  end

  def exchange
    if current_user 
      request = Plaid::ItemPublicTokenExchangeRequest.new(
        {
          public_token: params["public_token"]
        }
      )
      response = @@client.item_public_token_exchange(request)
      byebug
      
      current_user.linked_accounts.create!({
        # institution, token, balance if possible, name
        token: response.access_token,
        unique_item: response.item_id ,
        institution: params["metadata"]["institution"]["name"]
        })
      # create an account in institution_accounts model for each account associated with the linked institution 
      params["metadata"]["accounts"].map do |account|
      end
      
      render json: {success: "Account Connected Successfully" , institution: params["metadata"]["institution"]["name"], name: name.join("/")}, status: :ok
    else 
      render json: {errors: ["Unable to exchange and save token. Please try again."]}, status: :unprocessable_entity
    end
  end

end
