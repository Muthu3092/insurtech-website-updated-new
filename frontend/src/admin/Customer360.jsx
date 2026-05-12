import React, { useEffect, useState, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import { api } from "@/lib/api";
import { useCurrency } from "@/lib/currency";
import { Button } from "@/components/ui/button";
import {
  User, Shield, Hammer, Clock, PhoneCall, TrendingUp, Sparkles,
  RefreshCw, Mail, MapPin, Calendar, FileText, BadgeCheck, AlertCircle,
  ArrowLeft, IdCard, CreditCard, Tag,
} from "lucide-react";
import { toast } from "sonner";

export default function Customer360() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [leadScore, setLeadScore] = useState(null);
  const [loading, setLoading] = useState(false);
  const { format } = useCurrency();

  const load = useCallback(
    async (silent = false) => {
      if (!silent) setLoading(true);
      try {
        const r = await api.get(`/crm/customers/${id}`);
        setData(r.data);
        api.get(`/ai/lead-score/${id}`).then((s) => setLeadScore(s.data)).catch(() => {});
      } catch (err) {
        if (!silent) toast.error("Failed to load customer");
      } finally {
        setLoading(false);
      }
    },
    [id]
  );

  // Initial + on focus + polling
  useEffect(() => {
    load();
    const onFocus = () => load(true);
    window.addEventListener("focus", onFocus);
    const interval = setInterval(() => load(true), 30000); // refresh every 30s
    return () => {
      window.removeEventListener("focus", onFocus);
      clearInterval(interval);
    };
  }, [load]);

  const simulateCall = async () => {
    try {
      await api.post("/voice/outbound/simulate", {
        user_id: id,
        phone: data?.profile?.phone,
        purpose: "lead_conversion",
      });
      toast.success("Outbound call simulated & logged");
      load(true);
    } catch {
      toast.error("Could not simulate call");
    }
  };

  const updateStage = async (stage) => {
    try {
      await api.patch(`/crm/customers/${id}`, { lead_stage: stage });
      toast.success(`Stage → ${stage}`);
      load(true);
    } catch {
      toast.error("Failed to update stage");
    }
  };

  if (!data) return <div className="p-6 sm:p-10 text-gray-500">Loading…</div>;
  const { profile, policies = [], claims = [], interactions = [], stats = {} } = data;
  const kyc = profile.kyc_data || {};
  const fullName = profile.full_name || profile.email || "—";

  return (
    <div className="p-4 sm:p-6 md:p-8 max-w-[1400px] mx-auto" data-testid="customer-360">
      {/* Back + actions row */}
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <Link
          to="/admin/customers"
          className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800"
        >
          <ArrowLeft className="w-4 h-4" /> All customers
        </Link>
        <span className="text-gray-300">/</span>
        <span className="text-sm font-medium truncate max-w-[60vw]">{fullName}</span>
        <Button
          onClick={() => load()}
          disabled={loading}
          variant="outline"
          size="sm"
          className="ml-auto rounded-full"
          data-testid="customer-refresh"
        >
          <RefreshCw className={`w-3.5 h-3.5 mr-1.5 ${loading ? "animate-spin" : ""}`} />
          Refresh
        </Button>
      </div>

      {/* HEADER CARD */}
      <div className="bg-white rounded-3xl p-4 sm:p-6 border border-gray-100 mb-5 sm:mb-6">
        <div className="flex flex-col sm:flex-row items-start gap-5">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-primary flex items-center justify-center text-white text-xl sm:text-2xl font-bold shrink-0">
            {fullName?.[0]?.toUpperCase() || <User className="w-8 h-8" />}
          </div>

          <div className="flex-1 min-w-0 w-full">
            <div className="flex items-start sm:items-center gap-2 flex-wrap">
              <h1 className="font-display text-2xl sm:text-3xl font-semibold break-words">
                {fullName}
              </h1>
              <span
                className={`text-xs px-2.5 py-0.5 rounded-full capitalize ${
                  profile.kyc_status === "verified"
                    ? "bg-green-50 text-green-700"
                    : "bg-yellow-50 text-yellow-700"
                }`}
              >
                <BadgeCheck className="w-3 h-3 inline mr-1" />
                KYC {profile.kyc_status}
              </span>
              {profile.tags?.map((t) => (
                <span
                  key={t}
                  className="text-xs px-2 py-0.5 rounded-full bg-primary-50 text-primary-800"
                >
                  {t}
                </span>
              ))}
            </div>

            <div className="text-gray-500 text-sm mt-1 break-words">
              <a href={`mailto:${profile.email}`} className="hover:underline">{profile.email}</a>
              {profile.phone && <> · <a href={`tel:${profile.phone}`} className="hover:underline">{profile.phone}</a></>}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 mt-4 sm:mt-5">
              <Stat label="Active policies" value={stats.active_policies ?? 0} />
              <Stat label="Total claims" value={stats.total_claims ?? 0} />
              <Stat label="LTV" value={format(stats.ltv ?? 0, { decimals: 0 })} />
              <Stat label="Risk score" value={`${Math.round((profile.risk_score || 0) * 100)}%`} />
            </div>
          </div>

          {/* <div className="flex flex-row sm:flex-col gap-2 w-full sm:w-auto sm:min-w-[180px]">
            <Button
              onClick={simulateCall}
              data-testid="simulate-call-btn"
              className="rounded-full bg-primary hover:bg-primary-600 text-white flex-1 sm:flex-initial"
            >
              <PhoneCall className="w-4 h-4 mr-2" /> Simulate call
            </Button>
            <select
              data-testid="lead-stage-select"
              className="border border-gray-200 rounded-full px-3 sm:px-4 py-2 text-sm bg-white flex-1 sm:flex-initial"
              value={profile.lead_stage || "new"}
              onChange={(e) => updateStage(e.target.value)}
            >
              {["new", "qualified", "contacted", "quoted", "won", "lost"].map((s) => (
                <option key={s} value={s}>Stage: {s}</option>
              ))}
            </select>
          </div> */}
        </div>
      </div>

      {/* AI PREDICTIONS */}
      {leadScore && (
        <div className="bg-gradient-to-br from-primary-50 to-white border border-primary-100 rounded-3xl p-4 sm:p-5 mb-5 sm:mb-6">
          <div className="flex items-center gap-2 mb-3 text-primary-800">
            <Sparkles className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-widest">AI Predictions</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <ScoreBar label="Conversion" value={leadScore.conversion_probability} />
            <ScoreBar label="Renewal likelihood" value={leadScore.renewal_likelihood} />
            <ScoreBar label="Churn risk" value={leadScore.churn_risk} danger />
            <div>
              <div className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-1">
                Next best action
              </div>
              <div className="font-semibold text-primary-800 text-sm break-words">
                {leadScore.next_best_action}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* PROFILE & KYC DETAIL */}
      <Section title="Profile" icon={User} className="mb-5 sm:mb-6">
        <dl className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-3 text-sm">
          <Field label="Full name" value={fullName} />
          <Field label="Email" value={profile.email} link={`mailto:${profile.email}`} />
          <Field label="Phone" value={profile.phone} link={`tel:${profile.phone}`} />
          <Field label="Role" value={profile.role} />
          <Field label="Lead stage" value={profile.lead_stage} />
          <Field label="Lead source" value={profile.lead_source} />
          <Field label="Partner ID" value={profile.partner_id} mono />
          <Field label="Customer ID" value={profile.id} mono />
          <Field
            label="Joined"
            value={profile.created_at ? new Date(profile.created_at).toLocaleString() : "—"}
          />

          {/* KYC details (everything in kyc_data) */}
          {Object.keys(kyc).length > 0 && (
            <div className="sm:col-span-2 lg:col-span-3 pt-2 mt-2 border-t border-gray-100">
              <div className="text-xs uppercase tracking-widest text-gray-500 mb-2 flex items-center gap-1.5">
                <IdCard className="w-3.5 h-3.5" /> KYC Information
              </div>
              <dl className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-3">
                {Object.entries(kyc).map(([k, v]) => (
                  <Field
                    key={k}
                    label={k.replace(/_/g, " ")}
                    value={typeof v === "object" ? JSON.stringify(v) : String(v)}
                  />
                ))}
              </dl>
            </div>
          )}
        </dl>
      </Section>

      {/* POLICIES (detailed) */}
      <Section
        title={`Policies (${policies.length})`}
        icon={Shield}
        className="mb-5 sm:mb-6"
        headerRight={
          policies.length > 0 && (
            <span className="text-xs text-gray-500">
              Total premium {format(policies.reduce((s, p) => s + (p.premium || 0), 0))}
            </span>
          )
        }
      >
        {policies.length === 0 ? (
          <Empty msg="No policies yet — the customer hasn't purchased anything." />
        ) : (
          <div className="space-y-3">
            {policies.map((p) => (
              <PolicyCard key={p.id} policy={p} format={format} />
            ))}
          </div>
        )}
      </Section>

      {/* CLAIMS (detailed) */}
      <Section
        title={`Claims (${claims.length})`}
        icon={Hammer}
        className="mb-5 sm:mb-6"
        headerRight={
          claims.length > 0 && (
            <span className="text-xs text-gray-500">
              Total claimed {format(claims.reduce((s, c) => s + (c.amount_claimed || 0), 0))}
            </span>
          )
        }
      >
        {claims.length === 0 ? (
          <Empty msg="No claims filed yet." />
        ) : (
          <div className="space-y-3">
            {claims.map((c) => (
              <ClaimCard key={c.id} claim={c} format={format} />
            ))}
          </div>
        )}
      </Section>

      {/* TIMELINE */}
      <Section title={`Timeline (${interactions.length})`} icon={Clock}>
        {interactions.length === 0 ? (
          <Empty msg="No interactions logged yet." />
        ) : (
          <ul className="space-y-3">
            {interactions.map((i) => (
              <li key={i.id} className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-primary-50 flex items-center justify-center shrink-0">
                  {i.kind === "call" ? (
                    <PhoneCall className="w-4 h-4 text-primary-700" />
                  ) : (
                    <TrendingUp className="w-4 h-4 text-primary-700" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium break-words">{i.title}</div>
                  {i.body && <div className="text-xs text-gray-600 mt-0.5 break-words whitespace-pre-wrap">{i.body}</div>}
                  <div className="text-xs text-gray-400 mt-1">
                    {new Date(i.created_at).toLocaleString()}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </Section>
    </div>
  );
}

/* ---------- presentational sub-components ---------- */

function Stat({ label, value }) {
  return (
    <div className="bg-gray-50 rounded-xl p-3">
      <div className="text-xs text-gray-500">{label}</div>
      <div className="font-display text-lg sm:text-xl font-semibold break-words">{value}</div>
    </div>
  );
}

function ScoreBar({ label, value, danger }) {
  const pct = Math.round((value || 0) * 100);
  return (
    <div>
      <div className="flex justify-between text-xs mb-1">
        <span className="text-gray-500 uppercase tracking-wider font-semibold">{label}</span>
        <span className="font-semibold">{pct}%</span>
      </div>
      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full ${danger ? "bg-red-500" : "bg-primary"}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

function Section({ title, icon: Icon, children, className = "", headerRight }) {
  return (
    <div className={`bg-white rounded-3xl p-4 sm:p-5 border border-gray-100 ${className}`}>
      <div className="flex items-center gap-2 mb-4">
        <Icon className="w-4 h-4 text-primary-700" />
        <h3 className="font-display text-lg font-semibold">{title}</h3>
        {headerRight && <div className="ml-auto">{headerRight}</div>}
      </div>
      {children}
    </div>
  );
}

function Field({ label, value, link, mono = false }) {
  const display = value == null || value === "" ? "—" : String(value);
  return (
    <div>
      <dt className="text-[11px] uppercase tracking-wider text-gray-500 font-semibold">{label}</dt>
      <dd className={`text-sm break-words ${mono ? "font-mono" : ""}`}>
        {link && value ? (
          <a href={link} className="hover:underline">{display}</a>
        ) : (
          display
        )}
      </dd>
    </div>
  );
}

function PolicyCard({ policy, format }) {
  const statusColor =
    policy.status === "active"
      ? "bg-green-50 text-green-700 border-green-200"
      : policy.status === "cancelled"
      ? "bg-red-50 text-red-700 border-red-200"
      : "bg-gray-100 text-gray-700 border-gray-200";

  return (
    <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
      <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
        <div className="min-w-0">
          <div className="font-semibold text-base break-words">
            {policy.product_name}
            <span className="ml-2 text-[11px] uppercase tracking-widest text-gray-500">
              · {policy.category}
            </span>
          </div>
          <div className="text-xs text-gray-500 font-mono break-all">{policy.policy_number}</div>
        </div>
        <span
          className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border capitalize ${statusColor}`}
        >
          {policy.status}
        </span>
      </div>

      <dl className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-2 text-sm">
        <Field label="Premium" value={format(policy.premium ?? 0)} />
        <Field
          label="Coverage"
          value={policy.coverage_amount != null ? format(policy.coverage_amount, { decimals: 0 }) : "—"}
        />
        <Field
          label="Start date"
          value={policy.start_date ? new Date(policy.start_date).toLocaleDateString() : "—"}
        />
        <Field
          label="End date"
          value={policy.end_date ? new Date(policy.end_date).toLocaleDateString() : "—"}
        />
        <Field label="Currency" value={policy.currency} />
        <Field label="Payment ID" value={policy.payment_id} mono />
        <Field label="Quote ID" value={policy.quote_id} mono />
        <Field
          label="Issued"
          value={policy.created_at ? new Date(policy.created_at).toLocaleString() : "—"}
        />
      </dl>

      {policy.meta && Object.keys(policy.meta).length > 0 && (
        <div className="mt-3 pt-3 border-t border-gray-200">
          <div className="text-[11px] uppercase tracking-wider text-gray-500 mb-2 flex items-center gap-1">
            <Tag className="w-3 h-3" /> Plan details
          </div>
          <dl className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-2 text-sm">
            {Object.entries(policy.meta).map(([k, v]) =>
              v == null || v === "" ? null : (
                <Field key={k} label={k.replace(/_/g, " ")} value={String(v)} />
              )
            )}
          </dl>
        </div>
      )}
    </div>
  );
}

function ClaimCard({ claim, format }) {
  const statusColor = {
    submitted: "bg-blue-50 text-blue-700 border-blue-200",
    under_review: "bg-yellow-50 text-yellow-700 border-yellow-200",
    approved: "bg-green-50 text-green-700 border-green-200",
    rejected: "bg-red-50 text-red-700 border-red-200",
    paid: "bg-emerald-50 text-emerald-700 border-emerald-200",
  }[claim.status] || "bg-gray-100 text-gray-700 border-gray-200";

  return (
    <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
      <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
        <div className="min-w-0">
          <div className="font-semibold text-base capitalize break-words">
            {claim.incident_type}
            <span className="ml-2 text-[11px] uppercase tracking-widest text-gray-500">claim</span>
          </div>
          <div className="text-xs text-gray-500 font-mono break-all">{claim.claim_number}</div>
        </div>
        <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border capitalize ${statusColor}`}>
          {(claim.status || "").replace(/_/g, " ")}
        </span>
      </div>

      <dl className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-2 text-sm">
        <Field label="Amount claimed" value={format(claim.amount_claimed ?? 0)} />
        <Field label="Amount paid" value={claim.amount_paid != null ? format(claim.amount_paid) : "—"} />
        <Field
          label="Incident date"
          value={claim.incident_date ? new Date(claim.incident_date).toLocaleDateString() : "—"}
        />
        <Field label="Policy ID" value={claim.policy_id} mono />
        <Field label="Fraud score" value={claim.fraud_score != null ? `${Math.round(claim.fraud_score * 100)}%` : "—"} />
        <Field label="Auto-decision" value={claim.ai_decision || "—"} />
        <Field
          label="Submitted"
          value={claim.created_at ? new Date(claim.created_at).toLocaleString() : "—"}
        />
        <Field
          label="Last update"
          value={claim.updated_at ? new Date(claim.updated_at).toLocaleString() : "—"}
        />
      </dl>

      {claim.description && (
        <div className="mt-3 pt-3 border-t border-gray-200">
          <div className="text-[11px] uppercase tracking-wider text-gray-500 mb-1">Description</div>
          <p className="text-sm text-gray-700 whitespace-pre-wrap break-words">{claim.description}</p>
        </div>
      )}
    </div>
  );
}

function Empty({ msg }) {
  return (
    <div className="flex items-center gap-2 text-sm text-gray-400 bg-gray-50 rounded-xl py-6 px-4 justify-center">
      <AlertCircle className="w-4 h-4" /> {msg}
    </div>
  );
}