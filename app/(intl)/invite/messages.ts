import type { Locale } from '../locale'

/**
 * The invite page's copy in every language the app ships.
 *
 * `{app}` is the app's Home Screen name in that language, so "Open in {app}"
 * matches the icon the visitor sees; `{name}` is the sender's name from the card.
 */
export type InviteMessages = {
  eyebrow: string
  title: string
  titleWithName: string
  description: string
  appStoreLabel: string
  openInApp: string
  steps: { heading: string; body: string }[]
}

export const inviteMessages: Record<Locale, InviteMessages> = {
  en: {
    eyebrow: 'Shared card',
    title: 'Someone wants to walk with you',
    titleWithName: '{name} wants to walk with you',
    description:
      'Someone shared their name card with you! Open it in the app to connect and see each other’s steps side by side, right on your Home Screens.',
    appStoreLabel: 'Download Steps Widget on the App Store',
    openInApp: 'Open in {app}',
    steps: [
      { heading: 'Get the app', body: 'Install Steps Widget on your iPhone. It reads your step count from Apple Health.' },
      { heading: 'Open the card', body: 'Come back to this page and tap Open in {app}, or tap the link you were sent again.' },
      { heading: 'Walk together', body: 'Their card is added and yours goes to them. Once they accept, you see each other’s steps.' },
    ],
  },
  de: {
    eyebrow: 'Geteilte Karte',
    title: 'Jemand möchte mit dir gehen',
    titleWithName: '{name} möchte mit dir gehen',
    description:
      'Jemand hat seine Namenskarte mit dir geteilt! Öffne sie in der App, um euch zu verbinden und eure Schritte nebeneinander zu sehen – direkt auf euren Home-Bildschirmen.',
    appStoreLabel: 'Steps Widget im App Store laden',
    openInApp: 'In {app} öffnen',
    steps: [
      { heading: 'App laden', body: 'Installiere Steps Widget auf deinem iPhone. Die App liest deine Schritte aus Apple Health.' },
      { heading: 'Karte öffnen', body: 'Komm auf diese Seite zurück und tippe auf „In {app} öffnen“ oder tippe noch einmal auf den Link, den du bekommen hast.' },
      { heading: 'Gemeinsam gehen', body: 'Die Karte wird hinzugefügt und deine geht an die andere Person. Sobald sie annimmt, seht ihr gegenseitig eure Schritte.' },
    ],
  },
  es: {
    eyebrow: 'Tarjeta compartida',
    title: 'Alguien quiere caminar contigo',
    titleWithName: '{name} quiere caminar contigo',
    description:
      '¡Alguien te ha compartido su tarjeta! Ábrela en la app para conectaros y ver vuestros pasos uno al lado del otro, directamente en la pantalla de inicio.',
    appStoreLabel: 'Descarga Steps Widget en el App Store',
    openInApp: 'Abrir en {app}',
    steps: [
      { heading: 'Consigue la app', body: 'Instala Steps Widget en tu iPhone. Lee tus pasos de Apple Salud.' },
      { heading: 'Abre la tarjeta', body: 'Vuelve a esta página y toca Abrir en {app}, o vuelve a tocar el enlace que te enviaron.' },
      { heading: 'Caminad juntos', body: 'Su tarjeta se añade y la tuya le llega. En cuanto acepte, veréis los pasos del otro.' },
    ],
  },
  fr: {
    eyebrow: 'Carte partagée',
    title: 'Quelqu’un veut marcher avec vous',
    titleWithName: '{name} veut marcher avec vous',
    description:
      'Quelqu’un vous a partagé sa carte ! Ouvrez-la dans l’app pour vous connecter et voir vos pas côte à côte, directement sur vos écrans d’accueil.',
    appStoreLabel: 'Télécharger Steps Widget dans l’App Store',
    openInApp: 'Ouvrir dans {app}',
    steps: [
      { heading: 'Installez l’app', body: 'Installez Steps Widget sur votre iPhone. L’app lit votre nombre de pas dans Santé.' },
      { heading: 'Ouvrez la carte', body: 'Revenez sur cette page et touchez Ouvrir dans {app}, ou touchez à nouveau le lien reçu.' },
      { heading: 'Marchez ensemble', body: 'Sa carte est ajoutée et la vôtre lui est envoyée. Dès qu’elle est acceptée, vous voyez vos pas mutuels.' },
    ],
  },
  ja: {
    eyebrow: '共有されたカード',
    title: '一緒に歩こうと誘われています',
    titleWithName: '{name}さんが一緒に歩こうと誘っています',
    description:
      'ネームカードが共有されました。アプリで開いてつながると、お互いの歩数をホーム画面に並べて見られます。',
    appStoreLabel: 'App StoreでSteps Widgetをダウンロード',
    openInApp: '{app}で開く',
    steps: [
      { heading: 'アプリを入手', body: 'iPhoneにSteps Widgetをインストールします。歩数はヘルスケアから読み込みます。' },
      { heading: 'カードを開く', body: 'このページに戻って「{app}で開く」をタップするか、送られてきたリンクをもう一度タップします。' },
      { heading: '一緒に歩く', body: '相手のカードが追加され、あなたのカードが相手に届きます。承認されると、お互いの歩数が見られます。' },
    ],
  },
  ko: {
    eyebrow: '공유된 카드',
    title: '누군가 함께 걷고 싶어 해요',
    titleWithName: '{name} 님이 함께 걷고 싶어 해요',
    description:
      '누군가 이름 카드를 공유했어요! 앱에서 열어 연결하면 서로의 걸음 수를 홈 화면에서 나란히 볼 수 있어요.',
    appStoreLabel: 'App Store에서 Steps Widget 다운로드',
    openInApp: '{app}에서 열기',
    steps: [
      { heading: '앱 받기', body: 'iPhone에 Steps Widget을 설치하세요. 걸음 수는 건강 앱에서 가져와요.' },
      { heading: '카드 열기', body: '이 페이지로 돌아와 ‘{app}에서 열기’를 탭하거나, 받은 링크를 다시 탭하세요.' },
      { heading: '함께 걷기', body: '상대의 카드가 추가되고 내 카드가 상대에게 전달돼요. 상대가 수락하면 서로의 걸음 수를 볼 수 있어요.' },
    ],
  },
  pl: {
    eyebrow: 'Udostępniona karta',
    title: 'Ktoś chce spacerować z Tobą',
    titleWithName: '{name} chce spacerować z Tobą',
    description:
      'Ktoś udostępnił Ci swoją kartę! Otwórz ją w aplikacji, aby się połączyć i widzieć swoje kroki obok siebie, prosto na ekranach początkowych.',
    appStoreLabel: 'Pobierz Steps Widget z App Store',
    openInApp: 'Otwórz w {app}',
    steps: [
      { heading: 'Pobierz aplikację', body: 'Zainstaluj Steps Widget na iPhonie. Aplikacja odczytuje liczbę kroków ze Zdrowia.' },
      { heading: 'Otwórz kartę', body: 'Wróć na tę stronę i stuknij Otwórz w {app} albo stuknij ponownie otrzymany link.' },
      { heading: 'Spacerujcie razem', body: 'Jej karta zostanie dodana, a Twoja trafi do niej. Po akceptacji zobaczycie nawzajem swoje kroki.' },
    ],
  },
  'pt-BR': {
    eyebrow: 'Cartão compartilhado',
    title: 'Alguém quer caminhar com você',
    titleWithName: '{name} quer caminhar com você',
    description:
      'Alguém compartilhou o cartão com você! Abra no app para se conectar e ver os passos um do outro lado a lado, direto na Tela de Início.',
    appStoreLabel: 'Baixar o Steps Widget na App Store',
    openInApp: 'Abrir no {app}',
    steps: [
      { heading: 'Baixe o app', body: 'Instale o Steps Widget no seu iPhone. Ele lê seus passos do app Saúde.' },
      { heading: 'Abra o cartão', body: 'Volte a esta página e toque em Abrir no {app}, ou toque de novo no link que você recebeu.' },
      { heading: 'Caminhem juntos', body: 'O cartão da pessoa é adicionado e o seu vai para ela. Assim que ela aceitar, vocês veem os passos um do outro.' },
    ],
  },
  'zh-Hans': {
    eyebrow: '收到的名片',
    title: '有人想和你一起走',
    titleWithName: '{name} 想和你一起走',
    description: '有人和你分享了名片！在 App 中打开即可互相关联，在主屏幕上并排查看彼此的步数。',
    appStoreLabel: '在 App Store 下载 Steps Widget',
    openInApp: '在“{app}”中打开',
    steps: [
      { heading: '下载 App', body: '在 iPhone 上安装 Steps Widget。步数读取自“健康”App。' },
      { heading: '打开名片', body: '回到此页面，轻点“在‘{app}’中打开”，或再次轻点收到的链接。' },
      { heading: '一起走', body: '对方的名片会被添加，你的名片也会发给对方。对方接受后，你们就能看到彼此的步数。' },
    ],
  },
  'zh-Hant': {
    eyebrow: '收到的名片',
    title: '有人想和你一起走',
    titleWithName: '{name} 想和你一起走',
    description: '有人和你分享了名片！在 App 中開啟即可互相連結，在主畫面上並排查看彼此的步數。',
    appStoreLabel: '在 App Store 下載 Steps Widget',
    openInApp: '在「{app}」中開啟',
    steps: [
      { heading: '下載 App', body: '在 iPhone 上安裝 Steps Widget。步數讀取自「健康」App。' },
      { heading: '開啟名片', body: '回到此頁面，點一下「在『{app}』中開啟」，或再次點一下收到的連結。' },
      { heading: '一起走', body: '對方的名片會被加入，你的名片也會傳給對方。對方接受後，你們就能看到彼此的步數。' },
    ],
  },
}

export function fill(template: string, values: Record<string, string>) {
  return template.replace(/\{(\w+)\}/g, (match, key: string) => values[key] ?? match)
}
