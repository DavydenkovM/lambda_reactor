defmodule LambdaReactor.PageController do
  use LambdaReactor.Web, :controller

  def index(conn, _params) do
    visitors = LambdaReactor.Visitors.state()
    initial_state = %{"visitors" => visitors}
    props = %{
      "location" => conn.request_path,
      "initial_state" => initial_state
    }

    result = LambdaReactor.ReactIO.json_call!(%{
      component: "./priv/static/server/js/app.js",
      props: props,
    })

    render(conn, "index.html", html: result["html"], props: initial_state)
    # render(conn, "index_client.html")
  end
end
