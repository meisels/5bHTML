// import assetsjson from "../game/assets";

const maxlines = 30;
const consolelines: Phaser.GameObjects.Text[] = [];
const consoleStyle = {
    fontFamily: "monospace",
    // backgroundColor: "#fff",
    color: "#fff",
};
const greenStyle = {
    fontFamily: "monospace",
    // backgroundColor: "#fff",
    color: "#0f0",
};

class loadingScene extends Phaser.Scene {
    constructor() { super("loadingScene"); }

    preload(): void {
        this.load.setBaseURL("./assets/core");

        this.add.text(80, 100, "Loading 5b assets...", { font: "32px Arial" });
        //var loadingText = this.add.text(100,170,"Ported by Zelo101", {font: "32px Arial"});

        //assetsjson.core.forEach(element => {
        //
        //});
        //assetsjson.forEach((entry) => {
        //    console.log(entry)
        //})
        //aj.forEach(mod => {
        //    mod.forEach(category => {
        //        console.log(Object.keys(mod)[0]);
        //    })
        //})

        this.loadAsset("5b_logo", "5b.svg", "svg");
        this.loadAsset("5b_people", "5b_people.svg", "svg");

        this.loadAsset("background_0", "backgrounds/png/0.png");
        this.loadAsset("background_1", "backgrounds/png/1.png");
        this.loadAsset("background_2", "backgrounds/png/2.png");
        this.loadAsset("background_3", "backgrounds/png/3.png");
        this.loadAsset("background_4", "backgrounds/png/4.png");
        this.loadAsset("background_5", "backgrounds/png/5.png");
        this.loadAsset("background_6", "backgrounds/png/6.png");
        this.loadAsset("background_7", "backgrounds/png/7.png");
        this.loadAsset("background_8", "backgrounds/png/8.png");
        this.loadAsset("background_9", "backgrounds/png/9.png");
        this.loadAsset("background_10", "backgrounds/png/10.png");
        this.loadAsset("background_11", "backgrounds/png/11.png");

        this.loadAsset("missing", "misc/missing.png");
        this.loadAsset("animate_missing", "misc/animate_missing.png");
        this.loadAsset("special_missing", "misc/special_missing.png");
        this.loadAsset("deco_missing", "misc/deco_missing.png");
        this.loadAsset("special_missing", "misc/special_missing.png");
        this.loadAsset("kill_missing", "misc/kill_missing.png");
        this.loadAsset("finish_missing", "misc/finish_missing.png");

        this.loadAsset("book", "book.png");
        this.loadAsset("zelobook", "zelobook.png");
        this.addLine("Completed Loading!", greenStyle);
        console.log("Loading completed, Starting...");
    }

    create(): void {
        this.scene.start("menuScene"); // finished
    }

    loadAsset(key: string, url: string, type?: string): void {
        switch (type) {
            case "svg":
                this.load.svg(key, url);
                this.addAssetLine(url);
                break;

            default:
            case "png":
                this.load.image(key, url);
                this.addAssetLine(url);
        }
    }

    addAssetLine(text: string): Phaser.GameObjects.Text {
        return this.addLine(`Loading asset:  ${text}`, consoleStyle);
    }

    // idk
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    addLine(text: string, ts?: any): Phaser.GameObjects.Text {
        if (consolelines.length > maxlines) loadingScene.clearConsole();
        const line: Phaser.GameObjects.Text = this.add.text(
            450, 100+(consolelines.length*15), text, ts,
        ).setStyle(ts);
        consolelines.push(line);
        return line;
    }

    static clearConsole(): void {
        consolelines.forEach((cl) => cl.destroy());
        consolelines.length = 0;
    }
}

export default loadingScene;
