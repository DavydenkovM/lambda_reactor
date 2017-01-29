defmodule LambdaReactor.Router do
  use LambdaReactor.Web, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/", LambdaReactor do
    pipe_through :browser # Use the default browser stack

    get "/*path", PageController, :index
  end

  scope "/admin", LambdaReactor.Admin, as: :admin do
    pipe_through :browser # Use the default browser stack

    get "/*path", PageController, :index
  end

  scope "/api", LambdaReactor.Api, as: :api do
    pipe_through :api

    # resources "/products", ProductController, only: [:create, :index, :update, :show, :delete]
  end
end
