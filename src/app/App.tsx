import { useCallback, useEffect, useState } from 'react'
import { BottomNavigation, type NavTab } from '../components/BottomNavigation/BottomNavigation'
import { BottomSheet } from '../components/BottomSheet/BottomSheet'
import { DebugPanel } from '../components/DebugPanel/DebugPanel'
import { useGame, GameProvider } from '../game/gameStore'
import { AnalysisScene } from '../scenes/AnalysisScene'
import { DecisionScene } from '../scenes/DecisionScene'
import { IntroScene } from '../scenes/IntroScene'
import { MapScene } from '../scenes/MapScene'
import { ResultScene } from '../scenes/ResultScene'
import { SpaceScene } from '../scenes/SpaceScene'
import { MissionsView } from '../components/MissionCard/MissionCard'

export function App() {
  return (
    <GameProvider>
      <GameApp />
    </GameProvider>
  )
}

function GameApp() {
  const { state, dispatch } = useGame()
  const [activeTab, setActiveTab] = useState<NavTab>('map')
  const [toast, setToast] = useState<string | null>(null)
  const debugMode = typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('debug') === 'true'

  const showToast = useCallback((message: string) => setToast(message), [])

  useEffect(() => {
    if (!toast) return
    const timeout = window.setTimeout(() => setToast(null), 2800)
    return () => window.clearTimeout(timeout)
  }, [toast])

  const goMap = useCallback(() => {
    dispatch({ type: 'RETURN_MAP' })
    setActiveTab('map')
  }, [dispatch])

  const goAnalysis = useCallback(() => {
    if (state.missionCompleted) {
      showToast('Миссия уже выполнена. Северное поле стабилизировано.')
      return
    }
    dispatch({ type: 'OPEN_ANALYSIS' })
    setActiveTab('analysis')
  }, [dispatch, showToast, state.missionCompleted])

  const returnFromResult = () => {
    goMap()
    showToast('Отличная работа! Состояние участка стабилизировалось. Новые территории скоро станут доступны.')
  }

  const navigate = (tab: NavTab) => {
    if (tab === 'profile') {
      setActiveTab('profile')
      showToast('Профиль исследователя появится в следующей версии.')
      return
    }
    if (tab === 'map') {
      dispatch({ type: 'SET_SCENE', scene: 'MAP' })
      setActiveTab('map')
      return
    }
    if (tab === 'analysis') {
      goAnalysis()
      return
    }
    dispatch({ type: 'SET_SCENE', scene: 'MAP' })
    setActiveTab('missions')
  }

  const renderMain = () => {
    switch (state.scene) {
      case 'LOADING':
        return <SpaceScene onComplete={() => dispatch({ type: 'SET_SCENE', scene: 'INTRO' })} onSkip={() => dispatch({ type: 'SET_SCENE', scene: 'INTRO' })} />
      case 'INTRO':
        return <><MapScene onToast={showToast} onOpenAnalysis={goAnalysis} /><IntroScene onStart={() => { dispatch({ type: 'COMPLETE_INTRO' }); setActiveTab('map') }} /></>
      case 'MAP':
        if (activeTab === 'missions') return <MissionsView />
        if (activeTab === 'profile') return <ProfileView />
        return <MapScene onToast={showToast} onOpenAnalysis={goAnalysis} />
      case 'MISSION':
        return <>
          <MapScene onToast={showToast} onOpenAnalysis={goAnalysis} />
          <BottomSheet title="Северный участок" eyebrow="FIELD A-04 / СЕВЕР" onClose={() => dispatch({ type: 'CLOSE_SHEET' })} actionLabel="Провести анализ" onAction={goAnalysis}>
            <div className="field-alert"><span className="alert-symbol">!</span><div><span>СОСТОЯНИЕ</span><strong>Аномалия обнаружена</strong></div><b>HIGH</b></div>
            <div className="sheet-facts"><div><span>Последнее наблюдение</span><strong>Сегодня, 09:42</strong></div><div><span>Изменение NDVI</span><strong className="negative">−18%</strong></div></div>
            <p className="sheet-description">Северные тайлы заметно отличаются от остальной территории. Открой спутниковый сканер, чтобы понять причину.</p>
          </BottomSheet>
        </>
      case 'ANALYSIS':
        return <AnalysisScene onBack={goMap} onChooseDecision={() => dispatch({ type: 'OPEN_DECISION' })} />
      case 'DECISION':
        return <DecisionScene onBack={() => { dispatch({ type: 'SET_SCENE', scene: 'ANALYSIS' }); setActiveTab('analysis') }} />
      case 'RESULT':
        return <ResultScene onReturn={returnFromResult} />
    }
  }

  const showNav = state.scene === 'MAP' || state.scene === 'MISSION' || state.scene === 'ANALYSIS'
  const navActive = state.scene === 'ANALYSIS' ? 'analysis' : activeTab

  return (
    <div className="app-shell">
      {renderMain()}
      {showNav && <BottomNavigation activeTab={navActive} onNavigate={navigate} />}
      {debugMode && <DebugPanel />}
      {toast && <div className="toast" role="status"><span>i</span>{toast}</div>}
    </div>
  )
}

function ProfileView() {
  return <main className="profile-view scene-page"><div className="section-heading"><span className="eyebrow">ИССЛЕДОВАТЕЛЬ</span><h1>Профиль</h1><p>Карточка исследователя и достижения появятся после первой экспедиции.</p></div><div className="profile-placeholder"><span className="profile-avatar">◉</span><strong>ПИЛОТ 07</strong><small>СИНХРОНИЗАЦИЯ ПРОФИЛЯ…</small></div></main>
}
