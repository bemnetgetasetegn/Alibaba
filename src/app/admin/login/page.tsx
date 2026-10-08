'use client'

import { useState } from 'react'
import { loginAction } from '@/app/actions/auth'

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null)
  const [email, setEmail] = useState('admin@2emarket.com')
  const [password, setPassword] = useState('admin123')

  async function handleSubmit(formData: FormData) {
    const res = await loginAction(formData)
    if (res?.error) {
      setError(res.error)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6 bg-white p-8 rounded-lg shadow-sm border border-[#ddd]">
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-3xl font-black tracking-tight text-[#111]">
              2E<span className="text-brand-orange">market</span>
            </span>
            <span className="bg-[#D64000] text-white text-[11px] font-bold px-2 py-0.5 rounded uppercase">
              Admin
            </span>
          </div>
          <h2 className="text-lg font-bold text-[#222]">
            Admin Dashboard
          </h2>
          <p className="mt-1 text-center text-xs text-gray-500">
            Sign in to manage products, images, and company info
          </p>
        </div>

        {/* Demo Credentials Box */}
        <div className="bg-orange-50 border border-orange-200 rounded-md p-3 text-xs text-orange-900">
          <div className="font-bold flex items-center gap-1 mb-1">
            <span>🔑 Demo Login Credentials:</span>
          </div>
          <div className="flex justify-between py-0.5">
            <span className="text-gray-600">Email:</span>
            <span className="font-mono font-semibold">admin@2emarket.com</span>
          </div>
          <div className="flex justify-between py-0.5">
            <span className="text-gray-600">Password:</span>
            <span className="font-mono font-semibold">admin123</span>
          </div>
        </div>

        <form className="mt-4 space-y-5" action={handleSubmit}>
          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded text-sm text-center border border-red-200">
              {error}
            </div>
          )}
          <div className="space-y-3">
            <div>
              <label htmlFor="email-address" className="block text-xs font-semibold text-gray-700 mb-1">Email address</label>
              <input
                id="email-address"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
                className="w-full px-3 py-2 border border-[#ddd] placeholder-gray-400 text-gray-900 rounded-md focus:outline-none focus:border-[#D64000] text-sm"
                placeholder="Email address"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-xs font-semibold text-gray-700 mb-1">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
                className="w-full px-3 py-2 border border-[#ddd] placeholder-gray-400 text-gray-900 rounded-md focus:outline-none focus:border-[#D64000] text-sm"
                placeholder="Password"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-[#D64000] hover:bg-[#C03800] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#D64000] h-12 items-center"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
