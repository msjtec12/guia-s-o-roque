import { Business, Experience, Route, EventItem } from '@/types';
import { getBusinesses, getExperiences, getRoutes, getEvents } from '@/lib/services/data';

export type AIRecommendationQuery = {
  userPrompt: string;
  profile?: 'casal' | 'familia' | 'aventura' | 'gastronomia' | 'solo';
  durationHours?: number;
  budgetLevel?: 'baixo' | 'medio' | 'alto';
};

export type AIRecommendationResult = {
  suggestedSummary: string;
  recommendedBusinesses: Business[];
  recommendedExperiences: Experience[];
  recommendedRoutes: Route[];
  recommendedEvents: EventItem[];
};

/**
 * Architectural stub for future AI Tourism Recommendation Engine.
 * Prepared for integration with Google Gemini / LLM inference API.
 */
export async function getAIRecommendations(query: AIRecommendationQuery): Promise<AIRecommendationResult> {
  const promptLower = query.userPrompt.toLowerCase();
  
  const [businesses, experiences, routes, events] = await Promise.all([
    getBusinesses(),
    getExperiences(),
    getRoutes(),
    getEvents(),
  ]);

  // Keyword parsing logic stub
  let matchedBusinesses = businesses;
  let matchedExperiences = experiences;

  if (promptLower.includes('criança') || promptLower.includes('família')) {
    matchedBusinesses = businesses.filter(
      (b) => b.amenities?.includes('Espaço Kids') || b.amenities?.includes('Playground') || b.tags?.includes('Família')
    );
  } else if (promptLower.includes('vinho') || promptLower.includes('vinícola')) {
    matchedBusinesses = businesses.filter((b) => b.category?.slug === 'vinicolas-adegas');
  }

  return {
    suggestedSummary: `Com base no seu pedido ("${query.userPrompt}"), selecionamos os melhores lugares, passeios e experiências personalizadas em São Roque.`,
    recommendedBusinesses: matchedBusinesses.slice(0, 4),
    recommendedExperiences: matchedExperiences.slice(0, 3),
    recommendedRoutes: routes.slice(0, 2),
    recommendedEvents: events.slice(0, 2),
  };
}
