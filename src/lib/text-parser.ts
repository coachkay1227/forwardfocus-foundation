export interface ParsedTextSegment {
  type: 'text' | 'phone' | 'email' | 'website';
  content: string;
  href?: string;
}

export function parseTextForLinks(text: string): ParsedTextSegment[] {
  const segments: ParsedTextSegment[] = [];
  
  // Enhanced regex patterns
  const phoneRegex = /(\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4})/g;
  const emailRegex = /([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g;
  const websiteRegex = /(https?:\/\/[^\s<>"']+|www\.[^\s<>"']+\.[a-zA-Z]{2,})/g;
  
  let lastIndex = 0;
  const matches: { index: number; length: number; type: 'phone' | 'email' | 'website'; content: string; href: string }[] = [];
  
  // Find all matches
  let match;
  
  // Phone numbers
  while ((match = phoneRegex.exec(text)) !== null) {
    matches.push({
      index: match.index,
      length: match[0].length,
      type: 'phone',
      content: match[0],
      href: `tel:${match[0].replace(/[^\d]/g, '')}`
    });
  }
  
  // Emails
  while ((match = emailRegex.exec(text)) !== null) {
    matches.push({
      index: match.index,
      length: match[0].length,
      type: 'email',
      content: match[0],
      href: `mailto:${match[0]}`
    });
  }
  
  // Websites
  while ((match = websiteRegex.exec(text)) !== null) {
    const url = match[0];
    const href = url.startsWith('http') ? url : `https://${url}`;
    matches.push({
      index: match.index,
      length: match[0].length,
      type: 'website',
      content: match[0],
      href
    });
  }
  
  // Sort matches by index
  matches.sort((a, b) => a.index - b.index);
  
  // Build segments
  matches.forEach(match => {
    // Add text before the match
    if (lastIndex < match.index) {
      const beforeText = text.slice(lastIndex, match.index);
      if (beforeText.trim()) {
        segments.push({ type: 'text', content: beforeText });
      }
    }
    
    // Add the match
    segments.push({
      type: match.type,
      content: match.content,
      href: match.href
    });
    
    lastIndex = match.index + match.length;
  });
  
  // Add remaining text
  if (lastIndex < text.length) {
    const remainingText = text.slice(lastIndex);
    if (remainingText.trim()) {
      segments.push({ type: 'text', content: remainingText });
    }
  }
  
  // If no matches found, return the whole text as a single segment
  if (segments.length === 0) {
    segments.push({ type: 'text', content: text });
  }
  
  return segments;
}

export function formatAIResponse(text: string): string {
  // Add better formatting for AI responses
  return text
    .replace(/\n\n/g, '\n\n') // Preserve paragraph breaks
    .replace(/\*\*(.*?)\*\*/g, '$1') // Remove markdown bold
    .replace(/\*(.*?)\*/g, '$1') // Remove markdown italic
    .replace(/^- /gm, '• ') // Convert bullet points
    .replace(/^\d+\. /gm, (match, offset, string) => {
      const lineStart = string.lastIndexOf('\n', offset) + 1;
      const prefix = string.slice(lineStart, offset);
      return prefix.length === 0 ? match : match;
    })
    .trim();
}