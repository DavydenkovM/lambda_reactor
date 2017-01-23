use Mix.Config

# We don't run a server during test. If one is required,
# you can enable the server option below.
config :lambda_reactor, LambdaReactor.Endpoint,
  http: [port: 4001],
  server: false

# Print only warnings and errors during test
config :logger, level: :warn

# Configure your database
config :lambda_reactor, LambdaReactor.Repo,
  adapter: Ecto.Adapters.Postgres,
  username: "postgres",
  password: "",
  database: "lambda_reactor_prod",
  hostname: "localhost",
  pool: Ecto.Adapters.SQL.Sandbox
