import { useEffect, useId, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { berkosCase, faqs, marketStats, platforms, productTabs, servicePillars } from '../data.js';
import { 
  berkosAccountBrief, 
  citationsData, 
  promptsData, 
  mentionsData, 
  aiTrafficData 
} from '../data/workspaceData.js';
import { insightArticles } from '../content/insights.js';
import BookMeeting from './BookMeeting.jsx';
import { AssessmentLink, ProductStage, ResearchGrid, Section, SectionHeader, InternalLink, ArrowLink, FaqAccordion, AnimatedNumber, reducedMotion, useInView } from './UI.jsx';
import { 
  MetricGrid, 
  PlatformBars, 
  RankTable, 
  DonutChart, 
  IntentBar, 
  SourceTable,
  DataPanel 
} from './DataViz.jsx';

const heroOrbit = ['chatgpt', 'claude', 'gemini', 'perplexity', 'copilot'];

const heroPrompts = [
  { icon: 'chatgpt', text: 'Best private bank in Zurich?', side: 'left', y: 22, delay: 0, duration: 15, mobile: true },
  { icon: 'perplexity', text: 'Top villa developers, Limassol', side: 'left', y: 75, delay: -7, duration: 16 },
  { icon: 'claude', text: 'Most trusted wealth manager?', side: 'right', y: 77, delay: -3, duration: 14 },
  { icon: 'gemini', text: 'Safest private jet charter', side: 'left', y: 58, delay: -10, duration: 17 }
];

const heroSources = [
  { kind: 'Editorial', title: 'The developers redefining coastal living', engine: 'ChatGPT', side: 'left', y: 38, delay: -4, duration: 16 },
  { kind: 'Industry report', title: 'Where private wealth is relocating next', engine: 'Perplexity', side: 'right', y: 30, delay: -11, duration: 17 }
];

const heroMetrics = [
  { label: 'Share of voice', value: '▲ 33.2%', side: 'left', y: 88, delay: -2, duration: 15, mobile: true },
  { label: 'AI mentions · 90d', value: '2,424', side: 'right', y: 17, delay: -8, duration: 16 }
];

const heroWords = [
  { word: 'Citations', x: 18, y: 12 }, { word: 'Entities', x: 80, y: 44 }, { word: 'Retrieval', x: 12, y: 50 },
  { word: 'Share of voice', x: 74, y: 94 }, { word: 'Grounding', x: 30, y: 94 }, { word: 'Sentiment', x: 88, y: 70 },
  { word: 'Structured data', x: 8, y: 94 }, { word: 'Recommendations', x: 70, y: 8 }
];

function heroPlacement(item) {
  return {
    [item.side]: 'clamp(16px, 2.6vw, 56px)',
    top: `${item.y}%`,
    animationDuration: `${item.duration}s`,
    animationDelay: `${item.delay}s`,
    '--cycle': `${item.duration}s`,
    '--delay': `${item.delay}s`
  };
}

function HeroField() {
  const ref = useRef(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (!('IntersectionObserver' in window)) return undefined;
    const observer = new IntersectionObserver(([entry]) => setPaused(!entry.isIntersecting));
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className={`hero-field ${paused ? 'is-paused' : ''}`.trim()} ref={ref} aria-hidden="true">
      <svg className="hero-field__lines" viewBox="0 0 1600 900" preserveAspectRatio="none">
        <ellipse className="hero-field__ring" cx="800" cy="450" rx="720" ry="390" />
        <ellipse className="hero-field__ring hero-field__ring--inner" cx="800" cy="450" rx="560" ry="300" />
        <path className="hero-field__flow" d="M300 250 C 520 250 620 430 800 450" />
        <path className="hero-field__flow" d="M300 640 C 520 640 620 470 800 450" style={{ animationDelay: '-1.2s' }} />
        <path className="hero-field__flow" d="M1300 330 C 1080 330 980 430 800 450" style={{ animationDelay: '-.6s' }} />
        <path className="hero-field__flow" d="M1300 700 C 1080 700 980 470 800 450" style={{ animationDelay: '-1.8s' }} />
      </svg>

      {heroOrbit.map((icon, i) => (
        <span className="hero-orbit" style={{ animationDelay: `${-i * 14}s` }} key={icon}>
          <span className="hero-orbit__y" style={{ animationDelay: `${-i * 14 - 17.5}s` }}>
            <span className="hero-orbit__icon"><PlatformIcon id={icon} /></span>
          </span>
        </span>
      ))}

      {heroWords.map((w, i) => (
        <span className="hero-word" style={{ left: `${w.x}%`, top: `${w.y}%`, animationDelay: `${-i * 1.7}s` }} key={w.word}>{w.word}</span>
      ))}

      {heroPrompts.map((p) => (
        <div className={`hero-float hero-prompt ${p.mobile ? 'is-mobile' : ''}`.trim()} style={heroPlacement(p)} key={p.text}>
          <span className="hero-prompt__icon"><PlatformIcon id={p.icon} /></span>
          <span className="hero-prompt__text">{p.text}</span>
        </div>
      ))}

      {heroSources.map((s) => (
        <div className="hero-float hero-source" style={heroPlacement(s)} key={s.title}>
          <span className="hero-source__kind">{s.kind}</span>
          <span className="hero-source__title">{s.title}</span>
          <span className="hero-source__lines"><i /><i /></span>
          <span className="hero-source__badge">Cited · {s.engine}</span>
        </div>
      ))}

      {heroMetrics.map((m) => (
        <div className={`hero-float hero-metric ${m.mobile ? 'is-mobile' : ''}`.trim()} style={heroPlacement(m)} key={m.label}>
          <span className="hero-metric__text"><span>{m.label}</span><strong>{m.value}</strong></span>
          <svg className="hero-metric__spark" viewBox="0 0 60 22"><path d="M2 18 L12 15 L20 16 L30 10 L38 12 L48 5 L58 3" /></svg>
        </div>
      ))}
    </div>
  );
}

function Hero() {
  return (
    <section id="top" className="hero">
      <div className="hero__aurora" aria-hidden="true" />
      <HeroField />
      <div className="shell hero__inner">
        <span className="hero__badge hero__in" style={{ animationDelay: '.05s' }}>Built to adapt · Built to compound</span>
        <h1 className="hero__headline hero__in" style={{ animationDelay: '.16s' }}>
          AI Search Marketing<br />Infrastructure.
        </h1>
        <p className="hero__copy hero__in" style={{ animationDelay: '.3s' }}>
          Menchly builds custom AI Search marketing infrastructure for brands that want to lead the next iteration of the Internet. Data tells us where to act — our infrastructure lets us execute faster, learn continuously, and compound results over time.
        </p>
        <BookMeeting className="button button--primary hero__cta hero__in" style={{ animationDelay: '.42s' }} placement="homepage-hero">
          <span>Book a meeting</span>
          <span aria-hidden="true">→</span>
        </BookMeeting>
      </div>
    </section>
  );
}

function PlatformIcon({ id }) {
  const common = { viewBox: '0 0 24 24', fill: 'currentColor', 'aria-hidden': true };
  if (id === 'chatgpt') {
    return (
      <svg {...common}>
        <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z" />
      </svg>
    );
  }
  if (id === 'claude') {
    return (
      <svg {...common}>
        <path d="M17.3041 3.541h-3.6718l6.696 16.918H24Zm-10.6082 0L0 20.459h3.7442l1.3693-3.5527h7.0052l1.3693 3.5528h3.7442L10.5363 3.5409Zm-.3712 10.2232 2.2914-5.9456 2.2914 5.9456Z" />
      </svg>
    );
  }
  if (id === 'gemini') {
    return (
      <svg {...common}>
        <path d="M11.04 19.32Q12 21.51 12 24q0-2.49.93-4.68.96-2.19 2.58-3.81t3.81-2.55Q21.51 12 24 12q-2.49 0-4.68-.93a12.3 12.3 0 0 1-3.81-2.58 12.3 12.3 0 0 1-2.58-3.81Q12 2.49 12 0q0 2.49-.96 4.68-.93 2.19-2.55 3.81a12.3 12.3 0 0 1-3.81 2.58Q2.49 12 0 12q2.49 0 4.68.96 2.19.93 3.81 2.55t2.55 3.81" />
      </svg>
    );
  }
  if (id === 'perplexity') {
    return (
      <svg {...common}>
        <path d="M22.3977 7.0896h-2.3106V.0676l-7.5094 6.3542V.1577h-1.1554v6.1966L4.4904 0v7.0896H1.6023v10.3976h2.8882V24l6.932-6.3591v6.2005h1.1554v-6.0469l6.9318 6.1807v-6.4879h2.8882V7.0896zm-3.4657-4.531v4.531h-5.355l5.355-4.531zm-13.2862.0676 4.8691 4.4634H5.6458V2.6262zM2.7576 16.332V8.245h7.8476l-6.1149 6.1147v1.9723H2.7576zm2.8882 5.0404v-3.8852h.0001v-2.6488l5.7763-5.7764v7.0111l-5.7764 5.2993zm12.7086.0248-5.7766-5.1509V9.0618l5.7766 5.7766v6.5588zm2.8882-5.0652h-1.733v-1.9723L13.3948 8.245h7.8478v8.087z" />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <path d="M23.922 16.997C23.061 18.492 18.063 22.02 12 22.02 5.937 22.02.939 18.492.078 16.997A.641.641 0 0 1 0 16.741v-2.869a.883.883 0 0 1 .053-.22c.372-.935 1.347-2.292 2.605-2.656.167-.429.414-1.055.644-1.517a10.098 10.098 0 0 1-.052-1.086c0-1.331.282-2.499 1.132-3.368.397-.406.89-.717 1.474-.952C7.255 2.937 9.248 1.98 11.978 1.98c2.731 0 4.767.957 6.166 2.093.584.235 1.077.546 1.474.952.85.869 1.132 2.037 1.132 3.368 0 .368-.014.733-.052 1.086.23.462.477 1.088.644 1.517 1.258.364 2.233 1.721 2.605 2.656a.841.841 0 0 1 .053.22v2.869a.641.641 0 0 1-.078.256Zm-11.75-5.992h-.344a4.359 4.359 0 0 1-.355.508c-.77.947-1.918 1.492-3.508 1.492-1.725 0-2.989-.359-3.782-1.259a2.137 2.137 0 0 1-.085-.104L4 11.746v6.585c1.435.779 4.514 2.179 8 2.179 3.486 0 6.565-1.4 8-2.179v-6.585l-.098-.104s-.033.045-.085.104c-.793.9-2.057 1.259-3.782 1.259-1.59 0-2.738-.545-3.508-1.492a4.359 4.359 0 0 1-.355-.508Zm2.328 3.25c.549 0 1 .451 1 1v2c0 .549-.451 1-1 1-.549 0-1-.451-1-1v-2c0-.549.451-1 1-1Zm-5 0c.549 0 1 .451 1 1v2c0 .549-.451 1-1 1-.549 0-1-.451-1-1v-2c0-.549.451-1 1-1Zm3.313-6.185c.136 1.057.403 1.913.878 2.497.442.544 1.134.938 2.344.938 1.573 0 2.292-.337 2.657-.751.384-.435.558-1.15.558-2.361 0-1.14-.243-1.847-.705-2.319-.477-.488-1.319-.862-2.824-1.025-1.487-.161-2.192.138-2.533.529-.269.307-.437.808-.438 1.578v.021c0 .265.021.562.063.893Zm-1.626 0c.042-.331.063-.628.063-.894v-.02c-.001-.77-.169-1.271-.438-1.578-.341-.391-1.046-.69-2.533-.529-1.505.163-2.347.537-2.824 1.025-.462.472-.705 1.179-.705 2.319 0 1.211.175 1.926.558 2.361.365.414 1.084.751 2.657.751 1.21 0 1.902-.394 2.344-.938.475-.584.742-1.44.878-2.497Z" />
    </svg>
  );
}

function PlatformGrid() {
  const loop = [...platforms, ...platforms, ...platforms, ...platforms];
  return (
    <Section id="context" tone="paper">
      <div className="platform-marquee" aria-label="AI platforms considered in our work">
        <div className="platform-marquee__track">
          {loop.map((platform, i) => (
            <span key={`${platform.id}-${i}`} className="platform-marquee__item" aria-hidden={i >= platforms.length}>
              <span className="platform-marquee__icon">
                <PlatformIcon id={platform.id} />
              </span>
              <span className="platform-marquee__name">{platform.name}</span>
            </span>
          ))}
        </div>
      </div>
    </Section>
  );
}

function ProductTheater() {
  const [active, setActive] = useState(0);
  const tab = productTabs[active];
  const id = useId();

  const renderDataPanel = () => {
    if (tab.id === 'overview') {
      const metrics = [
        { value: berkosAccountBrief.metrics.totalMentions.toLocaleString(), label: 'Total AI mentions' },
        { value: berkosAccountBrief.metrics.shareOfVoice + '%', label: 'Share of voice' },
        { value: berkosAccountBrief.metrics.sentiment + '/100', label: 'Sentiment score' }
      ];
      return (
        <DataPanel 
          title="Account brief" 
          subtitle={`${berkosAccountBrief.client} · ${berkosAccountBrief.period}`}
        >
          <MetricGrid metrics={metrics} />
          <PlatformBars platforms={berkosAccountBrief.byPlatform} />
          <RankTable data={berkosAccountBrief.marketPosition} />
        </DataPanel>
      );
    }
    
    if (tab.id === 'prompts') {
      return (
        <DataPanel 
          title="Prompt intelligence" 
          subtitle={`${promptsData.client} · ${promptsData.period}`}
        >
          <div className="product-data-row">
            <div>
              <div className="product-data-stat">{promptsData.total}</div>
              <div className="product-data-label">Tracked prompts</div>
            </div>
            <div>
              <div className="product-data-stat">{promptsData.topics}</div>
              <div className="product-data-label">Topics</div>
            </div>
          </div>
          <IntentBar data={promptsData.intentSplit} />
        </DataPanel>
      );
    }
    
    if (tab.id === 'ai-traffic') {
      const metrics = [
        { value: aiTrafficData.total.toLocaleString(), label: 'Total entries', change: aiTrafficData.change }
      ];
      return (
        <DataPanel 
          title="AI traffic" 
          subtitle={`${aiTrafficData.client} · ${aiTrafficData.period}`}
        >
          <MetricGrid metrics={metrics} />
          <PlatformBars platforms={aiTrafficData.byPlatform} />
        </DataPanel>
      );
    }
    
    if (tab.id === 'mentions') {
      return (
        <DataPanel 
          title="LLM mentions" 
          subtitle={`${mentionsData.client} · ${mentionsData.period}`}
        >
          <div className="product-data-row">
            <div>
              <div className="product-data-stat">{mentionsData.total.toLocaleString()}</div>
              <div className="product-data-label">Total mentions</div>
            </div>
          </div>
          <PlatformBars platforms={mentionsData.byPlatform} />
        </DataPanel>
      );
    }
    
    if (tab.id === 'citations') {
      const metrics = [
        { value: citationsData.total.toLocaleString(), label: 'Total citations', change: citationsData.change },
        { value: citationsData.domains.toLocaleString(), label: 'Unique domains' }
      ];
      return (
        <DataPanel 
          title="Citation sources" 
          subtitle={`${citationsData.client} · ${citationsData.period}`}
        >
          <MetricGrid metrics={metrics} />
          <DonutChart data={citationsData.byType} total={citationsData.total} />
          <SourceTable sources={citationsData.topSources} />
        </DataPanel>
      );
    }
    
    return null;
  };

  return (
    <Section id="product" tone="paper" className="product-theater-section">
      <SectionHeader
        align="center"
        eyebrow="The Menchly system"
        title="See how the brand shows up across AI"
        copy="Visibility, prompts, AI traffic, mentions and citation authority - built into custom infrastructure around each client"
      />
      <div className="product-tabs" role="tablist" aria-label="Product views">
        {productTabs.map((item, index) => {
          const selected = index === active;
          return (
            <button
              key={item.id}
              type="button"
              role="tab"
              id={`${id}-tab-${item.id}`}
              aria-selected={selected}
              aria-controls={`${id}-panel-${item.id}`}
              className={`product-tabs__btn${selected ? ' is-active' : ''}`}
              onClick={() => setActive(index)}
            >
              {item.label}
            </button>
          );
        })}
      </div>
      <div
        className="product-panel-container"
        role="tabpanel"
        id={`${id}-panel-${tab.id}`}
        aria-labelledby={`${id}-tab-${tab.id}`}
      >
        <div className="product-panel__copy">
          <h3>{tab.title}</h3>
          <p>{tab.copy}</p>
          <AssessmentLink placement="homepage-product-theater">Private assessment</AssessmentLink>
        </div>
        {renderDataPanel()}
      </div>
    </Section>
  );
}

const marketStatement = 'AI isn’t browsing. It’s choosing. The brands that show up in those answers win the consideration that never appears in traditional search reports.';

function MarketStats() {
  return (
    <Section id="market" className="market-stats-section">
      <div className="market-stats__intro">
        <SectionHeader
          align="center"
          eyebrow="A quiet decision"
          title={<>Which brand gets <em className="shine-text">mentioned.</em></>}
        />
        <p className="statement">
          {marketStatement.split(' ').map((word, i) => (
            <span className="statement__word" style={{ '--i': i }} key={i}>{word} </span>
          ))}
        </p>
        <ServicePhoto
          src="/images/generated/market-ask-ai.jpg"
          alt="A person asking an AI assistant for a recommendation at night"
        >
          <GlassPrompt prompts={[
            { icon: 'claude', text: 'Which agency should handle a discreet off-market sale?' },
            { icon: 'chatgpt', text: 'Best private clinic for an executive health check?' },
            { icon: 'perplexity', text: 'Which law firm handles cross-border M&A in Cyprus?' },
            { icon: 'gemini', text: 'Most trusted wealth manager for relocating families' }
          ]} />
        </ServicePhoto>
      </div>
      <ul className="market-stats">
        {marketStats.map((stat) => (
          <li key={stat.value + stat.label}>
            <p className="market-stats__value">{stat.value}</p>
            <p className="market-stats__label">{stat.label}</p>
            <p className="market-stats__source">
              <a href={stat.sourceUrl} target="_blank" rel="noopener">{stat.source}</a>
            </p>
          </li>
        ))}
      </ul>
    </Section>
  );
}

function BerkosCase() {
  const metrics = [
    { value: berkosAccountBrief.metrics.shareOfVoice + '%', label: 'Share of voice' },
    { value: berkosAccountBrief.metrics.totalMentions.toLocaleString(), label: 'AI mentions · 90 days' },
    { value: berkosAccountBrief.metrics.sentiment, label: 'Sentiment score' }
  ];

  return (
    <Section id="case" tone="blue" className="case-strip-section">
      <div className="case-strip">
        <div className="case-strip__copy">
          <p className="eyebrow">
            <Link to="/industries/luxury-real-estate">{berkosCase.sector}</Link>
          </p>
          <h2>{berkosCase.headline}</h2>
          <p>{berkosCase.copy}</p>
          <AssessmentLink placement="homepage-berkos-case">Discuss your baseline</AssessmentLink>
        </div>
        <div className="case-strip__card">
          <p className="case-strip__client">{berkosAccountBrief.client}</p>
          <MetricGrid metrics={metrics} className="case-strip__metric-grid" />
          <div className="case-strip__platforms">
            <p className="case-strip__platforms-label">By platform</p>
            <PlatformBars platforms={berkosAccountBrief.byPlatform} />
          </div>
          <div className="case-strip__rank">
            <p className="case-strip__rank-label">Market position</p>
            <RankTable data={berkosAccountBrief.marketPosition.slice(0, 5)} />
          </div>
          <p className="case-strip__footnote">{berkosAccountBrief.source}. Outcomes vary by category, prompt set and market.</p>
        </div>
      </div>
    </Section>
  );
}

function AITrafficPanel() {
  const metrics = [
    { value: aiTrafficData.total.toLocaleString(), label: 'AI traffic entries', change: aiTrafficData.change }
  ];

  return (
    <Section id="ai-traffic-stats" tone="paper">
      <div className="ai-traffic-layout">
        <SectionHeader
          eyebrow="AI-driven visits"
          title={<>Traffic that starts in <em>AI assistants.</em></>}
          copy="Direct site visits originating from AI tools. When a user asks ChatGPT, Gemini, or Perplexity a question and clicks through to a website, these analytics capture that journey — showing which models drive discovery and where those visitors are located."
        />
        <DataPanel
          title="AI traffic data"
          className="ai-traffic-panel"
        >
          <MetricGrid metrics={metrics} />
          <PlatformBars platforms={aiTrafficData.byPlatform} />
          <div className="ai-traffic-locations">
            <p className="ai-traffic-locations__label">Top locations</p>
            <div className="ai-traffic-locations__list">
              {aiTrafficData.topLocations.map((loc) => (
                <div key={loc.country} className="ai-traffic-location">
                  <span className="ai-traffic-location__country">{loc.country}</span>
                  <span className="ai-traffic-location__entries">{loc.entries.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>
        </DataPanel>
      </div>
    </Section>
  );
}

function Research() {
  return (
    <Section id="research" tone="blue">
      <div className="section-head">
        <h2>Research</h2>
        <Link className="section-head__link" to="/insights" aria-label="See all research"><span className="visually-hidden">See all research</span>→</Link>
      </div>
      <ResearchGrid articles={insightArticles} />
    </Section>
  );
}

function ServiceIcon({ id }) {
  const common = { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.75, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true };
  if (id === 'search') {
    return (
      <svg {...common}>
        <circle cx="10.5" cy="10.5" r="6.5" />
        <line x1="20" y1="20" x2="15.4" y2="15.4" />
      </svg>
    );
  }
  if (id === 'shield') {
    return (
      <svg {...common}>
        <path d="M12 3.5 19 6.2v5.4c0 4.5-3 7.8-7 9-4-1.2-7-4.5-7-9V6.2Z" />
        <path d="m9 12 2.2 2.2L15.5 10" />
      </svg>
    );
  }
  if (id === 'target') {
    return (
      <svg {...common}>
        <circle cx="12" cy="12" r="8" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="12" cy="12" r="0.6" fill="currentColor" />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 12 18 7" />
      <circle cx="12" cy="12" r="1.2" fill="currentColor" />
    </svg>
  );
}

function SendIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 19V5M5.5 11.5 12 5l6.5 6.5" />
    </svg>
  );
}

function GlassPrompt({ prompts }) {
  const [ref, inView] = useInView();
  const [index, setIndex] = useState(0);
  const [chars, setChars] = useState(prompts[0].text.length);
  const [deleting, setDeleting] = useState(false);
  const { icon, text } = prompts[index];
  const typed = !deleting && chars === text.length;
  const longest = prompts.reduce((a, b) => (b.text.length > a.length ? b.text : a), '');

  useEffect(() => {
    if (inView && !reducedMotion()) setChars(0);
  }, [inView]);

  useEffect(() => {
    if (!inView || reducedMotion()) return undefined;
    let delay;
    let step;
    if (!deleting && chars < text.length) { delay = 35 + Math.random() * 55; step = () => setChars(chars + 1); }
    else if (!deleting) { delay = 2400; step = () => setDeleting(true); }
    else if (chars > 0) { delay = 14; step = () => setChars(chars - 1); }
    else { delay = 320; step = () => { setDeleting(false); setIndex((index + 1) % prompts.length); }; }
    const timer = setTimeout(step, delay);
    return () => clearTimeout(timer);
  }, [inView, chars, deleting, index, text, prompts.length]);

  return (
    <div className="glass-card glass-card--prompt" ref={ref}>
      <span className="visually-hidden">{prompts.map((p) => p.text).join('. ')}</span>
      <span className="glass-card__icon" key={icon} aria-hidden="true"><PlatformIcon id={icon} /></span>
      <p className="glass-typer" aria-hidden="true">
        <span className="glass-typer__ghost">{longest}</span>
        <span>{text.slice(0, chars)}<span className="glass-typer__caret" /></span>
      </p>
      <span className={`glass-card__send ${typed ? 'is-ready' : ''}`} aria-hidden="true"><SendIcon /></span>
    </div>
  );
}

function GlassBars({ title, rows, live = false, counter }) {
  const [ref, inView] = useInView();
  const base = rows.map((row) => row.value);
  const zeros = base.map(() => 0);
  const [data, setData] = useState({ values: zeros, prev: zeros });
  const [count, setCount] = useState(counter?.start ?? 0);
  const decimals = live ? 1 : 0;

  useEffect(() => {
    if (!inView) return undefined;
    setData({ values: base, prev: base });
    if (reducedMotion()) return undefined;
    const spread = live ? 3 : 7;
    const drift = setInterval(() => {
      setData((current) => ({
        prev: current.values,
        values: base.map((v) => {
          const next = v + (Math.random() * 2 - 1) * spread;
          return Math.round(Math.min(96, Math.max(4, next)) * 10 ** decimals) / 10 ** decimals;
        })
      }));
    }, 2800);
    const tick = counter && setInterval(() => setCount((c) => c + 1 + Math.floor(Math.random() * 4)), 1100);
    return () => { clearInterval(drift); if (tick) clearInterval(tick); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  return (
    <div className={`glass-card glass-card--bars ${live ? 'glass-card--live' : ''}`.trim()} ref={ref}>
      <div className="glass-card__head">
        <p className="glass-card__title">{title}</p>
        {live && <span className="glass-card__live"><span className="glass-card__live-dot" />Live</span>}
        {counter && <span className="glass-card__counter"><strong><AnimatedNumber value={count} /></strong> {counter.label}</span>}
      </div>
      {rows.map((row, i) => {
        const delta = data.values[i] - data.prev[i];
        return (
          <div className="glass-bar" key={row.label}>
            <span className="glass-bar__label">
              {row.icon && <span className="glass-bar__icon"><PlatformIcon id={row.icon} /></span>}
              {row.label}
            </span>
            <span className="glass-bar__track"><span className="glass-bar__fill" style={{ width: `${data.values[i]}%` }} /></span>
            <span className="glass-bar__value"><AnimatedNumber value={data.values[i]} decimals={decimals} />%</span>
            {live && (
              <span className={`glass-bar__delta ${delta >= 0 ? 'is-up' : 'is-down'}`} key={data.values[i]}>
                {Math.abs(delta) >= 0.1 && `${delta > 0 ? '▲' : '▼'} ${Math.abs(delta).toFixed(1)}`}
              </span>
            )}
          </div>
        );
      })}
      <p className="glass-card__hint">Illustrative concept</p>
    </div>
  );
}

function GlassAnswer({ answers }) {
  const [ref, inView] = useInView();
  const [active, setActive] = useState(0);
  const running = inView && !reducedMotion();

  useEffect(() => {
    if (!running) return undefined;
    const timer = setInterval(() => setActive((i) => (i + 1) % answers.length), 4200);
    return () => clearInterval(timer);
  }, [running, answers.length]);

  return (
    <div className="glass-card glass-card--answer" ref={ref}>
      <div className={`glass-answer__tabs ${running ? 'is-running' : ''}`.trim()} aria-hidden="true">
        {answers.map((answer, i) => (
          <span className={`glass-answer__tab ${i === active ? 'is-active' : ''}`.trim()} key={answer.engine}>
            <PlatformIcon id={answer.icon} />
          </span>
        ))}
      </div>
      <div className="glass-answer__stack">
        {answers.map((answer, i) => (
          <div className={`glass-answer ${i === active ? 'is-active' : ''}`.trim()} key={answer.engine} aria-hidden={i !== active}>
            <p>
              {answer.text.split('{brand}').map((part, j) => (
                <span key={j}>{j > 0 && <span className="glass-answer__brand">Your brand</span>}{part}</span>
              ))}
            </p>
            <span className="glass-card__source">Recommended by {answer.engine}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ServicePhoto({ src, alt, children }) {
  return (
    <div className="service-photo">
      <img src={src} alt={alt} loading="lazy" />
      {children}
    </div>
  );
}

const serviceMedia = {
  '01': {
    src: '/images/generated/service-intelligence.jpg',
    alt: 'Close-up of hands typing on a laptop at night, lit by the screen’s glow',
    card: <GlassPrompt prompts={[
      { icon: 'chatgpt', text: 'Best luxury real estate agency in Cyprus?' },
      { icon: 'perplexity', text: 'Who sells beachfront villas in Limassol?' },
      { icon: 'gemini', text: 'Top off-plan developers in Paphos 2026' },
      { icon: 'claude', text: 'Discreet agent for a €5M property sale' }
    ]} />
  },
  '02': {
    src: '/images/generated/service-authority.jpg',
    alt: 'A stack of press clippings and editorial pages under a desk lamp at night',
    card: <GlassBars title="Citation sources" counter={{ start: 1284, label: 'citations analysed' }} rows={[
      { label: 'Editorial', value: 62 },
      { label: 'Reference', value: 41 },
      { label: 'UGC', value: 24 }
    ]} />
  },
  '03': {
    src: '/images/generated/service-positioning.jpg',
    alt: 'A well-dressed man checking his phone in a private aviation lounge at dusk',
    card: <GlassAnswer answers={[
      { engine: 'ChatGPT', icon: 'chatgpt', text: 'For beachfront villas in Limassol, {brand} stands out for transparent pricing and deep local expertise.' },
      { engine: 'Perplexity', icon: 'perplexity', text: 'Buyers comparing off-plan projects in Cyprus most often point to {brand} for its delivery track record.' },
      { engine: 'Gemini', icon: 'gemini', text: '{brand} is a frequently recommended choice for discreet, high-value property sales in Paphos.' },
      { engine: 'Claude', icon: 'claude', text: 'If privacy and after-sale service matter most, {brand} belongs on your shortlist.' }
    ]} />
  },
  '04': {
    src: '/images/generated/service-monitoring.jpg',
    alt: 'A team reviewing how a brand is mentioned across AI assistants',
    card: <GlassBars title="Mention rate by platform" live rows={[
      { icon: 'chatgpt', label: 'ChatGPT', value: 54 },
      { icon: 'claude', label: 'Claude', value: 38 },
      { icon: 'perplexity', label: 'Perplexity', value: 29 }
    ]} />
  }
};

function Services() {
  return (
    <Section id="services" tone="blue">
      <SectionHeader
        eyebrow="Four service pillars"
        title="Custom infrastructure for AI Search growth"
        copy="We identify where to act, execute through custom infrastructure, then learn and compound from the results"
      />
      <div className="service-list">
        {servicePillars.map((service, index) => {
          const media = serviceMedia[service.n];
          return (
            <article className={`service-row ${index % 2 ? 'service-row--reverse' : ''}`.trim()} key={service.n}>
              <div className="service-row__text">
                <span className="service-row__badge">
                  <ServiceIcon id={service.icon} />
                  <span className="card-number">{service.n}</span>
                </span>
                <h3>{service.title}</h3>
                <p>{service.text}</p>
              </div>
              {media && <ServicePhoto src={media.src} alt={media.alt}>{media.card}</ServicePhoto>}
            </article>
          );
        })}
      </div>
      <div style={{ marginTop: '3rem', textAlign: 'center' }}>
        <InternalLink to="/services">Explore our services</InternalLink>
        {' · '}
        <InternalLink to="/methodology">See our methodology</InternalLink>
      </div>
    </Section>
  );
}

function FAQ() {
  return (
    <Section id="faq" tone="paper">
      <div className="faq-layout">
        <SectionHeader eyebrow="Frequently asked" title="A clear view of the discipline" />
        <FaqAccordion items={faqs} />
      </div>
    </Section>
  );
}

const industryPreview = [
  { to: '/industries/yachting', label: 'Yachting', icon: 'yachting' },
  { to: '/industries/private-aviation', label: 'Private aviation', icon: 'aviation' },
  { to: '/industries/luxury-real-estate', label: 'Luxury real estate', icon: 'real-estate' },
  { to: '/industries/jewellery-watches', label: 'Jewellery & watches', icon: 'jewellery' },
  { to: '/industries/luxury-hospitality', label: 'Luxury hospitality', icon: 'hospitality' }
];

function IndustryIcon({ id }) {
  const common = { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.75, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true };
  if (id === 'yachting') {
    return (
      <svg {...common}>
        <path d="M3 16h18l-2.2 4.2a2 2 0 0 1-1.78 1.08H6.98a2 2 0 0 1-1.78-1.08Z" />
        <path d="M6 16V8.5L12 5l6 3.5V16" />
        <path d="M12 5v11" />
      </svg>
    );
  }
  if (id === 'aviation') {
    return (
      <svg {...common}>
        <path d="M2.5 16.5 21 10a1.8 1.8 0 0 0 0-3.4 1.8 1.8 0 0 0-1.2 0L14 9 6 6.2 4 7l5 4.4-3.2 2.3-2.6-.6-1.2 1Z" />
      </svg>
    );
  }
  if (id === 'real-estate') {
    return (
      <svg {...common}>
        <path d="M4 11 12 4l8 7" />
        <path d="M6 10v10h12V10" />
        <path d="M10 20v-6h4v6" />
      </svg>
    );
  }
  if (id === 'jewellery') {
    return (
      <svg {...common}>
        <path d="M7 4h10l4 5-11 11L2.5 9Z" />
        <path d="M2.5 9h19M9.5 4 7 9l5 11 5-11-2.5-5" />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <path d="M4 21V10l8-6 8 6v11" />
      <path d="M4 21h16" />
      <path d="M10 21v-6h4v6" />
      <path d="M9 12h.01M15 12h.01" />
    </svg>
  );
}

function Industries() {
  return (
    <Section id="industries-preview" tone="paper">
      <SectionHeader
        align="center"
        title="High-consideration markets"
        copy="We work with reputation-sensitive brands where buyers research deeply before revealing intent"
      />
      <div className="industry-grid">
        {industryPreview.map((industry) => (
          <Link className="industry-card" to={industry.to} key={industry.to}>
            <span className="industry-card__icon"><IndustryIcon id={industry.icon} /></span>
            <span className="industry-card__label">{industry.label}</span>
            <span className="industry-card__arrow" aria-hidden="true">→</span>
          </Link>
        ))}
      </div>
      <div style={{ marginTop: '2rem', textAlign: 'center' }}>
        <ArrowLink href="/industries">View all industries</ArrowLink>
      </div>
    </Section>
  );
}

export default function Homepage() {
  return (
    <>
      <Hero />
      <PlatformGrid />
      <ProductTheater />
      <MarketStats />
      <Industries />
      <BerkosCase />
      <AITrafficPanel />
      <Research />
      <Services />
      <FAQ />
    </>
  );
}
