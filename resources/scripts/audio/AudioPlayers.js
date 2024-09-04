import {BaseClass} from "malicacid";
import AudioPlayer from "./AudioPlayer.js";

export default class AudioPlayers extends BaseClass{
    constructor(){
        super();
        this.elements = $(".audio-player");
        this.playerCollection = new Map();
        this.addListeners();
        this.players();
    }

    players(){
        if(this.elements){
            for(let el of this.elements){
                this.playerCollection.set(el[0], new AudioPlayer(el));
            }
        }
    }

    currentPlayer(el){
        return this.elementHelper.findParentByMatch(el, ".audio-player");
    }

    addListeners(){
        const triggerPlayer = (event) => {
            return (e, args) => {
                e.preventDefault();
                let player = this.currentPlayer(args.matchedEl);
                let ap = this.playerCollection.get(player);
                this.eventHandler.triggerWithTarget(player, `audioPlayer:${event}`, {e: e, player: ap, trigger: args.$matchedEl});
            };
        };

        this.eventHandler.addListener(".audio-player .timeline", triggerPlayer("timeline"));
        this.eventHandler.addListener(".audio-player .play", triggerPlayer("play"));
        this.eventHandler.addListener(".audio-player .mute", triggerPlayer("sound"))
    }
};