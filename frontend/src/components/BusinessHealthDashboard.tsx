import React, { useState } from 'react';
import { CheckCircle, BarChart3, TrendingUp, Users, Shield, ShoppingCart, DollarSign, Monitor, Heart, Settings, Leaf } from 'lucide-react';

interface Dimension {
  name: string;
  questions: string[];
}

interface BusinessArea {
  name: string;
  icon: React.ComponentType<any>;
  dimensions: {
    maturity: Dimension;
    risk: Dimension;
    efficiency: Dimension;
  };
}

interface BusinessAreas {
  [key: string]: BusinessArea;
}

interface ClientInfo {
  name: string;
  sector: string;
  industry: string;
  size: string;
}

interface AssessmentResponse {
  [questionIndex: number]: number;
}

interface DimensionData {
  maturity: AssessmentResponse;
  risk: AssessmentResponse;
  efficiency: AssessmentResponse;
}

interface AssessmentData {
  [areaKey: string]: DimensionData;
}

interface RAGStatus {
  status: string;
  color: string;
  textColor: string;
  bgColor: string;
  opinion: string;
}

interface SectorConfig {
  name: string;
  focus: string[];
  benchmarks: {
    substantial: number;
    reasonable: number;
    limited: number;
  };
  priorities: string[];
}

interface IndustryConfig {
  name: string;
  criticalAreas: string[];
}

interface SectorConfigs {
  [key: string]: SectorConfig;
}

interface IndustryConfigs {
  [key: string]: IndustryConfig;
}

type ViewType = 'setup' | 'dashboard' | string;

const BusinessHealthDashboard: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewType>('setup');
  const [selectedSector, setSelectedSector] = useState<string>('private');
  const [selectedIndustry, setSelectedIndustry] = useState<string>('manufacturing');
  const [selectedAreas, setSelectedAreas] = useState<string[]>(['governance', 'strategy', 'financial', 'cashflow', 'revenue', 'procurement', 'people', 'technology', 'compliance', 'customer', 'operational', 'sustainability']);
  const [clientInfo, setClientInfo] = useState<ClientInfo>({
    name: 'ABC Corporation Ltd',
    sector: 'Private',
    industry: 'Manufacturing',
    size: 'Medium (50-250 employees)'
  });

  // Update sample assessment data to use 0-10 scale
  const [assessmentData, setAssessmentData] = useState<AssessmentData>({
    governance: {
      maturity: { 0: 7, 1: 8, 2: 6, 3: 7, 4: 8 },
      risk: { 0: 5, 1: 6, 2: 7, 3: 8, 4: 7 },
      efficiency: { 0: 6, 1: 7, 2: 5, 3: 6, 4: 7 }
    },
    strategy: {
      maturity: { 0: 8, 1: 7, 2: 6, 3: 5, 4: 7 },
      risk: { 0: 6, 1: 7, 2: 5, 3: 8, 4: 6 },
      efficiency: { 0: 7, 1: 8, 2: 6, 3: 7, 4: 8 }
    },
    financial: {
      maturity: { 0: 9, 1: 8, 2: 9, 3: 8, 4: 7 },
      risk: { 0: 8, 1: 7, 2: 8, 3: 9, 4: 8 },
      efficiency: { 0: 7, 1: 8, 2: 7, 3: 8, 4: 9 }
    },
    cashflow: {
      maturity: { 0: 6, 1: 7, 2: 5, 3: 6, 4: 7 },
      risk: { 0: 5, 1: 6, 2: 4, 3: 7, 4: 6 },
      efficiency: { 0: 6, 1: 5, 2: 7, 3: 6, 4: 6 }
    }
  });

  // Complete business areas
  const businessAreas: BusinessAreas = {
    'governance': {
      name: 'Governance & Leadership',
      icon: Users,
      dimensions: {
        maturity: {
          name: 'Maturity',
          questions: [
            'Is there a clearly defined organizational structure with roles, responsibilities, and reporting lines?',
            'Are strategic objectives and goals clearly communicated throughout the organization?',
            'Are leadership decisions transparent and consistently applied?',
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
            'Is the financial close process efficient and streamlined?',
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
            'Is there a strategy in place for optimizing inventory levels (if applicable)?'
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
            'Does the organization engage in strategic sourcing to optimize costs and quality?',
            'Is there a clear process for managing and resolving supplier disputes?'
          ]
        },
        risk: {
          name: 'Risk',
          questions: [
            'Are there identified single points of failure in the supply chain?',
            'Are there clear procedures for assessing and mitigating supplier risks (e.g., financial instability, ethical concerns)?',
            'Is the organization compliant with relevant procurement regulations and ethical sourcing standards?',
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
            'Are there clear policies and procedures for data privacy and compliance (e.g., GDPR, HIPAA)?',
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
            'Are all relevant laws, regulations, and industry standards identified and monitored?',
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

  // Calculate scores for each dimension using 0-10 scale
  const calculateDimensionScore = (areaKey: string, dimensionKey: string): number => {
    if (!businessAreas[areaKey] || !businessAreas[areaKey].dimensions) {
      return 0;
    }
    
    const dimension = businessAreas[areaKey].dimensions[dimensionKey as keyof typeof businessAreas[typeof areaKey]['dimensions']];
    if (!dimension) {
      return 0;
    }
    
    const responses = assessmentData[areaKey]?.[dimensionKey as keyof DimensionData] || {};
    const questions = dimension.questions || [];
    let totalScore = 0;
    let answeredQuestions = 0;

    questions.forEach((_, index) => {
      if (responses[index] !== undefined) {
        totalScore += responses[index];
        answeredQuestions++;
      }
    });

    if (answeredQuestions === 0) return 0;
    // Convert 0-10 scale to percentage: (totalScore / (answeredQuestions * 10)) * 100
    return Math.round((totalScore / (answeredQuestions * 10)) * 100);
  };

  // Calculate overall area score
  const calculateAreaScore = (areaKey: string): number => {
    if (!businessAreas[areaKey] || !businessAreas[areaKey].dimensions) {
      return 0;
    }
    
    const dimensions = Object.keys(businessAreas[areaKey].dimensions);
    const scores = dimensions.map(dim => calculateDimensionScore(areaKey, dim));
    const validScores = scores.filter(score => score > 0);
    
    if (validScores.length === 0) return 0;
    return Math.round(validScores.reduce((sum, score) => sum + score, 0) / validScores.length);
  };

  // Calculate overall health score
  const calculateOverallScore = (): number => {
    const scores = selectedAreas.map(key => calculateAreaScore(key));
    const validScores = scores.filter(score => score > 0);
    if (validScores.length === 0) return 0;
    return Math.round(validScores.reduce((sum, score) => sum + score, 0) / validScores.length);
  };

  // Get RAG status based on audit opinion levels
  const getRAGStatus = (score: number): RAGStatus => {
    if (score >= 75) return { 
      status: 'SUBSTANTIAL', 
      color: 'bg-green-500', 
      textColor: 'text-green-700', 
      bgColor: 'bg-green-50',
      opinion: 'Substantial Assurance'
    };
    if (score >= 50) return { 
      status: 'REASONABLE', 
      color: 'bg-blue-500', 
      textColor: 'text-blue-700', 
      bgColor: 'bg-blue-50',
      opinion: 'Reasonable Assurance'
    };
    if (score >= 25) return { 
      status: 'LIMITED', 
      color: 'bg-yellow-500', 
      textColor: 'text-yellow-700', 
      bgColor: 'bg-yellow-50',
      opinion: 'Limited Assurance'
    };
    return { 
      status: 'NONE', 
      color: 'bg-red-500', 
      textColor: 'text-red-700', 
      bgColor: 'bg-red-50',
      opinion: 'No Assurance'
    };
  };

  // Handle assessment responses using 0-10 scale
  const handleResponse = (areaKey: string, dimensionKey: string, questionIndex: number, value: string): void => {
    setAssessmentData(prev => ({
      ...prev,
      [areaKey]: {
        ...prev[areaKey],
        [dimensionKey as keyof DimensionData]: {
          ...prev[areaKey]?.[dimensionKey as keyof DimensionData],
          [questionIndex]: parseInt(value)
        }
      }
    }));
  };

  // Update sector benchmarks to align with audit opinion levels
  const sectorConfig: SectorConfigs = {
    private: {
      name: 'Private & Corporate',
      focus: ['revenue', 'financial', 'operational', 'technology'],
      benchmarks: { substantial: 75, reasonable: 50, limited: 25 },
      priorities: ['Profitability', 'Growth', 'Efficiency', 'Innovation']
    },
    public: {
      name: 'Public Sector',
      focus: ['governance', 'compliance', 'people', 'customer'],
      benchmarks: { substantial: 70, reasonable: 45, limited: 20 },
      priorities: ['Service Delivery', 'Transparency', 'Accountability', 'Value for Money']
    },
    nonprofit: {
      name: 'Not-for-Profit',
      focus: ['sustainability', 'people', 'governance', 'customer'],
      benchmarks: { substantial: 65, reasonable: 40, limited: 20 },
      priorities: ['Mission Impact', 'Stewardship', 'Sustainability', 'Stakeholder Engagement']
    }
  };

  const industryConfig: IndustryConfigs = {
    manufacturing: {
      name: 'Manufacturing',
      criticalAreas: ['operational', 'procurement', 'technology', 'compliance']
    },
    healthcare: {
      name: 'Healthcare',
      criticalAreas: ['compliance', 'people', 'technology', 'customer']
    },
    financial: {
      name: 'Financial Services',
      criticalAreas: ['compliance', 'technology', 'financial', 'customer']
    },
    insurance: {
      name: 'Insurance',
      criticalAreas: ['compliance', 'technology', 'financial', 'customer']
    },
    education: {
      name: 'Education',
      criticalAreas: ['people', 'technology', 'governance', 'customer']
    },
    retail: {
      name: 'Retail',
      criticalAreas: ['customer', 'revenue', 'technology', 'operational']
    },
    technology: {
      name: 'Technology',
      criticalAreas: ['technology', 'people', 'revenue', 'governance']
    },
    charity: {
      name: 'Charity',
      criticalAreas: ['sustainability', 'people', 'governance', 'compliance']
    },
    energy: {
      name: 'Energy',
      criticalAreas: ['operational', 'compliance', 'sustainability', 'technology']
    },
    government: {
      name: 'Central/Local Government',
      criticalAreas: ['governance', 'compliance', 'people', 'customer']
    },
    construction: {
      name: 'Construction',
      criticalAreas: ['operational', 'procurement', 'people', 'compliance']
    },
    professional: {
      name: 'Professional Services',
      criticalAreas: ['people', 'revenue', 'customer', 'technology']
    }
  };

  // Client Setup View
  const ClientSetupView: React.FC = () => {
    const handleAreaToggle = (areaKey: string): void => {
      setSelectedAreas(prev => 
        prev.includes(areaKey) 
          ? prev.filter(key => key !== areaKey)
          : [...prev, areaKey]
      );
    };

    const selectPresetAreas = (preset: string): void => {
      switch(preset) {
        case 'all':
          setSelectedAreas(Object.keys(businessAreas));
          break;
        case 'core':
          setSelectedAreas(['governance', 'strategy', 'financial', 'people', 'operational', 'compliance']);
          break;
        case 'startup':
          setSelectedAreas(['strategy', 'financial', 'revenue', 'people', 'technology']);
          break;
        case 'sector':
          if (sectorConfig[selectedSector]) {
            setSelectedAreas(sectorConfig[selectedSector].focus);
          }
          break;
        case 'industry':
          if (industryConfig[selectedIndustry]) {
            setSelectedAreas(industryConfig[selectedIndustry].criticalAreas);
          }
          break;
        default:
          break;
      }
    };

    return (
      <div className="max-w-6xl mx-auto p-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Client Assessment Setup</h2>
        
        {/* Client Information */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Client Information</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Client Name</label>
              <input
                type="text"
                value={clientInfo.name}
                onChange={(e) => setClientInfo({...clientInfo, name: e.target.value})}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter client organization name"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Organization Size</label>
              <select
                value={clientInfo.size}
                onChange={(e) => setClientInfo({...clientInfo, size: e.target.value})}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Small (1-50 employees)">Small (1-50 employees)</option>
                <option value="Medium (50-250 employees)">Medium (50-250 employees)</option>
                <option value="Large (250-1000 employees)">Large (250-1000 employees)</option>
                <option value="Enterprise (1000+ employees)">Enterprise (1000+ employees)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Sector Selection */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Sector Selection</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Object.entries(sectorConfig).map(([key, sector]) => (
              <div
                key={key}
                onClick={() => {
                  setSelectedSector(key);
                  setClientInfo({...clientInfo, sector: sector.name});
                }}
                className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                  selectedSector === key
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <h4 className="font-semibold text-gray-800 mb-2">{sector.name}</h4>
                <p className="text-sm text-gray-600 mb-3">Key Priorities:</p>
                <ul className="text-xs text-gray-500">
                  {sector.priorities.map((priority, index) => (
                    <li key={index}>• {priority}</li>
                  ))}
                </ul>
                {selectedSector === key && (
                  <div className="mt-3 text-xs text-blue-600 font-medium">
                    ✓ Selected Sector
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Industry Selection */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Industry Selection</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Object.entries(industryConfig).map(([key, industry]) => (
              <div
                key={key}
                onClick={() => {
                  setSelectedIndustry(key);
                  setClientInfo({...clientInfo, industry: industry.name});
                }}
                className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                  selectedIndustry === key
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <h4 className="font-semibold text-gray-800 mb-2 text-sm">{industry.name}</h4>
                <p className="text-xs text-gray-600 mb-2">Critical Areas:</p>
                <div className="text-xs text-gray-500">
                  {industry.criticalAreas.slice(0, 2).map(areaKey => businessAreas[areaKey]?.name).join(', ')}
                  {industry.criticalAreas.length > 2 && '...'}
                </div>
                {selectedIndustry === key && (
                  <div className="mt-3 text-xs text-green-600 font-medium">
                    ✓ Selected Industry
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Business Areas Selection */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Select Business Areas to Assess</h3>
          
          <div className="mb-6">
            <h4 className="font-medium text-gray-700 mb-3">Quick Presets:</h4>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => selectPresetAreas('all')}
                className="px-3 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 text-sm"
              >
                All Areas (12)
              </button>
              <button
                onClick={() => selectPresetAreas('core')}
                className="px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 text-sm"
              >
                Core Business (6)
              </button>
              <button
                onClick={() => selectPresetAreas('startup')}
                className="px-3 py-1 bg-purple-100 text-purple-700 rounded hover:bg-purple-200 text-sm"
              >
                Startup Essentials (5)
              </button>
              <button
                onClick={() => selectPresetAreas('sector')}
                className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded hover:bg-indigo-200 text-sm"
              >
                {sectorConfig[selectedSector]?.name} Focus ({sectorConfig[selectedSector]?.focus.length})
              </button>
              <button
                onClick={() => selectPresetAreas('industry')}
                className="px-3 py-1 bg-pink-100 text-pink-700 rounded hover:bg-pink-200 text-sm"
              >
                {industryConfig[selectedIndustry]?.name} Critical ({industryConfig[selectedIndustry]?.criticalAreas.length})
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(businessAreas).map(([key, area]) => {
              const isSelected = selectedAreas.includes(key);
              const isCritical = industryConfig[selectedIndustry]?.criticalAreas.includes(key);
              const isFocus = sectorConfig[selectedSector]?.focus.includes(key);
              const IconComponent = area.icon;
              
              return (
                <div
                  key={key}
                  onClick={() => handleAreaToggle(key)}
                  className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                    isSelected
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center">
                      <IconComponent className="w-5 h-5 text-gray-600 mr-2" />
                      <h4 className="font-semibold text-gray-800 text-sm">{area.name}</h4>
                    </div>
                    <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                      isSelected ? 'bg-blue-500 border-blue-500' : 'border-gray-300'
                    }`}>
                      {isSelected && <CheckCircle className="w-3 h-3 text-white" />}
                    </div>
                  </div>
                  
                  {/* Indicators */}
                  <div className="flex gap-1 mb-2">
                    {isCritical && (
                      <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">
                        Industry Critical
                      </span>
                    )}
                    {isFocus && (
                      <span className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded text-xs">
                        Sector Focus
                      </span>
                    )}
                  </div>
                  
                  <p className="text-xs text-gray-600">
                    15 questions across 3 dimensions
                  </p>
                </div>
              );
            })}
          </div>

          <div className="mt-4 p-3 bg-gray-50 rounded-lg">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Selected Areas:</span>
              <span className="font-medium">{selectedAreas.length} of {Object.keys(businessAreas).length}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-600 mt-1">
              <span>Total Questions:</span>
              <span className="font-medium">{selectedAreas.length * 15} questions</span>
            </div>
            <div className="flex justify-between text-sm text-gray-600 mt-1">
              <span>Estimated Time:</span>
              <span className="font-medium">{Math.ceil(selectedAreas.length * 8)} - {Math.ceil(selectedAreas.length * 12)} minutes</span>
            </div>
          </div>
        </div>

        {/* Assessment Configuration Summary */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-800 mb-3">Assessment Configuration Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-medium text-blue-800 mb-2">Client Details:</h4>
              <ul className="text-blue-700 space-y-1">
                <li>• <strong>Client:</strong> {clientInfo.name}</li>
                <li>• <strong>Sector:</strong> {sectorConfig[selectedSector]?.name}</li>
                <li>• <strong>Industry:</strong> {industryConfig[selectedIndustry]?.name}</li>
                <li>• <strong>Size:</strong> {clientInfo.size}</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-blue-800 mb-2">Assessment Scope:</h4>
              <ul className="text-blue-700 space-y-1">
                <li>• <strong>Areas:</strong> {selectedAreas.length} selected</li>
                <li>• <strong>Questions:</strong> {selectedAreas.length * 15} total</li>
                <li>• <strong>Duration:</strong> {Math.ceil(selectedAreas.length * 10)} min est.</li>
                <li>• <strong>Focus:</strong> {selectedSector === 'private' ? 'Performance' : selectedSector === 'public' ? 'Service' : 'Impact'} driven</li>
              </ul>
            </div>
          </div>
          
          {selectedAreas.length < 3 && (
            <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-yellow-800 text-sm">
                ⚠️ <strong>Recommendation:</strong> Select at least 3-4 areas for a meaningful business health assessment.
              </p>
            </div>
          )}
          
          <div className="mt-4 flex gap-3">
            <button
              onClick={() => setCurrentView('dashboard')}
              disabled={selectedAreas.length === 0}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                selectedAreas.length === 0
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-blue-500 text-white hover:bg-blue-600'
              }`}
            >
              Start Assessment →
            </button>
            
            <button
              onClick={() => {
                setSelectedAreas([]);
              }}
              className="px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors"
            >
              Clear All
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Assessment View Component
  const AssessmentView: React.FC<{ areaKey: string }> = ({ areaKey }) => {
    const area = businessAreas[areaKey];
    const IconComponent = area.icon;

    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="mb-6">
          <button 
            onClick={() => setCurrentView('dashboard')}
            className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            ← Back to Dashboard
          </button>
          <div className="flex items-center mb-4">
            <IconComponent className="w-8 h-8 text-blue-600 mr-3" />
            <h2 className="text-3xl font-bold text-gray-800">{area.name}</h2>
          </div>
          <p className="text-gray-600 mb-6">
            Rate each statement on a scale of 0-10 (0 = Not at all, 10 = Excellent). Results will be displayed using professional audit opinion levels.
          </p>

          {/* Dimension Progress Summary */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            {Object.entries(area.dimensions).map(([dimKey, dim]) => {
              const score = calculateDimensionScore(areaKey, dimKey);
              const rag = getRAGStatus(score);
              return (
                <div key={dimKey} className={`p-4 rounded-lg border-2 ${rag.bgColor}`}>
                  <h3 className="font-semibold text-gray-800 mb-2">{dim.name}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-gray-900">{score}%</span>
                    <div className={`px-3 py-1 rounded-full text-white text-sm font-medium ${rag.color}`}>
                      {rag.status}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Assessment Questions by Dimension */}
        <div className="space-y-8">
          {Object.entries(area.dimensions).map(([dimKey, dimension]) => (
            <div key={dimKey} className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-6 border-b pb-2">
                {dimension.name}
              </h3>
              
              <div className="space-y-6">
                {dimension.questions.map((question, index) => (
                  <div key={index} className="border-l-4 border-blue-200 pl-4">
                    <p className="mb-4 font-medium text-gray-800">{question}</p>
                    
                    {/* 0-10 Scale Slider */}
                    <div className="flex items-center space-x-4">
                      <span className="text-sm text-gray-500 min-w-[20px]">0</span>
                      <input
                        type="range"
                        min="0"
                        max="10"
                        value={assessmentData[areaKey]?.[dimKey as keyof DimensionData]?.[index] || 0}
                        onChange={(e) => handleResponse(areaKey, dimKey, index, e.target.value)}
                        className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                        style={{
                          background: `linear-gradient(to right, 
                            #ef4444 0%, #ef4444 25%, 
                            #f59e0b 25%, #f59e0b 50%, 
                            #3b82f6 50%, #3b82f6 75%, 
                            #10b981 75%, #10b981 100%)`
                        }}
                      />
                      <span className="text-sm text-gray-500 min-w-[20px]">10</span>
                      <div className="ml-4 px-3 py-1 bg-blue-100 text-blue-800 rounded font-medium min-w-[3rem] text-center">
                        {assessmentData[areaKey]?.[dimKey as keyof DimensionData]?.[index] || 0}
                      </div>
                    </div>

                    {/* Score Interpretation */}
                    <div className="mt-2 text-sm text-gray-600">
                      <span className="font-medium">Current Rating: </span>
                      {(() => {
                        const score = (assessmentData[areaKey]?.[dimKey as keyof DimensionData]?.[index] || 0) * 10;
                        if (score >= 75) return <span className="text-green-600 font-medium">Substantial Assurance Level</span>;
                        if (score >= 50) return <span className="text-blue-600 font-medium">Reasonable Assurance Level</span>;
                        if (score >= 25) return <span className="text-yellow-600 font-medium">Limited Assurance Level</span>;
                        return <span className="text-red-600 font-medium">No Assurance Level</span>;
                      })()}
                    </div>
                  </div>
                ))}
              </div>

              {/* Dimension Summary */}
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-gray-800">{dimension.name} Dimension Score</h4>
                    <p className="text-2xl font-bold text-gray-900 mt-1">{calculateDimensionScore(areaKey, dimKey)}%</p>
                  </div>
                  <div className={`px-4 py-2 rounded-full font-medium text-white ${getRAGStatus(calculateDimensionScore(areaKey, dimKey)).color}`}>
                    {getRAGStatus(calculateDimensionScore(areaKey, dimKey)).status}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Overall Area Score */}
        <div className="mt-8 p-6 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Overall {area.name} Assessment</h3>
              <p className="text-3xl font-bold text-gray-900 mt-1">{calculateAreaScore(areaKey)}%</p>
              <p className="text-sm text-gray-600 mt-1">
                {getRAGStatus(calculateAreaScore(areaKey)).opinion}
              </p>
            </div>
            <div className={`px-4 py-2 rounded-full font-medium text-white ${getRAGStatus(calculateAreaScore(areaKey)).color}`}>
              {getRAGStatus(calculateAreaScore(areaKey)).status}
            </div>
          </div>
          
          {/* Progress Indicator */}
          <div className="mt-4">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Assessment Progress</span>
              <span>
                {Object.values(assessmentData[areaKey] || {}).flatMap(dim => Object.values(dim)).length} 
                of {Object.values(area.dimensions).reduce((total, dim) => total + dim.questions.length, 0)} questions completed
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                style={{ 
                  width: `${(Object.values(assessmentData[areaKey] || {}).flatMap(dim => Object.values(dim)).length / 
                    Object.values(area.dimensions).reduce((total, dim) => total + dim.questions.length, 0)) * 100}%` 
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const DashboardView: React.FC = () => {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="mb-8">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-4xl font-bold text-gray-800 mb-2">Business Operations Health Check</h1>
              <p className="text-gray-600">Assessment configured for {selectedAreas.length} business areas</p>
            </div>
            <button
              onClick={() => setCurrentView('setup')}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
            >
              Change Configuration
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
          {selectedAreas.map((key) => {
            const area = businessAreas[key];
            const IconComponent = area.icon;
            
            return (
              <div key={key} className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center">
                      <IconComponent className="w-6 h-6 text-gray-600 mr-3 flex-shrink-0" />
                      <h3 className="font-semibold text-gray-800 leading-tight">{area.name}</h3>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div className="h-3 rounded-full bg-blue-500" style={{ width: '0%' }}></div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm font-bold px-2 py-1 rounded bg-gray-100 text-gray-600">
                      Not Started
                    </span>
                    <button
                      onClick={() => setCurrentView(key)}
                      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors text-sm font-medium"
                    >
                      Assess
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {currentView === 'setup' ? (
        <ClientSetupView />
      ) : currentView === 'dashboard' ? (
        <DashboardView />
      ) : (
        <AssessmentView areaKey={currentView} />
      )}
    </div>
  );
};

export default BusinessHealthDashboard;