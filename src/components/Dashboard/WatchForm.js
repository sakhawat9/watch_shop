import axios from "axios";
import Image from "next/image";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { BiCloudUpload, BiErrorCircle } from "react-icons/bi";
import { toast } from "react-toastify";
import Button from "../ui/Button";
import Field, { inputClass } from "../ui/Field";
import { Store } from "../../utils/Store";

/**
 * The category values MUST match the slugs used by the catalogue and by the
 * category links in the nav, footer and homepage (`men`, `women`, `unisex`).
 *
 * The old Add Watch form offered `man`, `woman`, `kidgirls` and `kidbyes`,
 * none of which any part of the storefront filters on — so every product added
 * through the admin was invisible on all category pages. Its placeholder
 * option also carried `value="javascript"`, which could be submitted as a real
 * category.
 */
export const CATEGORY_OPTIONS = [
  { value: "men", label: "Men's watches" },
  { value: "women", label: "Women's watches" },
  { value: "unisex", label: "Unisex watches" },
];

/**
 * Create/edit form shared by the Add Product and Edit Product screens, which
 * previously duplicated ~250 and ~479 lines of near-identical markup.
 */
export default function WatchForm({ mode = "create", watch, onSubmit }) {
  const { state } = useContext(Store);
  const { userInfo } = state;

  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState(watch?.image ?? "");
  const [formError, setFormError] = useState(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onTouched",
    defaultValues: {
      name: watch?.name ?? "",
      slug: watch?.slug ?? "",
      shortDesc: watch?.shortDesc ?? "",
      category: watch?.category ?? "men",
      price: watch?.price ?? "",
      delPrice: watch?.delPrice ?? "",
      countInStock: watch?.countInStock ?? 20,
      description: watch?.description ?? "",
      image: watch?.image ?? "",
      prichard: watch?.prichard ?? false,
    },
  });

  const uploadHandler = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const body = new FormData();
    body.append("file", file);

    try {
      const { data } = await axios.post("/api/admin/upload", body, {
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: `Bearer ${userInfo.token}`,
        },
      });
      setImageUrl(data.secure_url);
      setValue("image", data.secure_url, { shouldValidate: true });
      toast.success("Image uploaded.");
    } catch (err) {
      toast.error(err.response?.data?.message || "The image couldn't be uploaded.");
    } finally {
      setUploading(false);
    }
  };

  const submit = async (values) => {
    setFormError(null);
    try {
      await onSubmit({
        ...values,
        price: Number(values.price),
        delPrice: Number(values.delPrice || values.price),
        countInStock: Number(values.countInStock),
      });
    } catch (err) {
      setFormError(
        err.response?.data?.message ||
          "We couldn't save this product. Please check the fields and try again.",
      );
    }
  };

  /** Auto-fill the slug from the name, but only while creating. */
  const syncSlug = (event) => {
    if (mode !== "create") return;
    const slug = event.target.value
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
    setValue("slug", slug);
  };

  return (
    <form onSubmit={handleSubmit(submit)} noValidate className="max-w-3xl space-y-6">
      {formError && (
        <p className="alert alert-danger" role="alert">
          <BiErrorCircle className="flex-shrink-0 w-5 h-5" aria-hidden="true" />
          <span>{formError}</span>
        </p>
      )}

      <section className="p-5 card sm:p-6">
        <h2 className="mb-5 text-h4">Product details</h2>

        <div className="grid gap-x-5 sm:grid-cols-2">
          <Field label="Name" error={errors.name?.message} required>
            {(id, describedBy, invalid) => (
              <input
                id={id}
                type="text"
                placeholder="Aurora Chronograph"
                aria-describedby={describedBy}
                aria-invalid={invalid}
                className={inputClass(invalid)}
                {...register("name", { required: "Enter a product name" })}
                onBlur={syncSlug}
              />
            )}
          </Field>

          <Field
            label="Slug"
            error={errors.slug?.message}
            hint="Used in the product URL."
            required
          >
            {(id, describedBy, invalid) => (
              <input
                id={id}
                type="text"
                placeholder="aurora-chronograph"
                aria-describedby={describedBy}
                aria-invalid={invalid}
                className={inputClass(invalid)}
                {...register("slug", {
                  required: "Enter a slug",
                  pattern: {
                    value: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
                    message: "Use lowercase letters, numbers and hyphens only",
                  },
                })}
              />
            )}
          </Field>

          <Field label="Category" error={errors.category?.message} required>
            {(id, describedBy, invalid) => (
              <select
                id={id}
                aria-describedby={describedBy}
                aria-invalid={invalid}
                className={inputClass(invalid, "select")}
                {...register("category", { required: "Choose a category" })}
              >
                {CATEGORY_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            )}
          </Field>

          <Field
            label="Stock quantity"
            error={errors.countInStock?.message}
            required
          >
            {(id, describedBy, invalid) => (
              <input
                id={id}
                type="number"
                min="0"
                aria-describedby={describedBy}
                aria-invalid={invalid}
                className={inputClass(invalid)}
                {...register("countInStock", {
                  required: "Enter the stock quantity",
                  min: { value: 0, message: "Stock can't be negative" },
                })}
              />
            )}
          </Field>

          <Field label="Price (USD)" error={errors.price?.message} required>
            {(id, describedBy, invalid) => (
              <input
                id={id}
                type="number"
                min="0"
                step="0.01"
                placeholder="70"
                aria-describedby={describedBy}
                aria-invalid={invalid}
                className={inputClass(invalid)}
                {...register("price", {
                  required: "Enter a price",
                  min: { value: 0, message: "Price can't be negative" },
                })}
              />
            )}
          </Field>

          <Field
            label="Compare-at price (USD)"
            error={errors.delPrice?.message}
            hint="Shown struck through. Leave blank if there's no discount."
          >
            {(id, describedBy, invalid) => (
              <input
                id={id}
                type="number"
                min="0"
                step="0.01"
                placeholder="120"
                aria-describedby={describedBy}
                aria-invalid={invalid}
                className={inputClass(invalid)}
                {...register("delPrice", {
                  min: { value: 0, message: "Price can't be negative" },
                })}
              />
            )}
          </Field>

          <Field
            label="Short description"
            error={errors.shortDesc?.message}
            hint="One line, shown on cards and in the hero."
            className="sm:col-span-2"
            required
          >
            {(id, describedBy, invalid) => (
              <input
                id={id}
                type="text"
                placeholder="A precision chronograph in brushed steel."
                aria-describedby={describedBy}
                aria-invalid={invalid}
                className={inputClass(invalid)}
                {...register("shortDesc", {
                  required: "Enter a short description",
                  maxLength: { value: 160, message: "Keep this under 160 characters" },
                })}
              />
            )}
          </Field>

          <Field
            label="Full description"
            error={errors.description?.message}
            className="sm:col-span-2"
            required
          >
            {(id, describedBy, invalid) => (
              <textarea
                id={id}
                rows={6}
                placeholder="Describe the movement, case, strap and water resistance…"
                aria-describedby={describedBy}
                aria-invalid={invalid}
                className={inputClass(invalid, "textarea")}
                {...register("description", {
                  required: "Enter a full description",
                  minLength: { value: 40, message: "Write at least 40 characters" },
                })}
              />
            )}
          </Field>
        </div>

        <label className="flex items-start gap-3 p-4 mt-2 rounded cursor-pointer bg-secondary-100">
          <input
            type="checkbox"
            className="mt-1 w-4 h-4 rounded accent-gold-600"
            {...register("prichard")}
          />
          <span>
            <span className="block text-sm font-medium text-primary-900">
              Feature on the homepage
            </span>
            <span className="block text-sm text-primary-500">
              Featured products appear in the hero carousel.
            </span>
          </span>
        </label>
      </section>

      <section className="p-5 card sm:p-6">
        <h2 className="mb-1 text-h4">Product image</h2>
        <p className="mb-5 text-sm text-primary-500">
          Upload a square image, or paste an image URL directly.
        </p>

        <div className="flex flex-col gap-5 sm:flex-row">
          <div className="relative w-32 h-32 overflow-hidden border rounded shrink-0 border-secondary-300 bg-secondary-100">
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt="Product preview"
                fill
                sizes="128px"
                className="object-cover"
              />
            ) : (
              <span className="flex items-center justify-center h-full text-xs text-primary-300">
                No image
              </span>
            )}
          </div>

          <div className="flex-1">
            {/* A real labelled file input. The old one was an `opacity-0`
                input with `disabled={!setImg}` — a function, so always truthy,
                meaning the control was never actually disabled. */}
            <label
              htmlFor="watch-image-upload"
              className="flex flex-col items-center justify-center w-full h-32 gap-2 transition-colors border-2 border-dashed rounded cursor-pointer border-secondary-400 hover:border-gold-500 hover:bg-gold-50"
            >
              <BiCloudUpload className="w-7 h-7 text-primary-400" aria-hidden="true" />
              <span className="text-sm text-primary-500">
                {uploading ? "Uploading…" : "Choose a JPG or PNG"}
              </span>
            </label>
            <input
              id="watch-image-upload"
              type="file"
              accept=".jpg,.jpeg,.png,.webp"
              onChange={uploadHandler}
              disabled={uploading}
              className="sr-only"
            />

            <Field label="Image URL" error={errors.image?.message} required className="mt-4 mb-0">
              {(id, describedBy, invalid) => (
                <input
                  id={id}
                  type="url"
                  placeholder="https://…"
                  aria-describedby={describedBy}
                  aria-invalid={invalid}
                  className={inputClass(invalid)}
                  {...register("image", { required: "Upload an image or paste a URL" })}
                  onChange={(event) => {
                    setImageUrl(event.target.value);
                    setValue("image", event.target.value);
                  }}
                />
              )}
            </Field>
          </div>
        </div>
      </section>

      <div className="flex flex-wrap gap-3">
        <Button type="submit" variant="accent" loading={isSubmitting || uploading}>
          {mode === "create" ? "Add product" : "Save changes"}
        </Button>
        <Button href="/dashboard/watch/manageWatch" variant="outline">
          Cancel
        </Button>
      </div>
    </form>
  );
}
