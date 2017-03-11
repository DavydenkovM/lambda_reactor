defmodule LambdaReactor.DashboardView do
  use LambdaReactor.Web, :view

  def start_link(conn) do
    {:ok, pid} =
      Agent.start_link(fn ->
        props = %{
          "location" => conn.request_path,
          "visitors" => LambdaReactor.Visitors.state()
        }

        result = LambdaReactor.ReactIO.json_call!(%{
          component: "./priv/static/server/js/DashboardEntry.js",
          props: props,
        })

        %{
          props: props,
          html: result["html"]
        }
      end)

    pid
  end

  def stop(pid) do
    Agent.stop(pid)
  end

  def html(pid) do
    Agent.get(pid, fn state -> state[:html] end)
  end

  def props(pid) do
    Agent.get(pid, fn state -> state[:props] end)
  end
end
