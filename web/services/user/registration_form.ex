defmodule LambdaReactor.User.RegistrationForm  do

  alias LambdaReactor.Repo
  alias LambdaReactor.User

  def save(params, %{"user" => user_params}) do
    changeset = User.changeset(%User{}, user_params)

    case Repo.insert(changeset) do
      {:ok, user} -> 
        {:ok, jwt, _full_claims} = user |> Guardian.encode_and_sign(:token)
        {:ok, user, jwt}
      {:error, changeset} ->
        {:error, changeset}
    end
  end
end
