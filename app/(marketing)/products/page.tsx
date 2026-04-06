import Link from "next/link";

export const metadata = {
  title: "Products | Principal AI",
};

export default function ProductsPage() {
  return (
    <div className="w-full">
      <h1 className="text-3xl sm:text-4xl text-slate-50 tracking-tight font-semibold mb-8">Products</h1>
      <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-2 max-w-3xl">
        <article className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 sm:p-8">
          <h2 className="text-lg font-medium text-slate-50 mb-3">Credit Workbench</h2>
          <p className="text-slate-300 leading-relaxed text-sm sm:text-base mb-6 m-0">
            Demo workflow: structured credit brief layout, analyst verification layer, and illustrative exhibits
            (Helios Towers sample). Optional LinkedIn sign-in for full-report actions.
          </p>
          <p className="m-0 text-sm sm:text-base">
            <Link
              href="/products/credit-workbench"
              className="text-blue-500 hover:text-blue-400 font-medium no-underline"
            >
              Product page
            </Link>
            <span className="text-slate-600 mx-2">·</span>
            <Link href="/credit-workbench" className="text-blue-500 hover:text-blue-400 font-medium no-underline">
              Launch app
            </Link>
          </p>
        </article>
      </div>
    </div>
  );
}
