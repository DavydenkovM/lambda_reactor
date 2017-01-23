defmodule LambdaReactor.PageControllerTest do
  use LambdaReactor.ConnCase

  test "GET /", %{conn: conn} do
    conn = get conn, "/"
    assert html_response(conn, 200) =~ "Phoenix LambdaReactor"
  end
end
