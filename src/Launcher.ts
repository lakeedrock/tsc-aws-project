import { Server } from "./Server/Server";
import "dotenv/config";

class Launcher {
  // Instance variables
  private server: Server;

  constructor() {
    this.server = new Server();
  }

  public launchApp() {
    console.log("Starting App ...");
    this.server.createServer();
  }
}

new Launcher().launchApp();
