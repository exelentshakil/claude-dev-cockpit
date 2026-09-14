import os
import base64
import subprocess
import re

docs_dir = os.path.expanduser("~/Apps/claude-code/claude-dev-cockpit/docs")
html_path = os.path.join(docs_dir, "estimate.html")
pdf_path = os.path.join(docs_dir, "ESTIMATE.pdf")

with open(os.path.join(docs_dir, "headshot.jpeg"), "rb") as f:
    headshot_b64 = base64.b64encode(f.read()).decode("utf-8")

with open(os.path.join(docs_dir, "logo.png"), "rb") as f:
    logo_b64 = base64.b64encode(f.read()).decode("utf-8")

html_content = f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Scope & Fixed-Price Milestone Estimate - Claude Developer Certification & Questionnaire</title>
  <style>
    @page {{
      size: letter portrait;
      margin: 6mm 8.5mm 6mm 8.5mm;
    }}
    * {{
      box-sizing: border-box;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }}
    html, body {{
      margin: 0;
      padding: 0;
      height: 100%;
      background: #ffffff;
      overflow: hidden;
    }}
    body {{
      font-family: -apple-system, BlinkMacSystemFont, "Inter", "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      color: #0f172a;
      line-height: 1.34;
      font-size: 9.8px;
    }}

    .page-container {{
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 100%;
      box-sizing: border-box;
    }}

    /* 1. Executive Header */
    .header {{
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 12px;
      border-bottom: 2px solid #d97757;
      padding-bottom: 6px;
    }}
    .header-left {{
      flex: 1;
      min-width: 0;
    }}
    .brand-title {{
      font-size: 8.5px;
      font-weight: 800;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: #d97757;
      margin-bottom: 2px;
    }}
    h1 {{
      font-size: 15px;
      font-weight: 800;
      color: #0f172a;
      margin: 0 0 2px 0;
      letter-spacing: -0.02em;
      line-height: 1.15;
    }}
    .subtitle {{
      font-size: 8.8px;
      color: #475569;
      margin: 0;
      line-height: 1.25;
    }}
    .meta-card {{
      flex-shrink: 0;
      background: #f8fafc;
      border: 1px solid #cbd5e1;
      border-radius: 6px;
      padding: 6px 10px;
      font-size: 8.5px;
      text-align: right;
      line-height: 1.38;
      box-shadow: 0 1px 2px rgba(0,0,0,0.02);
    }}
    .meta-card strong {{
      color: #0f172a;
    }}
    .live-badge {{
      display: inline-block;
      background: #ecfdf5;
      color: #059669;
      border: 1px solid #a7f3d0;
      font-weight: 700;
      padding: 1px 5px;
      border-radius: 9999px;
      font-size: 8px;
      text-transform: uppercase;
      margin-left: 3px;
    }}

    /* 2. Scope Table */
    .section-header {{
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 4px;
    }}
    .section-title {{
      font-size: 10px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: #1e293b;
      border-left: 3px solid #d97757;
      padding-left: 6px;
      margin: 0;
    }}
    .section-meta {{
      font-size: 8.5px;
      color: #64748b;
      font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
    }}
    table {{
      width: 100%;
      border-collapse: collapse;
    }}
    th {{
      background: #f1f5f9;
      color: #334155;
      font-weight: 700;
      text-transform: uppercase;
      font-size: 8.5px;
      letter-spacing: 0.04em;
      border: 1px solid #cbd5e1;
      padding: 4px 6px;
      text-align: left;
    }}
    td {{
      border: 1px solid #e2e8f0;
      padding: 4.5px 6px;
      font-size: 8.8px;
      vertical-align: top;
    }}
    .phase-num {{
      font-weight: 800;
      color: #1e293b;
      font-size: 8.8px;
      white-space: nowrap;
    }}
    .phase-name {{
      font-weight: 700;
      color: #0f172a;
      font-size: 9.1px;
    }}
    .phase-desc {{
      color: #475569;
      font-size: 8px;
      margin-top: 1px;
      line-height: 1.22;
    }}
    .phase-0-row {{
      background: #f0fdf4;
    }}
    .phase-0-badge {{
      color: #15803d;
      font-weight: 800;
    }}
    .total-row {{
      background: #0f172a;
      color: #ffffff;
      font-weight: 800;
      border: 1px solid #0f172a;
    }}
    .total-row td {{
      border: 1px solid #0f172a;
      padding: 4.8px 6px;
      font-size: 9.2px;
    }}

    /* 3. 2-Column Grid */
    .grid-2col {{
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 7px;
    }}
    .card-box {{
      border: 1px solid #cbd5e1;
      border-radius: 6px;
      background: #f8fafc;
      padding: 6px 9px;
    }}
    .card-box-title {{
      font-size: 8.8px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.04em;
      color: #1e293b;
      margin: 0 0 3px 0;
      display: flex;
      align-items: center;
      gap: 4px;
      border-bottom: 1px solid #e2e8f0;
      padding-bottom: 2px;
    }}
    .milestone-item {{
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 6px;
      border-bottom: 1px dotted #cbd5e1;
      padding: 2.2px 0;
      font-size: 8px;
    }}
    .milestone-item:last-child {{
      border-bottom: none;
      padding-bottom: 0;
    }}
    .milestone-name {{
      color: #334155;
    }}
    .milestone-val {{
      font-weight: 800;
      color: #0f172a;
      font-family: ui-monospace, monospace;
      white-space: nowrap;
    }}
    .guardrail-item {{
      font-size: 8px;
      color: #334155;
      margin-bottom: 2.2px;
      padding-left: 10px;
      position: relative;
      line-height: 1.22;
    }}
    .guardrail-item:last-child {{
      margin-bottom: 0;
    }}
    .guardrail-item::before {{
      content: "✓";
      position: absolute;
      left: 0;
      color: #16a34a;
      font-weight: 800;
      font-size: 7.5px;
    }}

    /* 4. Commercial Terms Section */
    .terms-box {{
      border: 1px solid #cbd5e1;
      border-radius: 6px;
      background: #ffffff;
      padding: 6px 9px;
    }}
    .terms-grid {{
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 8px;
    }}
    .term-col {{
      font-size: 7.8px;
      line-height: 1.22;
    }}
    .term-title {{
      font-weight: 800;
      color: #d97757;
      text-transform: uppercase;
      font-size: 7.8px;
      margin-bottom: 1.5px;
    }}
    .term-body {{
      color: #475569;
    }}

    /* 5. Formal Acceptance Authorization Block */
    .auth-block {{
      border: 1px solid #94a3b8;
      border-radius: 6px;
      background: #f8fafc;
      padding: 6.5px 11px;
    }}
    .auth-title {{
      font-size: 8.5px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: #0f172a;
      margin-bottom: 3.5px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #cbd5e1;
      padding-bottom: 2px;
    }}
    .auth-grid {{
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 14px;
    }}
    .auth-party {{
      display: flex;
      flex-direction: column;
      gap: 2px;
      font-size: 8px;
    }}
    .auth-party-title {{
      font-weight: 700;
      color: #334155;
      text-transform: uppercase;
      font-size: 7.8px;
      margin-bottom: 1px;
    }}
    .auth-sign-line {{
      display: flex;
      align-items: flex-end;
      gap: 8px;
      margin-top: 3px;
    }}
    .auth-sign-field {{
      flex: 1;
      border-bottom: 1.2px solid #475569;
      min-height: 24px;
      display: flex;
      align-items: flex-end;
      font-family: "Brush Script MT", "Caveat", cursive, sans-serif;
      font-size: 13.5px;
      color: #9a3412;
      padding-left: 4px;
      padding-bottom: 1px;
    }}
    .auth-date-field {{
      width: 75px;
      border-bottom: 1.2px solid #475569;
      min-height: 24px;
      font-family: ui-monospace, monospace;
      font-size: 8.2px;
      color: #334155;
      text-align: center;
      display: flex;
      align-items: flex-end;
      justify-content: center;
      padding-bottom: 1px;
    }}
    .auth-label {{
      font-size: 7px;
      color: #64748b;
      text-transform: uppercase;
      margin-top: 1.5px;
    }}

    /* 6. Executive Signature Footer */
    .footer-container {{
      border: 1px solid #cbd5e1;
      border-radius: 6px;
      background: #f8fafc;
      padding: 5.5px 11px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 12px;
      box-shadow: 0 1px 2px rgba(0,0,0,0.02);
    }}
    .footer-founder {{
      display: flex;
      align-items: center;
      gap: 9px;
      flex: 1;
      min-width: 0;
    }}
    .founder-avatar {{
      width: 34px;
      height: 34px;
      border-radius: 50%;
      object-fit: cover;
      border: 1.5px solid #d97757;
      box-shadow: 0 1px 3px rgba(217,119,87,0.15);
      flex-shrink: 0;
    }}
    .founder-info {{
      display: flex;
      flex-direction: column;
      gap: 1px;
      min-width: 0;
    }}
    .founder-name {{
      font-size: 8.8px;
      color: #0f172a;
      line-height: 1.18;
      white-space: nowrap;
    }}
    .founder-name strong {{
      color: #0f172a;
      font-weight: 800;
    }}
    .founder-company {{
      font-size: 8px;
      color: #334155;
      line-height: 1.18;
      white-space: nowrap;
    }}
    .founder-company strong {{
      color: #1e293b;
      font-weight: 700;
    }}
    .founder-sub {{
      font-size: 7.5px;
      color: #475569;
      line-height: 1.18;
      white-space: nowrap;
    }}
    .footer-brand {{
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 2px;
      flex-shrink: 0;
    }}
    .business-logo {{
      height: 16px;
      width: auto;
      object-fit: contain;
    }}
    .demo-badge {{
      font-size: 7.6px;
      color: #c2410c;
      background: #fff7ed;
      border: 1px solid #fed7aa;
      padding: 1.5px 5px;
      border-radius: 3px;
      font-weight: 700;
      font-family: ui-monospace, monospace;
      text-decoration: none;
      white-space: nowrap;
    }}
  </style>
</head>
<body>
<div class="page-container">
  <!-- 1. Executive Header -->
  <div class="header">
    <div class="header-left">
      <div class="brand-title">BarakahSoft LLC • Enterprise AI Systems Engineering • Ref #BS-2026-CLAUDE-001</div>
      <h1>Claude Developer Certification & Evaluation Engagement</h1>
      <p class="subtitle">Official Examination Pass, Hands-on Lab Mastery, Ephemeral Prompt Caching & Comprehensive Questionnaire</p>
    </div>
    <div class="meta-card">
      <div><strong>Candidate:</strong> Shakil Ahmed • BarakahSoft LLC</div>
      <div><strong>Timeline SLA:</strong> Exactly 7 Calendar Days (Strict Deadline)</div>
      <div><strong>Fixed Budget:</strong> <strong>$700.00 Fixed ($350 Upfront / $350 Final)</strong></div>
      <div><strong>Live Prototype:</strong> <span class="live-badge">Verified & Audited</span></div>
    </div>
  </div>

  <!-- 2. Scope Table -->
  <div class="scope-block">
    <div class="section-header">
      <h2 class="section-title">Milestone Scope & Delivery Schedule</h2>
      <div class="section-meta">Live Demo: https://claude-dev-cockpit.vercel.app</div>
    </div>

    <table>
      <thead>
        <tr>
          <th style="width: 13%;">Milestone</th>
          <th style="width: 55%;">Engineering Deliverables & Certification Architecture</th>
          <th style="width: 10%; text-align: center;">Hours</th>
          <th style="width: 10%; text-align: right;">Type</th>
          <th style="width: 12%; text-align: right;">Investment</th>
        </tr>
      </thead>
      <tbody>
        <tr class="phase-0-row">
          <td class="phase-num"><span class="phase-0-badge">Phase 0</span></td>
          <td>
            <div class="phase-name">Interactive Working Certification Workbench & Lab Simulator</div>
            <div class="phase-desc">Full 5-domain syllabus matrix, live dual-provider AI lab with latency telemetry, prompt caching economics calculator, and mock questionnaire preview. Delivered upfront in &lt;30m to prove technical mastery.</div>
          </td>
          <td style="text-align: center; font-weight: 700; white-space: nowrap;">0.5 hrs (&lt;30m)</td>
          <td style="text-align: right; color: #16a34a; font-weight: 700;">$0.00</td>
          <td style="text-align: right; font-weight: 800; color: #16a34a;">$0.00 (Live)</td>
        </tr>
        <tr>
          <td class="phase-num">Milestone 1</td>
          <td>
            <div class="phase-name">Study Account Provisioning & Messages API Core (Day 1)</div>
            <div class="phase-desc">Review official curriculum blueprint, map 5 certification domains, set up local developer harness, and test SSE streaming chunk handlers with exponential backoff.</div>
          </td>
          <td style="text-align: center; font-weight: 600;">2.5 hrs</td>
          <td style="text-align: right;">Fixed</td>
          <td style="text-align: right; font-weight: 700;">$125.00</td>
        </tr>
        <tr>
          <td class="phase-num">Milestone 1</td>
          <td>
            <div class="phase-name">Ephemeral Prompt Caching & Streaming Architecture (Day 2)</div>
            <div class="phase-desc">Implement cache_control: {{ type: "ephemeral" }} on 20k+ token system prompts, benchmark 90% cost drop ($0.30/M vs $3.00/M), and monitor cache_read_input_tokens.</div>
          </td>
          <td style="text-align: center; font-weight: 600;">3.0 hrs</td>
          <td style="text-align: right;">Fixed</td>
          <td style="text-align: right; font-weight: 700;">$125.00</td>
        </tr>
        <tr>
          <td class="phase-num">Milestone 1</td>
          <td>
            <div class="phase-name">Tool Use, Multi-Turn Loops & MCP Transports (Day 3)</div>
            <div class="phase-desc">Strict JSON Schema tool specification, tool_choice modes, multi-turn tool_use/tool_result state machine, and Model Context Protocol (MCP) stdio/SSE transports.</div>
          </td>
          <td style="text-align: center; font-weight: 600;">3.5 hrs</td>
          <td style="text-align: right;">Fixed</td>
          <td style="text-align: right; font-weight: 700;">$100.00</td>
        </tr>
        <tr>
          <td class="phase-num">Milestone 2</td>
          <td>
            <div class="phase-name">Claude Code CLI, Hooks & Multi-Agent Workflows (Day 4)</div>
            <div class="phase-desc">Headless CLI automation (claude -p), persistent project memory via CLAUDE.md, and PreToolUse/SessionStart hooks in settings.json for sandboxed tool execution.</div>
          </td>
          <td style="text-align: center; font-weight: 600;">3.5 hrs</td>
          <td style="text-align: right;">Fixed</td>
          <td style="text-align: right; font-weight: 700;">$100.00</td>
        </tr>
        <tr>
          <td class="phase-num">Milestone 2</td>
          <td>
            <div class="phase-name">Official Certification Exam Pass & Proof of Completion (Day 6)</div>
            <div class="phase-desc">Take proctored assessment legitimately under Shakil Ahmed's verified name. Secure official passing score confirmation (&gt;90%) and digital credential badge.</div>
          </td>
          <td style="text-align: center; font-weight: 600;">2.0 hrs</td>
          <td style="text-align: right;">Fixed</td>
          <td style="text-align: right; font-weight: 700;">$150.00</td>
        </tr>
        <tr>
          <td class="phase-num">Milestone 2</td>
          <td>
            <div class="phase-name">Comprehensive Follow-Up Questionnaire Delivery (Day 7)</div>
            <div class="phase-desc">In-depth qualitative and quantitative evaluation covering API ergonomics, caching efficacy, tool reliability, and developer relations feedback. Final milestone release.</div>
          </td>
          <td style="text-align: center; font-weight: 600;">2.0 hrs</td>
          <td style="text-align: right;">Fixed</td>
          <td style="text-align: right; font-weight: 700;">$100.00</td>
        </tr>
        <tr class="total-row">
          <td colspan="2" style="text-align: left; font-weight: 800;">TOTAL 7-DAY CERTIFICATION & QUESTIONNAIRE ENGAGEMENT</td>
          <td style="text-align: center; font-weight: 800;">17.0 hrs</td>
          <td style="text-align: right; font-weight: 800;">Fixed</td>
          <td style="text-align: right; font-weight: 800;">$700.00</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- 3. 2-Column Milestone & Architecture Grid -->
  <div class="grid-2col">
    <!-- Structured Escrow Triggers Box -->
    <div class="card-box">
      <div class="card-box-title">Structured Escrow Milestones (Exact Client Alignment)</div>
      <div class="milestone-item">
        <span class="milestone-name"><strong>Milestone 1 (Upfront Escrow):</strong> Preparation & Hands-on Labs</span>
        <span class="milestone-val">$350.00</span>
      </div>
      <div class="milestone-item">
        <span class="milestone-name"><strong>Milestone 2 (Final Escrow):</strong> Official Exam Pass & Questionnaire</span>
        <span class="milestone-val">$350.00</span>
      </div>
      <div class="milestone-item">
        <span class="milestone-name"><strong>Required Exam / Training Fees:</strong> None ($0 Out-of-Pocket)</span>
        <span class="milestone-val">$0.00 Flagged</span>
      </div>
      <div class="milestone-item">
        <span class="milestone-name"><strong>Total Project Budget:</strong> 100% Aligned with Stated Terms</span>
        <span class="milestone-val">$700.00 Fixed</span>
      </div>
    </div>

    <!-- Zero-Risk Compliance Guardrails Box -->
    <div class="card-box">
      <div class="card-box-title">Compliance Guardrails & Integrity Guarantees</div>
      <div class="guardrail-item"><strong>Legitimate Individual Testing:</strong> Assessment taken strictly by Shakil Ahmed under verified name, adhering strictly to all proctoring and program rules.</div>
      <div class="guardrail-item"><strong>Strict 7-Day SLA:</strong> All study modules, official certification exam, and post-exam questionnaire delivered within 7 calendar days of access grant.</div>
      <div class="guardrail-item"><strong>Actionable Feedback:</strong> Deep architectural evaluation covering Messages API streaming, caching benchmarks, and Claude Code CLI developer experience.</div>
    </div>
  </div>

  <!-- 4. Commercial Terms & Conditions -->
  <div class="terms-box">
    <div class="card-box-title" style="margin-bottom: 3px;">Commercial Terms & Production Engagement Conditions</div>
    <div class="terms-grid">
      <div class="term-col">
        <div class="term-title">Escrow Milestones</div>
        <div class="term-body">100% milestone-based on Upwork: $350 upfront upon access grant, $350 upon official exam pass and questionnaire submission.</div>
      </div>
      <div class="term-col">
        <div class="term-title">Full IP Transfer</div>
        <div class="term-body">100% ownership of questionnaire responses, benchmark metrics, and code blueprints transfers immediately to client.</div>
      </div>
      <div class="term-col">
        <div class="term-title">Legitimate Credential</div>
        <div class="term-body">Candidate earns and retains the official developer credential legitimately under Shakil Ahmed's verified name.</div>
      </div>
      <div class="term-col">
        <div class="term-title">Quote Validity</div>
        <div class="term-body">Valid for 30 days through October 15, 2026. Fixed total of $700.00 covers all specified deliverables without hidden charges.</div>
      </div>
    </div>
  </div>

  <!-- 5. Formal Acceptance Authorization -->
  <div class="auth-block">
    <div class="auth-title">
      <span>Formal Authorization & Engagement Acceptance</span>
      <span style="font-weight: 500; font-size: 7.4px; color: #475569;">Binding upon signature by authorized representatives</span>
    </div>
    <div class="auth-grid">
      <div class="auth-party">
        <div class="auth-party-title">Authorized Candidate: BarakahSoft LLC (Wyoming, USA)</div>
        <div>Signatory: <strong>Shakil Ahmed</strong> • Principal Systems Architect & Founder</div>
        <div class="auth-sign-line">
          <div class="auth-sign-field">Shakil Ahmed</div>
          <div class="auth-date-field">15 Sep 2026</div>
        </div>
        <div style="display: flex; justify-content: space-between;">
          <span class="auth-label">Authorized Provider Signature</span>
          <span class="auth-label" style="width: 75px; text-align: center;">Date</span>
        </div>
      </div>

      <div class="auth-party">
        <div class="auth-party-title">Authorized Client: Certification Evaluation Board</div>
        <div>Signatory: <strong>Client Representative</strong></div>
        <div class="auth-sign-line">
          <div class="auth-sign-field" style="color: #64748b; font-family: inherit; font-size: 8.2px; font-style: italic;">[ Accepted via Upwork Contract Offer / Sign-off ]</div>
          <div class="auth-date-field">___ / ___ / 2026</div>
        </div>
        <div style="display: flex; justify-content: space-between;">
          <span class="auth-label">Authorized Client Signature</span>
          <span class="auth-label" style="width: 75px; text-align: center;">Date</span>
        </div>
      </div>
    </div>
  </div>

  <!-- 6. Executive Signature Footer -->
  <div class="footer-container">
    <div class="footer-founder">
      <img src="data:image/jpeg;base64,{headshot_b64}" alt="Shakil Ahmed" class="founder-avatar" />
      <div class="founder-info">
        <div class="founder-name"><strong>Shakil Ahmed</strong> • Founder & Lead Systems Architect (12+ Yrs Exp)</div>
        <div class="founder-company"><strong>BarakahSoft LLC</strong> • Enterprise AI Automation Partner</div>
        <div class="founder-sub">Former Lead Engineer at Legiit ($1M ARR Command Center) • Verified Upwork Partner</div>
      </div>
    </div>
    <div class="footer-brand">
      <img src="data:image/png;base64,{logo_b64}" alt="BarakahSoft" class="business-logo" />
      <a href="https://claude-dev-cockpit.vercel.app" target="_blank" class="demo-badge">claude-dev-cockpit.vercel.app</a>
    </div>
  </div>
</div>
</body>
</html>
"""

with open(html_path, "w", encoding="utf-8") as f:
    f.write(html_content)

print("Saved estimate.html to:", html_path)

# Run headless Chrome to produce clean 1-page ESTIMATE.pdf
chrome_cmd = [
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "--headless",
    "--disable-gpu",
    "--no-pdf-header-footer",
    f"--print-to-pdf={pdf_path}",
    f"file://{os.path.abspath(html_path)}"
]

res = subprocess.run(chrome_cmd, capture_output=True, text=True)
if res.returncode == 0:
    print("Successfully generated ESTIMATE.pdf via Chrome Headless at:", pdf_path)
    print("File size:", os.path.getsize(pdf_path), "bytes")
else:
    print("Chrome print-to-pdf error:", res.stderr)

# Verify page count
with open(pdf_path, "rb") as f:
    pdf_bytes = f.read()

pages = re.findall(rb"/Type\s*/Page[^s]", pdf_bytes)
print(f"Verified PDF page count: {len(pages)} page(s)")
