import { textStyle, backStyle } from "../game/core/buttons";
import { Level, LevelData } from "../game/core/levelstructure";
import { openExternalLink } from "../game/core/misc";

let epochtimetext: Phaser.GameObjects.Text;
const levelelements: LevelTile[] = [];

const exploreButtonStyle = {
    fontFamily: "Helvetica, Arial, sans-serif",
    fontSize: "42px",
    fontStyle: "bold",
    align: "center",
    // fixedWidth: 100,
    // fixedHeight: 50,
    backgroundColor: "#333",
    padding: {
        y: 4,
        x: 60,
    },
};

const levelnameButtonStyle = {
    fontFamily: "Helvetica, Arial, sans-serif",
    fontSize: "24px",
    backgroundColor: "#444",
    padding: {
        y: 4,
        x: 10,
    },
};

const helpButtonStyle = {
    fontFamily: "Helvetica, Arial, sans-serif",
    fontSize: "42px",
    fontStyle: "bold",
    align: "center",
    backgroundColor: "#336",
    padding: {
        y: 4,
        x: 10,
    },
};

type APIData = {
    id: number
    name: string
    author: string
    description: string
    version: number
    levelversion: string
    levels: Level[]
}


class LevelTile {
    scene!: Phaser.Scene
    // thumbnail: Phaser.GameObjects.Rectangle
    text: Phaser.GameObjects.Text
    constructor(
        scene: Phaser.Scene,
        x: number,
        y: number,
        public name: string = "Undefined Level",
        public author: string = "John Doe",
        public views: number = 0,
    ) {
        this.name = name;
        this.author = author;
        this.views = views;

        // this.thumbnail = scene.add.rectangle(x, y, 225, 140, 0x333333);
        this.text = scene.add.text(
            x - 110, y + 80,
            `"${name}" By: ${author}`,
            levelnameButtonStyle,
        ).setInteractive();
    }
}

class exploreScene extends Phaser.Scene {
    constructor() { super({ key: "exploreScene" }); }

    create(): void {
        // Background
        this.add.rectangle(0, 0, 960, 540, 0x6666666).setOrigin(0, 0);

        epochtimetext = this.add.text(0, 0, "awaiting time...", textStyle).setFontSize(32);

        const backButton = this.add.text(
            800, 475, "BACK", backStyle,
        ).setInteractive();

        backButton.on("pointerdown", () => {
            document.body.style.backgroundColor = "initial";
            this.scene.start("menuScene");
        });

        /* const featuredbutton = this.add.text(
            30, 50, "FEATURED", exploreButtonStyle,
        );

        const newbutton = this.add.text(
            389, 50, "NEW", exploreButtonStyle,
        );

        const topbutton = this.add.text(
            620, 50, "TOP", exploreButtonStyle,
        );

        const helpbutton = this.add.text(
            860, 50, "?", helpButtonStyle,
        ); */

        const refreshbutton = this.add.text(
            10, 475, "REFRESH", helpButtonStyle,
        ).setInteractive();

        refreshbutton.on("pointerdown", () => {
            this.refresh();
        });

        const fivebeambutton = this.add.text(
            260, 475, "5BEAM", helpButtonStyle,
        ).setInteractive().setBackgroundColor("#476");

        fivebeambutton.on("pointerdown", () => {
            openExternalLink("http://5beam.zapto.org/");
        });

        this.refresh();
    }

    // eslint-disable-next-line class-methods-use-this
    update(): void {
        const epochtime = Date.now();
        // console.log(epochtime);
        epochtimetext.setText(`${epochtime.toString()} // 5beam-explore`);
    }

    refresh(): void {
        const levellist = fetch("http://5beam.zapto.org/api/5bhtml")
            .then((response) => response.json().then((levels: APIData[]) => {
                levels.forEach((level, i) => {
                    // temp fix while i fix this in backend
                    // const parsedlevels = JSON.parse(level.levels as unknown as string);
                    // level.levels = parsedlevels;

                    const newtile = new LevelTile(
                        this, 150, (i * 40), level.name, level.author,
                    );
                    newtile.text.on("pointerdown", () => {
                        const leveldata = fetch(`http://5beam.zapto.org/get/${level.id}`)
                            .then((response) => response.json().then((data: Level[]) => {
                                level.levels = data;
                            }).catch((error) => {
                                this.add.text(100, 300, "Error getting level data!");
                                return console.error(error);
                            }));
                        this.scene.start("gameScene", {
                            levelfile: level,
                            levelnumber: 1,
                        });
                    });
                    levelelements.push(newtile);
                });
            }))
            .catch((error) => {
                this.add.text(100, 300, "Error refreshing! Maybe 5beam is offline!");
                return console.error(error);
            });

        levelelements.length = 0; // empty array
    }
}

export default exploreScene;
