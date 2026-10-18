#!/usr/bin/env node
/**
 * Keep only the newest Vercel deployments of this project, so Deployment Storage on the
 * free plan does not fill up with old previews. Every deployment keeps a full copy of
 * `public/uploads` (about 240 MB each), and Vercel's own retention policy is time-based
 * only.
 *
 * Kept: the deployment currently serving the production domain, the newest KEEP ready
 * deployments, and anything still building. Everything else, including failed and
 * cancelled builds, is deleted.
 * The script refuses to delete anything if it cannot find the production deployment.
 *
 * Environment:
 *   VERCEL_TOKEN        required, a token with access to the team
 *   VERCEL_TEAM_SLUG    default "awes0mees-projects"
 *   VERCEL_PROJECT      default "awes0mee-portfolio"
 *   PRODUCTION_DOMAIN   default "www.66ccff-labs.com"
 *   KEEP                default 3
 *   DRY_RUN             "true" lists what would be deleted without deleting
 */

const token = process.env.VERCEL_TOKEN;
const team = process.env.VERCEL_TEAM_SLUG || "awes0mees-projects";
const project = process.env.VERCEL_PROJECT || "awes0mee-portfolio";
const domain = process.env.PRODUCTION_DOMAIN || "www.66ccff-labs.com";
const keep = Number.parseInt(process.env.KEEP || "3", 10);
const dryRun = process.env.DRY_RUN === "true";

if (!token) {
  console.log("VERCEL_TOKEN is not set; nothing to do.");
  process.exit(0);
}

if (!Number.isInteger(keep) || keep < 1) {
  console.error(`KEEP must be a positive integer, got "${process.env.KEEP}".`);
  process.exit(1);
}

const api = async (method, path, params = {}) => {
  const url = new URL(path, "https://api.vercel.com");
  url.searchParams.set("slug", team);
  for (const [key, value] of Object.entries(params)) url.searchParams.set(key, String(value));
  const response = await fetch(url, { method, headers: { Authorization: `Bearer ${token}` } });
  const body = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(`${method} ${url.pathname} failed: ${response.status} ${body?.error?.message ?? ""}`.trim());
  }
  return body;
};

const unfinished = new Set(["BUILDING", "INITIALIZING", "QUEUED"]);

const deployments = [];
for (let until; ; ) {
  const page = await api("GET", "/v7/deployments", { projectId: project, limit: 100, ...(until ? { until } : {}) });
  deployments.push(...page.deployments);
  if (!page.pagination?.next) break;
  until = page.pagination.next;
}
deployments.sort((a, b) => b.created - a.created);

const alias = await api("GET", `/v4/aliases/${domain}`);
const productionId = alias.deploymentId ?? alias.deployment?.id;
if (!productionId || !deployments.some((deployment) => deployment.uid === productionId)) {
  console.error(`Could not match ${domain} to a deployment of ${project}; deleting nothing.`);
  process.exit(1);
}

const state = (deployment) => deployment.readyState ?? deployment.state;
const newestReady = deployments.filter((deployment) => state(deployment) === "READY").slice(0, keep);
const kept = new Set([
  productionId,
  ...newestReady.map((deployment) => deployment.uid),
  ...deployments.filter((deployment) => unfinished.has(state(deployment))).map((deployment) => deployment.uid)
]);
const doomed = deployments.filter((deployment) => !kept.has(deployment.uid));

const describe = (deployment) =>
  `${deployment.uid}  ${new Date(deployment.created).toISOString().slice(0, 16)}  ${deployment.target ?? "preview"}  ${state(deployment)}  ${deployment.url}`;

console.log(`${deployments.length} deployments; production is ${productionId}; keeping ${kept.size}.`);
for (const deployment of deployments.filter((d) => kept.has(d.uid))) console.log(`keep    ${describe(deployment)}`);

for (const deployment of doomed) {
  if (dryRun) {
    console.log(`would delete  ${describe(deployment)}`);
    continue;
  }
  await api("DELETE", `/v13/deployments/${deployment.uid}`);
  console.log(`deleted ${describe(deployment)}`);
}

console.log(dryRun ? `Dry run: ${doomed.length} would be deleted.` : `Deleted ${doomed.length}.`);
