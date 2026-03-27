import { describe, expect, it } from "vitest";
import {
  agenticWorkflow,
  audienceSegments,
  awsCoreStack,
  brand,
  crisisVsSolution,
  eightDimensions,
  ingestionPipeline,
} from "./reference-content";

describe("reference-content", () => {
  it("defines eight intelligence dimensions", () => {
    expect(eightDimensions).toHaveLength(8);
    for (const d of eightDimensions) {
      expect(d.title.length).toBeGreaterThan(0);
      expect(d.summary.length).toBeGreaterThan(0);
      expect(d.indicators.length).toBeGreaterThan(0);
    }
  });

  it("defines the agentic workflow steps", () => {
    expect(agenticWorkflow.length).toBeGreaterThanOrEqual(3);
    const ids = agenticWorkflow.map((s) => s.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("pairs each crisis row with an intervention", () => {
    for (const row of crisisVsSolution) {
      expect(row.problem.length).toBeGreaterThan(0);
      expect(row.intervention.length).toBeGreaterThan(0);
    }
  });

  it("includes core brand strings", () => {
    expect(brand.trustTagline).toContain("Trust");
    expect(brand.visionLead.length).toBeGreaterThan(0);
  });

  it("lists audience segments", () => {
    expect(audienceSegments.length).toBeGreaterThanOrEqual(4);
  });

  it("describes AWS stack components", () => {
    expect(awsCoreStack.length).toBeGreaterThanOrEqual(3);
    const names = awsCoreStack.map((s) => s.name.toLowerCase()).join(" ");
    expect(names).toContain("s3");
  });

  it("defines the ingestion pipeline stages", () => {
    expect(ingestionPipeline.length).toBeGreaterThanOrEqual(6);
    const ids = ingestionPipeline.map((s) => s.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});
