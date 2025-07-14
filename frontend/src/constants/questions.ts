import { BusinessAreas } from "@/types/params";
import { BarChart3, TrendingUp, Users, Shield, ShoppingCart, DollarSign, Monitor, Heart, Settings, Leaf } from 'lucide-react';

export const businessAreas: BusinessAreas = {
    'governance': {
      name: 'Governance & Leadership',
      icon: Users,
      dimensions: {
        maturity: {
          name: 'Maturity',
          questions: [
            'Is there a clearly defined organizational structure with roles, responsibilities, and reporting lines?',
            'Are strategic objectives and goals clearly communicated throughout the organization?',
            'Are there terms of references for the Board and its sub-committees?',
            'Is there a process for regular review and evaluation of leadership performance?',
            'Does leadership actively promote a culture of accountability and ethical conduct?'
          ]
        },
        risk: {
          name: 'Risk',
          questions: [
            'Are there potential conflicts of interest within the leadership team?',
            'Is there a succession plan in place for key leadership positions?',
            'Are there clear policies and procedures for risk management at the governance level?',
            'Is the organization compliant with relevant corporate governance regulations?',
            'Are there mechanisms to address and resolve internal disputes or ethical concerns?'
          ]
        },
        efficiency: {
          name: 'Efficiency',
          questions: [
            'Are leadership meetings efficient and outcome-focused?',
            'Is decision-making timely and effective?',
            'Are resources (time, budget, personnel) allocated effectively to support strategic initiatives?',
            'Is there a clear process for delegating authority and empowering employees?',
            'Does leadership foster an environment that encourages innovation and continuous improvement?'
          ]
        }
      }
    },
    'strategy': {
      name: 'Strategy & Vision',
      icon: TrendingUp,
      dimensions: {
        maturity: {
          name: 'Maturity',
          questions: [
            'Is there a clearly articulated and documented organizational vision and mission statement?',
            'Is the strategic plan clearly defined, with measurable goals and objectives?',
            'Are strategies regularly reviewed and updated to adapt to market changes and internal performance?',
            'Is there a clear process for cascading strategic objectives down to departmental and individual levels?',
            'Are employees aware of the organization\'s strategy and their role in achieving it?'
          ]
        },
        risk: {
          name: 'Risk',
          questions: [
            'Has the organization conducted a thorough analysis of external market trends and competitive landscape?',
            'Are potential risks to strategy execution identified and mitigated?',
            'Is there a contingency plan for major strategic shifts or disruptions?',
            'Is the strategy overly dependent on a single market, product, or service?',
            'Are there mechanisms to capture and incorporate feedback from stakeholders into strategic planning?'
          ]
        },
        efficiency: {
          name: 'Efficiency',
          questions: [
            'Is the strategic planning process efficient and inclusive of relevant stakeholders?',
            'Are resources effectively aligned with strategic priorities?',
            'Is there a clear accountability framework for strategic initiatives?',
            'Are strategic decisions made in a timely manner?',
            'Is there a system for monitoring and reporting on the progress of strategic goals?'
          ]
        }
      }
    },
    'financial': {
      name: 'Financial Management & Controls',
      icon: BarChart3,
      dimensions: {
        maturity: {
          name: 'Maturity',
          questions: [
            'Are financial policies and procedures clearly documented and regularly updated?',
            'Is there a robust internal control system in place to prevent fraud and errors?',
            'Are financial reporting processes accurate, timely, and compliant with relevant standards?',
            'Is there a clear budgeting and forecasting process, and are variances regularly analyzed?',
            'Does the organization utilize financial management software or systems effectively?'
          ]
        },
        risk: {
          name: 'Risk',
          questions: [
            'Are there adequate segregation of duties to prevent financial mismanagement?',
            'Is the organization exposed to significant financial risks (e.g., currency fluctuations, interest rate changes) and are these managed?',
            'Are there clear procedures for managing and reporting financial irregularities?',
            'Is the organization adequately insured against financial losses?',
            'Are financial records securely stored and easily retrievable for audits?'
          ]
        },
        efficiency: {
          name: 'Efficiency',
          questions: [
            'Is the month-end process efficient and streamlined?',
            'Are financial reports easily accessible and understandable to relevant stakeholders?',
            'Is there a clear process for expense approval and reconciliation?',
            'Are financial resources allocated efficiently to support business operations and growth?',
            'Does the financial management team provide timely and insightful analysis to support decision-making?'
          ]
        }
      }
    },
    'cashflow': {
      name: 'Cash Flow & Working Capital',
      icon: DollarSign,
      dimensions: {
        maturity: {
          name: 'Maturity',
          questions: [
            'Does the organization have a clear understanding of its cash flow cycles?',
            'Is there a formal process for cash flow forecasting and monitoring?',
            'Are working capital policies and procedures well-defined and implemented?',
            'Does the organization actively manage its accounts receivable and accounts payable?',
            'Does the organisation undertake scenario analysis and short-term liquidity stress testing?'
          ]
        },
        risk: {
          name: 'Risk',
          questions: [
            'Is the organization exposed to significant cash flow volatility?',
            'Are there adequate reserves or credit lines to cover unexpected cash shortfalls?',
            'Are there clear procedures for managing and mitigating risks related to bad debts?',
            'Is the organization over-reliant on a few key customers for cash inflow?',
            'Are there effective controls to prevent unauthorized cash disbursements?'
          ]
        },
        efficiency: {
          name: 'Efficiency',
          questions: [
            'Is the cash conversion cycle optimized to minimize the time between cash outflow and inflow?',
            'Are invoicing and collection processes efficient and timely?',
            'Is there an efficient process for managing supplier payments and taking advantage of early payment discounts?',
            'Are excess cash balances invested prudently to generate returns?',
            'Does the organization leverage technology to automate cash management processes?'
          ]
        }
      }
    },
    'revenue': {
      name: 'Revenue & Sales Processes',
      icon: TrendingUp,
      dimensions: {
        maturity: {
          name: 'Maturity',
          questions: [
            'Is there a clearly defined sales strategy aligned with overall business objectives?',
            'Are sales processes documented, understood, and consistently followed by the sales team?',
            'Does the organization have a robust CRM system in place and is it effectively utilized?',
            'Is there a clear process for lead generation, qualification, and nurturing?',
            'Are sales forecasts regularly prepared and are they accurate?'
          ]
        },
        risk: {
          name: 'Risk',
          questions: [
            'Is the organization overly reliant on a few key customers or sales channels?',
            'Are there clear policies and procedures for managing sales-related risks (e.g., pricing errors, contract disputes)?',
            'Is there a robust process for managing customer complaints and feedback related to sales?',
            'Are sales targets realistic and achievable without compromising ethical standards?',
            'Is there a clear understanding of competitor strategies and their impact on sales?'
          ]
        },
        efficiency: {
          name: 'Efficiency',
          questions: [
            'Is the sales cycle efficient, from lead generation to deal closure?',
            'Are sales resources (e.g., sales personnel, marketing materials) effectively utilized?',
            'Is there a clear process for sales performance monitoring and analysis?',
            'Are sales training and development programs effective in improving sales team performance?',
            'Does the sales team effectively collaborate with other departments (e.g., marketing, product development)?'
          ]
        }
      }
    },
    'procurement': {
      name: 'Procurement & Supplier Management',
      icon: ShoppingCart,
      dimensions: {
        maturity: {
          name: 'Maturity',
          questions: [
            'Is there a documented procurement policy and clear procedures for supplier selection?',
            'Does the organization have a formal process for supplier performance evaluation and management?',
            'Is there a centralized system for managing supplier contracts and relationships?',
            'Does the organisation undertake due diligence of new suppliers?',
            'Is there a clear process for managing and resolving supplier disputes?'
          ]
        },
        risk: {
          name: 'Risk',
          questions: [
            'Are there identified single points of failure in the supply chain?',
            'Are there clear procedures for assessing and mitigating supplier risks (e.g., financial instability, ethical concerns)?',
            'Does the organisation have a robust process for managing changes to supplier details?',
            'Are there contingency plans for supply chain disruptions?',
            'Is there adequate due diligence performed on new suppliers?'
          ]
        },
        efficiency: {
          name: 'Efficiency',
          questions: [
            'Is the procurement process efficient, from requisition to payment?',
            'Are there opportunities for cost savings through effective negotiation and volume purchasing?',
            'Is there a clear process for managing inventory levels to minimize waste and carrying costs?',
            'Does the organization leverage technology to automate procurement processes (e.g., e-procurement)?',
            'Is there effective collaboration between procurement and other departments (e.g., operations, finance)?'
          ]
        }
      }
    },
    'people': {
      name: 'People & Culture',
      icon: Users,
      dimensions: {
        maturity: {
          name: 'Maturity',
          questions: [
            'Is there a clearly defined HR strategy aligned with overall business objectives?',
            'Are HR policies and procedures clearly documented, communicated, and consistently applied?',
            'Is there a robust process for talent acquisition, onboarding, and retention?',
            'Does the organization have effective performance management and employee development programs?',
            'Is there a clear process for fostering a positive and inclusive organizational culture?'
          ]
        },
        risk: {
          name: 'Risk',
          questions: [
            'Are there clear policies and procedures for addressing employee grievances and disputes?',
            'Is the organization compliant with relevant labor laws and regulations?',
            'Are there mechanisms to identify and mitigate risks related to employee turnover or skill gaps?',
            'Is there a clear process for managing workplace health and safety?',
            'Are there clear policies and procedures for diversity, equity, and inclusion?'
          ]
        },
        efficiency: {
          name: 'Efficiency',
          questions: [
            'Are HR processes (e.g., payroll, benefits administration) efficient and streamlined?',
            'Is there effective communication and collaboration between HR and other departments?',
            'Are employee engagement initiatives effective in improving productivity and morale?',
            'Is there a clear process for identifying and addressing training and development needs?',
            'Does the organization leverage technology to automate HR processes (e.g., HRIS)?'
          ]
        }
      }
    },
    'technology': {
      name: 'Technology & Systems',
      icon: Monitor,
      dimensions: {
        maturity: {
          name: 'Maturity',
          questions: [
            'Is there a clear IT strategy aligned with overall business objectives?',
            'Are IT systems and infrastructure regularly updated and maintained?',
            'Is there a robust data management strategy, including data backup and recovery?',
            'Does the organization utilize appropriate technology to support its operations and strategic goals?',
            'Is there a clear process for evaluating, selecting, and implementing new technologies?'
          ]
        },
        risk: {
          name: 'Risk',
          questions: [
            'Are there adequate cybersecurity measures in place to protect sensitive data and systems?',
            'Is there a disaster recovery plan for critical IT systems?',
            'Are there clear policies and procedures for data privacy and compliance (e.g., UK GDPR)?',
            'Is the organization overly reliant on legacy systems that pose a risk to operations?',
            'Are there clear processes for managing IT vendor relationships and service level agreements?'
          ]
        },
        efficiency: {
          name: 'Efficiency',
          questions: [
            'Are IT systems integrated to minimize manual data entry and improve workflow efficiency?',
            'Is IT support responsive and effective in resolving user issues?',
            'Are IT resources (e.g., personnel, budget) allocated efficiently to support business needs?',
            'Is there a clear process for monitoring and optimizing IT system performance?',
            'Does the organization leverage automation to improve IT operational efficiency?'
          ]
        }
      }
    },
    'compliance': {
      name: 'Compliance & Risk Management',
      icon: Shield,
      dimensions: {
        maturity: {
          name: 'Maturity',
          questions: [
            'Is there a documented compliance and risk management framework in place?',
            'Is there a risk register in place?',
            'Is there a clear process for identifying, assessing, and prioritizing risks across the organization?',
            'Are employees regularly trained on compliance requirements and risk management procedures?',
            'Is there a system for tracking and reporting compliance and risk management activities?'
          ]
        },
        risk: {
          name: 'Risk',
          questions: [
            'Are there identified areas of non-compliance that could lead to legal or financial penalties?',
            'Is there a clear process for responding to and recovering from risk events?',
            'Is the organization adequately insured against identified risks?',
            'Are there clear policies and procedures for managing data privacy and security risks?',
            'Is there a clear process for conducting internal and external audits related to compliance and risk?'
          ]
        },
        efficiency: {
          name: 'Efficiency',
          questions: [
            'Is the compliance and risk management process integrated into daily operations?',
            'Are compliance and risk management activities efficient and not overly burdensome?',
            'Is there effective communication and collaboration between compliance, risk, and other departments?',
            'Does the organization leverage technology to automate compliance and risk management processes?',
            'Are compliance and risk management efforts regularly reviewed for effectiveness and continuous improvement?'
          ]
        }
      }
    },
    'customer': {
      name: 'Customer Experience & Feedback',
      icon: Heart,
      dimensions: {
        maturity: {
          name: 'Maturity',
          questions: [
            'Is there a clear strategy for customer experience aligned with business objectives?',
            'Are customer touchpoints identified and mapped to understand the customer journey?',
            'Is there a formal process for collecting, analyzing, and acting on customer feedback?',
            'Does the organization utilize customer relationship management (CRM) tools effectively?',
            'Is there a clear process for training employees on customer service best practices?'
          ]
        },
        risk: {
          name: 'Risk',
          questions: [
            'Are there identified pain points in the customer journey that could lead to dissatisfaction or churn?',
            'Is there a clear process for handling customer complaints and escalations?',
            'Is the organization at risk of negative public perception due to poor customer experience?',
            'Are there clear policies and procedures for data privacy related to customer information?',
            'Is there a contingency plan for major customer service disruptions?'
          ]
        },
        efficiency: {
          name: 'Efficiency',
          questions: [
            'Is the customer feedback loop efficient, leading to timely improvements?',
            'Are customer service channels (e.g., phone, email, chat) integrated and efficient?',
            'Are customer service resources (e.g., personnel, tools) allocated efficiently?',
            'Is there a clear process for measuring and reporting on customer satisfaction metrics (e.g., NPS, CSAT)?',
            'Does the organization leverage automation to improve customer service efficiency (e.g., chatbots, self-service portals)?'
          ]
        }
      }
    },
    'operational': {
      name: 'Operational Efficiency',
      icon: Settings,
      dimensions: {
        maturity: {
          name: 'Maturity',
          questions: [
            'Are key operational processes documented and regularly reviewed for effectiveness?',
            'Is there a clear understanding of process interdependencies and bottlenecks?',
            'Does the organization utilize lean or agile methodologies to improve operational flow?',
            'Is there a formal process for continuous improvement and process optimization?',
            'Are operational performance metrics regularly tracked and analyzed?'
          ]
        },
        risk: {
          name: 'Risk',
          questions: [
            'Are there identified single points of failure in critical operational processes?',
            'Is there a clear process for managing and mitigating operational risks (e.g., equipment failure, human error)?',
            'Are there contingency plans for major operational disruptions?',
            'Is the organization exposed to significant waste or rework due to inefficient processes?',
            'Are there clear policies and procedures for quality control and assurance?'
          ]
        },
        efficiency: {
          name: 'Efficiency',
          questions: [
            'Are operational workflows streamlined to minimize unnecessary steps and delays?',
            'Are resources (e.g., labor, materials, equipment) utilized optimally to maximize output?',
            'Is there a clear process for identifying and implementing cost-saving opportunities in operations?',
            'Does the organization leverage technology and automation to improve operational efficiency?',
            'Is there effective cross-functional collaboration to ensure smooth operational handoffs?'
          ]
        }
      }
    },
    'sustainability': {
      name: 'Sustainability & Social Impact',
      icon: Leaf,
      dimensions: {
        maturity: {
          name: 'Maturity',
          questions: [
            'Is there a documented sustainability strategy aligned with overall business objectives?',
            'Does the organization measure and report on its environmental impact (e.g., carbon footprint, waste generation)?',
            'Is there a clear process for engaging with stakeholders on social and environmental issues?',
            'Does the organization have policies and practices that promote ethical labor and human rights throughout its supply chain?',
            'Is there a clear process for evaluating and improving the social impact of the organization\'s operations and products/services?'
          ]
        },
        risk: {
          name: 'Risk',
          questions: [
            'Are there identified environmental or social risks that could impact the organization\'s reputation or operations?',
            'Is the organization compliant with relevant environmental and social regulations?',
            'Are there clear procedures for managing and mitigating risks related to climate change or resource scarcity?',
            'Is there a clear process for addressing ethical concerns in the supply chain or operations?',
            'Is the organization at risk of negative public perception due to unsustainable practices or lack of social responsibility?'
          ]
        },
        efficiency: {
          name: 'Efficiency',
          questions: [
            'Are sustainability initiatives integrated into core business processes to improve efficiency and reduce costs?',
            'Is there a clear process for identifying and implementing opportunities for resource efficiency (e.g., energy, water)?',
            'Does the organization leverage technology to track and manage sustainability performance?',
            'Is there effective collaboration between different departments to drive sustainability efforts?',
            'Are sustainability and social impact efforts regularly reviewed for effectiveness and continuous improvement?'
          ]
        }
      }
    }
  };