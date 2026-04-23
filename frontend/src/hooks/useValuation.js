export async function submitValuation(formData) {
  // Use localhost:8000 for local proxy/backend
  const API_URL = 'http://localhost:8000';
  
  try {
    const response = await fetch(`${API_URL}/api/valutazione`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        // Step 1
        company_name:    formData.companyName,
        sector:          formData.sector,
        lifecycle:       formData.lifecycle,
        objective:       formData.objective,
        horizon:         formData.horizon,
        assets:          formData.assets || [],
  
        // Step 2
        revenue_y1:      parseFloat(formData.revenueY1),
        revenue_y2:      parseFloat(formData.revenueY2),
        revenue_y3:      parseFloat(formData.revenueY3),
        ebitda:          parseFloat(formData.ebitda),
        tech_investment_pct: parseFloat(formData.techInvestment),
  
        // Step 3
        recurring_revenue_pct:    parseFloat(formData.recurringRevenue),
        client_concentration_pct: parseFloat(formData.clientConcentration),
        founder_dependency:       parseInt(formData.founderDependency),
        management_structure:     parseInt(formData.managementStructure),
        digital_maturity:         parseInt(formData.digitalMaturity),
        client_portfolio_quality: parseInt(formData.clientPortfolio),
        business_model_scalability: parseInt(formData.scalability),
        network_partnership_strength: parseInt(formData.networkStrength),
      })
    });
  
    if (!response.ok) {
        throw new Error('Errore API durante la fetching dei dati.');
    }
    return await response.json();

  } catch (err) {
    console.error("Valuation Error:", err);
    throw err;
  }
}
