export interface ChatbotConfig {
  id: string;
  name: string;
  theme: {
    primaryColor: string;
    fontFamily: string;
    bubblePosition: 'bottom-right' | 'bottom-left';
    iconType: string;
  };
  messages: {
    greeting: string;
    placeholder: string;
  };
  integrations: {
    googleCalendar?: {
      enabled: boolean;
      calendarId?: string;
    };
    calendly?: {
      enabled: boolean;
      username?: string;
    };
  };
}

export interface User {
  id: string;
  email: string;
  displayName: string;
  photoURL?: string;
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}