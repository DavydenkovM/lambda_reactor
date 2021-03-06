defmodule LambdaReactor.Mixfile do
  use Mix.Project

  def project do
    [app: :lambda_reactor,
     version: "1.1.0",
     elixir: "~> 1.3",
     elixirc_paths: elixirc_paths(Mix.env),
     compilers: [:phoenix, :gettext] ++ Mix.compilers,
     build_embedded: Mix.env == :prod,
     start_permanent: Mix.env == :prod,
     aliases: aliases(),
     deps: deps()]
  end

  # Configuration for the OTP application.
  #
  # Type `mix help compile.app` for more information.
  def application do
    [mod: {LambdaReactor, []},
     applications: [
       :phoenix,
       :phoenix_pubsub,
       :phoenix_html,
       :cowboy,
       :logger,
       :gettext,
       :ecto,
       :postgrex,
       :phoenix_ecto,
       :std_json_io,
       :comeonin
     ]]
  end

  # Specifies which paths to compile per environment.
  defp elixirc_paths(:test), do: ["lib", "web", "test/support"]
  defp elixirc_paths(_),     do: ["lib", "web"]

  # Specifies your project dependencies.
  #
  # Type `mix help deps` for examples and options.
  defp deps do
    [
     {:comeonin, "~> 3.0"},
     {:cowboy, "~> 1.1.2", override: true},
     {:credo, "~> 0.5", only: [:dev, :test]},
     {:distillery, "~> 1.0"},
     {:ecto, "~> 2.1.0"},
     {:gettext, "~> 0.11"},
     {:guardian, "~> 0.13.0"},
     {:phoenix, "~> 1.2.1"},
     {:phoenix_ecto, "~> 3.2.1"},
     {:phoenix_html, "~> 2.6"},
     {:phoenix_live_reload, "~> 1.0", only: :dev},
     {:phoenix_pubsub, "~> 1.0"},
     {:postgrex, "~> 0.13.0", override: true},
     {:poison, "~> 3.0.0", override: true},
     {:std_json_io, "~> 0.1.0"},
     {:quick_alias, "~> 0.1.0", only: :dev}
   ]
  end

  # Aliases are shortcut or tasks specific to the current project.
  # For example, to create, migrate and run the seeds file at once:
  #
  #     $ mix ecto.setup
  #
  # See the documentation for `Mix` for more info on aliases.
  defp aliases do
    ["ecto.setup": ["ecto.create", "ecto.migrate", "run priv/repo/seeds.exs"],
     "ecto.reset": ["ecto.drop", "ecto.setup"]]
  end
end
