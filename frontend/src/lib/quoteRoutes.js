// Maps a product category from the API → existing repo route for quote/buy flow
export function quoteRouteFor(category, productId) {
  switch ((category || "").toLowerCase()) {
    case "travel":
      return productId ? `/travel-quote/${productId}` : "/products/travel";
    case "motor":
      return "/products/motor-easy";
    case "pa":
      return "/products/pa-easy";
    case "health":
      return "/products/health-secure-plus";
    case "home":
      return "/products/home-easy";
    default:
      return "/products";
  }
}
