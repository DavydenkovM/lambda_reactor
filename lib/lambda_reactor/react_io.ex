defmodule LambdaReactor.ReactIO do
  use StdJsonIo, 
    otp_app: :lambda_reactor, 
    script: "node_modules/react-stdio/bin/react-stdio"#,
    # watch_files: [Path.join(__DIR__, "../priv/js/app.js") |> Path.expand]
end
