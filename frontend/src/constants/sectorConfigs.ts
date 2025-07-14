import { SectorConfigs } from "@/types/params";

// Update sector benchmarks to align with audit opinion levels
export const sectorConfig: SectorConfigs = {
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