defmodule LambdaReactor.Admin.UserController do
  use LambdaReactor.Web, :controller

  plug Guardian.Plug.EnsureAuthenticated, handler: LambdaReactor.SessionController
  plug :scrub_params, "user" when action in [:create, :update]

  alias LambdaReactor.{
    AddUserForm,
    User
  }
  def create(conn, params) do
    case AddUserForm.save(params) do
      {:ok, _User} ->
        conn
        |> put_status(:ok)
        |> render("index.json", status: :ok)
      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render("error.json", changeset: changeset)
    end
  end

  def index(conn, _params) do
    users = Repo.all(User)
    render(conn, "index.json", users: users)
  end

  def show(conn, %{"id" => id}) do
    user = Repo.get!(User, id)
    render(conn, "show.json", user: user)
  end

  def update(conn, %{"id" => id, "user" => user_params}) do
    user = Repo.get!(User, id)
    changeset = User.changeset(User, user_params)

    case Repo.update(changeset) do
      {:ok, _User} ->
        conn
        |> put_flash(:info, "User updated successfully.")
        |> render("index.json", status: :ok)
      {:error, changeset} ->
        render(conn, "edit.html", user: user, changeset: changeset)
    end
  end

  def delete(conn, %{"id" => id}) do
    User = Repo.get!(User, id)

    Repo.delete!(User)

    conn
    |> put_flash(:info, "User deleted successfully.")
    |> render("index.json", status: :ok)
  end
end
