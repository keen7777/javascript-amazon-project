import { loadOrders, renderOrdersGrid} from "../data/orders.js";

function loadPage() {
  const orders = loadOrders() || [];
  renderOrdersGrid(orders);
}

loadPage();