import http.server
import socketserver
import webbrowser
import sys

PORT = 3000

class ReusableServer(socketserver.TCPServer):
    allow_reuse_address = True

Handler = http.server.SimpleHTTPRequestHandler

print(f"Starting Tamil Dictation server on http://localhost:{PORT}...")
webbrowser.open(f"http://localhost:{PORT}")

try:
    with ReusableServer(("127.0.0.1", PORT), Handler) as httpd:
        print(f"Server running at http://localhost:{PORT} (Press Ctrl+C to stop)")
        httpd.serve_forever()
except KeyboardInterrupt:
    print("\nServer stopped.")
    sys.exit(0)
