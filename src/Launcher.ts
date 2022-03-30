import { Server } from "./Server/Server";

class Launcher {
  // Instance variables
  private name: string;
  private server: Server;

  constructor() {
    this.name = "TSC Server";
    this.server = new Server();
  }

  public launchApp() {
    console.log("Starting App ...");
    this.server.createServer();
  }
}

new Launcher().launchApp();
