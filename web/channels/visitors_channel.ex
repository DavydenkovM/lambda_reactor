defmodule LambdaReactor.VisitorsChannel do
  use LambdaReactor.Web, :channel

  def join("visitors", _params, socket) do
    send(self, :after_join)
    send(self, %{event: "add"})
    {:ok, socket}
  end

  def handle_info(:after_join, socket) do
    push(socket, "init", LambdaReactor.Visitors.state())
    {:ok, _} = LambdaReactor.Visitors.add()
    {:noreply, socket}
  end
  def handle_info(%{event: event}, socket) when event in ["add", "remove"] do
    push(socket, event, %{})
    {:noreply, socket}
  end

  def terminate(_, _) do
    {:ok, _} = LambdaReactor.Visitors.remove()
    :ok
  end
end
