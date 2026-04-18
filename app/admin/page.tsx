"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function Admin() {
  const [name, setName] = useState("")
  const [theme, setTheme] = useState("1")
  const router = useRouter()

  const submit = (e: React.FormEvent) => {
    e.preventDefault()

    const submit = (e: React.FormEvent) => {
  e.preventDefault()

  const cleanName = name.trim()
  if (!cleanName) return

  // reset dulu
  useEffect(() => {
  setName("")
}, [])

  window.location.href =
    `/display?name=${encodeURIComponent(cleanName)}&theme=${theme}`
}

    const cleanName = name.trim()
    if (!cleanName) return

    window.location.href = `/display?name=${encodeURIComponent(cleanName)}&theme=${theme}`
  }

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={submit} className="bg-white p-8 rounded-xl shadow space-y-4 w-80">

        <h1 className="text-xl font-bold">Input Pasien</h1>

        <input
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Nama pasien"
          className="border p-2 w-full"
          autoFocus
        />

        {/* 🎬 PILIH TEMA */}
        <select
          value={theme}
          onChange={e => setTheme(e.target.value)}
          className="border p-2 w-full"
        >
          <option value="1">Dewasa</option>
          <option value="2">Anak</option>
          
        </select>

        <button
          type="submit"
          className="bg-blue-500 text-white p-2 w-full rounded"
        >
          Tampilkan
        </button>
      </form>
    </div>
  )
}