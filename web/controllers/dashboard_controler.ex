defmodule LambdaReactor.DashboardController do
  use LambdaReactor.Web, :controller

  def index(conn, _params) do
    state_pid = LambdaReactor.DashboardView.start_link(conn)

    render(conn, "index.html", %{conn: conn, state_pid: state_pid})
    # render(conn, "index_client.html")
  end
end
