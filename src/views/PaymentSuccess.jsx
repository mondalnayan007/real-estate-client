
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const API_BASE = "/backend";
const ROOT_DOMAIN = "bdproperties.site";

const formatDate = (value) => {
  if (!value) return "N/A";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "N/A";

  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};

const formatMoney = (value) => {
  const amount = Number(value);

  if (!Number.isFinite(amount)) return "N/A";

  return new Intl.NumberFormat("en-BD", {
    style: "currency",
    currency: "BDT",
    minimumFractionDigits: 2,
  }).format(amount);
};

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();

  const tranId = searchParams.get("tran_id");

  const [metadata, setMetadata] = useState(null);
  const [subscription, setSubscription] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);

  useEffect(() => {
    if (!tranId) {
      setError("Transaction reference is missing.");
      setLoading(false);
      return;
    }

    const controller = new AbortController();

    const fetchSubscription = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `${API_BASE}/subscription?t_id=${encodeURIComponent(tranId)}`,
          { signal: controller.signal }
        );

        if (!response.ok) {
          throw new Error("Unable to retrieve subscription information.");
        }

        const data = await response.json();

        // Adapt these fields to the exact response returned by your API.
        const subscriptionData = data.subscription ?? data.data ?? data;

        const paymentStatus = String(
          subscriptionData.paymentStatus ?? ""
        ).toLowerCase();

        setSubscription(subscriptionData);
        setMetadata(subscriptionData.metadata ?? data.metadata ?? null);

        if (paymentStatus !== "paid") {
          setError(
            "Your payment has not yet been confirmed. Please wait for verification or contact support."
          );
        }
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error("Subscription fetch error:", err);
          setError("Unable to verify payment information. Please try again.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchSubscription();

    return () => controller.abort();
  }, [tranId]);

  const subdomain = metadata?.subdomain || "";
  const agencyName = metadata?.agencyName || "Valued Agency";
  const senderEmail = metadata?.senderEmail || "N/A";
  const whatsappNumber = metadata?.whatsappNumber || "N/A";
  const planName = metadata?.planName || "Subscription Plan";
  const planPrice = metadata?.planPrice ?? subscription?.amount;
  const paymentStatus = String(
    subscription?.paymentStatus ?? ""
  ).toLowerCase();

  const isPaid = paymentStatus === "paid";

  const paymentDate = formatDate(
    subscription?.updatedAt ||
      subscription?.createdAt ||
      metadata?.startDate
  );

  // Build the tenant website URL using the production domain.
  const handleWebsite = () => {
    if (!subdomain) {
      setError("Your agency subdomain is not available yet.");
      return;
    }

    // Accept a plain username, but don't accept arbitrary external hosts.
    const cleanSubdomain = subdomain
      .trim()
      .toLowerCase()
      .replace(new RegExp(`\\.${ROOT_DOMAIN.replace(".", "\\.")}$`), "");

    if (!/^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/.test(cleanSubdomain)) {
      setError("The agency subdomain is invalid. Please contact support.");
      return;
    }

    window.location.assign(`https://${cleanSubdomain}.${ROOT_DOMAIN}`);
  };

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-emerald-600 border-t-transparent" />
          <p className="mt-4 text-sm text-slate-600">
            Loading your payment information...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-800">
      <style>{`
        @media print {
          body {
            background: white !important;
          }

          body * {
            visibility: hidden !important;
          }

          #printable-invoice,
          #printable-invoice * {
            visibility: visible !important;
          }

          #printable-invoice {
            display: block !important;
            position: absolute !important;
            inset: 0 auto auto 0 !important;
            width: 100% !important;
            margin: 0 !important;
            padding: 0 !important;
            background: white !important;
          }

          @page {
            size: A4;
            margin: 14mm;
          }
        }
      `}</style>

      <header className="no-print border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-600 text-2xl font-extrabold text-white">
              B
            </div>

            <div>
              <p className="text-lg font-extrabold tracking-tight">
                BD Properties
              </p>
              <p className="text-xs text-slate-500">
                Agency Subscription Portal
              </p>
            </div>
          </div>

          {isPaid && (
            <button
              onClick={() => setShowInvoiceModal(true)}
              className="rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold transition hover:bg-slate-50"
            >
              View Invoice
            </button>
          )}
        </div>
      </header>

      <main className="no-print mx-auto flex max-w-6xl justify-center px-5 py-12">
        <section className="w-full max-w-xl rounded-3xl border border-slate-200 bg-white p-7 text-center shadow-sm sm:p-10">
          {isPaid ? (
            <>
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                <svg
                  className="h-11 w-11"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m5 12 4 4L19 6"
                  />
                </svg>
              </div>

              <p className="mt-6 text-sm font-bold uppercase tracking-widest text-emerald-700">
                Payment Confirmed
              </p>

              <h1 className="mt-2 text-3xl font-extrabold text-slate-900">
                Thank You!
              </h1>

              <p className="mt-3 leading-7 text-slate-600">
                Your subscription payment has been marked as paid in the
                subscription record.
              </p>

              <div className="mt-7 space-y-4 rounded-2xl bg-slate-50 p-5 text-left">
                <div className="flex items-start justify-between gap-4">
                  <span className="text-sm text-slate-500">Transaction ID</span>
                  <span className="break-all text-right font-mono text-sm font-semibold">
                    {tranId}
                  </span>
                </div>

                <div className="flex items-start justify-between gap-4">
                  <span className="text-sm text-slate-500">Subscription</span>
                  <span className="text-right text-sm font-semibold">
                    {planName}
                  </span>
                </div>

                <div className="flex items-start justify-between gap-4">
                  <span className="text-sm text-slate-500">Amount</span>
                  <span className="text-right text-base font-bold text-emerald-700">
                    {formatMoney(planPrice)}
                  </span>
                </div>

                <div className="flex items-start justify-between gap-4">
                  <span className="text-sm text-slate-500">Payment Date</span>
                  <span className="text-right text-sm font-semibold">
                    {paymentDate}
                  </span>
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <button
                  onClick={handleWebsite}
                  disabled={!subdomain}
                  className="flex-1 rounded-xl bg-emerald-600 px-5 py-3.5 font-bold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Visit Your Website
                </button>

                <button
                  onClick={() => setShowInvoiceModal(true)}
                  className="flex-1 rounded-xl border border-slate-300 px-5 py-3.5 font-bold transition hover:bg-slate-50"
                >
                  View Invoice
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-amber-100 text-amber-700">
                <span className="text-3xl">!</span>
              </div>

              <h1 className="mt-5 text-2xl font-extrabold">
                Payment Not Yet Confirmed
              </h1>

              <p className="mt-3 text-sm leading-6 text-slate-600">
                {error ||
                  "We could not confirm this payment yet. Please contact support if you have completed payment."}
              </p>

              <p className="mt-4 break-all text-xs text-slate-500">
                Transaction reference: {tranId || "Unavailable"}
              </p>

              <button
                onClick={() => window.location.reload()}
                className="mt-6 rounded-xl bg-slate-900 px-5 py-3 font-semibold text-white hover:bg-slate-700"
              >
                Check Again
              </button>
            </>
          )}

          {error && isPaid && (
            <p className="mt-4 text-sm text-amber-700">{error}</p>
          )}
        </section>
      </main>

      {/* Invoice preview modal */}
      {showInvoiceModal && isPaid && (
        <div className="no-print fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/60 p-4">
          <div className="w-full max-w-3xl overflow-hidden rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
              <div>
                <h2 className="font-bold text-slate-900">
                  Invoice Preview
                </h2>
                <p className="mt-1 text-xs text-slate-500">
                  Review your subscription invoice before printing.
                </p>
              </div>

              <button
                onClick={() => setShowInvoiceModal(false)}
                aria-label="Close invoice preview"
                className="rounded-lg px-3 py-2 text-xl text-slate-500 hover:bg-slate-100"
              >
                ×
              </button>
            </div>

            <div className="max-h-[70vh] overflow-y-auto p-4 sm:p-8">
              <Invoice
                tranId={tranId}
                agencyName={agencyName}
                senderEmail={senderEmail}
                whatsappNumber={whatsappNumber}
                planName={planName}
                planPrice={planPrice}
                paymentDate={paymentDate}
                subdomain={subdomain}
              />
            </div>

            <div className="flex justify-end gap-3 border-t border-slate-200 bg-slate-50 px-6 py-4">
              <button
                onClick={() => setShowInvoiceModal(false)}
                className="rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-semibold"
              >
                Close
              </button>

              <button
                onClick={handlePrint}
                className="rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-emerald-700"
              >
                Print / Save PDF
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Only this section is printed */}
      <div id="printable-invoice" className="hidden">
        {isPaid && (
          <Invoice
            tranId={tranId}
            agencyName={agencyName}
            senderEmail={senderEmail}
            whatsappNumber={whatsappNumber}
            planName={planName}
            planPrice={planPrice}
            paymentDate={paymentDate}
            subdomain={subdomain}
          />
        )}
      </div>
    </div>
  );
};

const Invoice = ({
  tranId,
  agencyName,
  senderEmail,
  whatsappNumber,
  planName,
  planPrice,
  paymentDate,
  subdomain,
}) => {
  const agencyDomain = subdomain
    ? `${subdomain}.${ROOT_DOMAIN}`
    : "Not assigned";

  return (
    <article className="mx-auto w-full max-w-3xl bg-white p-6 text-slate-800 sm:p-10">
      <div className="flex flex-col justify-between gap-6 border-b-2 border-emerald-600 pb-7 sm:flex-row">
        <div>
          <p className="text-3xl font-black tracking-tight text-emerald-700">
            BD PROPERTIES
          </p>
          <p className="mt-2 text-sm text-slate-500">
            Agency Subscription Services
          </p>
          <p className="mt-1 text-xs text-slate-400">
            bdproperties.site
          </p>
        </div>

        <div className="sm:text-right">
          <h2 className="text-3xl font-extrabold tracking-widest text-slate-900">
            INVOICE
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            Invoice reference
          </p>
          <p className="break-all font-mono text-sm font-bold">
            {tranId || "N/A"}
          </p>
          <p className="mt-2 text-sm text-slate-500">
            Issued: {paymentDate}
          </p>
        </div>
      </div>

      <div className="grid gap-8 py-8 sm:grid-cols-2">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
            Billed To
          </p>
          <h3 className="mt-3 text-lg font-bold">{agencyName}</h3>
          <p className="mt-1 break-all text-sm text-slate-600">
            {senderEmail}
          </p>
          <p className="mt-1 text-sm text-slate-600">{whatsappNumber}</p>
        </div>

        <div className="sm:text-right">
          <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
            Payment Status
          </p>
          <div className="mt-3 inline-flex rounded-full bg-emerald-100 px-4 py-2 text-sm font-bold text-emerald-800">
            PAID
          </div>
          <p className="mt-3 text-sm text-slate-500">Currency: BDT</p>
          <p className="mt-1 break-all text-sm text-slate-600">
            Website: {agencyDomain}
          </p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-y border-slate-200 bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500">
              <th className="px-3 py-4 font-bold">Description</th>
              <th className="px-3 py-4 text-center font-bold">Period</th>
              <th className="px-3 py-4 text-right font-bold">Amount</th>
            </tr>
          </thead>

          <tbody>
            <tr className="border-b border-slate-200">
              <td className="px-3 py-5">
                <p className="font-bold text-slate-900">{planName}</p>
                <p className="mt-1 text-xs text-slate-500">
                  Agency subscription
                </p>
              </td>

              <td className="px-3 py-5 text-center text-slate-600">
                Subscription
              </td>

              <td className="whitespace-nowrap px-3 py-5 text-right font-bold">
                {formatMoney(planPrice)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="ml-auto mt-8 max-w-sm space-y-3">
        <div className="flex justify-between gap-4 text-sm text-slate-500">
          <span>Subtotal</span>
          <span>{formatMoney(planPrice)}</span>
        </div>

        <div className="flex justify-between gap-4 border-t border-slate-200 pt-4">
          <span className="font-bold text-slate-900">Total Paid</span>
          <span className="text-xl font-extrabold text-emerald-700">
            {formatMoney(planPrice)}
          </span>
        </div>
      </div>

      <div className="mt-12 border-t border-slate-200 pt-6 text-center">
        <p className="font-semibold text-slate-700">
          Thank you for choosing BD Properties.
        </p>
        <p className="mt-2 text-xs leading-5 text-slate-500">
          Please retain this invoice for your records. For billing enquiries,
          contact your website administrator.
        </p>
        <p className="mt-4 text-xs text-slate-400">
          Generated electronically · {tranId || "No transaction reference"}
        </p>
      </div>
    </article>
  );
};

export default PaymentSuccess;
