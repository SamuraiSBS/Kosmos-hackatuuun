import { GameAsset } from '../components/GameAsset/GameAsset'

interface IntroSceneProps {
  onStart: () => void
}

export function IntroScene({ onStart }: IntroSceneProps) {
  return (
    <div className="intro-overlay">
      <div className="intro-vignette" />
      <div className="intro-npc-wrap">
        <div className="npc-ping">● ВХОДЯЩЕЕ СООБЩЕНИЕ</div>
        <GameAsset asset="npc-helper" ariaLabel="Помощник" />
        <span className="npc-shadow" />
      </div>
      <div className="dialogue-box">
        <div className="dialogue-top"><span className="dialogue-name">ОРБИТА / ПОМОЩНИК</span><span className="dialogue-signal">▰▰▰</span></div>
        <div className="dialogue-lines"><p>Связь установлена.</p><p>Спутник обнаружил сигнал скопления мусора у северной линии.</p><p>Открой слой ДЗЗ и помоги полевой команде спланировать уборку.</p></div>
        <button className="primary-button" type="button" onClick={onStart}>Начать экспедицию <span>→</span></button>
      </div>
    </div>
  )
}
