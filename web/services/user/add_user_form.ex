defmodule LambdaReactor.User.AddUserForm do
  alias LambdaReactor.{
    Repo,
    User
  }

  def save(%{"user" => user_params}) do
    changeset = User.changeset(%User{}, user_params)

    Repo.insert(changeset)
  end
end
