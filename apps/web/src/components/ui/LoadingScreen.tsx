import { LoadingSpinner } from './LoadingSpinner';

export function LoadingScreen() {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      background: '#1a1a1a',
      fontFamily: 'system-ui, -apple-system, sans-serif',
    }}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '24px',
      }}>
        <img
          src="/gratonite-icon.png"
          alt="Gratonite"
          width={120}
          height={120}
          style={{
            borderRadius: '12px',
          }}
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
        />
        <LoadingSpinner size={28} />
      </div>
    </div>
  );
}
