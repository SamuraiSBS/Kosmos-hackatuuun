export type NavTab = 'map' | 'analysis' | 'missions' | 'profile'

interface BottomNavigationProps {
  activeTab: NavTab
  onNavigate: (tab: NavTab) => void
}

const tabs: { id: NavTab; icon: string; label: string }[] = [
  { id: 'map', icon: '⌂', label: 'Карта' },
  { id: 'analysis', icon: '⌁', label: 'Анализ' },
  { id: 'missions', icon: '✦', label: 'Задания' },
  { id: 'profile', icon: '◉', label: 'Профиль' },
]

export function BottomNavigation({ activeTab, onNavigate }: BottomNavigationProps) {
  return (
    <nav className="bottom-nav" aria-label="Основная навигация">
      {tabs.map((tab) => (
        <button
          className={`nav-item ${activeTab === tab.id ? 'is-active' : ''}`}
          type="button"
          key={tab.id}
          onClick={() => onNavigate(tab.id)}
          aria-current={activeTab === tab.id ? 'page' : undefined}
        >
          <span className="nav-icon">{tab.icon}</span>
          <span>{tab.label}</span>
        </button>
      ))}
    </nav>
  )
}

