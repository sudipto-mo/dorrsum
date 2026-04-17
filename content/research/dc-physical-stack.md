# Module 2: The Physical Stack
## Where the Bottlenecks Are — An APAC Supply Chain Map

*Principal AI | Digital Infrastructure Stack*
*April 2026*

---

## Executive Summary

Asia-Pacific's AI infrastructure buildout has moved from ambition to large-scale execution. By end-2025, the region's total development pipeline reached a record 19.4 GW — with 13.8 GW operational, 3.7 GW under construction, and 15.7 GW in planning (Cushman & Wakefield, March 2026). Southeast Asia alone accounts for 31% of capacity currently under construction, with a significant delivery cycle expected through 2026. But capital is no longer the binding constraint — the physical supply chain is. Power interconnection timelines of 18–36 months, transmission grid limits in key markets like Singapore, and a global scramble for liquid cooling hardware are reshaping where and how fast AI data centres can be built.

This note maps the six critical supply chain nodes that determine project timelines across APAC. Each node is classified by its current constraint status — from binding bottleneck to commoditising — to help investors and operators identify where risk and opportunity sit in the infrastructure stack.

---

## 1. Power: The New Asset Class Driver

**Status: Critical Bottleneck**

In 2026, the primary determinant of APAC data center viability has decoupled from capital and demand. It is now a pure-play bet on electrons. Nearly 90% of industry respondents now cite grid access as the "hard ceiling" for project delivery. In the race to scale AI, power-first siting has officially displaced metro proximity as the primary valuation driver.

### 1. The Physical Wall: Transmission vs. Generation

While much of the market focuses on generation, transmission infrastructure is the "hidden" bottleneck.

- **The Voltage Mismatch:** Singapore’s 230 kV network is architecturally insufficient for the 400 kV connections required by next-gen 100 MW+ "AI factories."
- **The Cost of Entry:** Upgrading these lines requires an estimated US$2 billion investment and a 5-year construction cycle for just 50 km of high-voltage infrastructure.
- **Regulatory Tightening:** This physical reality led to Malaysia’s October 2025 Data Centre Framework, which moved power permitting to a "centralized merit" system. Operators no longer just need a contract; they need to prove grid-efficiency to earn a utility allocation.

### 2. The Pressure: Scale of Demand

This infrastructure is being asked to support a vertical climb in demand.

- **Regional Surge:** Southeast Asian DC power demand is projected to quadruple from 2.6 GW to 10.7 GW by 2035.
- **APAC Growth:** Pan-APAC operational capacity is tracking toward 57 GW by 2030 (12% CAGR).

The mismatch between 5-year transmission build-outs and 18-month "speed-to-market" demand is creating a structural premium for projects with secured grid interconnection.

### 3. The Sustainability Paradox: The "Renewable Gap"

The industry faces a collision between Net Zero mandates and the physical reality of "always-on" power. Only 32% of projected APAC DC energy demand can currently be met by renewables, leading to a pivot in how "Green" is defined:

- **The Baseload Shift (Nuclear/SMR):** Recognizing that solar/wind intermittency (25% capacity factor) is incompatible with 99.999% uptime, the region is betting on Nuclear. High-profile moves, such as the March 2026 Singapore-KHNP MoU and Malaysia’s target of 1.2 GW of SMR capacity by 2035, signal that carbon-free baseload is the only long-term solution for AI.
- **Firmed Baseload Bridging:** In the interim, LNG remains the de facto bridge. In markets like Indonesia and Malaysia, "Green" targets are being balanced against the immediate need for the reliability that only gas can provide while grid expansion lags.
- **The PPA Reality:** While Hyperscalers continue to lock in bilateral renewable PPAs, these are increasingly viewed as financial hedges rather than physical power solutions, as they lack the "firmness" required for high-density compute.

### Key Takeaway for Investors

The "Data Center" is no longer a real estate play; it is a specialized infrastructure play.

1. **Grid Scarcity Premium:** Assets with "firm" power and secured 400 kV interconnection are seeing significant cap-rate compression.
2. **Efficiency as Alpha:** Watch for "grid-efficient" designs—rewarded under Singapore’s DC-CFA2—as the new standard for winning government allocations.
3. **Geography:** Monitor the pace of Japan’s nuclear restarts and Malaysia’s new power permitting regime as the lead indicators for regional capacity alpha.

---

## 2. Silicon: The Heterogeneous Compute Era

**Status: From Scarcity to Complexity**

In 2026, the "GPU shortage" has been replaced by a Complexity Gap. Silicon supply is no longer a simple volume game; it is defined by the integration of logic, memory, and specialized packaging. The market has moved toward "Heterogeneous Compute" — a mix of general-purpose GPUs and bespoke AI accelerators.

### The Rubin Era: Density as the New Benchmark

NVIDIA’s Vera Rubin (NVL72), which entered volume production in March 2026, represents the pinnacle of silicon density. By moving to a 100% liquid-coupled architecture, NVIDIA has maximized the compute-per-square-foot, but at the cost of extreme power requirements.

- **Logic Dominance:** NVIDIA maintains a ~80% share of the training market, but the "Rubin Transition" has created a window for custom silicon to capture inference workloads.
- **The Power Wall:** Each Rubin rack consumes 120 kW, forcing a shift in how silicon is valued — from "TFLOPS per chip" to "Tokens per Watt."

### The Memory & Packaging Gating Factors

The primary bottleneck for silicon availability is no longer the fab, but the 3D-stacking process.

| Component | Key Players | 2026 Market Context |
|-----------|-------------|---------------------|
| HBM4 Memory | SK Hynix (70% share), Samsung | HBM4 is the primary gating factor for Rubin. Samsung’s OpenAI-exclusive line (April 2026) signals the end of "off-the-shelf" memory for Tier 1 labs. |
| Advanced Packaging | TSMC (CoWoS-L), Amkor | TSMC’s capacity is at 120k wafers/mo, yet remains fully booked by NVIDIA and Google through 2027. |
| ASIC Design | Broadcom, Marvell | These are the "silent winners," designing custom silicon for Meta, Google, and Amazon to bypass the "NVIDIA tax." |

### The Rise of "Agentic Silicon" (Inference)

Hyperscalers are now deploying chips specifically optimized for Agentic AI — workflows requiring real-time, low-latency reasoning.

- **Google TPU v7 "Ironwood":** Optimized for autonomous agent token-sampling. It provides a 3.7× carbon-efficiency gain over v5p.
- **Microsoft Maia 200:** The "inference workhorse" for GPT-5.2. Its custom 3nm design is focused on high-throughput token generation for the Microsoft 365 Copilot ecosystem.
- **Meta MTIA v3:** Built on 2nm architecture, Meta is utilizing this custom silicon to power its "Personal Superintelligence" initiative across Instagram and WhatsApp.

### Key Takeaway for Investors: The "Silicon Alpha"

The "Silicon Alpha" is shifting from owning GPUs to owning the Memory-Logic-Packaging stack. Diversification into Broadcom and SK Hynix is now as critical as exposure to NVIDIA.

---

## 3. Cooling: From Specialty to Standard

**Status: Rapidly Innovating**

Liquid cooling has officially transitioned from a niche "overclocking" solution to a baseline requirement for Tier 1 AI data centres. By H2 2026, air cooling for high-performance training clusters is no longer a design choice — it is a technical impossibility.

**Key Players:**

- **Infrastructure Giants:** Vertiv, Schneider Electric (via Motivair), and Legrand.
- **Direct-to-Chip Specialists:** CoolIT Systems, LiquidStack, and Accelsius.

### The Inflection Point: Mandatory Adoption

Liquid cooling penetration in AI data centres reached ~30% in 2025 and is accelerating as legacy facilities hit a "thermal wall." With NVIDIA’s Rubin platform mandating 100% liquid cooling, any facility built for air-only operation faces immediate structural obsolescence.

**NVIDIA's Liquid Standard:** At GTC 2026, NVIDIA formalized its liquid cooling ecosystem, naming four certified cold plate suppliers: Asia Vital Components (AVC), Cooler Master, Jentech, and Delta Electronics.

**The 45°C Shift:** The Rubin architecture is optimized for 45°C (113°F) inlet water temperatures. This allows data centres to operate without energy-intensive chillers even in warmer climates, drastically improving Power Usage Effectiveness (PUE).

### Asia’s Manufacturing Scale

China-based manufacturers have established the world’s largest liquid cooling R&D and production corridor, giving APAC a decisive supply chain advantage in the "plumbing" of AI.

| Metric | 2026 Projection | Primary Drivers |
|--------|-----------------|-----------------|
| Market Size (China) | >CNY 70 Billion (~US$9.7B) | Massive domestic demand for "Sovereign AI" clusters. |
| Growth Rate | 50%+ CAGR | Rapid retrofitting of existing Tier 1 and Tier 2 facilities. |
| Leading Supplier | Envicool | Designated as a core Coolant Distribution Unit (CDU) supplier for Google, capturing ~25% of its 2026 procurement share. |

### APAC Innovation: The FutureGrid Accelerator

The region is not just a manufacturing hub but a testbed for extreme-density power and thermal management.

**STT GDC (Singapore):** In January 2026, ST Telemedia Global Data Centres launched the FutureGrid Accelerator. This is Southeast Asia’s first live High Voltage Direct Current (HVDC) powered AI infrastructure testbed.

**Power-Thermal Integration:** The testbed demonstrates that integrating HVDC with high-performance liquid cooling can reduce energy losses by ~30%, addressing the dual constraints of Singapore's land and power scarcity.

**Ecosystem Partners:** Developed in collaboration with LITEON and Amperesand (an NTU deep-tech spin-off specializing in Solid State Transformers).

### Key Takeaway for Investors

Cooling is no longer a facility management concern — it is a strategic infrastructure decision that determines a facility's "Investable Grade."

- **Tenant Quality Divergence:** Operators investing in liquid cooling retrofits (like CoreWeave and Equinix) are positioning for high-margin training contracts. Those stuck with air-only designs are being relegated to "commodity" enterprise workloads.
- **Supply Chain Alpha:** The Asia-based supply chain for cold plates and CDUs (AVC, Jentech, Envicool) is now a critical part of the AI stack. For investors, these "picks and shovels" companies represent a higher-certainty play than many high-valuation model developers.

---

## 4. Land and Permitting: The Regulatory Variable

**Status: Tightening in Key Markets**

Land is available. Permits are not — at least not at the speed the market needs.

### Singapore: Controlled Expansion

Singapore lifted its data centre moratorium in 2022 but replaced it with a capacity-based allocation regime. New builds must meet stringent PUE and sustainability requirements. The result: high barriers to entry, premium pricing, and a shift of overflow demand to Johor Bahru (Malaysia) and Batam (Indonesia).

### Malaysia: The Permitting Tightening

In late 2025, Malaysia introduced tighter permit requirements for new data centre builds, citing power and water constraints. Companies with Chinese ownership ties — including GDS's DayOne subsidiary — face additional regulatory friction linked to AI chip export controls.

### India: Infrastructure-Led Site Selection

India's data centre buildout is concentrated in Mumbai (47% of capacity) and Chennai (20%). The Reliance Jamnagar campus (planned 3 GW) and AdaniConneX Visakhapatnam campus (1 GW, US$15 billion) represent a geographic diversification play tied to power availability, not metro demand.

### Japan: Nuclear Restart as Site Enabler

Japan's nuclear restart programme is unlocking new site possibilities. Osaka is emerging as a secondary hub alongside Tokyo, with both Equinix and STT GDC developing new facilities. Grid-connected nuclear capacity gives Japanese sites a baseload power advantage that most SEA markets lack.

### Key Takeaway for Investors

Permitting timelines, not land cost, are the variable that determines project IRR. Singapore's regime favours incumbents. Malaysia's evolving rules create uncertainty for new entrants. India and Japan offer the most runway for greenfield development, albeit with different risk profiles.

---

## 5. Connectivity: Commoditizing but Strategic

**Status: From Pipelines to Strategic Corridors**

By 2026, bandwidth is no longer a scarce commodity; it is a global utility. However, the routing of that bandwidth has become a high-stakes geopolitical game. The focus has shifted from "How much data can we move?" to "Whose waters is it crossing?"

**Key Players:**

- **Hyperscale Owners:** Meta, Google, Microsoft, and Amazon (now control >70% of transcontinental capacity).
- **Regional Anchors:** Singtel (Singapore), Telin (Indonesia), Reliance Jio (India), and TM (Malaysia).
- **EPC/Manufacturers:** SubCom, NEC Corporation, and Alcatel Submarine Networks (ASN).

### The Subsea Build-Out: Resiliency Over Efficiency

Over US$13 billion in subsea investment is hitting the water between 2025 and 2027. The priority is no longer just the shortest path, but the "most trusted" path.

- **Meta’s Candle Cable:** Announced as APAC’s largest capacity system (570 Tbps), it connects Japan, Taiwan, the Philippines, Indonesia, Malaysia, and Singapore. While slated for 2028, its H2 2026 construction phase is already driving regional landing station valuations.
- **The ICE Project (Indonesia Cable Express):** Led by Telin, this initiative is creating a web of 12 submarine systems. Critically, ICE II (Singapore to Manado) creates a new eastward route that avoids the contested South China Sea corridor.
- **The Trans-Pacific Surge:** Projects like Bifrost (Keppel/Meta/Telin) and Echo (Google/Meta) are coming online in 2026, providing the first direct "Express" routes from Southeast Asia to the US West Coast.

### The Singapore Hub Effect vs. Secondary Rise

Singapore remains the "Data Gravity" centre of APAC, but its capacity constraints are forcing a distributed network architecture.

| Hub Category | Lead Markets | Strategic Role (2026) |
|--------------|--------------|-------------------------|
| Primary Hub | Singapore | The "Interconnection King." Every new cable landing reinforces its network effect, despite a permanent premium on power and land. |
| Secondary Surge | Jakarta (ID) & Mumbai (IN) | Emerging as the "Inference Engines." Equinix (JK1) and Digital Realty are scaling here to catch traffic before it hits the Singapore bottleneck. |
| Bypass Corridors | Batam (ID) & Johor (MY) | Serving as "overflow valves" for Singapore, allowing for massive AI clusters to sit "one millisecond away" from the SG hub. |

### Intra-Asia AI Traffic: The New Workload Pattern

AI has killed the traditional "User-to-Cloud" traffic model. We are seeing the rise of Machine-to-Machine (M2M) traffic patterns that prioritize low-latency pathways for distributed model training.

- **Data Preparation:** Large datasets are cleaned and tokenized in emerging markets with low labor/land costs (e.g., Vietnam, Philippines).
- **Model Training:** The heavy lifting is routed to high-power liquid-cooled zones (e.g., Johor, Northern Australia).
- **Real-Time Inference:** Models are deployed at the edge in Tier 1 cities to support "Agentic AI" applications in finance and logistics.

**Key Players in Routing:** Ciena and Infinera (Optical Networking), who are deploying 800G and 1.6T optics to handle these bursty, asymmetric AI flows.

### Key Takeaway for Investors

Connectivity is no longer the bottleneck; **Route Concentration** is the risk.

- **The Geopolitical Single Point:** Investors must account for the "Singapore Risk." While it is the most connected city on Earth, its cable concentration makes it a single point of failure in a "Grey Zone" conflict.
- **The Hyperscale Bypass:** Watch for the decoupling of "Big Tech" from traditional Telco intermediaries. Companies like Google and Meta are no longer just customers; they are the owners of the physical sea-bed. The real "Alpha" lies in the landing station operators and specialized regional carriers like Telin who control the "last mile" of these subsea superhighways.

---

## 6. Construction and Contractors: Cost Pressure

**Status: Stressed**

In 2026, the primary bottleneck in data centre construction has shifted from "capital availability" to "execution capacity." While funding is abundant, the industry is hitting a ceiling on how many high-complexity, high-density facilities can be delivered simultaneously.

**Key Players:**

- **General Contractors:** Leighton Asia (CIMIC Group), Gammon Construction, and Lendlease.
- **Specialist MEP:** Jones Engineering, Mercury Engineering, and Fortis Construction.
- **Project Management:** AECOM, Arup, and Turner & Construction.

### The Capacity Gap: The War for MEP Talent

Construction costs across APAC have seen a 7–10% CAGR through 2026, driven primarily by the shortage of specialised Mechanical, Electrical, and Plumbing (MEP) trades.

- **Structural Scarcity:** The simultaneous build-out of "AI Factories" across Tokyo, Mumbai, Johor, and Sydney has created a bidding war for certified engineers.
- **The Complexity Premium:** Modern 120 kW+ racks require high-precision liquid cooling plumbing and complex power distribution that general construction crews cannot execute.
- **Execution Risk:** Projects are no longer failing due to a lack of concrete, but due to delays in Integrated Systems Testing (IST) and commissioning, where specialised labour is most thin.

### Modular and Prefabricated Solutions: The New Baseline

To bypass the labour shortage, "Stick-Built" construction is being replaced by Off-Site Manufacturing (OSM).

| Strategy | Key Adopters | Impact on 2026 Timeline |
|----------|--------------|-------------------------|
| Prefab Power Skids | Schneider Electric, Vertiv | Reduces on-site electrical labour by 40%. |
| Modular Cooling | Johnson Controls (Silent-Aire) | Allows for "Plug-and-Play" liquid cooling deployment. |
| Standardized BIM | AirTrunk, NEXTDC | Using "Digital Twin" models to ensure fabrication-ready designs before breaking ground. |

**AirTrunk’s Speed-to-Market:** Leveraging a "Repeatable Design" model, AirTrunk has managed to maintain deployment cycles of under 18 months despite the regional labour crunch.

**NVIDIA Reference Designs:** In collaboration with Schneider Electric, new AI-ready prefabricated designs are being used to "drop-in" high-density compute clusters into existing facility shells.

### Key Takeaway for Investors

The "Construction Alpha" belongs to the **Integrated Operators**.

- **Margin Risk:** Infrastructure providers on fixed-price contracts are seeing margins eroded by MEP labour inflation. Investors should favour companies like NEXTDC and Leighton Asia who have vertically integrated supply chains or long-term "Framework Agreements" with specialised sub-contractors.
- **Modular is Mandatory:** Prefabrication is no longer a "speed option" — it is a strategic necessity to ensure a project can actually be finished. Facilities that rely on traditional on-site labour are increasingly seeing 12–24 month schedule slippages, leading to "delayed revenue" risk for the 2027–2028 fiscal years.

---

## Supply Chain Stress Summary

| Node | Status | APAC-Specific Dynamic | Timeline to Ease |
|------|--------|----------------------|-----------------|
| Power | **Critical** | Grid interconnection 18–36 months; Singapore transmission limit; SEA nuclear 2035+ | 3–5 years |
| Silicon | **Tight** | Rubin supply capped at 200–300K in 2026; TSMC CoWoS booked | 12–18 months |
| Cooling | **Innovating** | Asia-based supply chain advantage; STT GDC HVDC testbed | Easing now |
| Land/Permitting | **Tightening** | Malaysia tightened permits; Singapore quota system; India greenfield runway | Market-specific |
| Connectivity | **Strategic** | Hyperscale-owned corridors; Singapore hub + route concentration; ICE II bypass | Persistent |
| Construction | **Stressed** | MEP talent war; 7–10% CAGR; OSM / prefab baseline; IST/commissioning risk | 2–3 years |

---

## What This Means for the Network Map

Each node in the Principal AI network map corresponds to a supply chain constraint. The interactive layer will allow logged-in users to click any node and see: current lead times, key vendors operating in the APAC region, geographic concentration of risk, and the companies navigating each constraint.

The following module — *The Worldview* — maps the companies across this supply chain, showing who is building, who is financing, and where capital is flowing.

---

*Next: Module 1 — Who Is Building the AI Cloud (APAC Edition)*

---

### Sources and References

- [JLL 2026 Global Data Center Outlook](https://www.jll.com/en-us/insights/market-outlook/data-center-outlook)
- [CBRE: Asia Pacific Data Centre Boom to Continue in 2026](https://www.cbre.com/insights/articles/asia-pacific-data-centre-boom-to-continue-in-2026)
- [PwC: Closing the Clean Energy Gap for APAC Data Centres](https://www.pwc.com/gx/en/asia-pacific/pwc-asia-pacific-data-centres-clean-energy-gap-2025.pdf)
- [Wood Mackenzie: SEA Data Centre Power Demand](https://www.woodmac.com/news/opinion/southeast-asian-data-centre-power-demand-is-set-to-explode/)
- [Wood Mackenzie: SEA Nuclear Ambitions Require US$208B](https://www.woodmac.com/press-releases/sea-nuclear-potential-2025/)
- [Deloitte: Powering APAC's Data Centre Boom](https://www.deloitte.com/southeast-asia/en/about/press-room/powering-asia-pacifics-data-centre-boom-new-deloitte-report-maps-pathway-for-data-centre-growth-without-grid-strain.html)
- [Cushman & Wakefield: APAC Data Centre Construction Cost Guide 2026](https://www.cushmanwakefield.com/en/insights/apac-data-centre-construction-cost-guide)
- [DigiTimes: NVIDIA Confirms Liquid Cooling as Standard](https://www.digitimes.com/news/a20260302PD225/nvidia-liquid-cooling-revenue-2026-earnings.html)
- [Meta: Candle Subsea Cable Announcement](https://engineering.fb.com/2025/10/05/connectivity/introducing-the-candle-subsea-cable-updates-to-our-asia-pacific-connectivity-projects/)
- [Nuclear Business Platform: SEA Data Centre Expansion and Nuclear](https://www.nuclearbusiness-platform.com/media/insights/southeast-asia-data-centre-expansion-nuclear)
