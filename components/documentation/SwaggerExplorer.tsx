"use client";

import dynamic from "next/dynamic";
import "swagger-ui-react/swagger-ui.css";

const SwaggerUI = dynamic(() => import("swagger-ui-react"), {
  ssr: false,
  loading: () => (
    <p className="px-4 py-8 text-[var(--text-muted)]">Loading API explorer…</p>
  ),
});

type SwaggerExplorerProps = {
  url: string;
};

export function SwaggerExplorer({ url }: SwaggerExplorerProps) {
  return (
    <div className="swagger-surface min-h-[60vh] [&_.swagger-ui]:text-[var(--text)]">
      <SwaggerUI
        url={url}
        docExpansion="list"
        defaultModelsExpandDepth={1}
        persistAuthorization
        tryItOutEnabled={false}
      />
    </div>
  );
}
