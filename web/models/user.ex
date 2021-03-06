defmodule LambdaReactor.User do
  use LambdaReactor.Web, :model

  schema "users" do
    field :email, :string
    field :first_name, :string
    field :last_name, :string
    field :encrypted_password, :string
    field :password, :string, virtual: true
    field :profile_id, :integer

    timestamps()
  end

  @required_fields [:first_name, :last_name, :email, :password]
  @optional_fields [:encrypted_password, :profile_id]

  # @example
  #
  # changeset = LambdaReactor.User.changeset(%LambdaReactor.User{}, %{first_name: "qwe", last_name: "wwwQQQ", email: "test@test.ru", password: "123123", password_confirmation: "123123", profile_id: 1})
  def changeset(model, params \\ :empty) do
    model
    |> cast(params, @required_fields ++ @optional_fields)
    |> validate_required(@required_fields, @optional_fields)
    |> validate_format(:email, ~r/@/)
    |> validate_length(:password, min: 5)
    |> validate_confirmation(:password, message: "Password does not match")
    |> unique_constraint(:email, message: "Email already taken")
    |> generate_encrypted_password
  end

  defp generate_encrypted_password(current_changeset) do
    case current_changeset do
      %Ecto.Changeset{valid?: true, changes: %{password: password}} ->
        put_change(current_changeset, :encrypted_password, Comeonin.Bcrypt.hashpwsalt(password))
      _ ->
        current_changeset
    end
  end
end
