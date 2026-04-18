"use client"
import { useEffect, useState } from "react"
import {
  Sun,
  Cloud,
  CloudRain,
  CloudLightning,
} from "lucide-react"

export default function Display() {

    if (typeof window === "undefined") return null

const [mounted, setMounted] = useState(false)

useEffect(() => {
  setMounted(true)
}, [])


const [name, setName] = useState("")
const [theme, setTheme] = useState("1")

useEffect(() => {
  if (typeof window === "undefined") return

  const params = new URLSearchParams(window.location.search)

  setName(params.get("name") || "")
  setTheme(params.get("theme") || "1")
}, [])

  const safeName =
    !name || name === "null" || name === "undefined"
      ? "Pasien"
      : name

  const [time, setTime] = useState("")
  const [date, setDate] = useState("")

  useEffect(() => {


    const fetchWeather = async () => {
    try {
      const res = await fetch(
        "https://api.open-meteo.com/v1/forecast?latitude=-6.2&longitude=106.8&current_weather=true"
      )
      const data = await res.json()
      setWeather(data.current_weather)
    } catch (err) {
      console.log("weather error", err)
    }
  }

  fetchWeather()

    const updateClock = () => {
      const now = new Date()

      setTime(
        now.toLocaleTimeString("id-ID", {
          hour: "2-digit",
          minute: "2-digit",
        })

        
      )

      setDate(
        now.toLocaleDateString("id-ID", {
          weekday: "long",
          day: "numeric",
          month: "long",
          year: "numeric",
        })
      )
    }

    updateClock()
    const interval = setInterval(updateClock, 1000)
    return () => clearInterval(interval)
  }, [])



const videoMap: any = {
  "1": "/vid1.mp4",
  "2": "/vid2.mp4",
  "3": "/bg3.mp4"
}

const videoSrc = videoMap[theme] || "/vid1.mp4"

const [weather, setWeather] = useState<any>(null)

const getWeatherIcon = (code: number) => {
  if (code === 0) return <Sun className="w-10 h-10 text-white" />
  if (code <= 3) return <Cloud className="w-10 h-10 text-white" />
  if (code < 70) return <CloudRain className="w-10 h-10 text-white" />
  return <CloudLightning className="w-10 h-10 text-white" />
}

if (!mounted) return null

 return (
  <div className="relative h-screen w-screen overflow-hidden flex items-center justify-center">

    {/* 🎬 VIDEO BACKGROUND */}
    <video
      autoPlay
      muted
      loop
      playsInline
      className="absolute w-full h-full object-cover"
    >
      <source src={videoSrc} type="video/mp4" />
    </video>

    {/* overlay gelap */}
    <div className="absolute inset-0 bg-black/50"></div>


{/* 🌤️ WEATHER (pojok kiri atas) */}
<div className="
  absolute top-8 left-10
  text-white
  backdrop-blur-2xl
  bg-gradient-to-br from-white/20 to-white/5
  border border-white/30
  px-6 py-4
  rounded-2xl
  shadow-[0_8px_32px_rgba(0,0,0,0.3)]
">

  <p className="text-base text-white/60 mb-1">
    Jakarta
  </p>

  {/* ICON + TEMP */}
  <div className="flex items-center gap-3">
  {weather && getWeatherIcon(weather.weathercode)}

  <span className="text-5xl font-bold">
    {weather ? `${weather.temperature}°` : "--"}
  </span>
</div>

  <p className="text-lg text-white/70 mt-2">
    {weather ? `${weather.windspeed} km/h` : ""}
  </p>

</div>

{/* 🌐 WEBSITE (bawah tengah) */}
<div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/70 text-lg tracking-wide">
  www.putihdental.com
</div>

    {/* ⏰ CLOCK (pojok kanan atas) */}
    <div className="
  absolute top-8 right-10
  text-right text-white
  backdrop-blur-xl
  bg-white/10
  border border-white/20
  px-5 py-3
  rounded-2xl
  shadow-lg
">
      <p className="text-lg text-white/70">
        {date}
      </p>
      <p className="text-3xl font-semibold">
        {time}
      </p>
    </div>

    {/* 🏥 LOGO (atas tengah) */}
<div className="absolute top-8 left-1/2 -translate-x-1/2">
  <img
    src="/logo.png"
    alt="Logo PUTIH"
    className="w-40 md:w-48 opacity-90 drop-shadow-lg"
  />
</div>

    {/* 🧊 GLASS CARD (tengah) */}
    <div className="
      relative
      backdrop-blur-2xl
      bg-white/10
      border border-white/20
      rounded-3xl
      shadow-[0_8px_32px_rgba(0,0,0,0.3)]
      px-20 py-16
      text-center
      text-white
      max-w-[90vw]
    ">

      <p className="text-3xl text-white/60 mb-8 tracking-wide">
        WELCOME TO PUTIH
      </p>

      <h1 className="
        font-bold
        leading-tight
        break-words
        text-6xl md:text-7xl lg:text-8xl
      ">
        {safeName.toUpperCase()}
      </h1>

    </div>
  </div>
)
}