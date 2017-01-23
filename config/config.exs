# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.
use Mix.Config

# Configures the endpoint
config :lambda_reactor, LambdaReactor.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "loizpZq8Y5KQ0Jarltfs/CC2KayDdDUnkORWMVA+CQVnXl3utV+3roKuYIF56Zsu",
  render_errors: [view: LambdaReactor.ErrorView, accepts: ~w(html json)],
  pubsub: [name: LambdaReactor.PubSub,
           adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env}.exs"

# Configure phoenix generators
config :phoenix, :generators,
  migration: true,
  binary_id: false

# Configure guardian
config :guardian, Guardian,
  issuer: "LambdaReactor",
  ttl: { 3, :days  },
  verify_issuer: true,
  serializer: LambdaReactor.GuardianSerializer
