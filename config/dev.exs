use Mix.Config

# For development, we disable any cache and enable
# debugging and code reloading.
#
# The watchers configuration can be used to run external
# watchers to your application. For example, we use it
# with brunch.io to recompile .js and .css sources.

webpack = fn(name) ->
  {"node", [
    "node_modules/webpack/bin/webpack.js",
    "--watch-stdin",
    "--env.dev",
    "--hot",
    "--colors",
    "--config",
    "webpack.#{name}.config.js",
    cd: Path.expand("../client", __DIR__)
  ]}
end

config :lambda_reactor, LambdaReactor.Endpoint,
  http: [port: 4000],
  debug_errors: true,
  code_reloader: true,
  cache_static_lookup: false,
  check_origin: false,
  watchers: ["app", "app.server"] |> Enum.map(&(webpack.(&1)))

# Watch static and templates for browser reloading.
config :lambda_reactor, LambdaReactor.Endpoint,
  live_reload: [
    patterns: [
      ~r{priv/static/.*(js|css|png|jpeg|jpg|gif|svg)$},
      ~r{priv/gettext/.*(po)$},
      ~r{web/views/.*(ex)$},
      ~r{web/templates/.*(eex)$}
    ]
  ]

# Do not include metadata nor timestamps in development logs
config :logger, :console, format: "[$level] $message\n"

# Set a higher stacktrace during development. Avoid configuring such
# in production as building large stacktraces may be expensive.
config :phoenix, :stacktrace_depth, 20

# configure database
config :lambda_reactor, ecto_repos: [LambdaReactor.Repo]

config :lambda_reactor, LambdaReactor.Repo,
  adapter: Ecto.Adapters.Postgres,
  username: "lambda_reactor",
  password: "lambda_reactor",
  database: "lambda_reactor_dev",
  hostname: "localhost",
  pool_size: 10

# Guardian configuration
config :guardian, Guardian,
  secret_key: "W9cDv9fjPtsYv2gItOcFb5PzmRzqGkrOsJGmby0KpBOlHJIlhxMKFmIlcCG9PVFQ"
