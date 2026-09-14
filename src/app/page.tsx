"use client";

import React, { useState } from "react";
import { Header } from "@/components/Header";
import { BentoKpiGrid } from "@/components/BentoKpiGrid";
import { WorkflowCanvas } from "@/components/WorkflowCanvas";
import { CertSyllabusMatrix } from "@/components/CertSyllabusMatrix";
import { InteractiveLabSimulator } from "@/components/InteractiveLabSimulator";
import { StudyPlanRoadmap } from "@/components/StudyPlanRoadmap";
import { QuestionnairePreview } from "@/components/QuestionnairePreview";
import { RoiCostCalculator } from "@/components/RoiCostCalculator";
import { BlueprintExporter } from "@/components/BlueprintExporter";
import { ExecutionLogDrawer } from "@/components/ExecutionLogDrawer";
import { Footer } from "@/components/Footer";

export default function Home() {
  const [activeTab, setActiveTab] = useState<string>("syllabus");

  return (
    <div className="min-h-screen flex flex-col bg-dot-grid">
      {/* Top Application Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenTestLab={() => setActiveTab("lab")}
      />

      {/* Main Workspace Cockpit */}
      <main className="flex-1">
        {/* Bento KPI Matrix */}
        <BentoKpiGrid />

        {/* Dynamic Tab Content Area */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-6">
          {activeTab === "syllabus" && <CertSyllabusMatrix />}
          {activeTab === "lab" && <InteractiveLabSimulator />}
          {activeTab === "pipeline" && <WorkflowCanvas />}
          {activeTab === "study-plan" && <StudyPlanRoadmap />}
          {activeTab === "questionnaire" && <QuestionnairePreview />}
          {activeTab === "roi" && <RoiCostCalculator />}
          {activeTab === "blueprints" && <BlueprintExporter />}
        </div>
      </main>

      {/* Technical Architecture & Specs Footer */}
      <Footer />

      {/* Collapsible Live Execution & Telemetry Log Drawer */}
      <ExecutionLogDrawer />
    </div>
  );
}
