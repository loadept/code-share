import logo from '../../../assets/images/code-share-n.webp'

export const LogoSection = () => {
  return (
    <section className="text-center mb-8">
      <div className="flex items-center justify-center gap-3 mb-4">
        <div className="flex items-center justify-center w-32 h-32 rounded-xl">
          <img src={logo} alt="CodeShare logo" className="w-32" />
        </div>
        <h1 className="text-3xl font-bold">
          CodeShare
        </h1>
      </div>
      <p className="text-sm">
        Ingresa tu nombre para comenzar
      </p>
    </section>
  )
}
