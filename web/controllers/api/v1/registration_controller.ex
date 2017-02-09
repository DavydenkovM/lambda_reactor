defmodule LambdaReactor.RegistrationController  do
  use LambdaReactor.Web, :controller

  alias LambdaReactor.Repo
  alias LambdaReactor.User
  alias LambdaReactor.User.RegistrationForm

  plug :scrub_params, "user" when action in [:create]

  def create(conn, params) do
    case RegistrationForm.save(params) do
      {:ok, user, jwt} ->
        conn
        |> put_status(:created)
        |> render(LambdaReactor.SessionView, "show.json", jwt: jwt, user: user)

      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render("error.json", changeset: changeset)
    end
  end
end
