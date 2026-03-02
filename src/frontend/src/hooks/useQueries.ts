import { useQuery } from "@tanstack/react-query";
import type { Article } from "../backend.d";
import { useActor } from "./useActor";

// ── Category constants ──
export const CATEGORY_WORLD = "World";
export const CATEGORY_MIDDLE_EAST = "Middle East";
export const CATEGORY_POLITICS = "Politics";
export const CATEGORY_ANALYSIS = "Analysis";
export const CATEGORY_US = "US";
export const CATEGORY_EUROPE = "Europe";
export const CATEGORY_ASIA = "Asia";

const UNSPLASH = (id: string, w = 800) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

export const FALLBACK_ARTICLES: Article[] = [
  // Featured
  {
    id: BigInt(1),
    title: "UN Security Council Deadlocked Over Gaza Ceasefire Resolution",
    isFeatured: true,
    content:
      "The United Nations Security Council descended into a deepening impasse on January 15, 2026, after Russia and China cast simultaneous vetoes against a United States-drafted resolution demanding an immediate and unconditional ceasefire in the Gaza Strip. The resolution, which had been carefully negotiated over two weeks of back-channel diplomacy, called for an end to hostilities, unimpeded humanitarian access for aid organizations, and the release of all remaining hostages held in Gaza. With civilian casualties in the enclave surpassing previous recorded levels and international relief agencies warning of famine conditions across large parts of the territory, the deadlock drew condemnation from dozens of member states and renewed calls for Security Council reform.\n\nThe vetoes were not unexpected. Moscow and Beijing have consistently opposed what they characterize as selective Western pressure on the Israeli-Palestinian conflict, arguing that any resolution must be accompanied by a parallel commitment to address the root causes of Palestinian dispossession and must not be used as political leverage by the United States. Russia's UN Ambassador Vasily Nebenzya accused Washington of drafting the resolution in a manner designed to protect Israeli military interests rather than protect civilians, while China's Ambassador Fu Cong emphasized that durable peace requires recognition of Palestinian statehood and an end to the blockade of Gaza. The United States, in turn, defended its draft as a balanced framework and accused both veto-holders of using Palestinian lives as diplomatic pawns.\n\nThe Council's failure to act drew immediate and forceful responses from the broader international community. The UN General Assembly convened an emergency special session within forty-eight hours, with over 120 member states co-sponsoring a non-binding resolution calling for an immediate ceasefire — a measure that passed with 147 votes in favor, underscoring the extent to which Security Council dynamics have become disconnected from global consensus. UN Secretary-General António Guterres issued a rare statement invoking Article 99 of the UN Charter, formally notifying the Security Council that the Gaza situation posed a threat to international peace and security. Humanitarian agencies including the World Food Programme and UNRWA warned that without a pause in hostilities, their ability to operate in Gaza would collapse entirely within weeks. The deadlock has reinvigorated longstanding debates about the veto structure of the Security Council, with several European and Global South nations calling for an amendment to the UN Charter to limit veto use in cases involving mass civilian casualties.",
    date: "January 15, 2026",
    slug: "un-security-council-gaza-ceasefire",
    author: "MD Aun",
    readingTime: "8 min read",
    imageUrl: UNSPLASH("1529107386315-e1a2ed48a620", 1600),
    isBreaking: false,
    excerpt:
      "Russia and China vetoed a US-drafted resolution calling for an immediate ceasefire in Gaza, leaving the Security Council paralyzed as civilian casualties mount and international pressure intensifies.",
    category: CATEGORY_WORLD,
  },
  // World
  {
    id: BigInt(2),
    title: "NATO Summit Confronts New Russian Offensive in Eastern Europe",
    isFeatured: false,
    content:
      "NATO heads of state and government convened an emergency summit in Brussels on February 3, 2026, after Russian armed forces opened a new operational axis in northeastern Ukraine, pushing through forested terrain near the Sumy Oblast border and advancing toward three strategic towns in what military analysts described as the most significant territorial offensive in over eighteen months. The move came as Alliance leaders were already under intense pressure to reconcile diverging national commitments on defense spending and military aid, and the new offensive injected fresh urgency into deliberations about the adequacy of NATO's deterrence posture along its eastern flank.\n\nThe Russian advance tested the limits of NATO's formal posture in several critical ways. While Article 5 of the North Atlantic Treaty guarantees collective defense only in the event of an attack on Alliance territory, the renewed offensive on Ukrainian soil raised pointed questions about the threshold at which escalation could trigger a broader NATO response. Baltic states and Poland renewed calls for permanent forward-deployed combat brigades rather than the rotational presence model currently in effect, arguing that the Russian offensive demonstrated Moscow's willingness to exploit perceived gaps in deterrence. Germany and France, historically cautious about measures that could escalate the conflict, found themselves under pressure from Eastern flank partners to agree to enhanced pre-positioning of heavy armor and air defense systems. The summit also confronted a long-running dispute over defense spending targets, with the United States reiterating that the 2% of GDP commitment was a floor, not a ceiling, and demanding accelerated timelines for allies who had not yet met it.\n\nThe summit concluded with a joint communiqué condemning the Russian offensive in the strongest possible terms and pledging an additional €15 billion in collective military aid to Ukraine over the following six months, including air defense interceptors, artillery ammunition, and armored vehicles. Alliance leaders agreed to convene a special defense ministers' session within thirty days to finalize new forward-presence arrangements. Secretary General Mark Rutte stated that NATO's resolve was unshakeable but acknowledged that sustaining political consensus within an alliance of thirty-two nations facing divergent domestic pressures remained a formidable challenge. Ukrainian President Volodymyr Zelensky, addressing the summit via video link, called on allies to accelerate the delivery of long-range strike systems and to lift remaining restrictions on the use of NATO-supplied weapons to strike military targets inside Russian territory.",
    date: "February 3, 2026",
    slug: "nato-summit-russia-eastern-europe",
    author: "MD Aun",
    readingTime: "6 min read",
    imageUrl: UNSPLASH("1541872703-74c5e44368f9", 800),
    isBreaking: false,
    excerpt:
      "Alliance leaders convened an emergency session as Russian forces advanced along a new axis in northeastern Ukraine, testing NATO's Article 5 commitments and defense spending pledges.",
    category: CATEGORY_WORLD,
  },
  {
    id: BigInt(3),
    title: "Global Food Crisis Deepens as Climate Shocks Hit Harvests",
    isFeatured: false,
    content:
      "A convergence of extreme weather events across three continents has driven global food insecurity to its worst level since the 2007–2008 commodity price crisis, with the United Nations World Food Programme estimating on February 18, 2026, that an additional 60 million people have fallen into acute food insecurity over the past twelve months. Record-breaking droughts across sub-Saharan Africa — particularly in the Sahel, the Horn of Africa, and southern Africa — have devastated harvests of sorghum, maize, and millet, the dietary staples of hundreds of millions. Simultaneously, a prolonged heatwave and erratic monsoon season in South Asia significantly reduced rice and wheat output in India, Bangladesh, and Pakistan, compounding a supply shortfall that sent global grain futures to their highest level in a decade.\n\nThe structural vulnerabilities driving the crisis extend well beyond immediate weather anomalies. Decades of underinvestment in agricultural infrastructure across the Global South, heavy reliance on rain-fed agriculture with minimal irrigation coverage, and the disruption of global supply chains by ongoing geopolitical conflicts have collectively eroded the resilience of food systems in the most vulnerable regions. The ongoing Russia-Ukraine conflict continues to constrain Black Sea grain exports, maintaining pressure on wheat and sunflower oil prices. Meanwhile, the International Monetary Fund has noted that soaring food import bills are straining the foreign currency reserves of low-income food-importing countries, with several nations in the Sahel and East Africa facing potential balance-of-payments crises. The World Bank warned that without immediate food system investment and emergency financing, the developmental gains of the past two decades in reducing chronic malnutrition could be reversed within three years.\n\nThe international response has been substantial but widely assessed as insufficient relative to the scale of need. The UN's Food and Agriculture Organization launched an emergency appeal for $7.8 billion in humanitarian food assistance, having received pledges covering less than 40% of that target within the first two months. The G20 food security working group agreed in principle to release strategic grain reserves to stabilize markets, though coordination mechanisms remain contested. Climate scientists and food security experts are increasingly vocal that the crisis represents not an exceptional event but the leading edge of a new normal driven by accelerating climate disruption, and that meaningful long-term solutions require a fundamental transformation of agricultural practices, water management, and global commodity trading systems — changes that cannot be achieved within the timelines demanded by the current emergency.",
    date: "February 18, 2026",
    slug: "global-food-crisis-climate-2026",
    author: "MD Aun",
    readingTime: "5 min read",
    imageUrl: UNSPLASH("1569163139599-0f4517e36f51", 800),
    isBreaking: false,
    excerpt:
      "Record droughts across sub-Saharan Africa and South Asia have driven staple grain prices to decade highs, pushing an estimated 60 million more people into food insecurity this year.",
    category: CATEGORY_WORLD,
  },
  {
    id: BigInt(4),
    title: "IMF Warns of Synchronized Global Slowdown in 2026 Outlook",
    isFeatured: false,
    content:
      "The International Monetary Fund released its updated World Economic Outlook on March 1, 2026, downgrading global growth projections to 2.4% for the current year — a reduction of 0.6 percentage points from its October 2025 forecast and the lowest projected rate of global expansion since the 2020 pandemic recession. The revision reflects a convergence of headwinds that the Fund's economists describe as the most complex and mutually reinforcing set of constraints since the 1970s stagflation era. Elevated interest rates across advanced economies, persistent services inflation that has proved resistant to monetary tightening, declining trade volumes as geopolitical fragmentation drives regionalization of supply chains, and weakening consumer demand in China have all combined to produce what the IMF terms a 'synchronized stagnation' across the major engines of global growth.\n\nThe IMF's assessment identifies geopolitical fragmentation as a particularly novel and structurally damaging force. The progressive decoupling of the US and Chinese economies — manifesting in technology export controls, investment screening, and the reorganization of manufacturing supply chains around geopolitical alignments — is estimated to have permanently reduced global economic efficiency, with the Fund's modelling suggesting that full decoupling could reduce global GDP by up to 7% over the long term. The conflict in the Middle East, including the escalation of the Iran-Israel confrontation, has added a significant energy price risk premium, with Brent crude futures reflecting a geopolitical risk component that economists estimate is costing advanced oil-importing economies the equivalent of a 0.3 to 0.5 percentage point drag on annual growth. Emerging market economies face a particularly acute squeeze: dollar-denominated debt servicing costs remain elevated despite some easing of US interest rates, and commodity export revenues have been volatile.\n\nPolicy options for responding to the slowdown are constrained by the very conditions that produced it. Central banks in advanced economies face a delicate balancing act between cutting rates to support growth and maintaining credibility in their commitment to price stability, with several key monetary policymakers — including at the Federal Reserve and the European Central Bank — explicitly warning against premature easing. Fiscal space is limited in many advanced economies following years of elevated borrowing, while political polarization has made coordinated global stimulus responses difficult to achieve. The IMF called on G20 governments to accelerate structural reforms, invest in clean energy transition, and maintain open trade policies, while acknowledging that the political economy of such recommendations is deeply unfavorable. Developing countries, facing the double burden of debt distress and climate-related economic shocks, received a special note warning that without significant expansion of concessional financing, several frontier markets face the prospect of sovereign default within the next eighteen months.",
    date: "March 1, 2026",
    slug: "imf-global-slowdown-2026",
    author: "MD Aun",
    readingTime: "4 min read",
    imageUrl: UNSPLASH("1611974789855-9c2a0a7236a3", 800),
    isBreaking: false,
    excerpt:
      "The International Monetary Fund cut global growth projections to 2.4%, citing geopolitical fragmentation, elevated interest rates, and declining trade volumes across major economies.",
    category: CATEGORY_WORLD,
  },
  // Middle East
  {
    id: BigInt(5),
    title: "Ceasefire Negotiations Stall as Gaza Reconstruction Talks Begin",
    isFeatured: false,
    content:
      "Diplomatic efforts to secure a permanent ceasefire in Gaza suffered a significant setback on January 22, 2026, as mediators from Qatar and Egypt confirmed that talks had broken down after both parties refused to move from incompatible positions on several core issues. The Qatari Foreign Ministry issued a carefully worded statement acknowledging that 'constructive dialogue has reached an impasse,' while Egyptian officials, speaking on background, described the session as the most difficult in months. The breakdown occurred despite weeks of intensive shuttle diplomacy by both Doha and Cairo, as well as behind-the-scenes pressure from Washington, which had publicly committed to securing a deal before a significant diplomatic deadline.\n\nThe core dispute centers on a set of interlocking demands that each side views as non-negotiable. Israeli negotiators have insisted on the right to resume military operations against remaining Hamas military infrastructure after any temporary pause, and have demanded a complete and verifiable dismantlement of Hamas's governing authority in Gaza as a precondition for any permanent ceasefire. Hamas negotiators, in turn, have demanded a complete Israeli withdrawal from Gaza, an end to the blockade, and guarantees of their continued political role in any post-conflict governance arrangement — conditions that Israeli officials have publicly and categorically rejected. Mediators have attempted various formulas to bridge these positions, including phased ceasefires with extended review periods, but have so far been unable to produce language that both parties would accept. The situation is further complicated by the simultaneous emergence of competing reconstruction plans backed by different regional powers, with the United Arab Emirates, Saudi Arabia, and Qatar each advancing visions for Gaza's future governance that carry implicit implications for the political balance of power.\n\nThe collapse of negotiations has drawn renewed international pressure on both parties. The United States Special Envoy for Middle East Peace, speaking at a Washington press conference, expressed frustration while reiterating the administration's commitment to continued mediation. The European Union called for an immediate resumption of talks with no preconditions, while the United Nations Relief and Works Agency warned that the absence of a ceasefire agreement was making long-term reconstruction planning impossible in the face of ongoing population displacement and infrastructure destruction. Analysts note that the talks have acquired additional complexity from the broader regional escalation involving Iran and Israel, which has diverted diplomatic bandwidth from the Gaza file and introduced new variables into regional power calculations. Several senior humanitarian officials have warned that without a breakthrough, the enclave faces a multi-year period of protracted instability that could render meaningful reconstruction effectively impossible.",
    date: "January 22, 2026",
    slug: "gaza-ceasefire-reconstruction-talks",
    author: "MD Aun",
    readingTime: "7 min read",
    imageUrl: UNSPLASH("1546074177-ffdda98d214f", 800),
    isBreaking: false,
    excerpt:
      "Mediators from Qatar and Egypt reported a breakdown in the latest round of negotiations as both parties hardened their positions over the terms of a permanent ceasefire agreement.",
    category: CATEGORY_MIDDLE_EAST,
  },
  {
    id: BigInt(6),
    title: "Iran Nuclear Talks Resume in Vienna Amid Regional Tensions",
    isFeatured: false,
    content:
      "Diplomatic teams representing Iran and the P5+1 nations — the United States, United Kingdom, France, Germany, Russia, and China — returned to Vienna on February 10, 2026, for the first substantive negotiations in eight months, amid a regional security environment that has grown substantially more volatile since the last round of talks collapsed in mid-2025. The sessions, held at the Vienna International Centre under the facilitation of the European Union's chief diplomatic coordinator, were described by participating officials as exploratory in nature, aimed at identifying whether sufficient common ground exists to justify a full negotiating round. The resumption itself was viewed by Western diplomats as a cautiously positive development, though the distance between the parties on core technical issues — particularly the permissible level of uranium enrichment and the timeline for lifting economic sanctions — remains formidable.\n\nThe fundamental challenge confronting the negotiations has deepened considerably since the 2015 Joint Comprehensive Plan of Action was abandoned. Iran has advanced its nuclear program significantly in the intervening years: as of early 2026, the International Atomic Energy Agency has documented Iranian enrichment of uranium to 60% purity, a level that would require only limited additional technical steps to reach weapons-grade 90%. Iran's total stockpile of enriched uranium now vastly exceeds JCPOA limits, and the country has installed advanced centrifuge cascades that can dramatically shorten the breakout timeline to a potential nuclear weapon. Iran's position in Vienna has centered on demands for a complete lifting of all US sanctions imposed since 2018, including those re-imposed after the Trump administration's JCPOA withdrawal, plus guarantees that no future US administration could unilaterally reimpose sanctions without triggering a formal international dispute mechanism. Western negotiators, while expressing willingness to offer substantial sanctions relief, have resisted permanent legal commitments that could limit future executive discretion.\n\nThe backdrop of escalating regional conflict between Israel and Iran has introduced an additional and complicating layer of strategic calculation into the Vienna talks. Israeli officials have been explicit in their view that any agreement must include zero tolerance for Iranian enrichment above 5% and a binding commitment to dismantle advanced centrifuge infrastructure — conditions that Iran has publicly rejected as maximalist and incompatible with its sovereign right to develop peaceful nuclear technology. Analysts at the International Crisis Group and the Carnegie Endowment for International Peace have noted that the combination of Iran's advanced nuclear posture, the collapse of regional security, and the domestic political constraints facing each negotiating party represents the most challenging environment for a comprehensive nuclear deal since the original JCPOA negotiations. Absent a significant breakthrough, experts assess that the talks risk serving as a holding action rather than a genuine path toward durable non-proliferation.",
    date: "February 10, 2026",
    slug: "iran-nuclear-talks-vienna-2026",
    author: "MD Aun",
    readingTime: "6 min read",
    imageUrl: UNSPLASH("1521791055366-0236500763e1", 800),
    isBreaking: false,
    excerpt:
      "Diplomatic teams from Iran and P5+1 nations returned to Vienna for the first substantive talks in eight months, though analysts remain skeptical about bridging gaps on enrichment limits.",
    category: CATEGORY_MIDDLE_EAST,
  },
  {
    id: BigInt(7),
    title: "Saudi Arabia Accelerates Vision 2030 with New Tech Investment",
    isFeatured: false,
    content:
      "Saudi Arabia announced on March 1, 2026, a new $200 billion sovereign investment tranche — to be deployed over the next five years — targeting artificial intelligence infrastructure, renewable energy generation, and advanced manufacturing, in what Crown Prince Mohammed bin Salman described as the decisive acceleration phase of Vision 2030, the kingdom's sweeping plan to reduce economic dependence on hydrocarbon revenues. The investment package, to be channeled primarily through the Public Investment Fund and a newly established National AI Infrastructure Authority, is the largest single economic transformation commitment in the country's history and represents a significant deepening of Saudi Arabia's integration into the global technology economy. Projects announced at a high-profile Riyadh investment forum include three large-scale hyperscale data center campuses, a 15-gigawatt renewable energy expansion across the kingdom, and a cluster of advanced manufacturing facilities in the NEOM megacity project intended to produce semiconductors and robotics components.\n\nThe scale of the commitment reflects both opportunity and urgency. Saudi Arabia's economy, despite years of Vision 2030 reforms, remains heavily dependent on oil revenue for government income, and the kingdom's leadership is acutely aware that the long-term trajectory of global oil demand — shaped by the accelerating transition to electric vehicles and renewable energy — poses a structural threat to its fiscal model. The surge in global AI investment over the preceding three years created an opening that Riyadh moved quickly to exploit, leveraging its sovereign wealth to attract partnerships with major American, European, and Asian technology companies. Several leading AI hardware and software firms have signed memoranda of understanding to establish research and development centers in Saudi Arabia, attracted by a combination of low-cost energy, proximity to emerging Asian and African markets, and significant financial incentives. The kingdom has also positioned itself as a neutral technology partner for nations seeking alternatives to both US-dominated and Chinese-dominated digital infrastructure ecosystems.\n\nThe announcement has been received with a mixture of enthusiasm and measured skepticism by international analysts. Economic commentators have praised the scale of ambition and the strategic coherence of the AI and energy focus, while noting that execution risk remains high in a kingdom that has faced persistent challenges with private sector development, bureaucratic efficiency, and the integration of its large youth population into a modern knowledge economy. Human rights organizations have reiterated concerns about labor conditions in megaproject construction and the political environment for the domestic private sector. Regional competitors — particularly the United Arab Emirates, which has been an aggressive first-mover in AI investment through its Abu Dhabi Advanced Technology Research Council and the G42 AI conglomerate — are expected to respond with their own expanded commitments, suggesting that a technology investment race among Gulf sovereigns is intensifying.",
    date: "March 1, 2026",
    slug: "saudi-vision-2030-tech-investment",
    author: "MD Aun",
    readingTime: "4 min read",
    imageUrl: UNSPLASH("1580537659466-0a9bfa916a54", 800),
    isBreaking: false,
    excerpt:
      "Riyadh announced a $200 billion sovereign investment tranche targeting AI infrastructure, renewable energy, and advanced manufacturing as part of its accelerated economic transformation agenda.",
    category: CATEGORY_MIDDLE_EAST,
  },
  // Politics
  {
    id: BigInt(8),
    title:
      "US Congress Passes Sweeping AI Regulation Bill After Year of Debate",
    isFeatured: false,
    content:
      "The United States Congress passed the Artificial Intelligence Accountability Act on January 28, 2026, with the Senate clearing the measure 68 to 32 in a bipartisan vote that defied predictions of partisan gridlock and marked the most significant federal technology regulation in over two decades. The legislation, which cleared the House of Representatives the previous week with a similarly broad majority, establishes a comprehensive federal framework for the oversight of high-risk artificial intelligence systems, creating mandatory pre-deployment safety testing requirements, transparency and disclosure obligations for developers and deployers of frontier AI models, and a new independent federal agency — the Office of Artificial Intelligence Safety — with investigative and enforcement authority. The bill's passage came after more than fourteen months of intense lobbying, committee deliberation, and negotiation between technology industry representatives, consumer advocacy groups, academic researchers, and national security officials.\n\nThe legislation reflects a bipartisan consensus that the rapid expansion of advanced AI capabilities has outpaced the existing regulatory and legal framework, creating risks — ranging from autonomous weapons systems and manipulation of democratic processes to mass workforce displacement and surveillance — that cannot be adequately addressed through voluntary industry commitments or existing sectoral regulations. The Act draws a tiered risk classification system, modeled in part on the European Union's AI Act, distinguishing between prohibited applications, high-risk systems requiring pre-market approval, and general-purpose systems subject to transparency obligations. Frontier AI models above a defined computational threshold are subject to mandatory registration with the new oversight office, pre-deployment safety evaluations by accredited third-party auditors, and ongoing incident reporting requirements. The legislation also includes provisions addressing AI-generated disinformation, requiring labeling of synthetic media and prohibiting the use of AI to produce deceptive content intended to influence federal elections.\n\nReaction to the passage has been sharply divided along predictable but not always partisan lines. Major technology companies operating in the AI space — including several of the largest frontier model developers — issued statements expressing cautious support for the legislation's safety testing framework while raising concerns about implementation timelines and the potential for compliance burdens to disadvantage American companies relative to less-regulated foreign competitors, particularly from China. Civil liberties organizations broadly welcomed the measure while arguing that its provisions on government use of AI facial recognition and predictive policing systems should have been more restrictive. International observers noted that the US legislation, while broadly aligned with the EU AI Act, creates a parallel regulatory architecture that may complicate compliance for global AI companies and reignite transatlantic debates about regulatory equivalence. Academic AI safety researchers largely praised the creation of the new oversight office, though several prominent voices argued that the risk classification thresholds were drawn too conservatively to adequately address the capabilities of the most advanced next-generation systems.",
    date: "January 28, 2026",
    slug: "us-congress-ai-regulation-bill",
    author: "MD Aun",
    readingTime: "5 min read",
    imageUrl: UNSPLASH("1518770660439-4636190af475", 800),
    isBreaking: false,
    excerpt:
      "The bipartisan Artificial Intelligence Accountability Act cleared the Senate 68-32, establishing mandatory safety testing, disclosure requirements, and a new federal oversight office for high-risk AI systems.",
    category: CATEGORY_POLITICS,
  },
  {
    id: BigInt(9),
    title: "European Parliament Votes on Migration Policy Overhaul",
    isFeatured: false,
    content:
      "The European Parliament voted on February 14, 2026, to approve a comprehensive asylum reform package — the New Pact on Migration and Asylum — that fundamentally restructures how the European Union processes, distributes, and manages asylum seekers arriving at its borders. The package, which passed with 342 votes in favor, 271 against, and 34 abstentions, centralizes border processing at EU external frontiers, introduces a mandatory solidarity mechanism requiring member states to either accept a quota of asylum seekers or contribute financial compensation to frontline states, and accelerates the processing timeline for applications from nationals of countries deemed safe third countries. The vote culminated years of contentious negotiations that repeatedly exposed deep political fault lines between member states and triggered crises within successive coalition governments across the bloc.\n\nThe legislation responds to a structural challenge that has resisted resolution since the 2015 migration crisis revealed the inadequacy of the Dublin Regulation's country-of-first-entry framework for distributing the processing burden. Under the existing system, frontline states — particularly Italy, Greece, and Malta — bore a disproportionate share of arrivals without commensurate support from northern and central European member states. The new pact attempts to create a more equitable distribution mechanism while simultaneously increasing the efficiency and speed of border processing, including through the use of AI-assisted screening tools for initial triage of asylum claims. The legislation also tightens the criteria for international protection and introduces new provisions for the return of individuals whose claims are rejected, including enhanced agreements with third-country governments for readmission.\n\nThe passage of the legislation was immediately followed by sharp political backlash from several quarters. Hungary and Poland — already in longstanding disputes with Brussels over the rule of law — announced their intention to challenge the mandatory quota provisions before the European Court of Justice, arguing that the solidarity mechanism infringes on national sovereignty in matters of domestic security and demographic policy. Austria and Slovakia also signaled reservations, while Italy, which had lobbied most forcefully for reform, welcomed the outcome but warned that implementation would require robust EU funding for reception infrastructure. Progressive and Green MEPs argued that the new fast-track processing procedures at borders risked compromising the right to a thorough examination of asylum claims and potentially violating the principle of non-refoulement under international law. Human rights organizations including Amnesty International and Human Rights Watch issued critical statements warning that the legislation prioritizes migration management over protection obligations, and several organizations pledged to mount legal challenges to specific provisions of the act.",
    date: "February 14, 2026",
    slug: "european-parliament-migration-policy",
    author: "MD Aun",
    readingTime: "6 min read",
    imageUrl: UNSPLASH("1572949645880-007c1f57d42e", 800),
    isBreaking: false,
    excerpt:
      "MEPs approved a controversial asylum reform package that centralizes border processing and introduces mandatory burden-sharing quotas, prompting sharp criticism from Eastern European member states.",
    category: CATEGORY_POLITICS,
  },
  {
    id: BigInt(10),
    title: "India-China Border Diplomacy Sees Cautious Progress in 2026",
    isFeatured: false,
    content:
      "Senior military commanders from India and China concluded a new round of Corps Commander-level talks on March 1, 2026, announcing a provisional agreement on the disengagement and buffer zone arrangement for a second friction point along the contested Line of Actual Control in eastern Ladakh. The agreement covers the Demchok sector, where both sides had maintained forward deployments since a series of confrontations in late 2024 that had temporarily halted the diplomatic progress achieved after the Galwan Valley standoff. Officials from both countries described the development as a significant confidence-building measure, though both sides were careful to characterize the agreement as provisional pending verification through the established military monitoring mechanism and satellite surveillance.\n\nThe agreement is the product of more than two years of painstaking military diplomacy conducted through the Working Mechanism for Consultation and Coordination on India-China Border Affairs and the diplomatic channel between the two countries' foreign ministries. Progress has been deliberately incremental, reflecting the extreme sensitivity of sovereignty claims along the LAC and the domestic political constraints facing both governments. China's approach to the talks has been shaped in part by its interest in stabilizing the Himalayan border as it manages a complex set of strategic priorities elsewhere — including the Taiwan Strait, South China Sea, and the economic pressures of a slowing domestic economy. For India, the talks must navigate intense domestic political attention to the border issue and a broad consensus across the political spectrum that any agreement must restore the pre-April 2020 status quo at all friction points, not merely achieve disengagement at individual locations.\n\nAnalysts and regional security experts have welcomed the development while cautioning against interpreting it as a fundamental shift in the strategic competition between the two Asian powers. The Brookings Institution's South Asia program noted that previous rounds of disengagement — at Pangong Lake in 2021 and Gogra-Hot Springs in 2022 — did not prevent subsequent friction at new points along the LAC, suggesting that structural ambiguities in the border alignment will continue to generate periodic confrontations. Observers have also noted that broader India-China relations remain deeply strained by competition for influence across South Asia and the Indian Ocean, diverging alignments with the United States and Russia respectively, and ongoing disputes over trade and technology. The cautious diplomatic progress on the border file is viewed as a necessary but not sufficient condition for the kind of sustained bilateral stabilization that both capitals have signaled they desire.",
    date: "March 1, 2026",
    slug: "india-china-border-diplomacy-2026",
    author: "MD Aun",
    readingTime: "5 min read",
    imageUrl: UNSPLASH("1504711434969-e33886168f5c", 800),
    isBreaking: false,
    excerpt:
      "Senior military commanders from India and China reached a provisional agreement on a second disengagement site along the Line of Actual Control, raising cautious optimism for bilateral stabilization.",
    category: CATEGORY_POLITICS,
  },
  // Analysis
  {
    id: BigInt(11),
    title: "The Israel–Iran Conflict: A Comprehensive Analysis",
    isFeatured: false,
    content: "israel-iran-full-content",
    date: "January 10, 2026",
    slug: "israel-iran-conflict-analysis",
    author: "MD Aun",
    readingTime: "15 min read",
    imageUrl: UNSPLASH("1525026760597-50c5a6f26e78", 800),
    isBreaking: false,
    excerpt:
      "From pre-1979 alliance to proxy wars, nuclear brinkmanship, and the first direct state-on-state missile exchange — a comprehensive factual analysis of one of the defining geopolitical rivalries of our era.",
    category: CATEGORY_ANALYSIS,
  },
  {
    id: BigInt(12),
    title: "The New Cold War: How Great Power Competition Reshaped 2025",
    isFeatured: false,
    content:
      "The year 2025 will be recorded by historians as one in which the foundational architecture of the post-Cold War international order — built on the premises of economic interdependence, multilateral governance, and the gradual convergence of political systems — suffered its most systematic and sustained challenge since the rules-based order was constructed in the aftermath of World War II. US-China strategic competition intensified across every domain: technology, finance, military posture, and the contest for influence across the Global South. Russia's ongoing war against Ukraine entered its third year with no clear trajectory toward resolution, with the conflict consuming extraordinary quantities of materiel and human life while reshaping European security architecture and straining the solidarity of the Western coalition. The Middle East erupted into a new phase of direct state-on-state confrontation that drew in the United States and threatened to unravel the regional order that had been carefully constructed over decades of American-led security guarantees.\n\nThe concept of the New Cold War captures important dimensions of the current rivalry but also obscures critical differences from its twentieth-century predecessor. Unlike the original Cold War, the current era of great power competition does not feature a sharp ideological division between capitalism and communism in the style of the Cold War's defining binary; instead, it is characterized by competing authoritarian and democratic capitalisms locked in a struggle for technological supremacy, resource access, and normative influence. The economic interconnection between rivals — particularly the deep trade and financial linkages between the United States and China — creates a paradoxical situation in which adversaries are simultaneously dependent on and competing against one another. The multiplication of flashpoints — from Taiwan and the South China Sea to the Arctic, cyberspace, and the Global South's infrastructure investment landscape — means that unlike the Cold War's relatively stable bipolar structure, the current competition is multi-polar, multi-domain, and significantly less predictable in its escalation dynamics.\n\nThe geopolitical consequences of 2025 extended beyond the immediate zone of conflict to reshape the architecture of global institutions, trade patterns, and security alignments. The United Nations Security Council's chronic dysfunction — with permanent members on opposing sides of every major conflict — has accelerated the emergence of parallel institutional frameworks: G7 versus SCO, QUAD versus BRI-aligned blocs, competing AI governance regimes and semiconductor trade architectures. The fracturing of multilateral trade institutions, already advanced by successive waves of tariffs and export controls, continued to produce a more fragmented and less efficient global economy. Yet the year also revealed the limits of great power competition: the Israel-Iran escalation demonstrated that regional dynamics can acquire their own logic and force major powers into difficult calculations they had sought to avoid, while the global food and climate crises demonstrated that certain categories of collective action problem cannot be solved by competing blocs acting in isolation. Whether the great powers can develop mechanisms for cooperation in the face of systemic global challenges while simultaneously competing across all other domains remains the defining geopolitical question of the era.",
    date: "March 1, 2026",
    slug: "new-cold-war-great-power-competition",
    author: "MD Aun",
    readingTime: "12 min read",
    imageUrl: UNSPLASH("1486325212027-8081e485255e", 800),
    isBreaking: false,
    excerpt:
      "US-China rivalry, Russia's continued belligerence, and the fracturing of multilateral institutions defined a year in which the rules-based international order faced its most sustained challenge since 1945.",
    category: CATEGORY_ANALYSIS,
  },
  // US
  {
    id: BigInt(17),
    title: "US Federal Reserve Holds Rates Amid Inflation Uncertainty",
    isFeatured: false,
    content:
      "The Federal Open Market Committee voted 10 to 2 to maintain the federal funds rate at its target range of 4.5 to 4.75% at its February 2026 policy meeting, marking the third consecutive hold as policymakers wrestled with a contradictory economic environment in which headline inflation had moderated but services inflation remained stubbornly elevated and labor market data sent conflicting signals about the underlying health of the economy. Federal Reserve Chair Jerome Powell, in the press conference following the decision, acknowledged the complexity of the current environment, describing the FOMC's posture as 'carefully attentive to both sides of our dual mandate' and declining to provide forward guidance on the timing of any future rate adjustment. The two dissenting votes — both in favor of a 25-basis-point cut — reflected growing concern among some Committee members that holding rates at the current level risks unnecessary drag on economic activity without commensurate benefit to inflation containment.\n\nThe Fed's dilemma is rooted in a structural shift in the US inflation landscape that has persisted since the 2022–2023 tightening cycle. While goods inflation has largely normalized, services inflation — driven by shelter costs, healthcare, professional services, and financial services — has remained elevated at approximately 4.1% year-on-year, well above the Fed's 2% target. Labor market data has added to the confusion: while headline unemployment remains at 4.3%, recent revisions to non-farm payroll data have shown significantly lower job creation than initially reported, and measures of labor force participation have softened. The interplay between still-robust nominal wage growth and moderating real wage gains has produced an economic environment in which consumer spending has remained resilient but with signs of increasing financial stress among lower-income households relying on credit card borrowing. The Middle East escalation and its impact on oil prices introduced an additional complicating variable that FOMC officials privately described as one of the key sources of uncertainty weighing on the decision to hold.\n\nThe Fed's decision to hold was broadly anticipated by financial markets and produced only a modest reaction in equity and bond markets. However, the monetary policy debate has acquired unusual political dimensions in the current environment, with several senior administration officials publicly suggesting that lower rates would support economic growth and help the administration manage the fiscal implications of its domestic spending priorities. Fed officials have repeatedly emphasized the institution's operational independence while acknowledging that the political environment presents reputational risks to the credibility of monetary policy. Economists at major investment banks have broadly forecast that the first rate cut of 2026 is likely to occur at either the May or June FOMC meeting, contingent on continued moderation in services inflation, though the Middle East situation and its potential impact on energy prices has introduced a tail risk scenario in which the Fed may find itself confronting an energy-driven inflation spike at the same time that growth signals are weakening — the stagflationary combination that monetary policymakers most fear.",
    date: "February 20, 2026",
    slug: "us-federal-reserve-rates-2026",
    author: "MD Aun",
    readingTime: "5 min read",
    imageUrl: UNSPLASH("1444653614773-995674bc4f29", 800),
    isBreaking: false,
    excerpt:
      "The Federal Open Market Committee voted 10-2 to maintain the benchmark rate at 4.75%, citing conflicting signals from the labor market and persistent services inflation as key uncertainties.",
    category: CATEGORY_US,
  },
  {
    id: BigInt(18),
    title: "US-Mexico Border Policy Faces Legal Challenge in Federal Court",
    isFeatured: false,
    content:
      "A federal district court in the Southern District of Texas issued a sweeping preliminary injunction on February 25, 2026, blocking several key provisions of the administration's expanded border enforcement policy, in a ruling that directly challenged the legal authority of a series of executive orders and agency directives that the administration had implemented over the preceding eight months to significantly restrict asylum access and accelerate removal proceedings at the US-Mexico border. Judge Maria Elena Cantu, a Clinton-era appointee, held that the challenged provisions likely violated the Immigration and Nationality Act, the Administrative Procedure Act, and the Fifth Amendment's due process protections, and that the plaintiffs — a coalition of immigration advocacy organizations, states, and affected individuals — had demonstrated a sufficient likelihood of success on the merits to justify injunctive relief pending full judicial review. The ruling immediately suspended enforcement of the challenged measures across the fifth circuit district covered by the court's jurisdiction.\n\nThe administration's border policy framework, which represents one of the most aggressive executive actions on immigration in the modern era, includes several highly contested provisions: a novel application of a public health statute to authorize expedited removal without asylum screening, a dramatically expanded 'Remain in Mexico' protocol requiring non-Mexican asylum seekers to await proceedings in Mexico, numerical caps on daily asylum processing entries at official ports of entry, and enhanced cooperation with state law enforcement under a reinterpreted version of the federal-state immigration enforcement partnership program. Administration officials argued that each of these measures was authorized by existing statutory authority and represented a legitimate exercise of executive discretion to manage a genuine border security emergency. Critics, including the challengers in the Texas case, argued that the measures circumvented the statutory asylum process established by Congress and effectively closed the border to protection seekers in violation of both domestic law and international refugee law obligations.\n\nThe ruling sets the stage for an accelerated appellate process that legal analysts widely expect to reach the Supreme Court within the next twelve months, adding immigration enforcement to the already crowded docket of politically charged cases facing the Court. The Fifth Circuit Court of Appeals, which reviews decisions from the Southern District of Texas, has in recent years been a consistent supporter of expansive executive immigration enforcement authority, making it likely that the preliminary injunction will face a swift appeal and a potentially different outcome at the circuit level before any Supreme Court consideration. Legal scholars note that the current Court's conservative supermajority has shown a general willingness to expand executive authority in immigration matters while being skeptical of administrative law challenges under the APA. For the millions of individuals whose asylum and immigration status is affected by the disputed provisions, the legal uncertainty creates a period of profound vulnerability that advocacy organizations describe as a humanitarian concern of the first order.",
    date: "February 25, 2026",
    slug: "us-mexico-border-policy-legal-challenge",
    author: "MD Aun",
    readingTime: "6 min read",
    imageUrl: UNSPLASH("1541872703-74c5e44368f9", 800),
    isBreaking: false,
    excerpt:
      "A federal district court in Texas issued a preliminary injunction blocking key provisions of the administration's expanded border enforcement policy, setting the stage for a Supreme Court confrontation.",
    category: CATEGORY_US,
  },
  {
    id: BigInt(19),
    title: "Silicon Valley Layoffs Continue as AI Automation Accelerates",
    isFeatured: false,
    content:
      "Major technology companies collectively announced approximately 45,000 job reductions across the first quarter of 2026, continuing a wave of workforce restructuring that began in earnest in late 2024 and has progressively accelerated as firms integrate AI-driven automation into their software engineering, customer support, content moderation, data analysis, and administrative functions. The companies announcing reductions — which include several of the largest and most profitable technology firms in the world — were notably candid in their public statements about the role of AI productivity tools in driving the restructuring decisions, with several chief executives explicitly citing AI-augmented workforce efficiency as enabling the same or greater output with substantially fewer employees. This transparency represents a departure from the more circumspect language used in earlier rounds of tech layoffs, which tended to be attributed primarily to macroeconomic headwinds or post-pandemic hiring corrections.\n\nThe structural shift underway in the technology sector reflects a broader transformation of the knowledge economy that economists and labor market researchers had long forecast but whose pace and intensity has surprised many analysts. AI coding assistants and autonomous software development agents have dramatically reduced the number of human engineers required to build and maintain software systems of equivalent complexity. AI-powered customer service and support systems have eliminated tens of thousands of human agent positions at technology companies and their enterprise clients. Content generation, quality assurance, and data annotation roles — areas in which the technology industry employed large numbers of workers, often via contractor arrangements — have been substantially automated. The paradox noted by multiple economists is that these changes are occurring at the same time that overall technology sector revenues and market capitalizations remain at or near record levels, meaning that the productivity gains are accruing primarily to capital rather than to labor — a dynamic that is intensifying wealth inequality and renewing debates about the adequacy of the social safety net for displaced workers.\n\nThe political and policy response to the accelerating automation-driven displacement has been uneven and largely reactive. The recently passed Artificial Intelligence Accountability Act includes provisions requiring large employers to notify the Department of Labor when AI automation is a contributing factor in mass layoff decisions above a specified threshold, a measure that employment advocacy groups welcomed as a first step toward policy transparency while arguing it falls far short of addressing the underlying economic disruption. Several members of Congress from technology-heavy constituencies have introduced bills proposing enhanced unemployment insurance for AI-displaced workers, government-funded retraining programs, and research initiatives to identify and invest in sectors capable of absorbing displaced labor at scale. Labor economists caution that the historical analogy often invoked — that previous technological disruptions ultimately created more jobs than they destroyed — may not apply with the same force to AI, which, unlike previous automation waves, is capable of substituting for cognitive and judgment-based work rather than merely physical or routine tasks.",
    date: "March 1, 2026",
    slug: "silicon-valley-layoffs-ai-automation-2026",
    author: "MD Aun",
    readingTime: "7 min read",
    imageUrl: UNSPLASH("1518770660439-4636190af475", 800),
    isBreaking: false,
    excerpt:
      "Major tech companies collectively announced 45,000 job cuts in the first quarter of 2026, with executives citing AI-driven productivity gains as the primary factor restructuring their workforce needs.",
    category: CATEGORY_US,
  },
  // Europe
  {
    id: BigInt(20),
    title: "Germany Announces Record Defense Budget for 2026-2027 Fiscal Year",
    isFeatured: false,
    content:
      "The German Bundestag approved a federal budget for the 2026-2027 fiscal year on January 30, 2026, that allocates 2.5% of GDP to defense spending — the highest proportion since German reunification in 1990, the fulfillment of a NATO commitment that Germany had failed to meet for three consecutive decades, and a figure that represents a near-doubling of the defense share of public expenditure compared to the pre-Ukraine-war baseline. Defense Minister Boris Pistorius, in presenting the budget to parliament, described the allocation as a recognition that Germany had entered a new era of strategic responsibility and that the Zeitenwende — the fundamental strategic reorientation announced by Chancellor Scholz in February 2022 in response to Russia's full-scale invasion of Ukraine — had moved from rhetorical commitment to structural fiscal reality. The approved budget includes €83 billion in defense spending over the two-year period, funding a comprehensive modernization program for the Bundeswehr's ground forces, significant expansion of air defense capabilities, investment in naval capacity in the Baltic and North Seas, and long-overdue procurement of cyber and space defense systems.\n\nGermany's defense spending transformation represents the most significant shift in European strategic culture since the end of the Cold War. For decades, Germany's low defense spending was simultaneously a financial convenience, a reflection of post-World War II constitutional and political constraints on militarism, and — in the view of NATO partners — a form of free-riding on American security guarantees. The sustained Russian military pressure on Europe's eastern flank, combined with persistent uncertainty about the reliability of US commitment to NATO's Article 5 guarantee given the volatility of American domestic politics, has produced a bipartisan German consensus that strategic autonomy requires substantial self-reliance in defense capacity. The budget also reflects recommendations from the Bundeswehr's own assessments, which identified critical capability gaps in ammunition stocks, readiness of armored units, and integration of digital warfare systems.\n\nThe German defense spending surge is part of a broader pattern of European rearmament that is reshaping the continent's security architecture. Poland, which borders both Russia and Belarus, has committed to reaching 4% of GDP in defense spending — among the highest in NATO. The Baltic states have accelerated programs to build comprehensive territorial defense capabilities. France has maintained its position as Europe's preeminent nuclear power while increasing conventional defense investment. The cumulative effect is a NATO European pillar that is, for the first time in the post-Cold War era, taking on a genuinely larger share of its own defense burden — a development that has been broadly welcomed in Washington across both major parties, though US officials have also cautioned that increased European defense capacity should reinforce rather than compete with transatlantic institutional solidarity. Analysts at the European Council on Foreign Relations note that the challenge now shifts from commitment to capability: building the military-industrial capacity to actually produce and deploy the systems funded by expanded budgets, a challenge that will take years to fully resolve.",
    date: "January 30, 2026",
    slug: "germany-record-defense-budget-2026",
    author: "MD Aun",
    readingTime: "5 min read",
    imageUrl: UNSPLASH("1486325212027-8081e485255e", 800),
    isBreaking: false,
    excerpt:
      "Berlin approved a 2.5% of GDP defense allocation for the upcoming fiscal year, the highest since reunification, fulfilling its long-delayed NATO commitment and signaling a fundamental shift in German strategic culture.",
    category: CATEGORY_EUROPE,
  },
  {
    id: BigInt(21),
    title: "France-UK Nuclear Sharing Agreement Reshapes European Security",
    isFeatured: false,
    content:
      "The governments of France and the United Kingdom announced on February 8, 2026, a landmark bilateral agreement on nuclear deterrence coordination that extends de facto security guarantees to European partners through a new consultative mechanism and a commitment to coordinate nuclear posture in defense of European territorial integrity. The announcement, made jointly by French President Emmanuel Macron and UK Prime Minister during a summit in Paris, establishes a standing bilateral nuclear consultation committee, commits France and the UK to quarterly joint assessments of nuclear deterrence requirements vis-à-vis adversary capabilities, and — most significantly — contains language signaling that a nuclear attack on any NATO European ally could trigger a French or British nuclear response. Analysts described the agreement as the most consequential development in European security architecture since the formation of NATO itself, representing Europe's first concrete step toward an autonomous nuclear deterrence dimension that does not rely solely on the American extended deterrent.\n\nThe agreement's geopolitical context is inseparable from the uncertainty introduced by the volatility of American domestic politics and the periodic questioning of US commitments to Article 5 by influential voices in the American political landscape. French and British officials, in background briefings with reporters, made clear that the agreement was designed in part to address a structural vulnerability in European security: the fact that Europe's nuclear deterrent had historically resided exclusively in Washington's hands, with European allies possessing no independent ability to deter nuclear coercion. France has long maintained the position that its Force de Frappe nuclear arsenal serves not merely French national security but the broader European interest, and the new agreement represents the most formal articulation of that doctrine to date. For the United Kingdom, the agreement reflects a post-Brexit foreign policy objective of maintaining its strategic relevance to European security even outside EU institutional structures.\n\nThe reaction to the Franco-British agreement has been complex and in some cases sharply divided. Germany, while publicly welcoming any enhancement of European security guarantees, has historically been extremely sensitive to questions of nuclear weapons given its post-World War II constitutional constraints and public opinion, and senior German officials were careful to frame their response as supportive of enhanced European conventional deterrence while not endorsing any framework that might suggest German nuclear participation. Smaller European allies, particularly the Baltic states and Poland, welcomed the agreement as an important signal of commitment but noted that it does not replace the need for robust US forward presence and conventional deterrence along the eastern flank. Arms control experts expressed concern that the agreement could complicate existing non-proliferation frameworks and potentially trigger Russian and Chinese demands for reciprocal extensions of their own nuclear guarantees to allied states. The United States government offered measured support while privately emphasizing that the Franco-British initiative should be seen as a complement to, rather than a substitute for, NATO's integrated nuclear planning structure.",
    date: "February 8, 2026",
    slug: "france-uk-nuclear-sharing-european-security",
    author: "MD Aun",
    readingTime: "8 min read",
    imageUrl: UNSPLASH("1541872703-74c5e44368f9", 800),
    isBreaking: false,
    excerpt:
      "Paris and London announced a landmark agreement on nuclear deterrence coordination, offering extended deterrence guarantees to European partners in what analysts called the most significant shift in European security architecture in decades.",
    category: CATEGORY_EUROPE,
  },
  {
    id: BigInt(22),
    title: "ECB Signals Rate Cuts as Eurozone Economy Contracts",
    isFeatured: false,
    content:
      "The European Central Bank signaled on March 1, 2026, that it stands ready to cut its key interest rates below 2% in coming months after GDP data released earlier in the week confirmed that the eurozone had entered a technical recession, with two consecutive quarters of negative growth driven primarily by a sharp contraction in German industrial output and persistently weak consumer spending across the bloc's largest economies. ECB President Christine Lagarde, speaking at a Frankfurt press conference, described the economic environment as 'significantly more challenging than our baseline scenario from six months ago' and stated that the Governing Council had discussed an accelerated path to policy normalization at its most recent meeting. Financial markets interpreted the comments as a strong signal that a 25-basis-point cut at the April meeting was virtually certain, with the rate path subsequently contingent on how energy price risks from the Middle East conflict evolved and whether consumer confidence showed signs of stabilization.\n\nThe eurozone recession reflects a convergence of structural and cyclical factors that have been building for over two years. Germany — historically the engine of European growth through its export-oriented industrial model — has been particularly hard hit by a combination of high energy costs following the disruption of Russian gas supplies, intense competition from Chinese manufacturers in its core automobile and industrial machinery markets, and a slower-than-anticipated transition to electric vehicle production that has left its traditional automotive cluster in a structural adjustment crisis. German GDP contracted 0.4% in the fourth quarter of 2025 and a further 0.6% in the first quarter of 2026, meeting the technical definition of recession and raising serious questions about the sustainability of the European social model given the simultaneous pressures on public finances from defense spending commitments, energy transition investment, and aging-related expenditure. France and Italy, while avoiding technical recession, have shown near-zero growth, and southern European economies that had been outperforming their northern counterparts on the strength of tourism revenues have seen those inflows moderate.\n\nThe ECB's pivot toward monetary easing comes at a moment of considerable uncertainty about the transmission mechanism of monetary policy in a fragmented European economy. Lower interest rates will reduce debt servicing costs for highly indebted member states, particularly Italy, France, and Spain, but their stimulative effect on real economic activity is increasingly questioned by economists who argue that the eurozone's structural constraints — regulatory complexity, limited labor mobility, fragmented capital markets, and the absence of a common fiscal policy instrument — limit the effectiveness of monetary policy alone in generating sustainable growth. Several senior ECB officials have emphasized that monetary policy cannot be the sole instrument of economic recovery and have called on eurozone governments to coordinate fiscal support measures, accelerate the Capital Markets Union project, and invest in productivity-enhancing infrastructure and research. The geopolitical dimension adds further complexity: a sustained escalation of Middle East conflict threatening energy supply chains could rapidly reverse the disinflation trend that has been the primary enabling condition for the ECB's easing pivot.",
    date: "March 1, 2026",
    slug: "ecb-rate-cuts-eurozone-contraction-2026",
    author: "MD Aun",
    readingTime: "4 min read",
    imageUrl: UNSPLASH("1611974789855-9c2a0a7236a3", 800),
    isBreaking: false,
    excerpt:
      "European Central Bank President signaled readiness to cut rates below 2% as GDP data confirmed the eurozone entered a technical recession, driven by weak German industrial output and sluggish consumer spending.",
    category: CATEGORY_EUROPE,
  },
  // Asia
  {
    id: BigInt(23),
    title: "China's Property Sector Crisis Deepens Despite Stimulus Package",
    isFeatured: false,
    content:
      "China's residential property market recorded its eighteenth consecutive month of price declines in January 2026, according to data released by the National Bureau of Statistics, as Beijing's third major stimulus package in two years failed to arrest the structural correction of a sector that at its peak accounted for approximately 25% of Chinese GDP and remains the primary store of household wealth for the majority of Chinese urban families. New home prices fell an average of 1.1% month-on-month across the seventy major cities tracked by the NBS, with the sharpest declines concentrated in lower-tier cities where the oversupply problem is most acute. Developer defaults have continued to mount, with several major property groups — including subsidiaries of the previously state-backed CIFI Holdings and Sunac China — failing to meet restructured debt obligations agreed in earlier out-of-court workout processes, raising new concerns about the completeness and durability of the debt restructuring efforts undertaken in 2024.\n\nThe persistence of the crisis despite repeated government intervention reflects deep structural imbalances that cannot be resolved through demand stimulation alone. China's property sector entered a period of fundamental correction after decades of construction volumes that dramatically outpaced underlying demographic demand, producing a vast oversupply of housing stock in hundreds of second, third, and fourth-tier cities where population growth has stagnated or reversed. Government measures to stabilize the market — including reductions in mortgage down payment requirements, interest rate cuts on property loans, relaxation of purchase restrictions in major cities, and a national program for local governments to purchase unsold inventory from distressed developers — have succeeded in supporting transactions in China's top-tier megacities such as Shanghai and Beijing, but have done little to address the structural oversupply in the vast majority of the country's urban markets. The IMF and World Bank have both assessed that a full resolution of the property sector imbalance in lower-tier cities will require a decade or more of absorption time and will likely involve substantial permanent capital impairment for both developers and their creditors.\n\nThe broader macroeconomic implications of the ongoing property crisis are severe and multidimensional. Local government finances — which historically relied heavily on land sales revenues to fund infrastructure investment and public services — have been severely strained, with dozens of provincial-level governments reporting significant fiscal shortfalls and delays in debt repayment. The negative wealth effect on Chinese households, who hold approximately 70% of their assets in residential real estate, has suppressed consumer confidence and contributed to deflation pressures that have made it significantly more difficult for Chinese monetary authorities to stimulate domestic demand. International investors and multinational corporations have cited the property crisis as a contributing factor in their reduced investment commitments in China, reinforcing a broader trend of foreign direct investment decline that Chinese policymakers are attempting to reverse through regulatory reform and targeted incentive programs. The property sector crisis thus functions as both a consequence and an accelerant of the broader structural challenges facing the Chinese growth model as it attempts to transition from investment-driven to consumption-driven expansion.",
    date: "January 25, 2026",
    slug: "china-property-crisis-stimulus-2026",
    author: "MD Aun",
    readingTime: "6 min read",
    imageUrl: UNSPLASH("1504711434969-e33886168f5c", 800),
    isBreaking: false,
    excerpt:
      "Beijing's third attempt to stabilize its embattled real estate sector showed limited results, as home prices continued to decline for the 18th consecutive month and developer defaults mounted.",
    category: CATEGORY_ASIA,
  },
  {
    id: BigInt(24),
    title: "Japan's Demographic Decline Accelerates Economic Planning Overhaul",
    isFeatured: false,
    content:
      "Japan's government released its new five-year economic revitalization plan on February 12, 2026, acknowledging for the first time in official policy language that the country's accelerating demographic decline requires a fundamental rethinking of economic growth models, labor market structures, and social welfare systems that cannot be achieved through productivity improvements alone. The plan, approved by Cabinet after months of intensive consultation between the Ministry of Economy, Trade and Industry, the Ministry of Finance, and the Bank of Japan, projects that Japan's working-age population will decline by approximately 4 million over the plan period — a contraction that, absent structural policy responses, would translate directly into lower economic output, increased pension and healthcare burdens on a shrinking workforce, and potentially unsustainable public debt dynamics. The document is notable for the bluntness of its demographic assessment and for the explicit acknowledgment that immigration — historically a deeply politically sensitive issue in Japan — must be considered as part of the long-term response.\n\nJapan's demographic situation is the most advanced expression of a pattern affecting much of the developed world, but it is particularly acute given the country's historically low rates of immigration and its social and cultural resistance to the large-scale integration of foreign workers. Japan's total fertility rate has fallen to 1.2 — well below the 2.1 replacement level and among the lowest recorded anywhere in the developed world — and the country's population is both shrinking and aging at a pace that is straining every major institution from the public education system to the military and the national health insurance framework. The economic revitalization plan responds to these realities through a combination of measures: aggressive investment in automation and robotics to offset labor shortages in manufacturing and services, expansion of the childcare system and family support measures to incentivize higher birth rates, reforms to the immigration visa system that would substantially increase the numbers and improve the integration prospects of skilled and semi-skilled foreign workers, and a major national investment in retraining programs to help older workers extend their productive working lives.\n\nThe plan has received a cautiously favorable response from Japanese business leaders and international economic organizations while facing skepticism from demographic experts about whether the measures are ambitious enough to arrest the fundamental trajectory. The Bank of Japan issued a statement noting that the plan's success would be critical to the sustainability of the monetary normalization process it began in 2024 after years of ultra-loose policy. The immigration reform components, while more substantial than any previous Japanese policy, remain modest by international comparison and will face significant implementation challenges in a society where public attitudes toward immigration, while gradually shifting, remain considerably more restrictive than in comparable advanced economies. Analysts at the OECD noted that Japan's experience represents a crucial case study for other aging economies — including South Korea, which faces an even more severe fertility decline — and that the policy choices made in Tokyo over the coming years will provide important lessons about the limits and possibilities of democratic governance in the face of inexorable demographic change.",
    date: "February 12, 2026",
    slug: "japan-demographic-decline-economic-overhaul",
    author: "MD Aun",
    readingTime: "7 min read",
    imageUrl: UNSPLASH("1569163139599-0f4517e36f51", 800),
    isBreaking: false,
    excerpt:
      "Tokyo's new five-year economic plan acknowledged for the first time that Japan's shrinking workforce requires a fundamental rethinking of growth models, with major implications for immigration policy and automation investment.",
    category: CATEGORY_ASIA,
  },
  {
    id: BigInt(25),
    title: "ASEAN Divided Over South China Sea Territorial Escalation",
    isFeatured: false,
    content:
      "The Association of Southeast Asian Nations concluded its emergency foreign ministers' meeting on March 1, 2026, without issuing a unified statement on escalating Chinese maritime activities around the Spratly Islands after several member states blocked consensus language that the Philippines, Vietnam, and Malaysia had sought to include characterizing recent Chinese Coast Guard operations as violations of the 2016 South China Sea Arbitral Award and UNCLOS. The failure to achieve a joint communiqué — reported by multiple diplomatic sources as the result of direct Chinese pressure on Cambodia, Laos, and Myanmar — exposed the bloc's deepest internal divisions on the South China Sea issue in years and provided Beijing with a significant diplomatic victory at a moment when it has been aggressively asserting its maritime claims through the physical presence of coast guard vessels, survey ships, and increasingly large militarized artificial island installations in the disputed waters.\n\nThe immediate trigger for the emergency meeting was a series of Chinese Coast Guard operations in February 2026 that involved the use of water cannons, laser devices, and physical boarding against Philippine supply vessels attempting to resupply the BRP Sierra Madre, the deliberately grounded warship that Manila maintains as a physical symbol of its sovereignty claim at Second Thomas Shoal. The incidents resulted in injuries to Philippine Navy personnel and the destruction of supplies, prompting Manila to invoke its mutual defense treaty with the United States and demand a formal ASEAN response. The Philippines was supported by Vietnam, which has its own extensive territorial disputes with China in the Paracel Islands and around Vanguard Bank, and by Malaysia and Indonesia, which have expressed increasing alarm at the expanding circumference of Chinese maritime operations encroaching on their exclusive economic zones.\n\nThe inability of ASEAN to formulate a collective response has significant strategic implications for regional order that extend well beyond the South China Sea issue itself. The bloc's foundational principle of consensus decision-making, which was designed to maintain unity across a diverse group of nations with different political systems and strategic orientations, has become a structural vulnerability that China has skillfully exploited by cultivating close relationships with the most domestically dependent member states. The United States, Japan, Australia, and India — all of which have Treaty or partner relationships with ASEAN members and a direct strategic interest in freedom of navigation in the South China Sea — have expressed frustration with the bloc's institutional paralysis while being careful not to be seen as attempting to dictate its positions. Analysts at the International Institute for Strategic Studies warn that the continuing failure of ASEAN to maintain a unified position is progressively eroding the normative framework that the bloc represents and potentially emboldening Chinese actions across multiple domains of contestation beyond the maritime sphere.",
    date: "March 1, 2026",
    slug: "asean-south-china-sea-escalation-2026",
    author: "MD Aun",
    readingTime: "6 min read",
    imageUrl: UNSPLASH("1504711434969-e33886168f5c", 800),
    isBreaking: false,
    excerpt:
      "The Association of Southeast Asian Nations failed to issue a unified statement on escalating Chinese activity around the Spratly Islands, exposing deep divisions within the bloc and emboldening Beijing's posture.",
    category: CATEGORY_ASIA,
  },
  // ── Iran–Israel Conflict Focus (Feb 2026) ──
  {
    id: BigInt(13),
    title:
      "US and Israel Strike Iran as Netanyahu Says 'Many Signs' Khamenei No Longer Alive",
    isFeatured: false,
    content: "israel-iran-full-content",
    date: "February 14, 2026",
    slug: "us-israel-strike-iran-khamenei",
    author: "MD Aun",
    readingTime: "8 min read",
    imageUrl:
      "https://images.unsplash.com/photo-1525026760597-50c5a6f26e78?auto=format&fit=crop&w=1200&q=80",
    isBreaking: true,
    excerpt:
      "American and Israeli forces carried out coordinated strikes on Iranian nuclear and military infrastructure early Friday, as Prime Minister Netanyahu addressed the nation citing multiple intelligence indicators suggesting Supreme Leader Khamenei may no longer be alive.",
    category: CATEGORY_MIDDLE_EAST,
  },
  {
    id: BigInt(14),
    title:
      "Iran Vows Revenge After Killing of Its Top Leader; Trade Strikes with Israel",
    isFeatured: false,
    content:
      "Iran's Islamic Revolutionary Guard Corps Command issued a formal declaration of maximum-level revenge operations on February 15, 2026, one day after the Iranian government confirmed the death of Supreme Leader Ali Khamenei in the coordinated US-Israeli strike on the Imam Ali Complex compound in Tehran. The announcement, broadcast on state television alongside footage of Khamenei's body, represented a seismic rupture in Iranian political history — the first death of a Supreme Leader since Khomeini's passing in 1989 — and triggered an immediate and dramatic escalation of the conflict. Within hours of the confirmation, the IRGC Aerospace Force launched a coordinated barrage of over 200 ballistic missiles and hypersonic glide vehicles targeting Tel Aviv, Haifa, Beersheba, and multiple Israeli Air Force bases, in what Iran described as 'Operation Martyr of the Ummah.' Israel's multi-layered air defense system — comprising Arrow 3, David's Sling, and Iron Dome batteries supplemented by US THAAD assets — intercepted approximately 94% of the incoming projectiles, but several strikes penetrated defenses and caused significant civilian casualties in the northern Haifa metropolitan area.\n\nThe death of Khamenei removed the central axis around which Iran's entire revolutionary political and security architecture has been organized for over three decades. As Supreme Leader, Khamenei held ultimate authority over all branches of government, commanded the loyalty of the IRGC, controlled religious and cultural institutions, and personally directed Iran's nuclear strategy, foreign policy, and proxy network across Lebanon, Iraq, Syria, and Yemen. His death plunged the Islamic Republic into an acute succession crisis at the precise moment the country faced its most existential external threat since the 1980–1988 war with Iraq. The Assembly of Experts — the clerical body responsible for selecting a new Supreme Leader — convened in emergency session, though reports from within Tehran indicated that deep divisions among senior clerics over the succession, combined with the physical disruption caused by ongoing Israeli strikes on the capital, were preventing a rapid consensus from forming. The IRGC, which had been steadily accumulating political and economic power for years, emerged as the dominant institutional force in the immediate aftermath, effectively governing the country's military and foreign policy response in the absence of supreme clerical authority.\n\nThe international response to the escalation was one of profound alarm. US Secretary of State convened emergency calls with counterparts in Russia, China, the European Union, Turkey, and the Gulf states, attempting to contain the risk of a further broadening of the conflict. Saudi Arabia and the UAE, which have in recent years pursued rapprochements with Iran, found themselves in an extraordinarily difficult position, facing pressure from Washington not to enable Iranian operations while also seeking to avoid becoming targets of IRGC retaliation. Oil markets responded violently: Brent crude futures surged 18% in a single trading session as traders priced in the risk of Strait of Hormuz disruption, through which approximately 20% of global oil supply transits daily. Russia and China both called for an immediate ceasefire while refusing to condemn Iran's retaliatory strikes. Several European governments activated emergency energy contingency plans as a precautionary measure against supply disruption.",
    date: "February 15, 2026",
    slug: "iran-vows-revenge-khamenei-killed",
    author: "MD Aun",
    readingTime: "6 min read",
    imageUrl:
      "https://images.unsplash.com/photo-1521791055366-0236500763e1?auto=format&fit=crop&w=800&q=80",
    isBreaking: true,
    excerpt:
      "Iran's Revolutionary Guards Command issued a formal declaration of revenge operations after confirming the death of Supreme Leader Ali Khamenei. Ballistic missiles targeted Israeli cities as the conflict entered its most dangerous phase since 1948.",
    category: CATEGORY_MIDDLE_EAST,
  },
  {
    id: BigInt(15),
    title: "China Condemns Attacks on Iran, Urges Immediate Ceasefire at UN",
    isFeatured: false,
    content:
      "China delivered its most forceful diplomatic intervention in the Middle East in years on February 16, 2026, as Foreign Minister Wang Yi formally condemned the US-Israeli military operation against Iran in a statement that described the strikes as a 'flagrant violation of the UN Charter, international law, and the fundamental norms governing relations between sovereign states.' Speaking at a special press conference convened at the Ministry of Foreign Affairs in Beijing, Wang called on the United States and Israel to immediately cease all military operations, demanded the convening of an emergency session of the UN Security Council, and urged all parties to 'step back from the abyss of a regional war that will harm all nations.' China's UN Ambassador simultaneously circulated a draft Security Council resolution calling for an immediate ceasefire, the withdrawal of foreign military forces from Iranian territory, and an international investigation into the legality of the strikes — a measure that the United States indicated it would veto.\n\nChina's intervention reflects a convergence of strategic, economic, and normative interests that Beijing has been cultivating for years. Iran is a key partner in China's Belt and Road Initiative and a major supplier of discounted crude oil that has helped China manage the cost of Western sanctions pressure. The two countries formalized a 25-year Comprehensive Cooperation Agreement in 2021 that committed China to investment across Iran's oil, gas, petrochemical, and infrastructure sectors. Beyond the bilateral relationship, Beijing has long positioned itself as a champion of a UN-centric international order and principles of non-interference and sovereign equality — principles that the US-Israeli military action directly challenges. China's condemnation also resonates with its broader strategic narrative that American military unilateralism represents the primary threat to global stability, a message it has been amplifying across the Global South with considerable success. President Xi Jinping held phone calls with the Russian, Turkish, Saudi, and Egyptian presidents, coordinating a unified messaging framework that Beijing hopes will isolate Washington diplomatically.\n\nThe Chinese diplomatic offensive has produced a complex and contested international response. Russia co-sponsored China's Security Council resolution, ensuring its rhetorical salience even if it cannot pass over a US veto. A significant number of Global South nations — particularly across Africa, Latin America, and South and Southeast Asia — have expressed sympathy with China's position or declared formal neutrality, refusing to endorse Western-led statements condemning Iran's retaliatory missile strikes. However, several key regional powers, including Japan, South Korea, Australia, and India, have been more circumspect, expressing concern about escalation without endorsing China's framing that the initial US-Israeli strikes were categorically illegal. Analysts at major foreign policy institutions have noted that the crisis is accelerating the crystallization of a loose alignment between China, Russia, and their partners on one side, and the Western alliance system on the other — and that the Global South's divided response reflects its deepening strategic autonomy and resistance to choosing between competing great power narratives.",
    date: "February 16, 2026",
    slug: "china-condemns-iran-attacks-ceasefire",
    author: "MD Aun",
    readingTime: "4 min read",
    imageUrl:
      "https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=800&q=80",
    isBreaking: false,
    excerpt:
      "Beijing issued its strongest condemnation of the US-Israeli military operation against Iran, calling it a 'flagrant violation of international law' and demanding an emergency UN Security Council session to impose an immediate ceasefire.",
    category: CATEGORY_POLITICS,
  },
  {
    id: BigInt(16),
    title: "Israel Rallies in National Unity to Support Attack on Iran",
    isFeatured: false,
    content:
      "Israel witnessed an extraordinary moment of national political convergence on February 17, 2026, as the country's fractured political landscape — long defined by deep divisions over judicial reform, the conduct of the Gaza war, and the fate of the remaining hostages — set aside its internal battles and unified behind a national emergency government formed in the aftermath of the coordinated strikes on Iran. Prime Minister Benjamin Netanyahu announced the formation of an emergency national unity cabinet that incorporated leaders from across the political spectrum, including former Prime Minister Yair Lapid and National Unity party leader Benny Gantz — both of whom had remained outside the government in opposition — as well as defense establishment veterans who had been among Netanyahu's sharpest critics. The announcement was met with broad approval by Israeli security officials, military leadership, and significant sections of the Israeli public, who rallied in support of a government of national consensus in the face of what they characterized as an existential threat.\n\nThe speed and comprehensiveness of the political unification reflected a deeply ingrained Israeli political dynamic: in the face of direct military threat from state actors, partisan divisions traditionally dissolve into a national security consensus. The strikes on Iranian nuclear facilities, military headquarters, and IRGC leadership compounds were widely perceived within Israel as a preemptive measure to neutralize a nuclear threat that successive Israeli intelligence assessments had described as approaching an irreversible threshold. Opinion polls conducted in the immediate aftermath of the operation showed approval ratings above 80% for the government's decision to strike, with support cutting across religious, ethnic, and political lines in a manner not seen since the early days of the October 7, 2023, response. Tens of thousands of Israelis gathered in central Tel Aviv's Rabin Square and outside the Kirya military headquarters in a show of solidarity with the IDF, waving flags and holding signs in Hebrew and English declaring support for the operation and national resolve in the face of Iranian retaliation.\n\nThe formation of the unity government and the public mobilization behind it carry significant strategic implications for the conduct of the conflict going forward. The emergency cabinet has substantially expanded the political legitimacy of the security establishment's decision-making framework, removing a key vulnerability that had existed when divisive internal disputes were perceived by adversaries as undermining Israeli resolve. However, analysts note that unity governments in Israel have historically been temporary arrangements that fracture once immediate security crises recede, and that the deeply contested fundamental political questions — including the future of Gaza, the hostage situation, and the judicial overhaul dispute — have not been resolved but only suspended. International observers, while acknowledging the genuine sense of national solidarity in Israel, have also noted that the political consolidation behind the Iran operation complicates diplomatic efforts to de-escalate the conflict, since any ceasefire arrangement will need to survive both Israeli domestic politics and the severe succession crisis unfolding within Iran's revolutionary governance structure.",
    date: "February 17, 2026",
    slug: "israel-national-unity-iran-attack",
    author: "MD Aun",
    readingTime: "5 min read",
    imageUrl:
      "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?auto=format&fit=crop&w=800&q=80",
    isBreaking: false,
    excerpt:
      "Israel's fractured political landscape unified behind a national emergency government as tens of thousands rallied in Tel Aviv supporting the government's decision to strike Iranian nuclear and military targets.",
    category: CATEGORY_WORLD,
  },
];

export const BREAKING_NEWS_FALLBACK = [
  "BREAKING: US and Israeli forces conduct joint strike on Iranian nuclear facilities — Feb 14, 2026",
  "DEVELOPING: Khamenei fate unknown; Israeli PM Netanyahu cites 'many signs' top leader no longer alive",
  "URGENT: Iran launches retaliatory missile barrage targeting Tel Aviv and Haifa — IDF intercepts 94%",
  "LIVE: China calls emergency UN Security Council session; urges immediate ceasefire",
  "UPDATE: Israel Knesset votes national unity government — full cabinet backs Iran operation",
  "BREAKING: Oil prices surge 12% as Strait of Hormuz threatened; global markets in turmoil",
  "ALERT: US carrier group moves to Eastern Mediterranean; Pentagon activates rapid response",
];

// ── React Query hooks ──

export function useGetAllArticles() {
  const { actor, isFetching } = useActor();
  return useQuery<Article[]>({
    queryKey: ["articles"],
    queryFn: async () => {
      if (!actor) return FALLBACK_ARTICLES;
      try {
        const result = await Promise.race([
          actor.getArticles(),
          new Promise<Article[]>((_, reject) =>
            setTimeout(() => reject(new Error("timeout")), 4000),
          ),
        ]);
        return result.length > 0 ? result : FALLBACK_ARTICLES;
      } catch {
        return FALLBACK_ARTICLES;
      }
    },
    enabled: !isFetching,
    staleTime: 60_000,
    placeholderData: FALLBACK_ARTICLES,
  });
}

export function useGetFeaturedArticles() {
  const { actor, isFetching } = useActor();
  return useQuery<Article[]>({
    queryKey: ["featured-articles"],
    queryFn: async () => {
      if (!actor) return FALLBACK_ARTICLES.filter((a) => a.isFeatured);
      try {
        const result = await Promise.race([
          actor.getFeaturedArticles(),
          new Promise<Article[]>((_, reject) =>
            setTimeout(() => reject(new Error("timeout")), 4000),
          ),
        ]);
        return result.length > 0
          ? result
          : FALLBACK_ARTICLES.filter((a) => a.isFeatured);
      } catch {
        return FALLBACK_ARTICLES.filter((a) => a.isFeatured);
      }
    },
    enabled: !isFetching,
    staleTime: 60_000,
    placeholderData: FALLBACK_ARTICLES.filter((a) => a.isFeatured),
  });
}

export function useGetArticlesByCategory(category: string) {
  const { actor, isFetching } = useActor();
  return useQuery<Article[]>({
    queryKey: ["articles-by-category", category],
    queryFn: async () => {
      if (!actor)
        return FALLBACK_ARTICLES.filter((a) => a.category === category);
      try {
        const result = await Promise.race([
          actor.getArticlesByCategory(category),
          new Promise<Article[]>((_, reject) =>
            setTimeout(() => reject(new Error("timeout")), 4000),
          ),
        ]);
        return result.length > 0
          ? result
          : FALLBACK_ARTICLES.filter((a) => a.category === category);
      } catch {
        return FALLBACK_ARTICLES.filter((a) => a.category === category);
      }
    },
    enabled: !isFetching,
    staleTime: 60_000,
    placeholderData: FALLBACK_ARTICLES.filter((a) => a.category === category),
  });
}

export function useGetBreakingNews() {
  const { actor, isFetching } = useActor();
  return useQuery<Article[]>({
    queryKey: ["breaking-news"],
    queryFn: async () => {
      if (!actor) return FALLBACK_ARTICLES.filter((a) => a.isBreaking);
      try {
        const result = await Promise.race([
          actor.getBreakingArticles(),
          new Promise<Article[]>((_, reject) =>
            setTimeout(() => reject(new Error("timeout")), 4000),
          ),
        ]);
        return result.length > 0
          ? result
          : FALLBACK_ARTICLES.filter((a) => a.isBreaking);
      } catch {
        return FALLBACK_ARTICLES.filter((a) => a.isBreaking);
      }
    },
    enabled: !isFetching,
    staleTime: 30_000,
    placeholderData: FALLBACK_ARTICLES.filter((a) => a.isBreaking),
  });
}
