import { dictionaries, type Locale } from "@/lib/i18n";

type HeroContent = {
  highlights: string[];
  panelLabel: string;
  panelTitle: string;
  panelDescription: string;
  panelItems: string[];
};

type ContentCard = {
  title: string;
  description: string;
  meta?: string;
};

type ProcessItem = ContentCard & {
  checkpoint: string;
};

type Scenario = {
  title: string;
  buyer: string;
  challenge: string;
  workflow: string;
  deliverables: string[];
};

type InnerPageContent = {
  services: {
    hero: HeroContent;
    sectionEyebrow: string;
    sectionTitle: string;
    sectionDescription: string;
    stages: ContentCard[];
    visibilityTitle: string;
    visibilityDescription: string;
    visibilityItems: ContentCard[];
  };
  how: {
    hero: HeroContent;
    sectionEyebrow: string;
    sectionTitle: string;
    sectionDescription: string;
    steps: ProcessItem[];
    gatesTitle: string;
    gatesDescription: string;
    gates: ContentCard[];
  };
  categories: {
    hero: HeroContent;
    sectionEyebrow: string;
    sectionTitle: string;
    sectionDescription: string;
    assessmentTitle: string;
    assessmentDescription: string;
    assessmentItems: ContentCard[];
    noteTitle: string;
    noteDescription: string;
  };
  pricing: {
    hero: HeroContent;
    sectionEyebrow: string;
    sectionTitle: string;
    sectionDescription: string;
    factorsTitle: string;
    factorsDescription: string;
    factors: ContentCard[];
    principlesTitle: string;
    principles: ContentCard[];
  };
  about: {
    hero: HeroContent;
    sectionEyebrow: string;
    sectionTitle: string;
    sectionDescription: string;
    principles: ContentCard[];
    modelTitle: string;
    modelDescription: string;
    modelItems: ContentCard[];
  };
  contact: {
    hero: HeroContent;
    prepTitle: string;
    prepDescription: string;
    prepItems: ContentCard[];
    responseTitle: string;
    responseDescription: string;
    responseItems: ContentCard[];
  };
  scenarios: {
    hero: HeroContent;
    noticeTitle: string;
    noticeDescription: string;
    sectionEyebrow: string;
    sectionTitle: string;
    sectionDescription: string;
    buyerLabel: string;
    challengeLabel: string;
    workflowLabel: string;
    deliverablesLabel: string;
    scenarios: Scenario[];
  };
  request: {
    hero: HeroContent;
    prepTitle: string;
    prepDescription: string;
    prepItems: ContentCard[];
    privacyTitle: string;
    privacyDescription: string;
  };
};

const en: InnerPageContent = {
  services: {
    hero: {
      highlights: ["Requirement-led research", "Buyer-side coordination", "Visible decision checkpoints"],
      panelLabel: "How we add value",
      panelTitle: "A coordinated sourcing workflow, not a list of factory contacts",
      panelDescription:
        "Each service is designed to reduce uncertainty between a product idea and a purchase decision.",
      panelItems: ["Clarify the commercial brief", "Compare practical supplier options", "Keep samples, packaging and delivery connected"],
    },
    sectionEyebrow: "A complete sourcing engagement",
    sectionTitle: "Specialist support around the decisions that affect product viability",
    sectionDescription:
      "SodaPost can support one focused task or coordinate a broader project. The scope follows the product, the market and the level of control you need.",
    stages: [
      {
        title: "Define the requirement",
        description:
          "Translate product ideas, screenshots and commercial targets into specifications suppliers can respond to.",
        meta: "Output: structured sourcing brief",
      },
      {
        title: "Validate the option",
        description:
          "Compare supplier fit, samples, customization limits, MOQ, pricing context and operational signals.",
        meta: "Output: decision-ready comparison",
      },
      {
        title: "Coordinate execution",
        description:
          "Keep packaging, inspection, cartons, documentation and freight handoff aligned as the project moves forward.",
        meta: "Output: connected project follow-up",
      },
    ],
    visibilityTitle: "What stays visible throughout the project",
    visibilityDescription:
      "Professional sourcing is not about promising that nothing changes. It is about making changes, trade-offs and next actions clear early.",
    visibilityItems: [
      { title: "Assumptions", description: "Target price, quality level, quantity and timing are recorded before research begins." },
      { title: "Trade-offs", description: "Price, MOQ, materials, customization and lead time are compared in context." },
      { title: "Open questions", description: "Missing specifications and supplier clarifications are tracked instead of buried in chat." },
      { title: "Next actions", description: "Each stage ends with a clear recommendation, owner and practical next step." },
    ],
  },
  how: {
    hero: {
      highlights: ["Clear inputs", "Decision gates", "Documented next steps"],
      panelLabel: "Project rhythm",
      panelTitle: "Move forward in stages, with the right decision at the right time",
      panelDescription:
        "The workflow separates research, validation and execution so buyers do not commit too early.",
      panelItems: ["Brief before supplier search", "Sample before bulk commitment", "Inspection before shipment handoff"],
    },
    sectionEyebrow: "The sourcing workflow",
    sectionTitle: "Four stages that turn a product request into a controlled buying process",
    sectionDescription:
      "Every project is different, but the decision logic remains consistent: define, compare, validate and execute.",
    steps: [
      {
        title: "Build the product brief",
        description:
          "We align the product, target market, quantity, price position, sales channel, packaging and quality expectations.",
        meta: "You provide: references and commercial context",
        checkpoint: "Checkpoint: the request is specific enough for meaningful supplier research.",
      },
      {
        title: "Research and compare",
        description:
          "Potential suppliers are reviewed for product fit, operating scope, MOQ, customization and relevant commercial signals.",
        meta: "You receive: organized options and questions",
        checkpoint: "Checkpoint: select which options are worth sampling or deeper verification.",
      },
      {
        title: "Validate samples and specifications",
        description:
          "Samples, materials, dimensions, logo placement, packaging and quality expectations are compared and refined.",
        meta: "You receive: sample feedback and revision points",
        checkpoint: "Checkpoint: confirm whether the product is ready for negotiation or production planning.",
      },
      {
        title: "Coordinate production and handoff",
        description:
          "Key milestones, inspection points, cartons, documents and freight handoff are followed through with the supplier.",
        meta: "You receive: clearer milestone visibility",
        checkpoint: "Checkpoint: confirm shipment readiness before the goods move.",
      },
    ],
    gatesTitle: "Three decisions we do not rush",
    gatesDescription:
      "Moving quickly matters, but committing at the wrong moment is expensive. These gates protect the quality of the decision.",
    gates: [
      { title: "Before requesting samples", description: "Confirm supplier fit and eliminate options that do not match the commercial brief." },
      { title: "Before bulk production", description: "Confirm specifications, sample feedback, packaging and the basis of the quotation." },
      { title: "Before shipment", description: "Confirm inspection expectations, cartons, documents and freight handoff responsibilities." },
    ],
  },
  categories: {
    hero: {
      highlights: ["Packaging machines", "Packaging materials", "E-commerce products"],
      panelLabel: "Product category coverage",
      panelTitle: "Product categories stay separate from sourcing services",
      panelDescription: "",
      panelItems: ["Machines and production lines", "Packaging materials and parts", "E-commerce and custom packaging products"],
    },
    sectionEyebrow: "Product category focus",
    sectionTitle: "Product categories SodaPost can help source",
    sectionDescription: "",
    assessmentTitle: "How we assess a new product-category request",
    assessmentDescription:
      "Before recommending a sourcing route, we look at specifications, category fit, required accessories, packaging needs and supplier feasibility.",
    assessmentItems: [
      { title: "Product fit", description: "Does the request match packaging machines, materials, parts, e-commerce products or custom packaging?" },
      { title: "Specification clarity", description: "Are model, capacity, material, size, print requirements, or technical parameters clear enough to quote?" },
      { title: "Production context", description: "Does the buyer need one machine, a complete line, matching consumables, or replacement parts?" },
      { title: "Compliance sensitivity", description: "Does the product involve food contact, labeling rules, electrical standards, testing or destination-market controls?" },
    ],
    noteTitle: "Need a more specific product subcategory?",
    noteDescription:
      "Choose the closest category in the request form. If the product is not listed, choose Other and describe the exact product, specification, quantity and destination market.",
  },
  pricing: {
    hero: {
      highlights: ["Defined starting points", "Scope before payment", "No forced long-term package"],
      panelLabel: "Pricing logic",
      panelTitle: "Pay for the depth of work the decision requires",
      panelDescription:
        "A simple supplier shortlist and a multi-SKU private-label project should not be priced or managed the same way.",
      panelItems: ["Start with a free request", "Choose research depth", "Expand only when the project needs it"],
    },
    sectionEyebrow: "Service options",
    sectionTitle: "Clear entry points for different stages of a sourcing decision",
    sectionDescription:
      "The listed prices are starting points. We confirm the scope, expected output and exclusions before paid work begins.",
    factorsTitle: "What affects the final scope",
    factorsDescription:
      "The amount of coordination is driven by project complexity—not simply by how many messages are exchanged.",
    factors: [
      { title: "Number of products", description: "One defined SKU is different from a mixed category or multi-SKU program." },
      { title: "Research depth", description: "A shortlist, comparative report and full project coordination require different levels of work." },
      { title: "Customization", description: "Packaging, artwork, molds, components and sample revisions add coordination steps." },
      { title: "Quality and logistics", description: "Inspection, consolidation, documents and freight handoff expand the operating scope." },
    ],
    principlesTitle: "Before paid work starts",
    principles: [
      { title: "Scope is written down", description: "You know what the service includes, what it does not include and what output to expect." },
      { title: "Unknowns are identified", description: "Important assumptions and missing product details are surfaced before work begins." },
      { title: "Expansion is optional", description: "You can begin with a focused task and add support only when it creates practical value." },
    ],
  },
  about: {
    hero: {
      highlights: ["Buyer-side perspective", "Structured communication", "Practical China coordination"],
      panelLabel: "Our role",
      panelTitle: "Translate commercial intent into work suppliers can execute",
      panelDescription:
        "SodaPost sits between the buyer’s market goals and the operational details of sourcing from China.",
      panelItems: ["Protect clarity of requirements", "Reduce fragmented follow-up", "Keep decisions connected to execution"],
    },
    sectionEyebrow: "What we believe",
    sectionTitle: "Good sourcing is disciplined communication before it is negotiation",
    sectionDescription:
      "Most project friction begins with unclear requirements, assumptions that were never confirmed or decisions separated from execution.",
    principles: [
      { title: "Requirements before contacts", description: "A supplier list has little value until the commercial and product brief is clear." },
      { title: "Evidence before confidence", description: "Samples, documents and operational signals matter more than polished sales claims." },
      { title: "Trade-offs before promises", description: "Price, quality, MOQ and timing should be discussed as connected variables." },
      { title: "Ownership before speed", description: "Every next action should have a clear owner, reason and expected outcome." },
    ],
    modelTitle: "A buyer-side coordination model",
    modelDescription:
      "We do not present ourselves as the factory, freight carrier or testing laboratory. Our role is to organize the work between parties and keep the buyer’s requirements visible.",
    modelItems: [
      { title: "Buyer", description: "Defines the market, commercial goal, approval criteria and final decision." },
      { title: "SodaPost", description: "Structures requirements, researches options and coordinates project information." },
      { title: "Supplier partners", description: "Provide quotations, samples, production capability and product documentation." },
      { title: "Specialist providers", description: "Inspection, testing and logistics are coordinated when the project requires them." },
    ],
  },
  contact: {
    hero: {
      highlights: ["Private product brief", "Initial review within 24 hours", "No public supplier posting"],
      panelLabel: "Best first message",
      panelTitle: "Give us enough context to evaluate the opportunity",
      panelDescription:
        "A useful first response depends on the quality of the product and commercial information you provide.",
      panelItems: ["Product reference or image", "Target market and quantity", "Price, packaging and timing expectations"],
    },
    prepTitle: "What to prepare before contacting us",
    prepDescription:
      "You do not need a perfect specification document. A few concrete details help us ask better questions and avoid generic replies.",
    prepItems: [
      { title: "Product reference", description: "A link, image, sketch, existing sample or concise product description." },
      { title: "Commercial context", description: "Target country, sales channel, customer positioning and expected quantity." },
      { title: "Success criteria", description: "Target price, quality level, packaging, customization and desired timing." },
      { title: "Known constraints", description: "Required certifications, materials, claims, dimensions or logistics limitations." },
    ],
    responseTitle: "What happens after you submit",
    responseDescription:
      "The first reply is designed to establish whether the request is actionable and what information is still missing.",
    responseItems: [
      { title: "1. Initial review", description: "We check whether the product brief, market and requested support are clear." },
      { title: "2. Clarifying questions", description: "We identify missing details that materially affect sourcing or quotation." },
      { title: "3. Recommended route", description: "We suggest a practical next step, service scope or feasibility discussion." },
    ],
  },
  scenarios: {
    hero: {
      highlights: ["Illustrative workflows", "No fabricated customer claims", "Decision-focused deliverables"],
      panelLabel: "Transparent examples",
      panelTitle: "See how different sourcing problems can be structured",
      panelDescription:
        "These are representative project scenarios—not claims about named customers, revenue or completed outcomes.",
      panelItems: ["Understand the buyer context", "Define the sourcing challenge", "Show the likely workflow and outputs"],
    },
    noticeTitle: "A note on these scenarios",
    noticeDescription:
      "SodaPost is building its public track record. Until verified customer stories are available for publication, this page uses clearly labeled scenarios to explain our working method without inventing results.",
    sectionEyebrow: "Representative sourcing scenarios",
    sectionTitle: "Professional workflows for common buyer situations",
    sectionDescription:
      "The purpose is to show how the work would be organized, which decisions matter and what a buyer could expect to receive.",
    buyerLabel: "Buyer context",
    challengeLabel: "Core challenge",
    workflowLabel: "Suggested workflow",
    deliverablesLabel: "Potential deliverables",
    scenarios: [
      {
        title: "Private-label apparel launch",
        buyer: "A retailer preparing a focused seasonal collection for an overseas market.",
        challenge: "Compare fabric, sizing, logo placement, packaging and MOQ without losing control of the brief.",
        workflow: "Requirement definition → supplier comparison → sample rounds → packaging confirmation → pre-production checkpoint.",
        deliverables: ["Structured apparel brief", "Supplier and sample comparison", "Revision list", "Packaging checkpoint"],
      },
      {
        title: "Beauty accessory wholesale program",
        buyer: "A wholesaler evaluating a repeatable line of brushes, organizers or skincare tools.",
        challenge: "Balance assortment, unit economics, quality consistency and retail-ready presentation.",
        workflow: "SKU prioritization → supplier fit review → sample consolidation → packaging and carton planning.",
        deliverables: ["SKU research summary", "MOQ and pricing context", "Sample feedback", "Carton and packaging notes"],
      },
      {
        title: "Multi-supplier product consolidation",
        buyer: "An online seller sourcing several small products from different factories.",
        challenge: "Coordinate dispatch timing, domestic movement, consolidation, documents and freight handoff.",
        workflow: "Supplier schedule alignment → pickup planning → consolidation → carton review → freight handoff.",
        deliverables: ["Dispatch tracker", "Consolidation plan", "Carton information", "Handoff checklist"],
      },
    ],
  },
  request: {
    hero: {
      highlights: ["Private submission", "Structured requirements", "Conditional category details"],
      panelLabel: "A better sourcing brief",
      panelTitle: "The more decision context you share, the more useful the review can be",
      panelDescription:
        "The form is designed to capture commercial context alongside the product itself.",
      panelItems: ["Where and how you sell", "Quantity and target price", "Samples, logo and packaging needs"],
    },
    prepTitle: "Information that improves the first review",
    prepDescription:
      "Approximate information is acceptable. Be clear about what is confirmed and what is still flexible.",
    prepItems: [
      { title: "Product", description: "Reference images, materials, dimensions, functions and comparable products." },
      { title: "Market", description: "Destination country, sales channel, customer type and price position." },
      { title: "Order", description: "Target quantity, budget range, timing and whether samples are required." },
      { title: "Branding", description: "Logo, packaging, inserts, barcodes and other private-label expectations." },
    ],
    privacyTitle: "Private and requirement-led",
    privacyDescription:
      "Your submission is used to assess the sourcing request and is not published as an open buying lead or public supplier enquiry.",
  },
};

const zh: InnerPageContent = {
  services: {
    hero: {
      highlights: ["以需求为起点", "站在买家一侧协调", "关键决策清晰可见"],
      panelLabel: "我们的价值",
      panelTitle: "提供完整采购协作，而不是转发工厂联系方式",
      panelDescription: "每项服务都围绕一个目标展开：降低从产品想法到采购决策之间的不确定性。",
      panelItems: ["梳理商业与产品需求", "比较真正可执行的供应商选项", "贯通样品、包装、质检与交付"],
    },
    sectionEyebrow: "完整采购协作",
    sectionTitle: "围绕产品可行性与采购决策提供专业支持",
    sectionDescription:
      "SodaPost 可以承接一个明确任务，也可以协调更完整的项目。服务范围取决于产品、目标市场以及你需要的控制深度。",
    stages: [
      { title: "定义需求", description: "把产品想法、图片和商业目标整理成供应商能够理解并回应的规格。", meta: "交付：结构化采购需求" },
      { title: "验证选项", description: "比较供应商适配度、样品、定制边界、MOQ、价格背景和运营信号。", meta: "交付：可用于决策的比较" },
      { title: "协调执行", description: "在项目推进中持续衔接包装、质检、外箱、单证和货运交接。", meta: "交付：连贯的项目跟进" },
    ],
    visibilityTitle: "项目过程中始终保持可见的信息",
    visibilityDescription:
      "专业采购不是承诺所有事情都不会变化，而是尽早说明变化、取舍与下一步行动。",
    visibilityItems: [
      { title: "前提条件", description: "开始调研前记录目标价格、品质、数量和时间要求。" },
      { title: "关键取舍", description: "结合实际情况比较价格、MOQ、材料、定制和交期。" },
      { title: "待确认问题", description: "缺失规格和供应商问题会被持续跟踪，而不是淹没在聊天记录里。" },
      { title: "下一步行动", description: "每个阶段都以明确建议、负责人和可执行步骤结束。" },
    ],
  },
  how: {
    hero: {
      highlights: ["输入信息清晰", "设置决策节点", "下一步有记录"],
      panelLabel: "项目节奏",
      panelTitle: "分阶段推进，在正确的时间做正确的决定",
      panelDescription: "流程将调研、验证和执行分开，避免买家在信息不足时过早承诺。",
      panelItems: ["找供应商前先明确需求", "大货前先验证样品", "交运前先确认货物状态"],
    },
    sectionEyebrow: "采购工作流程",
    sectionTitle: "把产品需求转化为可控采购过程的四个阶段",
    sectionDescription: "每个项目都不同，但决策逻辑保持一致：定义、比较、验证、执行。",
    steps: [
      {
        title: "建立产品需求",
        description: "统一产品、目标市场、数量、价格定位、销售渠道、包装和品质预期。",
        meta: "你提供：参考资料与商业背景",
        checkpoint: "决策点：需求是否足够明确，可以开展有效的供应商调研。",
      },
      {
        title: "调研并比较",
        description: "从产品适配、经营范围、MOQ、定制能力和商业条件等方面 review 潜在供应商。",
        meta: "你收到：整理后的选项与待确认问题",
        checkpoint: "决策点：选择值得打样或进一步验证的供应商。",
      },
      {
        title: "验证样品与规格",
        description: "比较并细化样品、材料、尺寸、Logo 位置、包装和质量要求。",
        meta: "你收到：样品反馈与修改清单",
        checkpoint: "决策点：确认产品是否具备议价或生产规划的基础。",
      },
      {
        title: "协调生产与交接",
        description: "持续跟进关键节点、质检、外箱、单证和货运交接。",
        meta: "你收到：更清晰的里程碑信息",
        checkpoint: "决策点：货物移动前确认出货准备状态。",
      },
    ],
    gatesTitle: "三个不能仓促通过的决策",
    gatesDescription: "速度很重要，但在错误的时间承诺会付出更高成本。这些节点用于保护决策质量。",
    gates: [
      { title: "申请样品前", description: "先确认供应商适配度，排除不符合商业需求的选项。" },
      { title: "大货生产前", description: "确认规格、样品反馈、包装以及报价成立的基础。" },
      { title: "出货交接前", description: "确认质检要求、外箱、单证和货运交接责任。" },
    ],
  },
  categories: {
    hero: {
      highlights: ["包装机械", "包装材料", "电商产品"],
      panelLabel: "产品品类覆盖",
      panelTitle: "产品品类与采购服务分开管理",
      panelDescription: "",
      panelItems: ["机器与生产线", "包装材料与机器配件", "电商产品与定制包装"],
    },
    sectionEyebrow: "产品品类方向",
    sectionTitle: "SodaPost可以协助采购的产品类目",
    sectionDescription: "",
    assessmentTitle: "我们如何评估一个新的产品品类需求",
    assessmentDescription: "在推荐采购路径前，我们会判断规格、品类适配、配套耗材、包装需求和供应商可行性。",
    assessmentItems: [
      { title: "产品适配", description: "需求是否属于包装机械、包装材料、机器配件、电商产品或定制包装？" },
      { title: "规格清晰度", description: "型号、产能、材料、尺寸、印刷要求或技术参数是否足够清晰，可以获得有效报价？" },
      { title: "生产场景", description: "买家需要单台机器、完整生产线、配套耗材，还是替换零件？" },
      { title: "合规敏感度", description: "产品是否涉及食品接触、标签规则、电气标准、测试或目标市场监管？" },
    ],
    noteTitle: "需要更具体的产品子类？",
    noteDescription:
      "在需求表单中选择最接近的品类。如果产品不在列表中，选择 Other 并写清产品名称、规格、数量和目标市场。",
  },
  pricing: {
    hero: {
      highlights: ["明确的服务起点", "付款前确认范围", "不强制长期套餐"],
      panelLabel: "定价逻辑",
      panelTitle: "根据采购决策所需的工作深度付费",
      panelDescription: "简单供应商名单和多 SKU 私标项目，不应该用同一种价格和管理方式。",
      panelItems: ["可从免费需求开始", "按调研深度选择服务", "项目需要时再扩展范围"],
    },
    sectionEyebrow: "服务选项",
    sectionTitle: "为采购决策的不同阶段提供清晰入口",
    sectionDescription: "页面价格为起始价格。付费工作开始前，我们会确认服务范围、预期交付和不包含内容。",
    factorsTitle: "哪些因素会影响最终范围",
    factorsDescription: "协调工作量由项目复杂度决定，而不是简单由沟通消息数量决定。",
    factors: [
      { title: "产品数量", description: "一个定义清晰的 SKU 与跨品类、多 SKU 项目所需工作完全不同。" },
      { title: "调研深度", description: "供应商名单、对比报告和完整项目协调对应不同工作层级。" },
      { title: "定制要求", description: "包装、设计稿、模具、组件和多轮样品会增加协作节点。" },
      { title: "品质与物流", description: "质检、集货、单证和货运交接会扩大实际执行范围。" },
    ],
    principlesTitle: "付费工作开始之前",
    principles: [
      { title: "服务范围写清楚", description: "你会知道包含什么、不包含什么以及预期收到什么。" },
      { title: "未知事项先识别", description: "重要假设和缺失产品信息会在开始前被明确提出。" },
      { title: "是否扩展由你决定", description: "可以先从一个聚焦任务开始，只在确有价值时增加支持。" },
    ],
  },
  about: {
    hero: {
      highlights: ["买家视角", "结构化沟通", "中国本地协作"],
      panelLabel: "我们的角色",
      panelTitle: "把商业目标转化为供应商可以执行的工作",
      panelDescription: "SodaPost 连接买家的市场目标与中国采购中的实际执行细节。",
      panelItems: ["保护需求清晰度", "减少碎片化跟进", "让决策与执行保持连接"],
    },
    sectionEyebrow: "我们的工作理念",
    sectionTitle: "优秀采购首先是有纪律的沟通，然后才是议价",
    sectionDescription: "多数项目问题源于需求不清、未经确认的假设，或决策与执行相互脱节。",
    principles: [
      { title: "先有需求，再找联系人", description: "商业和产品需求不清晰时，供应商名单本身没有多少价值。" },
      { title: "先有证据，再建立信心", description: "样品、文件和运营信号比漂亮的销售承诺更重要。" },
      { title: "先讲取舍，再做承诺", description: "价格、品质、MOQ 和交期必须作为相互关联的变量讨论。" },
      { title: "先明确责任，再追求速度", description: "每个行动都应有明确负责人、原因和预期结果。" },
    ],
    modelTitle: "站在买家一侧的协作模式",
    modelDescription:
      "我们不会把自己包装成工厂、货代或检测实验室。我们的角色是组织各方工作，并让买家要求始终保持可见。",
    modelItems: [
      { title: "买家", description: "定义目标市场、商业目标、批准标准并作出最终决定。" },
      { title: "SodaPost", description: "梳理需求、调研选项并协调项目信息与行动。" },
      { title: "供应商伙伴", description: "提供报价、样品、生产能力和产品相关文件。" },
      { title: "专业服务商", description: "项目需要时协调质检、测试和物流等专业环节。" },
    ],
  },
  contact: {
    hero: {
      highlights: ["私密提交产品需求", "24 小时内初步 review", "不会公开发布采购需求"],
      panelLabel: "更有效的首次沟通",
      panelTitle: "提供足够背景，让我们能够真正评估机会",
      panelDescription: "首次回复是否有价值，很大程度取决于你提供的产品和商业信息质量。",
      panelItems: ["产品图片或参考链接", "目标市场与采购数量", "价格、包装和时间预期"],
    },
    prepTitle: "联系前建议准备的信息",
    prepDescription: "你不需要准备完美的规格书。少量具体信息就能帮助我们提出更好的问题，而不是泛泛回复。",
    prepItems: [
      { title: "产品参考", description: "链接、图片、草图、现有样品或简洁的产品描述。" },
      { title: "商业背景", description: "目标国家、销售渠道、客户定位和预计采购数量。" },
      { title: "成功标准", description: "目标价格、品质、包装、定制要求和期望时间。" },
      { title: "已知限制", description: "认证、材料、宣传声明、尺寸或物流方面的硬性要求。" },
    ],
    responseTitle: "提交之后会发生什么",
    responseDescription: "首次回复的目标，是判断需求是否具备可执行基础，以及还缺少哪些关键信息。",
    responseItems: [
      { title: "1. 初步 review", description: "检查产品需求、目标市场和希望获得的支持是否清晰。" },
      { title: "2. 补充问题", description: "指出会实质影响采购或报价的缺失信息。" },
      { title: "3. 推荐路径", description: "建议下一步、服务范围或可行性沟通方式。" },
    ],
  },
  scenarios: {
    hero: {
      highlights: ["采购流程示例", "不虚构客户业绩", "聚焦决策与交付"],
      panelLabel: "透明的示例",
      panelTitle: "了解不同采购问题可以如何被结构化处理",
      panelDescription: "以下内容是代表性项目场景，不是对具体客户、收入或已完成业绩的宣称。",
      panelItems: ["理解买家背景", "定义核心采购问题", "展示可能的流程与交付"],
    },
    noticeTitle: "关于这些场景的说明",
    noticeDescription:
      "SodaPost 正在建立可公开验证的项目记录。在获得客户授权发布真实案例之前，本页使用明确标注的场景来说明工作方法，不编造项目结果。",
    sectionEyebrow: "代表性采购场景",
    sectionTitle: "常见买家需求对应的专业工作流程",
    sectionDescription: "这些场景用于说明工作如何组织、哪些决策重要，以及买家可能获得哪些交付。",
    buyerLabel: "买家背景",
    challengeLabel: "核心挑战",
    workflowLabel: "建议流程",
    deliverablesLabel: "可能交付",
    scenarios: [
      {
        title: "私标服装上市项目",
        buyer: "计划面向海外市场推出聚焦型季节系列的零售商。",
        challenge: "在不丢失需求控制的前提下，比较面料、尺码、Logo、包装与 MOQ。",
        workflow: "定义需求 → 比较供应商 → 多轮样品 → 确认包装 → 产前节点。",
        deliverables: ["结构化服装需求", "供应商与样品对比", "修改清单", "包装确认节点"],
      },
      {
        title: "美妆工具批发产品线",
        buyer: "评估刷具、收纳或护肤工具等可持续销售产品线的批发商。",
        challenge: "平衡产品组合、单位经济性、品质一致性和零售包装呈现。",
        workflow: "确定优先 SKU → review 供应商适配 → 合并样品 → 规划包装与外箱。",
        deliverables: ["SKU 调研摘要", "MOQ 与价格背景", "样品反馈", "包装和外箱备注"],
      },
      {
        title: "多供应商产品集货",
        buyer: "从不同工厂采购多个小商品的线上卖家。",
        challenge: "协调出货时间、国内运输、集货、单证和国际货运交接。",
        workflow: "对齐供应商计划 → 安排提货 → 集货 → review 外箱 → 货运交接。",
        deliverables: ["出货跟踪表", "集货计划", "外箱信息", "交接检查清单"],
      },
    ],
  },
  request: {
    hero: {
      highlights: ["私密提交", "结构化需求", "支持补充其他品类"],
      panelLabel: "更好的采购需求",
      panelTitle: "提供越多决策背景，首次 review 就越有价值",
      panelDescription: "表单不仅收集产品本身，也会记录影响采购路径的商业信息。",
      panelItems: ["在哪里、通过什么渠道销售", "数量与目标价格", "样品、Logo 与包装需求"],
    },
    prepTitle: "有助于首次 review 的信息",
    prepDescription: "可以提供大致信息，但请区分哪些已确认、哪些仍可调整。",
    prepItems: [
      { title: "产品", description: "参考图片、材料、尺寸、功能和相似产品。" },
      { title: "市场", description: "目标国家、销售渠道、客户类型和价格定位。" },
      { title: "订单", description: "目标数量、预算区间、时间要求以及是否需要样品。" },
      { title: "品牌", description: "Logo、包装、说明卡、条码和其他私标要求。" },
    ],
    privacyTitle: "私密且以需求为中心",
    privacyDescription: "你的提交仅用于评估采购需求，不会作为公开求购信息或公开供应商询价发布。",
  },
};

const generatedInnerLocales = new Set<Locale>([
  "es",
  "fr",
  "de",
  "pt",
  "ar",
  "vi",
  "ms",
  "fil",
  "th",
  "ja",
  "ko",
]);

function createAddedInnerContent(locale: Locale): InnerPageContent {
  const t = dictionaries[locale];
  const serviceCards = t.services.map(({ title, description }) => ({ title, description }));
  const processCards = t.processSteps.map(({ title, description }) => ({ title, description }));
  const categoryCards = t.categories.map(({ title, description }) => ({ title, description }));
  const pricingCards = t.pricingPlans.map(({ name, description, price }) => ({
    title: name,
    description,
    meta: price,
  }));

  return {
    services: {
      hero: {
        highlights: t.trustHighlights.slice(0, 3),
        panelLabel: t.common.services,
        panelTitle: t.pages.servicesTitle,
        panelDescription: t.pages.servicesDescription,
        panelItems: serviceCards.slice(0, 3).map(({ title }) => title),
      },
      sectionEyebrow: t.nav.services,
      sectionTitle: t.pages.servicesTitle,
      sectionDescription: t.pages.servicesDescription,
      stages: serviceCards.slice(0, 3),
      visibilityTitle: t.pages.howTitle,
      visibilityDescription: t.pages.howDescription,
      visibilityItems: serviceCards.slice(3, 7),
    },
    how: {
      hero: {
        highlights: processCards.slice(0, 3).map(({ title }) => title),
        panelLabel: t.common.howItWorks,
        panelTitle: t.pages.howTitle,
        panelDescription: t.pages.howDescription,
        panelItems: processCards.slice(0, 3).map(({ description }) => description),
      },
      sectionEyebrow: t.nav.howItWorks,
      sectionTitle: t.pages.howTitle,
      sectionDescription: t.pages.howDescription,
      steps: processCards.map((step) => ({
        ...step,
        meta: t.pages.requestDescription,
        checkpoint: t.pages.howDescription,
      })),
      gatesTitle: t.pages.servicesTitle,
      gatesDescription: t.pages.servicesDescription,
      gates: serviceCards.slice(0, 3),
    },
    categories: {
      hero: {
        highlights: categoryCards.slice(0, 3).map(({ title }) => title),
        panelLabel: t.common.productCategories,
        panelTitle: t.pages.categoriesTitle,
        panelDescription: t.pages.categoriesDescription,
        panelItems: categoryCards.slice(0, 3).map(({ description }) => description),
      },
      sectionEyebrow: t.nav.categories,
      sectionTitle: t.pages.categoriesTitle,
      sectionDescription: t.pages.categoriesDescription,
      assessmentTitle: t.pages.howTitle,
      assessmentDescription: t.pages.howDescription,
      assessmentItems: categoryCards.slice(0, 4),
      noteTitle: t.form.productCategoryDetail,
      noteDescription: t.form.legalComplianceNotice,
    },
    pricing: {
      hero: {
        highlights: pricingCards.slice(0, 3).map(({ title }) => title),
        panelLabel: t.nav.pricing,
        panelTitle: t.pages.pricingTitle,
        panelDescription: t.pages.pricingDescription,
        panelItems: pricingCards.slice(0, 3).map(({ description }) => description),
      },
      sectionEyebrow: t.nav.pricing,
      sectionTitle: t.pages.pricingTitle,
      sectionDescription: t.pages.pricingDescription,
      factorsTitle: t.pages.servicesTitle,
      factorsDescription: t.pages.servicesDescription,
      factors: pricingCards,
      principlesTitle: t.pages.howTitle,
      principles: processCards.slice(0, 3),
    },
    about: {
      hero: {
        highlights: t.manufacturingIntro.agencySignals,
        panelLabel: t.nav.about,
        panelTitle: t.pages.aboutTitle,
        panelDescription: t.pages.aboutDescription,
        panelItems: t.manufacturingIntro.advantages.map(({ title }) => title),
      },
      sectionEyebrow: t.manufacturingIntro.agencyEyebrow,
      sectionTitle: t.manufacturingIntro.agencyTitle,
      sectionDescription: t.manufacturingIntro.agencyDescription,
      principles: t.manufacturingIntro.advantages,
      modelTitle: t.manufacturingIntro.agencyCommitment.title,
      modelDescription: t.manufacturingIntro.agencyCommitment.description,
      modelItems: serviceCards.slice(0, 4),
    },
    contact: {
      hero: {
        highlights: [t.form.productCategory, t.form.countryMarket, t.form.targetQuantity],
        panelLabel: t.nav.contact,
        panelTitle: t.pages.contactTitle,
        panelDescription: t.pages.contactDescription,
        panelItems: [t.form.uploadReferenceImage, t.form.targetPrice, t.form.needCustomPackaging],
      },
      prepTitle: t.pages.requestTitle,
      prepDescription: t.pages.requestDescription,
      prepItems: processCards,
      responseTitle: t.pages.howTitle,
      responseDescription: t.pages.howDescription,
      responseItems: serviceCards.slice(0, 3),
    },
    scenarios: {
      hero: {
        highlights: categoryCards.slice(0, 3).map(({ title }) => title),
        panelLabel: t.nav.caseStudies,
        panelTitle: t.pages.caseTitle,
        panelDescription: t.pages.caseDescription,
        panelItems: processCards.slice(0, 3).map(({ title }) => title),
      },
      noticeTitle: t.pages.caseTitle,
      noticeDescription: t.pages.caseDescription,
      sectionEyebrow: t.common.caseStudies,
      sectionTitle: t.pages.howTitle,
      sectionDescription: t.pages.howDescription,
      buyerLabel: t.common.productCategories,
      challengeLabel: t.pages.categoriesTitle,
      workflowLabel: t.common.howItWorks,
      deliverablesLabel: t.common.services,
      scenarios: categoryCards.slice(0, 3).map((category, index) => ({
        title: category.title,
        buyer: category.description,
        challenge: t.pages.categoriesDescription,
        workflow: processCards[index]?.description ?? t.pages.howDescription,
        deliverables: serviceCards.slice(index, index + 4).map(({ title }) => title),
      })),
    },
    request: {
      hero: {
        highlights: [t.form.productCategory, t.form.countryMarket, t.form.targetQuantity],
        panelLabel: t.common.submitSourcingRequest,
        panelTitle: t.pages.requestTitle,
        panelDescription: t.pages.requestDescription,
        panelItems: [t.form.uploadReferenceImage, t.form.targetPrice, t.form.servicePlan],
      },
      prepTitle: t.pages.requestTitle,
      prepDescription: t.pages.requestDescription,
      prepItems: [
        { title: t.form.productCategory, description: processCards[0].description },
        { title: t.form.countryMarket, description: processCards[1].description },
        { title: t.form.targetQuantity, description: processCards[2].description },
        { title: t.form.needCustomPackaging, description: processCards[3].description },
      ],
      privacyTitle: t.footer.intro,
      privacyDescription: t.form.legalComplianceNotice,
    },
  };
}

export function getInnerPageContent(locale: Locale) {
  if (locale === "zh") return zh;
  if (generatedInnerLocales.has(locale)) return createAddedInnerContent(locale);
  return en;
}
