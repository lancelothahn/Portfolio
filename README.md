# Portfolio
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<title>Lance Hahn — A Portfolio Journal</title>
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,800;1,400;1,600&family=Lora:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Special+Elite&display=swap" rel="stylesheet" />
<style>
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html, body { background: #E8DECE; }
  body { font-family: 'Lora', serif; color: #4A3728; -webkit-font-smoothing: antialiased; }
  ::selection { background: rgba(139,90,43,0.3); color: #3E2A1A; }
  ::-webkit-scrollbar { width: 8px; }
  ::-webkit-scrollbar-track { background: #E0D5C3; }
  ::-webkit-scrollbar-thumb { background: #A0896C; border-radius: 4px; }

  .cover-link { transition: all 0.3s ease !important; }
  .cover-link:hover { padding-left: 24px !important; color: #6B3A1F !important; background: rgba(139,90,43,0.06) !important; }
  .resume-btn { transition: all 0.3s ease !important; }
  .resume-btn:hover { transform: scale(1.03) rotate(-1deg) !important; box-shadow: 3px 4px 15px rgba(80,50,20,0.25) !important; }
  .toc-line:hover { background: rgba(60,90,180,0.07) !important; color: #1F3A6B !important; }
  .contact-link:hover { color: #6B3A1F !important; }

  @keyframes fadeInUp { from { opacity: 0; transform: translateY(15px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes stampPress {
    0% { transform: scale(1.3) rotate(-12deg); opacity: 0; }
    60% { transform: scale(0.95) rotate(-12deg); opacity: 1; }
    100% { transform: scale(1) rotate(-12deg); opacity: 1; }
  }
</style>
</head>
<body>
<div id="root"></div>

<script src="https://unpkg.com/react@18.3.1/umd/react.development.js" integrity="sha384-hD6/rw4ppMLGNu3tX5cjIb+uRZ7UkRJ6BPkLpg4hAu/6onKUg4lLsHAs9EBPT82L" crossorigin="anonymous"></script>
<script src="https://unpkg.com/react-dom@18.3.1/umd/react-dom.development.js" integrity="sha384-u6aeetuaXnQ38mYT8rp6sbXaQe3NL9t+IBXmnYxwkUI2Hw4bsp2Wvmx4yRQF1uAm" crossorigin="anonymous"></script>
<script src="https://unpkg.com/@babel/standalone@7.29.0/babel.min.js" integrity="sha384-m08KidiNqLdpJqLq95G/LEi8Qvjl/xUYll3QILypMoQ65QorJ9Lvtp2RXYGBFj1y" crossorigin="anonymous"></script>
<script type="text/babel" src="portfolio.jsx" data-presets="react"></script>
</body>
</html>
