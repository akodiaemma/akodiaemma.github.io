export default async (request, context) => {
  const userAgent = request.headers.get("user-agent") || "";
  
  const crawlers = [
    "googlebot", "bingbot", "slurp", "duckduckbot",
    "baiduspider", "yandexbot", "facebot", "twitterbot"
  ];

  const isCrawler = crawlers.some(bot => userAgent.toLowerCase().includes(bot));

  if (!isCrawler) {
    return context.next();
  }

  const url = new URL(request.url);
  const prerenderUrl = `https://service.prerender.io${url.pathname}`;

  const response = await fetch(prerenderUrl, {
    headers: {
      "X-Prerender-Token": "o6ZNXfSYzLaBZAZZCsJf",
      "X-Prerender-Host": "www.crossgatesconnect.com"
    }
  });

  return new Response(response.body, {
    headers: { "content-type": "text/html" }
  });
};