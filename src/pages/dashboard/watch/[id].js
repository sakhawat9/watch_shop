import axios from "axios";
import { useRouter } from "next/router";
import { useContext } from "react";
import { MdOutlineSearchOff } from "react-icons/md";
import { toast } from "react-toastify";
import AdminLayout from "../../../common/AdminLayout";
import WatchForm from "../../../components/Dashboard/WatchForm";
import Button from "../../../components/ui/Button";
import EmptyState from "../../../components/ui/EmptyState";
import watchRepo from "../../../repositories/watchRepo";
import { Store } from "../../../utils/Store";
import { requireAdmin } from "../../../utils/auth";

/**
 * Edit an existing product.
 *
 * The original fetched the record client-side inside a useEffect and pushed it
 * into the form field-by-field with twelve `setValue` calls, showing an empty
 * form until the request resolved. Loading it in getServerSideProps means the
 * form is populated on first paint and a bad id 404s properly.
 */
export default function EditWatch({ watch }) {
  const router = useRouter();
  const { state } = useContext(Store);
  const { userInfo } = state;

  if (!watch) {
    return (
      <AdminLayout title="Product not found">
        <EmptyState
          icon={MdOutlineSearchOff}
          title="We couldn't find that product"
          description="It may have already been deleted."
          action={{ label: "Back to products", href: "/dashboard/watch/manageWatch" }}
        />
      </AdminLayout>
    );
  }

  const handleSubmit = async (values) => {
    await axios.put(`/api/admin/watch/${watch._id}`, values, {
      headers: { authorization: `Bearer ${userInfo.token}` },
    });
    toast.success(`${values.name} was updated.`);
    router.push("/dashboard/watch/manageWatch");
  };

  return (
    <AdminLayout
      title="Edit product"
      description={watch.name}
      actions={
        <Button href={`/watch/${watch.slug}`} variant="outline" size="sm">
          View in store
        </Button>
      }
    >
      <WatchForm mode="edit" watch={watch} onSubmit={handleSubmit} />
    </AdminLayout>
  );
}

export async function getServerSideProps(context) {
  const redirect = requireAdmin(context);
  if (redirect) return redirect;

  const watch = await watchRepo.getById(context.params.id);
  return { props: { watch } };
}
