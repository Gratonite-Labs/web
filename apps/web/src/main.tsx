import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/lib/queryClient';
import { SocketProvider } from '@/providers/SocketProvider';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { App } from '@/App';
import './styles.css';
import { mark } from '@/lib/perf';
import { initThemeV2 } from '@/theme/initTheme';
import { useCallStore } from '@/stores/call.store';
import { useUnreadStore } from '@/stores/unread.store';

console.log('[v0] main.tsx executing');
mark('app_start');
console.log('[v0] mark done');
try {
  initThemeV2();
  console.log('[v0] initThemeV2 done');
} catch (e) {
  console.error('[v0] initThemeV2 failed', e);
}

if (import.meta.env.DEV && typeof window !== 'undefined') {
  window.__gratoniteHarness = {
    setCallState: (partial) => useCallStore.getState().setState(partial as any),
    resetCallState: () => useCallStore.getState().reset(),
    getCallState: () => useCallStore.getState() as any,
    markUnread: (channelId, amount = 1) => useUnreadStore.getState().markUnread(channelId, amount),
    markMention: (channelId, amount = 1) => useUnreadStore.getState().markMention(channelId, amount),
    clearUnread: () => useUnreadStore.getState().clear(),
    getUnreadState: () => {
      const state = useUnreadStore.getState();
      return {
        unreadByChannel: Array.from(state.unreadByChannel),
        unreadCountByChannel: Array.from(state.unreadCountByChannel.entries()),
        mentionCountByChannel: Array.from(state.mentionCountByChannel.entries()),
      };
    },
  };
}

console.log('[v0] about to createRoot');
const rootEl = document.getElementById('root');
console.log('[v0] root element:', rootEl);
try {
  createRoot(rootEl!).render(
    <React.StrictMode>
      <ErrorBoundary>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter basename="/">
            <SocketProvider>
              <App />
            </SocketProvider>
          </BrowserRouter>
        </QueryClientProvider>
      </ErrorBoundary>
    </React.StrictMode>,
  );
  console.log('[v0] createRoot render called');
} catch (e) {
  console.error('[v0] createRoot failed', e);
}
