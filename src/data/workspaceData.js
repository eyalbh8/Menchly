// Real workspace data transcribed from Menchly product screenshots
// Each dataset carries its own period and source attribution

export const berkosAccountBrief = {
  client: 'Berkos Developer & Properties',
  period: 'Last 90 days',
  source: 'Live Berkos workspace in Menchly',
  metrics: {
    totalMentions: 2424,
    shareOfVoice: 33.2,
    averageRank: 1.0,
    sentiment: 76,
    promptsMonitored: 150
  },
  byPlatform: [
    { id: 'chatgpt', name: 'ChatGPT', mentions: 974, change: 920 },
    { id: 'gemini', name: 'Gemini', mentions: 762, change: 600 },
    { id: 'perplexity', name: 'Perplexity', mentions: 688, change: 1850 }
  ],
  marketPosition: [
    { rank: 1.0, brand: 'Berkos Developer & Properties', mentions: 2424, sentiment: 74 },
    { rank: 2.0, brand: 'SquareOne', mentions: 1708, sentiment: 71 },
    { rank: 3.0, brand: 'Developers Cyprus', mentions: 866, sentiment: 72 },
    { rank: 4.4, brand: 'Cybarco', mentions: 528, sentiment: 84 },
    { rank: 4.7, brand: 'Realtika', mentions: 501, sentiment: 74 }
  ]
};

export const citationsData = {
  client: 'Berkos Developer & Properties',
  period: 'Last 14 days',
  source: 'Live Berkos workspace in Menchly',
  total: 80993,
  previousTotal: 55823,
  change: 45.1,
  domains: 3405,
  byType: [
    { type: 'Corporate', count: 34043, color: '#2d4f9e' },
    { type: 'Other', count: 31299, color: '#6f8fd8' },
    { type: 'Institutional', count: 9112, color: '#8ca6e0' },
    { type: 'Editorial', count: 3024, color: '#bfcdf0' },
    { type: 'UGC', count: 2912, color: '#d4d8f6' },
    { type: 'Reference', count: 603, color: '#eef1fa' }
  ],
  topSources: [
    { domain: 'berkos.co', usage: 91.5 },
    { domain: 'vertexaisearch.cloud.google.com', usage: 71.6 },
    { domain: 'gov.cy', usage: 67.5 },
    { domain: 'dom.com.cy', usage: 35.7 },
    { domain: 'portal.dls.moi.gov.cy', usage: 32.8 }
  ]
};

export const promptsData = {
  client: 'Berkos Developer & Properties',
  period: 'Last 90 days',
  source: 'Live Berkos workspace in Menchly',
  total: 150,
  topics: 10,
  intentSplit: [
    { intent: 'Informational', percent: 76, color: '#2d4f9e' },
    { intent: 'Commercial', percent: 17, color: '#6f8fd8' },
    { intent: 'Navigational', percent: 3, color: '#8ca6e0' },
    { intent: 'Transactional', percent: 3, color: '#bfcdf0' }
  ]
};

export const mentionsData = {
  client: 'Berkos Developer & Properties',
  period: 'Last 90 days',
  source: 'Live Berkos workspace in Menchly',
  total: 3568,
  byPlatform: [
    { id: 'gemini', name: 'Gemini', mentions: 1815 },
    { id: 'chatgpt', name: 'ChatGPT', mentions: 1063 },
    { id: 'perplexity', name: 'Perplexity', mentions: 690 }
  ]
};

export const aiTrafficData = {
  client: 'Anonymized payments client',
  period: 'Last 90 days',
  source: 'Live client workspace in Menchly',
  total: 7476,
  change: 133,
  byPlatform: [
    { id: 'chatgpt', name: 'ChatGPT', entries: 6909 },
    { id: 'gemini', name: 'Gemini', entries: 171 },
    { id: 'perplexity', name: 'Perplexity', entries: 143 },
    { id: 'claude', name: 'Claude', entries: 128 },
    { id: 'copilot', name: 'Copilot', entries: 125 }
  ],
  topLocations: [
    { country: 'United States', entries: 2029 },
    { country: 'Canada', entries: 1042 },
    { country: 'Israel', entries: 584 }
  ]
};
