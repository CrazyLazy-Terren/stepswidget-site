export type SearchIndexItem = {
  id: string
  type: 'doc' | 'blog'
  title: string
  url: string
  category: string
  description: string
  keywords: string[]
  updated?: string
}

export type ScoredSearchItem = SearchIndexItem & {
  score: number
}

export function searchIndex(
  items: SearchIndexItem[],
  query: string,
  filter: 'all' | 'doc' | 'blog' = 'all'
): ScoredSearchItem[] {
  const clean = query.trim().toLowerCase()
  const filtered = filter === 'all' ? items : items.filter((item) => item.type === filter)

  if (!clean) {
    return filtered.map((item) => ({ ...item, score: 0 }))
  }

  const terms = clean.split(/\s+/).filter(Boolean)

  const scored: ScoredSearchItem[] = []

  for (const item of filtered) {
    let score = 0
    const lowerTitle = item.title.toLowerCase()
    const lowerDesc = item.description.toLowerCase()
    const lowerCat = item.category.toLowerCase()
    const lowerKeywords = item.keywords.map((k) => k.toLowerCase())

    // Exact title match
    if (lowerTitle === clean) {
      score += 150
    } else if (lowerTitle.includes(clean)) {
      score += 80
    }

    // Match each term
    let matchedTerms = 0
    for (const term of terms) {
      let termMatched = false

      if (lowerTitle.includes(term)) {
        score += 35
        termMatched = true
      }

      if (lowerKeywords.some((k) => k.includes(term))) {
        score += 30
        termMatched = true
      }

      if (lowerCat.includes(term)) {
        score += 15
        termMatched = true
      }

      if (lowerDesc.includes(term)) {
        score += 10
        termMatched = true
      }

      if (termMatched) {
        matchedTerms++
      }
    }

    // If query has multiple terms, reward items matching all terms
    if (terms.length > 1 && matchedTerms === terms.length) {
      score += 40
    }

    if (score > 0) {
      scored.push({ ...item, score })
    }
  }

  return scored.sort((a, b) => b.score - a.score)
}
