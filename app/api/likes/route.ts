import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const NAMESPACE = "shin486-portfolio-likes-v1";
const ABACUS_BASE = "https://abacus.jasoncameron.dev";

const ALLOWED_IDS = new Set([
  // Certificates
  "gemini-certified-student-university",
  "tesda-aws-cloud-practitioner",
  "tesda-aws-ai-practitioner",
  "tesda-azure-ai-fundamentals",
  "tesda-fundamentals-of-ai",
  "python-essentials-1",
  "python-essentials-2",
  "ethical-hacking-data-analytics",
  "devroutes",
  "ai-ethics-governance",
  // Projects
  "palengkehub",
  "shinpay-plus",
  "itelect4-project",
  "auto-avenue-ims",
  "avms",
  "crave-cart",
]);

// Fallback in-memory store if external counter service is unreachable
const memoryFallbackCounts: Record<string, number> = {};

async function fetchCountForId(id: string): Promise<number> {
  try {
    const res = await fetch(`${ABACUS_BASE}/get/${NAMESPACE}/${id}`, {
      method: "GET",
      cache: "no-store",
      signal: AbortSignal.timeout(3500),
    });
    if (res.status === 404) {
      return memoryFallbackCounts[id] ?? 0;
    }
    if (!res.ok) {
      return memoryFallbackCounts[id] ?? 0;
    }
    const data = (await res.json()) as { value?: number };
    const count = typeof data.value === "number" ? data.value : 0;
    memoryFallbackCounts[id] = count;
    return count;
  } catch {
    return memoryFallbackCounts[id] ?? 0;
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const rawIds = searchParams.get("ids") || "";
  const requestedIds = rawIds
    .split(",")
    .map((s) => s.trim())
    .filter((id) => ALLOWED_IDS.has(id));

  const targetIds =
    requestedIds.length > 0 ? requestedIds : Array.from(ALLOWED_IDS);

  const entries = await Promise.all(
    targetIds.map(async (id) => {
      const count = await fetchCountForId(id);
      return [id, count] as const;
    })
  );

  return NextResponse.json(
    { counts: Object.fromEntries(entries) },
    {
      headers: {
        "Cache-Control": "no-store, max-age=0",
      },
    }
  );
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as { id?: string };
    const id = body.id?.trim() || "";

    if (!ALLOWED_IDS.has(id)) {
      return NextResponse.json({ error: "Invalid item id" }, { status: 400 });
    }

    try {
      const res = await fetch(`${ABACUS_BASE}/hit/${NAMESPACE}/${id}`, {
        method: "GET",
        cache: "no-store",
        signal: AbortSignal.timeout(3500),
      });

      if (res.ok) {
        const data = (await res.json()) as { value?: number };
        const newCount =
          typeof data.value === "number"
            ? data.value
            : (memoryFallbackCounts[id] ?? 0) + 1;
        memoryFallbackCounts[id] = newCount;
        return NextResponse.json({ id, count: newCount });
      }
    } catch {
      // Fallback to in-memory increment
    }

    const fallbackCount = (memoryFallbackCounts[id] ?? 0) + 1;
    memoryFallbackCounts[id] = fallbackCount;
    return NextResponse.json({ id, count: fallbackCount });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
