import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";

import ErrorBoundary from "@/app/error";
import GlobalErrorBoundary from "@/app/global-error";

describe("error boundaries", () => {
  it("does not render internal error details to users", () => {
    const internalError = new Error("SQL password=secret at db.internal");
    const reset = vi.fn();
    const segmentMarkup = renderToStaticMarkup(
      createElement(ErrorBoundary, { error: internalError, reset }),
    );
    const globalMarkup = renderToStaticMarkup(
      createElement(GlobalErrorBoundary, { error: internalError, reset }),
    );

    expect(segmentMarkup).toContain("Something went wrong");
    expect(globalMarkup).toContain("Something went wrong");
    expect(segmentMarkup).not.toContain(internalError.message);
    expect(globalMarkup).not.toContain(internalError.message);
  });
});
