"use client";
import type { FC, ReactNode } from "react";
import { useState } from "react";
import {
  CheckCircle,
  LoaderCircle,
  OctagonX,
  TriangleAlert,
  Search,
  ChevronDown,
  ChevronRight,
} from "lucide-react";

// Define a ReadonlyJSONObject type if it's not available from imports
type ReadonlyJSONValue =
  | string
  | number
  | boolean
  | null
  | ReadonlyJSONObject
  | readonly ReadonlyJSONValue[];

interface ReadonlyJSONObject {
  readonly [key: string]: ReadonlyJSONValue;
}

type ToolStatus = "running" | "complete" | "incomplete" | "requires-action";

const statusIconMap: Record<ToolStatus, ReactNode> = {
  running: <LoaderCircle className="animate-spin text-indigo-500 size-4" />,
  complete: <CheckCircle className="text-emerald-500 size-4" />,
  "requires-action": <TriangleAlert className="text-amber-500 size-4" />,
  incomplete: <OctagonX className="text-rose-500 size-4" />,
};

// Define interfaces for the tool results
interface RegulationItemMetadata {
  section_path?: string;
  document_title?: string;
}

interface RegulationItem {
  id?: string;
  text?: string;
  source?: string;
  metadata?: RegulationItemMetadata; // Changed from string to RegulationItemMetadata
  section_path?: string;
  document_date?: string;
  document_title?: string;
  document_number?: string;
  document_status?: string;
  document_date_hijri?: string;
  name?: string;
}

interface VectorQueryResult {
  relevantContext?: RegulationItem[];
}

export const VectorQueryToolComponent: FC<{
  args: ReadonlyJSONObject;
  result?: unknown;
  status: { readonly type: ToolStatus; reason?: string; error?: unknown };
}> = (props) => {
  const { args, status, result } = props;
  const [isExpanded, setIsExpanded] = useState(false); // Default to expanded

  // Extract queryText safely with fallback
  const queryText =
    typeof args?.query === "string" ? args.query : "Unknown query";

  // Cast result to our expected type safely
  const typedResult = result as RegulationItem[] | undefined;
  // Extract relevantContext from result if available
  const relevantContext = typedResult || [];

  return (
    <div className="mb-3 mt-1">
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <Search size={14} className="text-gray-700" />
        <span>
          Searching for:{" "}
          <span className="font-medium text-gray-900">{queryText}</span>
        </span>
        <span className="ml-0.5 mt-0.5">{statusIconMap[status.type]}</span>
      </div>

      {status.type === "running" ? (
        <p className="text-sm text-gray-400 italic mt-1">
          Consulting SAMA regulatory database...
        </p>
      ) : status.type === "complete" && typedResult ? (
        <div className="mt-2 text-sm text-gray-500">
          {relevantContext && relevantContext.length > 0 ? (
            <>
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="flex items-center text-xs text-gray-600 hover:text-gray-900 border border-gray-200 rounded px-2 py-0.5 focus:outline-none hover:bg-gray-50 transition-colors mb-2"
              >
                {isExpanded ? (
                  <>
                    <ChevronDown size={14} className="mr-1" />
                    <span>
                      Found {relevantContext.length}{" "}
                      {relevantContext.length === 1 ? "result" : "results"}
                    </span>
                  </>
                ) : (
                  <>
                    <ChevronRight size={14} className="mr-1" />
                    <span>
                      Found {relevantContext.length}{" "}
                      {relevantContext.length === 1 ? "result" : "results"}
                    </span>
                  </>
                )}
              </button>

              <div
                className={`pl-4 border-l-2 border-gray-200 ${
                  isExpanded ? "block" : "hidden"
                }`}
              >
                <ul className="list-disc list-inside space-y-1">
                  {relevantContext.map((item: RegulationItem, i: number) => {
                    // Extract just the article number from section_path when it's uncategorized
                    let displaySection = item.metadata?.section_path;

                    if (
                      displaySection &&
                      displaySection.startsWith("Uncategorized > Article")
                    ) {
                      displaySection =
                        "Article " + displaySection.split("Article ")[1];
                    }

                    return (
                      <li key={i} className="text-xs">
                        <span className="font-medium">{displaySection}</span>
                        {item.metadata?.document_title && (
                          <span className="text-gray-500">
                            {" "}
                            - {item.metadata.document_title}
                          </span>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </>
          ) : (
            <p className="text-gray-500 pl-6">
              No relevant SAMA regulations found
            </p>
          )}
        </div>
      ) : status.type === "incomplete" || status.type === "requires-action" ? (
        <p className="text-sm text-gray-700 mt-1 bg-gray-100 p-2 rounded">
          Unable to search SAMA regulations:{" "}
          {status.reason === "error"
            ? typeof status.error === "string"
              ? status.error
              : "An error occurred"
            : String(status.reason)}
        </p>
      ) : null}
    </div>
  );
};
