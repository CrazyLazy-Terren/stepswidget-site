import type { Locale } from '../../locale'

/**
 * The shared-style page's copy in every language the app ships.
 *
 * Button names in the steps ("Style from Photo", "Colors Palette",
 * "Background") are the app's own labels in that language, from its string
 * catalog, so they match what the visitor taps.
 */
export type StyleMessages = {
  eyebrow: string
  title: string
  description: string
  appStoreLabel: string
  seeSteps: string
  steps: { heading: string; body: string }[]
  noAppHeading: string
  noAppBody: string
  plainPhotoHeading: string
  plainPhotoBody: string
  howItWorks: string
  captionSample: string
  captionPalette: string
  captionBackground: string
  paletteLabel: string
}

export const styleMessages: Record<Locale, StyleMessages> = {
  en: {
    eyebrow: 'Shared widget style',
    title: 'Someone shared a widget style with you',
    description:
      'The image you were sent is a Steps Widget style card: a photo with the style built into it. Open it in the app to make the same widget style in a few taps.',
    appStoreLabel: 'Download Steps Widget on the App Store',
    seeSteps: 'Already have the app? See the steps',
    steps: [
      { heading: 'Save the image', body: 'Save the whole card, code strip included, to Photos or Files.' },
      { heading: 'Tap Style from Photo', body: 'Pick the widget you want to restyle, then tap Style from Photo.' },
      { heading: 'Pick the card', body: 'Choose the saved image. Your style is set up automatically.' },
      { heading: 'Save the style', body: 'Tap the checkmark to put the style on your widget.' },
    ],
    noAppHeading: 'Don’t have the app yet?',
    noAppBody:
      'Install it on the iPhone you want the widget on, then follow the steps above. It is free, and it reads your step count from Apple Health.',
    plainPhotoHeading: 'If the image opens as a plain photo',
    plainPhotoBody:
      'The app needs the original card. A screenshot of it, or a copy with the bottom strip cropped off, no longer carries the style, so ask for the image itself to be sent again. Applying a style to a widget needs the Customization subscription; opening and saving the style is free.',
    howItWorks: 'How style sharing works',
    captionSample: 'A photo style, shown on a sample.',
    captionPalette: 'Colors Palette style: the widget takes its colours from the photo instead of showing it.',
    captionBackground: 'Background style: the photo sits behind the step count.',
    paletteLabel: 'Colours taken from the photo',
  },
  de: {
    eyebrow: 'Geteilter Widget-Stil',
    title: 'Jemand hat einen Widget-Stil mit dir geteilt',
    description:
      'Das Bild, das du bekommen hast, ist eine Stilkarte von Steps Widget: ein Foto, in dem der Stil steckt. Öffne es in der App, um denselben Widget-Stil mit wenigen Fingertipps zu erstellen.',
    appStoreLabel: 'Steps Widget im App Store laden',
    seeSteps: 'Du hast die App schon? Zu den Schritten',
    steps: [
      { heading: 'Bild sichern', body: 'Sichere die ganze Karte samt Codestreifen in Fotos oder Dateien.' },
      { heading: 'Auf „Stil aus Foto“ tippen', body: 'Wähle das Widget, das du umgestalten möchtest, und tippe auf „Stil aus Foto“.' },
      { heading: 'Karte auswählen', body: 'Wähle das gesicherte Bild. Dein Stil wird automatisch eingerichtet.' },
      { heading: 'Stil sichern', body: 'Tippe auf das Häkchen, um den Stil auf dein Widget zu legen.' },
    ],
    noAppHeading: 'Noch keine App?',
    noAppBody:
      'Installiere sie auf dem iPhone, auf dem das Widget sein soll, und folge dann den Schritten oben. Sie ist kostenlos und liest deine Schritte aus Apple Health.',
    plainPhotoHeading: 'Wenn sich das Bild als normales Foto öffnet',
    plainPhotoBody:
      'Die App braucht die Originalkarte. Ein Bildschirmfoto davon oder eine Kopie ohne den unteren Streifen enthält den Stil nicht mehr – lass dir das Bild selbst noch einmal schicken. Einen Stil auf ein Widget anzuwenden erfordert das Customization-Abo; den Stil zu öffnen und zu sichern ist kostenlos.',
    howItWorks: 'So funktioniert das Teilen von Stilen',
    captionSample: 'Ein Fotostil, an einem Beispiel gezeigt.',
    captionPalette: 'Stil „Farbpalette“: Das Widget übernimmt die Farben des Fotos, statt es zu zeigen.',
    captionBackground: 'Stil „Hintergrund“: Das Foto liegt hinter der Schrittzahl.',
    paletteLabel: 'Farben aus dem Foto',
  },
  es: {
    eyebrow: 'Estilo de widget compartido',
    title: 'Alguien te ha compartido un estilo de widget',
    description:
      'La imagen que te enviaron es una tarjeta de estilo de Steps Widget: una foto con el estilo incorporado. Ábrela en la app para crear el mismo estilo de widget en unos toques.',
    appStoreLabel: 'Descarga Steps Widget en el App Store',
    seeSteps: '¿Ya tienes la app? Ver los pasos',
    steps: [
      { heading: 'Guarda la imagen', body: 'Guarda la tarjeta completa, con la franja del código incluida, en Fotos o Archivos.' },
      { heading: 'Toca Estilo a partir de una foto', body: 'Elige el widget que quieres cambiar y toca Estilo a partir de una foto.' },
      { heading: 'Elige la tarjeta', body: 'Selecciona la imagen guardada. Tu estilo se configura automáticamente.' },
      { heading: 'Guarda el estilo', body: 'Toca la marca de verificación para aplicar el estilo a tu widget.' },
    ],
    noAppHeading: '¿Aún no tienes la app?',
    noAppBody:
      'Instálala en el iPhone donde quieras el widget y sigue los pasos de arriba. Es gratis y lee tus pasos de Apple Salud.',
    plainPhotoHeading: 'Si la imagen se abre como una foto normal',
    plainPhotoBody:
      'La app necesita la tarjeta original. Una captura de pantalla, o una copia sin la franja inferior, ya no lleva el estilo, así que pide que te envíen la imagen de nuevo. Aplicar un estilo a un widget requiere la suscripción Customization; abrir y guardar el estilo es gratis.',
    howItWorks: 'Cómo funciona compartir estilos',
    captionSample: 'Un estilo de foto, mostrado sobre un ejemplo.',
    captionPalette: 'Estilo Paleta de colores: el widget toma los colores de la foto en lugar de mostrarla.',
    captionBackground: 'Estilo Fondo: la foto queda detrás del número de pasos.',
    paletteLabel: 'Colores tomados de la foto',
  },
  fr: {
    eyebrow: 'Style de widget partagé',
    title: 'Quelqu’un vous a partagé un style de widget',
    description:
      'L’image reçue est une carte de style Steps Widget : une photo qui contient le style. Ouvrez-la dans l’app pour créer le même style de widget en quelques touches.',
    appStoreLabel: 'Télécharger Steps Widget dans l’App Store',
    seeSteps: 'Vous avez déjà l’app ? Voir les étapes',
    steps: [
      { heading: 'Enregistrez l’image', body: 'Enregistrez la carte entière, bande de code comprise, dans Photos ou Fichiers.' },
      { heading: 'Touchez Style à partir d’une photo', body: 'Choisissez le widget à modifier, puis touchez Style à partir d’une photo.' },
      { heading: 'Choisissez la carte', body: 'Sélectionnez l’image enregistrée. Votre style est configuré automatiquement.' },
      { heading: 'Enregistrez le style', body: 'Touchez la coche pour appliquer le style à votre widget.' },
    ],
    noAppHeading: 'Vous n’avez pas encore l’app ?',
    noAppBody:
      'Installez-la sur l’iPhone où vous voulez le widget, puis suivez les étapes ci-dessus. Elle est gratuite et lit votre nombre de pas dans Santé.',
    plainPhotoHeading: 'Si l’image s’ouvre comme une simple photo',
    plainPhotoBody:
      'L’app a besoin de la carte d’origine. Une capture d’écran, ou une copie sans la bande du bas, ne contient plus le style : demandez qu’on vous renvoie l’image elle-même. Appliquer un style à un widget nécessite l’abonnement Customization ; ouvrir et enregistrer le style est gratuit.',
    howItWorks: 'Comment fonctionne le partage de styles',
    captionSample: 'Un style photo, montré sur un exemple.',
    captionPalette: 'Style Palette de couleurs : le widget reprend les couleurs de la photo au lieu de l’afficher.',
    captionBackground: 'Style Arrière-plan : la photo se place derrière le nombre de pas.',
    paletteLabel: 'Couleurs tirées de la photo',
  },
  ja: {
    eyebrow: '共有されたウィジェットスタイル',
    title: 'ウィジェットのスタイルが共有されました',
    description:
      '届いた画像はSteps Widgetのスタイルカードです。写真にスタイルが組み込まれています。アプリで開けば、数回のタップで同じウィジェットスタイルを作れます。',
    appStoreLabel: 'App StoreでSteps Widgetをダウンロード',
    seeSteps: 'アプリをお持ちの方は手順へ',
    steps: [
      { heading: '画像を保存', body: 'コードの帯も含めてカード全体を「写真」または「ファイル」に保存します。' },
      { heading: '「写真からスタイルを作成」をタップ', body: 'スタイルを変えたいウィジェットを選び、「写真からスタイルを作成」をタップします。' },
      { heading: 'カードを選ぶ', body: '保存した画像を選ぶと、スタイルが自動で設定されます。' },
      { heading: 'スタイルを保存', body: 'チェックマークをタップすると、ウィジェットにスタイルが適用されます。' },
    ],
    noAppHeading: 'まだアプリをお持ちでない方',
    noAppBody: 'ウィジェットを置きたいiPhoneにインストールして、上の手順に従ってください。無料で、歩数はヘルスケアから読み込みます。',
    plainPhotoHeading: '画像が普通の写真として開く場合',
    plainPhotoBody:
      'アプリには元のカードが必要です。スクリーンショットや、下の帯を切り取ったコピーにはスタイルが含まれないため、画像そのものをもう一度送ってもらってください。ウィジェットへのスタイル適用にはCustomizationサブスクリプションが必要です。スタイルを開いて保存するのは無料です。',
    howItWorks: 'スタイル共有のしくみ',
    captionSample: '写真スタイルをサンプルで表示しています。',
    captionPalette: '「カラーパレット」スタイル：写真を表示する代わりに、写真の色をウィジェットに使います。',
    captionBackground: '「背景」スタイル：歩数の後ろに写真が表示されます。',
    paletteLabel: '写真から取り出した色',
  },
  ko: {
    eyebrow: '공유된 위젯 스타일',
    title: '누군가 위젯 스타일을 공유했어요',
    description:
      '받은 이미지는 Steps Widget 스타일 카드예요. 사진 안에 스타일이 담겨 있어요. 앱에서 열면 몇 번의 탭으로 같은 위젯 스타일을 만들 수 있어요.',
    appStoreLabel: 'App Store에서 Steps Widget 다운로드',
    seeSteps: '이미 앱이 있나요? 단계 보기',
    steps: [
      { heading: '이미지 저장', body: '코드 띠를 포함한 카드 전체를 사진 또는 파일에 저장하세요.' },
      { heading: '‘사진으로 스타일 만들기’ 탭', body: '스타일을 바꿀 위젯을 고른 다음 ‘사진으로 스타일 만들기’를 탭하세요.' },
      { heading: '카드 선택', body: '저장한 이미지를 선택하면 스타일이 자동으로 설정돼요.' },
      { heading: '스타일 저장', body: '체크 표시를 탭하면 위젯에 스타일이 적용돼요.' },
    ],
    noAppHeading: '아직 앱이 없나요?',
    noAppBody: '위젯을 둘 iPhone에 설치한 다음 위의 단계를 따라 하세요. 무료이며 걸음 수는 건강 앱에서 가져와요.',
    plainPhotoHeading: '이미지가 일반 사진으로 열린다면',
    plainPhotoBody:
      '앱에는 원본 카드가 필요해요. 스크린샷이나 아래쪽 띠를 잘라 낸 사본에는 스타일이 담겨 있지 않으니, 이미지 자체를 다시 보내 달라고 요청하세요. 위젯에 스타일을 적용하려면 Customization 구독이 필요하며, 스타일을 열고 저장하는 것은 무료예요.',
    howItWorks: '스타일 공유 방법',
    captionSample: '샘플 사진에 적용한 사진 스타일이에요.',
    captionPalette: '색상 팔레트 스타일: 사진을 보여 주는 대신 사진의 색을 위젯에 사용해요.',
    captionBackground: '배경 스타일: 걸음 수 뒤에 사진이 놓여요.',
    paletteLabel: '사진에서 가져온 색',
  },
  pl: {
    eyebrow: 'Udostępniony styl widżetu',
    title: 'Ktoś udostępnił Ci styl widżetu',
    description:
      'Otrzymany obraz to karta stylu Steps Widget: zdjęcie z wbudowanym stylem. Otwórz je w aplikacji, aby kilkoma stuknięciami utworzyć taki sam styl widżetu.',
    appStoreLabel: 'Pobierz Steps Widget z App Store',
    seeSteps: 'Masz już aplikację? Zobacz kroki',
    steps: [
      { heading: 'Zapisz obraz', body: 'Zapisz całą kartę, razem z paskiem kodu, w Zdjęciach lub Plikach.' },
      { heading: 'Stuknij Styl ze zdjęcia', body: 'Wybierz widżet, który chcesz zmienić, i stuknij Styl ze zdjęcia.' },
      { heading: 'Wybierz kartę', body: 'Wybierz zapisany obraz. Styl ustawi się automatycznie.' },
      { heading: 'Zapisz styl', body: 'Stuknij znacznik wyboru, aby nałożyć styl na widżet.' },
    ],
    noAppHeading: 'Nie masz jeszcze aplikacji?',
    noAppBody:
      'Zainstaluj ją na iPhonie, na którym ma być widżet, a potem wykonaj powyższe kroki. Jest bezpłatna i odczytuje liczbę kroków ze Zdrowia.',
    plainPhotoHeading: 'Jeśli obraz otwiera się jak zwykłe zdjęcie',
    plainPhotoBody:
      'Aplikacja potrzebuje oryginalnej karty. Zrzut ekranu lub kopia bez dolnego paska nie zawiera już stylu, więc poproś o ponowne wysłanie samego obrazu. Nałożenie stylu na widżet wymaga subskrypcji Customization; otwarcie i zapisanie stylu jest bezpłatne.',
    howItWorks: 'Jak działa udostępnianie stylów',
    captionSample: 'Styl zdjęcia pokazany na przykładzie.',
    captionPalette: 'Styl Paleta kolorów: widżet bierze kolory ze zdjęcia zamiast je pokazywać.',
    captionBackground: 'Styl Tło: zdjęcie jest za liczbą kroków.',
    paletteLabel: 'Kolory wzięte ze zdjęcia',
  },
  'pt-BR': {
    eyebrow: 'Estilo de widget compartilhado',
    title: 'Alguém compartilhou um estilo de widget com você',
    description:
      'A imagem que você recebeu é um cartão de estilo do Steps Widget: uma foto com o estilo embutido. Abra no app para criar o mesmo estilo de widget em poucos toques.',
    appStoreLabel: 'Baixar o Steps Widget na App Store',
    seeSteps: 'Já tem o app? Veja os passos',
    steps: [
      { heading: 'Salve a imagem', body: 'Salve o cartão inteiro, incluindo a faixa do código, em Fotos ou Arquivos.' },
      { heading: 'Toque em Estilo a partir de foto', body: 'Escolha o widget que você quer mudar e toque em Estilo a partir de foto.' },
      { heading: 'Escolha o cartão', body: 'Selecione a imagem salva. Seu estilo é configurado automaticamente.' },
      { heading: 'Salve o estilo', body: 'Toque na marca de seleção para aplicar o estilo ao widget.' },
    ],
    noAppHeading: 'Ainda não tem o app?',
    noAppBody:
      'Instale no iPhone em que você quer o widget e siga os passos acima. É gratuito e lê seus passos do app Saúde.',
    plainPhotoHeading: 'Se a imagem abrir como uma foto comum',
    plainPhotoBody:
      'O app precisa do cartão original. Uma captura de tela, ou uma cópia sem a faixa de baixo, não carrega mais o estilo, então peça para enviarem a imagem de novo. Aplicar um estilo a um widget exige a assinatura Customization; abrir e salvar o estilo é gratuito.',
    howItWorks: 'Como funciona o compartilhamento de estilos',
    captionSample: 'Um estilo de foto, mostrado em um exemplo.',
    captionPalette: 'Estilo Paleta de cores: o widget usa as cores da foto em vez de mostrá-la.',
    captionBackground: 'Estilo Fundo: a foto fica atrás da contagem de passos.',
    paletteLabel: 'Cores tiradas da foto',
  },
  'zh-Hans': {
    eyebrow: '收到的小组件样式',
    title: '有人和你分享了一个小组件样式',
    description: '你收到的图片是 Steps Widget 的样式卡片：样式就藏在这张照片里。在 App 中打开，轻点几下就能做出同样的小组件样式。',
    appStoreLabel: '在 App Store 下载 Steps Widget',
    seeSteps: '已经装了 App？查看步骤',
    steps: [
      { heading: '存储图片', body: '把整张卡片（包括底部的代码条）存储到“照片”或“文件”。' },
      { heading: '轻点“用照片生成样式”', body: '选择要更换样式的小组件，然后轻点“用照片生成样式”。' },
      { heading: '选择卡片', body: '选择存储的图片，样式会自动设置好。' },
      { heading: '存储样式', body: '轻点对勾，把样式应用到小组件上。' },
    ],
    noAppHeading: '还没有安装 App？',
    noAppBody: '在你想放小组件的 iPhone 上安装，然后按上面的步骤操作。App 免费，步数读取自“健康”App。',
    plainPhotoHeading: '如果图片打开后只是一张普通照片',
    plainPhotoBody:
      'App 需要原始卡片。截屏或裁掉底部条带的副本都不再包含样式，请让对方重新发送原图。将样式应用到小组件需要 Customization 订阅；打开和存储样式是免费的。',
    howItWorks: '样式分享的原理',
    captionSample: '照片样式，以示例照片展示。',
    captionPalette: '“配色板”样式：小组件不显示照片，而是取用照片中的颜色。',
    captionBackground: '“背景”样式：照片位于步数后面。',
    paletteLabel: '从照片中提取的颜色',
  },
  'zh-Hant': {
    eyebrow: '收到的小工具樣式',
    title: '有人和你分享了一個小工具樣式',
    description: '你收到的圖片是 Steps Widget 的樣式卡片：樣式就藏在這張照片裡。在 App 中開啟，點幾下就能做出同樣的小工具樣式。',
    appStoreLabel: '在 App Store 下載 Steps Widget',
    seeSteps: '已經安裝 App？查看步驟',
    steps: [
      { heading: '儲存圖片', body: '把整張卡片（包括底部的代碼條）儲存到「照片」或「檔案」。' },
      { heading: '點一下「用照片產生樣式」', body: '選擇要更換樣式的小工具，然後點一下「用照片產生樣式」。' },
      { heading: '選擇卡片', body: '選擇儲存的圖片，樣式會自動設定好。' },
      { heading: '儲存樣式', body: '點一下勾號，把樣式套用到小工具上。' },
    ],
    noAppHeading: '還沒有安裝 App？',
    noAppBody: '在你想放小工具的 iPhone 上安裝，然後依照上面的步驟操作。App 免費，步數讀取自「健康」App。',
    plainPhotoHeading: '如果圖片開啟後只是一張普通照片',
    plainPhotoBody:
      'App 需要原始卡片。截圖或裁掉底部條帶的副本都不再包含樣式，請對方重新傳送原圖。將樣式套用到小工具需要 Customization 訂閱；開啟和儲存樣式是免費的。',
    howItWorks: '樣式分享的原理',
    captionSample: '照片樣式，以範例照片展示。',
    captionPalette: '「配色盤」樣式：小工具不顯示照片，而是取用照片中的顏色。',
    captionBackground: '「背景」樣式：照片位於步數後面。',
    paletteLabel: '從照片中擷取的顏色',
  },
}
