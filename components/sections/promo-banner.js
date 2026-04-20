import Link from "next/link";

export default function PromoBanner({ title, description, linkText = "Start Shopping", image, imageName }) {
  return (
    <section className="mt-8 bg-white">
      <div className="section-shell py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-gray-50 rounded-lg overflow-hidden border border-gray-200">
          {/* Left Content */}
          <div className="px-6 md:px-8 py-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              {title}
            </h2>
            <p className="text-gray-700 mb-6 leading-relaxed">
              {description}
            </p>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors font-semibold"
            >
              {linkText}
              <span className="text-lg">→</span>
            </Link>
          </div>

          {/* Right Image */}
          <div className="relative h-64 md:h-80 overflow-hidden rounded-r-lg">
            <img
              src={image}
              alt={imageName || title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-l from-transparent to-black/10"></div>
            {imageName && (
              <div className="absolute bottom-0 left-0 right-0 bg-black/50 backdrop-blur-sm px-4 py-2">
                <p className="text-white text-sm font-medium">{imageName}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
