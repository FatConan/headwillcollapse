import "jquery";
import Brainify from "./brain/brain.js";

class AudioPlayer{
    constructor(audioWrapper){
        this.audioWrapper = $(audioWrapper);
        this.audio = this.audioWrapper.find("audio")[0];
        this.$timeline = this.audioWrapper.find(".timeline");
        this.$playerButton = this.audioWrapper.find(".play");
        this.$muteButton = this.audioWrapper.find(".mute")
        this.$timeSpan = this.audioWrapper.find(".time");
        this.$durationSpan = this.audioWrapper.find(".duration");

        this.$timeSpan.text("--:--:--");
        this.$durationSpan.text("--:--:--");
        this.addEvents();
    }

    addEvents(){
        const toggleAudio = (e) => {
            this.toggleAudio();
        };

        const toggleSound = (e) => {
            this.toggleSound();
        };

        const changeTimelinePosition = (e) => {
            this.changeTimelinePosition();
        };

        const audioEnded = (e) => {
            this.audioEnded();
        };

        const changeSeek = (e) => {
            e.preventDefault();
            let x = e.pageX - this.$timeline.position().left;
            let width = this.$timeline.width();

            //Set the percentage and limit
            let pos = Math.min(Math.max((x * 100.0) / width, 0), 100);
            this.changeSeek(pos);
        };

        this.$timeline.on("click", changeSeek);
        this.$playerButton.on('click', toggleAudio);
        this.$muteButton.on("click", toggleSound);
        this.audio.ontimeupdate = changeTimelinePosition;
        this.audio.onended = audioEnded;
    }

    toggleAudio(){
        if(this.audio.paused){
            this.audio.play();
            this.$playerButton.addClass("paused");
            this.$playerButton.text("Pause");
            this.$playerButton.prop("title", "Pause");
        }else{
            this.audio.pause();
            this.$playerButton.removeClass("paused");
            this.$playerButton.text("Play");
            this.$playerButton.prop("title", "Play");
        }
    }

    toggleSound(){
        this.audio.muted = !this.audio.muted;
        if(this.audio.muted){
            this.$muteButton.addClass("muted");
            this.$muteButton.text("Unmute");
            this.$muteButton.prop("title", "Unmute");
        }else{
            this.$muteButton.removeClass("muted");
            this.$muteButton.text("Mute");
            this.$muteButton.prop("title", "Mute");
        }
    }

    formatTime(providedSeconds){
        let dateObj = new Date(providedSeconds * 1000);
        let hours = dateObj.getUTCHours();
        let minutes = dateObj.getUTCMinutes();
        let seconds = dateObj.getSeconds();

        let timeString = hours.toString().padStart(2, '0')
            + ':' + minutes.toString().padStart(2, '0')
            + ':' + seconds.toString().padStart(2, '0');
        return timeString;
    }

    changeTimelinePosition(){
        let percentagePosition = (100.0 * this.audio.currentTime) / this.audio.duration;
        this.$timeline.css("backgroundSize", `${percentagePosition}% 100%`);
        this.$timeSpan.text(this.formatTime(this.audio.currentTime));
        this.$durationSpan.text(this.formatTime(this.audio.duration));
    }

    audioEnded(){
        this.$playerButton.removeClass("paused");
        this.$playerButton.text("Play");
        this.$playerButton.prop("title", "Play");
    }

    changeSeek(pos){
        const time = (pos * this.audio.duration) / 100;
        this.audio.currentTime = time;
    }
}

class AudioPlayers{
    constructor(){
        this.elements = $(".audio-player");
        this.playerCollection = [];
        this.players();
    }

    players(){
        if(this.elements){
            for(let el of this.elements){
                this.playerCollection.push(new AudioPlayer($(el)));
            }
        }
    }
};

const audio = new AudioPlayers();
fetch("/resources/data/brain.json")
    .then(response => response.json())
    .then(jsonObject => {
        Brainify(jsonObject, "#big-brain",
            {width: 1000, height: 1000, mainBackground: "#3FB8AF", responsive: true});
        Brainify(jsonObject, "#little-brain",
            {width: 180, height: 180, mainBackground: "#FF3D7F"});
    });

