class User < ApplicationRecord
  has_secure_password
  has_many :linked_accounts
  
  validates :username , presence: true , uniqueness: {case_sensititve: false} , format: {with: /[a-zA-Z0-9_-]/ , message: "may include alphanumeric characters , dashes - , and underscores _"} , length: {maximum: 40 , too_long: "40 characters is the maximum allowed"}
  validates :password, confirmation: true, presence: true , on: :create
  validates :password_confirmation , presence: true , on: :create
  validates :email ,presence: true , uniqueness: {message: "is connected to an existing account"} , format: {with: /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\z/i , message: "may only include alphanumeric characters or @"}
  validates :full_name , presence: true , format: {with: /[a-zA-Z]+\s[a-zA-Z]/ , message: "may only include alphabetic characters , separated by one space"}, on: [:create , :update]
end
