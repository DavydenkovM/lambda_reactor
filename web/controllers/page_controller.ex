defmodule LambdaReactor.PageController do
  use LambdaReactor.Web, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end
end
