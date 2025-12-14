"use client"

import { DialogDescription } from "@/components/ui/dialog"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Settings, Phone, Mail, Instagram } from "lucide-react"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function ChordGenAI() {
  const [language, setLanguage] = useState("en")
  const [showAuth, setShowAuth] = useState(false)
  const [isLogin, setIsLogin] = useState(true)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [username, setUsername] = useState("")
  const [showContactModal, setShowContactModal] = useState(false)
  const [contactType, setContactType] = useState("")
  const [showContactPhone, setShowContactPhone] = useState(false)
  const [showContactEmail, setShowContactEmail] = useState(false)
  const [showContactInstagram, setShowContactInstagram] = useState(false)
  const [inputText, setInputText] = useState("")
  const [selectedInstrument, setSelectedInstrument] = useState("guitar")
  const [selectedMood, setSelectedMood] = useState("happy")
  const [generatedChords, setGeneratedChords] = useState("")
  const [generationHistory, setGenerationHistory] = useState<
    Array<{
      id: string
      text: string
      chords: string
      instrument: string
      mood: string
      date: string
    }>
  >([])

  const languages = [
    { code: "en", name: "English" },
    { code: "uk", name: "Українська" },
    { code: "es", name: "Español" },
    { code: "fr", name: "Français" },
    { code: "de", name: "Deutsch" },
    { code: "pl", name: "Polski" },
  ]

  const translations: any = {
    en: {
      title: "ChordGenAI",
      register: "Register",
      logIn: "Log in",
      logout: "Logout",
      enterText: "Enter your song lyrics here...",
      fontChoice: "Font",
      instrument: "Instrument",
      mood: "Song Mood",
      settings: "Settings",
      generate: "GENERATE",
      settingsTitle: "Settings",
      settingsDesc: "Change your preferences",
      language: "Language",
      generatedChordsTitle: "Generated Chords",
      generatedChordsDesc: "Here are your chords",
      history: "Generation History",
      noHistory: "No generations yet",
      viewChords: "View Chords",
      deleteHistory: "Delete",
      dontHaveAccount: "Don't have an account?",
      // Instruments
      guitar: "Guitar",
      ukulele: "Ukulele",
      banjo: "Banjo",
      mandolin: "Mandolin",
      bass: "Bass Guitar",
      // Moods
      happy: "Happy",
      sad: "Sad",
      energetic: "Energetic",
      calm: "Calm",
      romantic: "Romantic",
      melancholic: "Melancholic",
      upbeat: "Upbeat",
      dark: "Dark",
    },
    uk: {
      title: "ChordGenAI",
      register: "Реєстрація",
      logIn: "Увійти",
      logout: "Вийти",
      enterText: "Введіть текст пісні тут...",
      fontChoice: "Шрифт",
      instrument: "Інструмент",
      mood: "Настрій пісні",
      settings: "Налаштування",
      generate: "ГЕНЕРУВАТИ",
      settingsTitle: "Налаштування",
      settingsDesc: "Змініть ваші налаштування",
      language: "Мова",
      generatedChordsTitle: "Згенеровані акорди",
      generatedChordsDesc: "Ось ваші акорди",
      history: "Історія генерації",
      noHistory: "Жодних генерацій поки що",
      viewChords: "Переглянути акорди",
      deleteHistory: "Видалити",
      dontHaveAccount: "Немає акаунту?",
      // Інструменти
      guitar: "Гітара",
      ukulele: "Укулеле",
      banjo: "Банджо",
      mandolin: "Мандоліна",
      bass: "Бас-гітара",
      // Настрої
      happy: "Весела",
      sad: "Сумна",
      energetic: "Енергійна",
      calm: "Спокійна",
      romantic: "Романтична",
      melancholic: "Меланхолійна",
      upbeat: "Бадьора",
      dark: "Темна",
    },
    es: {
      title: "ChordGenAI",
      register: "Registrarse",
      logIn: "Iniciar sesión",
      logout: "Cerrar sesión",
      enterText: "Ingrese la letra de su canción aquí...",
      fontChoice: "Fuente",
      instrument: "Instrumento",
      mood: "Estado de ánimo de la canción",
      settings: "Configuración",
      generate: "GENERAR",
      settingsTitle: "Configuración",
      settingsDesc: "Cambie sus preferencias",
      language: "Idioma",
      generatedChordsTitle: "Acordes generados",
      generatedChordsDesc: "Aquí están tus acordes",
      history: "Historial de generación",
      noHistory: "No hay generaciones aún",
      viewChords: "Ver acordes",
      deleteHistory: "Eliminar",
      dontHaveAccount: "¿No tienes una cuenta?",
      // Instrumentos
      guitar: "Guitarra",
      ukulele: "Ukelele",
      banjo: "Banjo",
      mandolin: "Mandolina",
      bass: "Bajo",
      // Estados de ánimo
      happy: "Alegre",
      sad: "Triste",
      energetic: "Energético",
      calm: "Tranquilo",
      romantic: "Romántico",
      melancholic: "Melancólico",
      upbeat: "Animado",
      dark: "Oscuro",
    },
    fr: {
      title: "ChordGenAI",
      register: "S'inscrire",
      logIn: "Se connecter",
      logout: "Se déconnecter",
      enterText: "Entrez les paroles de votre chanson ici...",
      fontChoice: "Police",
      instrument: "Instrument",
      mood: "Humeur de la chanson",
      settings: "Paramètres",
      generate: "GÉNÉRER",
      settingsTitle: "Paramètres",
      settingsDesc: "Modifiez vos préférences",
      language: "Langue",
      generatedChordsTitle: "Accords générés",
      generatedChordsDesc: "Voici vos accords",
      history: "Historique de génération",
      noHistory: "Aucune génération pour l'instant",
      viewChords: "Voir les accords",
      deleteHistory: "Supprimer",
      dontHaveAccount: "Vous n'avez pas de compte?",
      // Instruments
      guitar: "Guitare",
      ukulele: "Ukulélé",
      banjo: "Banjo",
      mandolin: "Mandoline",
      bass: "Basse",
      // Humeurs
      happy: "Joyeux",
      sad: "Triste",
      energetic: "Énergique",
      calm: "Calme",
      romantic: "Romantique",
      melancholic: "Mélancolique",
      upbeat: "Optimiste",
      dark: "Sombre",
    },
    de: {
      title: "ChordGenAI",
      register: "Registrieren",
      logIn: "Anmelden",
      logout: "Abmelden",
      enterText: "Geben Sie hier Ihren Songtext ein...",
      fontChoice: "Schriftart",
      instrument: "Instrument",
      mood: "Stimmung des Liedes",
      settings: "Einstellungen",
      generate: "GENERIEREN",
      settingsTitle: "Einstellungen",
      settingsDesc: "Ändern Sie Ihre Einstellungen",
      language: "Sprache",
      generatedChordsTitle: "Generierte Akkorde",
      generatedChordsDesc: "Hier sind Ihre Akkorde",
      history: "Generationsgeschichte",
      noHistory: "Noch keine Generierungen",
      viewChords: "Akkorde anzeigen",
      deleteHistory: "Löschen",
      dontHaveAccount: "Sie haben noch kein Konto?",
      // Instrumente
      guitar: "Gitarre",
      ukulele: "Ukulele",
      banjo: "Banjo",
      mandolin: "Mandoline",
      bass: "Bassgitarre",
      // Stimmungen
      happy: "Fröhlich",
      sad: "Traurig",
      energetic: "Energisch",
      calm: "Ruhig",
      romantic: "Romantisch",
      melancholic: "Melancholisch",
      upbeat: "Lebhaft",
      dark: "Dunkel",
    },
    pl: {
      title: "ChordGenAI",
      register: "Zarejestruj",
      logIn: "Zaloguj",
      logout: "Wyloguj",
      enterText: "Wprowadź tekst piosenki tutaj...",
      fontChoice: "Czcionka",
      instrument: "Instrument",
      mood: "Nastrój piosenki",
      settings: "Ustawienia",
      generate: "GENERUJ",
      settingsTitle: "Ustawienia",
      settingsDesc: "Zmień swoje preferencje",
      language: "Język",
      generatedChordsTitle: "Wygenerowane akordy",
      generatedChordsDesc: "Oto twoje akordy",
      history: "Historia generacji",
      noHistory: "Nie ma jeszcze żadnych generacji",
      viewChords: "Wyświetl akordy",
      deleteHistory: "Usuń",
      dontHaveAccount: "Nie masz konta?",
      // Instrumenty
      guitar: "Gitara",
      ukulele: "Ukulele",
      banjo: "Banjo",
      mandolin: "Mandolina",
      bass: "Gitara basowa",
      // Nastroje
      happy: "Wesoły",
      sad: "Smutny",
      energetic: "Energiczny",
      calm: "Spokojny",
      romantic: "Romantyczny",
      melancholic: "Melancholijny",
      upbeat: "Pogodny",
      dark: "Mroczny",
    },
  }

  const t = translations[language] || translations.en

  useState(() => {
    if (typeof window !== "undefined" && isLoggedIn) {
      const savedHistory = localStorage.getItem(`chordgen_history_${username}`)
      if (savedHistory) {
        setGenerationHistory(JSON.parse(savedHistory))
      }
    }
  })

  const handleLogin = () => {
    setIsLoggedIn(true)
    setUsername("User")
    setShowAuth(false)
    if (typeof window !== "undefined") {
      const savedHistory = localStorage.getItem("chordgen_history_User")
      if (savedHistory) {
        setGenerationHistory(JSON.parse(savedHistory))
      }
    }
  }

  const handleSignup = () => {
    setIsLoggedIn(true)
    setUsername("User")
    setShowAuth(false)
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setUsername("")
    setGenerationHistory([])
  }

  const handleContactClick = (type: string) => {
    setContactType(type)
    setShowContactModal(true)
  }

  const handleGenerate = () => {
    if (!inputText.trim()) {
      return
    }

    const lines = inputText.split("\n")
    let output = ""

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i]
      const lowerLine = line.toLowerCase()

      const isVerse = lowerLine.includes("verse") || lowerLine.includes("куплет")
      const isChorus = lowerLine.includes("chorus") || lowerLine.includes("приспів") || lowerLine.includes("припев")
      const isBridge = lowerLine.includes("bridge") || lowerLine.includes("брідж")

      if (isVerse || isChorus || isBridge) {
        output += "\n" + line + "\n"
        continue
      }

      if (line.trim() === "") {
        output += "\n"
        continue
      }

      let chords = []
      const words = line.split(" ")

      if (selectedMood === "happy") {
        chords = ["C", "G", "Am", "F", "C", "G"]
      } else if (selectedMood === "sad") {
        chords = ["Am", "F", "C", "G", "Am", "Em"]
      } else if (selectedMood === "energetic") {
        chords = ["E", "A", "B", "E", "A", "B"]
      } else if (selectedMood === "calm") {
        chords = ["G", "Em", "C", "D", "G", "Em"]
      } else if (selectedMood === "romantic") {
        chords = ["D", "A", "Bm", "G", "D", "A"]
      } else if (selectedMood === "melancholic") {
        chords = ["Em", "Am", "D", "G", "Em", "Am"]
      } else if (selectedMood === "upbeat") {
        chords = ["F", "C", "G", "Am", "F", "C"]
      } else {
        chords = ["C", "F", "G", "C", "Am", "G"]
      }

      let chordLine = ""
      const lyricLine = line

      const positions = [0, Math.floor(words.length / 3), Math.floor((words.length * 2) / 3)]

      for (let j = 0; j < positions.length && j < chords.length; j++) {
        const pos = positions[j]
        if (pos < words.length) {
          const charPos = words.slice(0, pos).join(" ").length
          chordLine = chordLine.padEnd(charPos, " ") + chords[j] + "  "
        }
      }

      if (chordLine.trim()) {
        output += chordLine + "\n"
      }
      output += lyricLine + "\n"
    }

    setGeneratedChords(output)
    setShowContactPhone(true)

    if (isLoggedIn) {
      const newGeneration = {
        id: Date.now().toString(),
        text: inputText,
        chords: output,
        instrument: selectedInstrument,
        mood: selectedMood,
        date: new Date().toLocaleString(),
      }
      const updatedHistory = [newGeneration, ...generationHistory]
      setGenerationHistory(updatedHistory)

      if (typeof window !== "undefined") {
        localStorage.setItem(`chordgen_history_${username}`, JSON.stringify(updatedHistory))
      }
    }
  }

  const viewHistoryItem = (chords: string) => {
    setGeneratedChords(chords)
    setShowContactPhone(true)
  }

  const deleteHistoryItem = (id: string) => {
    const updatedHistory = generationHistory.filter((item) => item.id !== id)
    setGenerationHistory(updatedHistory)
    if (typeof window !== "undefined") {
      localStorage.setItem(`chordgen_history_${username}`, JSON.stringify(updatedHistory))
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#4a5d4a] via-[#6b7d6b] to-gray-200 text-foreground p-6 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="flex items-center justify-between mb-12">
          <h1 className="text-5xl font-bold tracking-tight">{t.title}</h1>

          <div className="flex items-center gap-4">
            {/* Settings */}
            <Sheet>
              <SheetTrigger asChild>
                <Button size="icon" className="rounded-full h-12 w-12 bg-primary hover:bg-primary/90">
                  <Settings className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent className="w-[400px] sm:w-[500px]">
                <SheetHeader className="px-4">
                  <SheetTitle className="text-2xl font-bold">{t.settingsTitle}</SheetTitle>
                  <SheetDescription className="text-base">{t.settingsDesc}</SheetDescription>
                </SheetHeader>
                <div className="space-y-8 mt-8 px-4">
                  <div className="space-y-3">
                    <Label className="text-base font-semibold">{t.language}</Label>
                    <Select value={language} onValueChange={setLanguage}>
                      <SelectTrigger className="rounded-xl h-12 text-base border-2">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl">
                        {languages.map((lang) => (
                          <SelectItem key={lang.code} value={lang.code} className="text-base py-3">
                            {lang.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {isLoggedIn && (
                    <div className="space-y-3 border-t pt-6">
                      <Label className="text-base font-semibold">{t.history}</Label>
                      <div className="space-y-2 max-h-[400px] overflow-y-auto">
                        {generationHistory.length === 0 ? (
                          <p className="text-sm text-muted-foreground text-center py-8">{t.noHistory}</p>
                        ) : (
                          generationHistory.map((item) => (
                            <div key={item.id} className="bg-muted/50 rounded-lg p-3 space-y-2">
                              <div className="flex items-start justify-between gap-2">
                                <div className="flex-1 min-w-0">
                                  <p className="text-xs text-muted-foreground">{item.date}</p>
                                  <p className="text-sm font-medium truncate">{item.text.split("\n")[0]}</p>
                                  <p className="text-xs text-muted-foreground">
                                    {item.instrument} • {item.mood}
                                  </p>
                                </div>
                                <div className="flex gap-1 flex-shrink-0">
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={() => viewHistoryItem(item.chords)}
                                    className="h-8 text-xs"
                                  >
                                    {t.viewChords}
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={() => deleteHistoryItem(item.id)}
                                    className="h-8 text-xs text-destructive hover:text-destructive"
                                  >
                                    {t.deleteHistory}
                                  </Button>
                                </div>
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>

            {/* Auth Buttons */}
            {isLoggedIn ? (
              <div className="flex items-center gap-4">
                <span className="text-sm">Welcome, {username}</span>
                <Button onClick={handleLogout} className="rounded-lg bg-muted text-muted-foreground hover:bg-muted/90">
                  {t.logout}
                </Button>
              </div>
            ) : (
              <>
                <Button
                  onClick={() => {
                    setIsLogin(false)
                    setShowAuth(true)
                  }}
                  className="rounded-lg bg-muted text-muted-foreground hover:bg-muted/90"
                >
                  {t.register}
                </Button>
                <Button
                  onClick={() => {
                    setIsLogin(true)
                    setShowAuth(true)
                  }}
                  className="rounded-lg bg-primary hover:bg-primary/90"
                >
                  {t.logIn}
                </Button>
              </>
            )}
          </div>
        </header>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-6">
            <div className="bg-muted rounded-lg p-6 min-h-[300px]">
              <Textarea
                placeholder={t.enterText}
                className="min-h-[250px] bg-transparent border-none text-lg resize-none focus-visible:ring-0"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
              />
            </div>

            <Button
              onClick={handleGenerate}
              className="w-full rounded-lg h-14 text-lg font-bold bg-primary hover:bg-primary/90"
            >
              {t.generate}
            </Button>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <div className="bg-muted rounded-lg p-6">
              <Label className="text-lg mb-4 block">{t.instrument}</Label>
              <RadioGroup value={selectedInstrument} onValueChange={setSelectedInstrument} className="space-y-3">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="guitar" id="guitar" />
                  <Label htmlFor="guitar" className="cursor-pointer">
                    {t.guitar}
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="ukulele" id="ukulele" />
                  <Label htmlFor="ukulele" className="cursor-pointer">
                    {t.ukulele}
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="banjo" id="banjo" />
                  <Label htmlFor="banjo" className="cursor-pointer">
                    {t.banjo}
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="mandolin" id="mandolin" />
                  <Label htmlFor="mandolin" className="cursor-pointer">
                    {t.mandolin}
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="bass" id="bass" />
                  <Label htmlFor="bass" className="cursor-pointer">
                    {t.bass}
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="bg-muted rounded-lg p-6">
              <Label className="text-lg mb-4 block">{t.mood}</Label>
              <RadioGroup value={selectedMood} onValueChange={setSelectedMood} className="space-y-3">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="happy" id="happy" />
                  <Label htmlFor="happy" className="cursor-pointer">
                    {t.happy}
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="sad" id="sad" />
                  <Label htmlFor="sad" className="cursor-pointer">
                    {t.sad}
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="energetic" id="energetic" />
                  <Label htmlFor="energetic" className="cursor-pointer">
                    {t.energetic}
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="calm" id="calm" />
                  <Label htmlFor="calm" className="cursor-pointer">
                    {t.calm}
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="romantic" id="romantic" />
                  <Label htmlFor="romantic" className="cursor-pointer">
                    {t.romantic}
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="melancholic" id="melancholic" />
                  <Label htmlFor="melancholic" className="cursor-pointer">
                    {t.melancholic}
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="upbeat" id="upbeat" />
                  <Label htmlFor="upbeat" className="cursor-pointer">
                    {t.upbeat}
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="dark" id="dark" />
                  <Label htmlFor="dark" className="cursor-pointer">
                    {t.dark}
                  </Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        </div>

        {/* Footer Icons */}
        <footer className="mt-12 flex justify-center gap-6">
          <Button
            onClick={() => handleContactClick("phone")}
            size="icon"
            variant="outline"
            className="rounded-full h-14 w-14 border-2"
          >
            <Phone className="h-6 w-6" />
          </Button>
          <Button
            onClick={() => handleContactClick("email")}
            size="icon"
            variant="outline"
            className="rounded-full h-14 w-14 border-2"
          >
            <Mail className="h-6 w-6" />
          </Button>
          <Button
            onClick={() => handleContactClick("instagram")}
            size="icon"
            variant="outline"
            className="rounded-full h-14 w-14 border-2"
          >
            <Instagram className="h-6 w-6" />
          </Button>
        </footer>
      </div>

      {/* Auth Dialog */}
      <Dialog open={showAuth} onOpenChange={setShowAuth}>
        <DialogContent className="rounded-lg">
          <DialogHeader>
            <DialogTitle>{isLogin ? t.logIn : t.register}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {!isLogin && (
              <div className="space-y-2">
                <Label>Username</Label>
                <Input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="rounded-lg"
                />
              </div>
            )}
            <div className="space-y-2">
              <Label>Email</Label>
              <Input type="email" className="rounded-lg" />
            </div>
            <div className="space-y-2">
              <Label>Password</Label>
              <Input type="password" className="rounded-lg" />
            </div>
            <Button onClick={isLogin ? handleLogin : handleSignup} className="w-full rounded-lg">
              {isLogin ? t.logIn : t.register}
            </Button>
            {isLogin && (
              <button
                onClick={() => setIsLogin(false)}
                className="w-full text-sm text-muted-foreground hover:text-foreground"
              >
                {t.dontHaveAccount}
              </button>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Contact Dialog */}
      <Dialog open={showContactModal} onOpenChange={setShowContactModal}>
        <DialogContent className="rounded-lg">
          <DialogHeader>
            <DialogTitle>
              {contactType === "phone"
                ? "Contact Numbers"
                : contactType === "email"
                  ? "Contact Emails"
                  : "Instagram Accounts"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            {contactType === "phone" && <div className="p-3 bg-muted rounded-lg text-center">+1 (555) 123-4567</div>}
            {contactType === "email" && (
              <div className="p-3 bg-muted rounded-lg text-center">support@chordgenai.com</div>
            )}
            {contactType === "instagram" && (
              <div className="p-3 bg-muted rounded-lg text-center">@chordgenai_official</div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Generated Chords Dialog */}
      <Dialog open={showContactPhone} onOpenChange={setShowContactPhone}>
        <DialogContent className="rounded-2xl w-[95vw] max-w-4xl max-h-[90vh] flex flex-col gap-0">
          <DialogHeader className="px-6 sm:px-8 pt-6 sm:pt-8 pb-4 flex-shrink-0">
            <DialogTitle className="text-2xl sm:text-3xl font-bold">{t.generatedChordsTitle}</DialogTitle>
            <DialogDescription className="text-sm sm:text-base mt-2">{t.generatedChordsDesc}</DialogDescription>
          </DialogHeader>

          <div className="flex-1 overflow-y-auto px-6 sm:px-8 pb-6 sm:pb-8">
            <div className="bg-muted/50 rounded-xl p-4 sm:p-8 border-2 border-muted">
              <pre className="whitespace-pre-wrap leading-relaxed break-words font-mono">{generatedChords}</pre>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
