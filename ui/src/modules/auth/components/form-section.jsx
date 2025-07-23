import { useState } from 'preact/hooks'

export const FormSection = ({ onClick }) => {
  const [username, setUsername] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    onClick({ username })
  }

  return (
    <section className="rounded-lg p-6 bg-[#252526] border border-[#3e3e42]">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">
            Nombre de usuario
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4"></span>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              placeholder="Ingresa tu nombre"
              className="w-full pl-10 pr-4 py-3 border border-[#3e3e42] rounded-lg transition-colors focus:outline-none focus:border-[#3e3e42]"
              required />
          </div>
        </div>

        <button
          type='submit'
          className="w-full py-3 bg-orange-500 text-sm font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed outline-none border-none">
          Ingresar
        </button>
      </form>
    </section>
  )
}
