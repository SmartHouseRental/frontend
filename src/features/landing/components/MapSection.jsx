export default function MapSection() {
  return (
    <section className="py-16 px-6 lg:px-20 bg-foreground text-background rounded-t-[3rem]">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 items-center">

        <div className="lg:w-1/3">
          <h2 className="text-3xl font-extrabold mb-6">
            Available Across Addis
          </h2>
          <p className="text-background/70 mb-8">
            Focused on premium neighborhoods.
          </p>

          <ul className="space-y-4">
            <li className="text-primary font-bold">
              • Bole & Bole Atlas
            </li>
            <li>• Old Airport & Sarbet</li>
            <li>• Kazanchis & CMC</li>
            <li>• Summit & Ayat</li>
          </ul>
        </div>

        <div className="lg:w-2/3 w-full h-[400px] rounded-2xl overflow-hidden grayscale hover:grayscale-0 transition-all">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCba5ZphRpbXGDIK5FAj-MxG-cUqBFk3OfCyEKS2uZwRP0RcxNtIxH0qmyeMztLU4IVlmxmevPGSOxkz9d3d2NjqWzo7FsdyciWVAoxyA-kNK0zSIzWc5vCZBibD0NInrEE9elSVa5FSaQWwW4MqgldrAJWl28M1-cKXezHkfNW2-Jcsa9N3sk9_JrgehNLLcFGjSSe3CFvzijdFeOkzEnlEIp7lscFo0PztZXO8XONLHum0Q5PBLno2pKtFsGHx_IclSbYYpuk5TE"
            className="w-full h-full object-cover"
          />
        </div>

      </div>
    </section>
  )
}