// lib/constants/hero.ts

export const TECHNOLOGIES = [
    { name: "Python", delay: 0.1 },
    { name: "Django", delay: 0.2 },
    { name: "React", delay: 0.3 },
    { name: "Next.js", delay: 0.4 }
  ] as const;
  
  export const CODE_SNIPPETS = [
    {
      language: 'python',
      code: `# AI-Powered Content Analysis
  class ContentAnalyzer:
      def analyze_sentiment(self, text):
          """Analyze customer feedback"""
          sentiment = ai_model.predict(text)
          return {
              'score': sentiment.score,
              'feedback': generate_insights(
                  sentiment
              )
          }`,
    },
    {
      language: 'javascript',
      code: `// Real-time Dashboard Updates
  function DashboardMetrics() {
    const [metrics, setMetrics] = 
      useState({
        activeUsers: 0,
        conversion: 0,
        revenue: 0
      });
  
    useEffect(() => {
      // Live data updates
      socket.on('metrics', (data) => {
        updateDashboard(data);
        notifyThreshold(data);
      });
    }, []);`,
    },
    {
      language: 'python',
      code: `# Secure Payment Processing
  @api_view(['POST'])
  def process_payment(request):
      """Handle secure transactions"""
      try:
          payment = stripe.Payment.create(
              amount=request.data['amount'],
              currency='usd',
              payment_method=token,
              confirm=True
          )
          notify_success(payment)
          return Response(status=200)`,
    },
    {
      language: 'javascript',
      code: `// Smart Search Implementation
  const SearchEngine = {
    async search(query) {
      const results = await elastic
        .search({
          index: 'products',
          body: {
            query: {
              multi_match: {
                query,
                fields: ['name', 'desc'],
                fuzziness: 'AUTO'
              }
            }
          }
        });
      return enhance(results);
    }`,
    },
    {
      language: 'python',
      code: `# Automated Report Generator
  def generate_report(data):
      """Create business insights"""
      insights = ml_model.analyze(data)
      report = Report(
          trends=insights.trends,
          predictions=insights.forecast,
          recommendations=generate_actions(
              insights
          )
      )
      notify_stakeholders(report)`,
    }
  ] as const;