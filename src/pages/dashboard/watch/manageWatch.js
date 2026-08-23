import AdminLayout from "../../../common/AdminLayout";
import ManageWatchs from "../../../components/ManageWatch/ManageWatchs";
import Button from "../../../components/ui/Button";
import watchRepo from "../../../repositories/watchRepo";
import { requireAdmin } from "../../../utils/auth";

export default function ManageWatch({ allWatch = [] }) {
  return (
    <AdminLayout
      title="Products"
      description="View, edit and remove watches in your catalogue."
      actions={
        <Button href="/dashboard/watch/addWatch" variant="accent" size="sm">
          Add product
        </Button>
      }
    >
      <ManageWatchs watch={allWatch} />
    </AdminLayout>
  );
}

export async function getServerSideProps(context) {
  const redirect = requireAdmin(context);
  if (redirect) return redirect;

  const allWatch = await watchRepo.listAll();
  return { props: { allWatch } };
}
