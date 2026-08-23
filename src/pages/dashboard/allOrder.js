import AdminLayout from "../../common/AdminLayout";
import ViewAllOrder from "../../components/ViewAllOrder";
import orderRepo from "../../repositories/orderRepo";
import { requireAdmin } from "../../utils/auth";

export default function AllOrder({ orderWatch = [] }) {
  return (
    <AdminLayout
      title="Orders"
      description="Every order placed on your store, newest first."
    >
      <ViewAllOrder orderWatch={orderWatch} />
    </AdminLayout>
  );
}

export async function getServerSideProps(context) {
  const redirect = requireAdmin(context);
  if (redirect) return redirect;

  const orderWatch = await orderRepo.listAll();
  return { props: { orderWatch } };
}
