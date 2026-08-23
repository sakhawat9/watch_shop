import AccountLayout from "../common/AccountLayout";
import OrderWatch from "../components/OrderWatch";
import orderRepo from "../repositories/orderRepo";
import { requireAuthUser } from "../utils/auth";

export default function UserOrders({ orderWatch = [] }) {
  return (
    <AccountLayout
      title="My orders"
      description="Every order you've placed, with its items, total and delivery address."
    >
      <OrderWatch orders={orderWatch} />
    </AccountLayout>
  );
}

export async function getServerSideProps(context) {
  const user = requireAuthUser(context);
  if (user.redirect) return user;

  // Only the signed-in user's own orders, never the full collection.
  const orderWatch = await orderRepo.listByUserId(user._id);
  return { props: { orderWatch } };
}
