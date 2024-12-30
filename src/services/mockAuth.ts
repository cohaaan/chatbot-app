// Mock authentication service
export const MOCK_TOKENS = {
  google: 'mock-google-token',
  calendly: 'mock-calendly-token',
};

export function mockOAuthFlow(provider: 'google' | 'calendly'): Promise<string> {
  return new Promise((resolve) => {
    // Simulate network delay
    setTimeout(() => {
      resolve(MOCK_TOKENS[provider]);
    }, 1000);
  });
}